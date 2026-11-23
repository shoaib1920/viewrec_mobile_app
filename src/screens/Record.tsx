import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions, useMicrophonePermissions, CameraType } from 'expo-camera';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, space } from '../theme';
import { script } from '../data';
import { Button } from '../components/ui';
import { uploadVideo, DEMO_INVITE_TOKEN } from '../api';

type Stage = 'intro' | 'camera' | 'review' | 'done';
const MAX_SECONDS = 120;
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function Review({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (p) => { p.loop = true; p.play(); });
  return <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} />;
}

export default function Record({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const camRef = useRef<CameraView>(null);
  const [camPerm, askCam] = useCameraPermissions();
  const [micPerm, askMic] = useMicrophonePermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState<Stage>('intro');
  const [recording, setRecording] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  useEffect(() => { tRef.current = t; }, [t]);
  const [uri, setUri] = useState<string | null>(null);
  const [agreedAt, setAgreedAt] = useState<string | null>(null);
  const [length, setLength] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const granted = camPerm?.granted && micPerm?.granted;

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  useEffect(() => { if (recording && t >= MAX_SECONDS) stop(); }, [t]);

  const line = Math.min(script.length - 1, Math.floor(t / 4));

  const begin = async () => {
    if (!granted) {
      const c = await askCam();
      const m = await askMic();
      if (!c.granted || !m.granted) {
        Alert.alert('Permission needed', 'Please allow camera and microphone access so you can record your video.');
        return;
      }
    }
    setAgreedAt(new Date().toISOString());
    setReady(false);
    setStage('camera');
  };

  const start = async () => {
    if (!camRef.current || !ready) return;
    setT(0);
    setRecording(true);
    try {
      const res = await camRef.current.recordAsync({ maxDuration: MAX_SECONDS });
      setRecording(false);
      setLength(tRef.current);
      if (res?.uri) { setUri(res.uri); setStage('review'); }
    } catch (e) {
      setRecording(false);
      Alert.alert('Recording failed', 'Something went wrong while recording. Please try again.');
    }
  };

  const stop = () => camRef.current?.stopRecording();

  const send = async () => {
    if (!uri || uploading) return;
    setError(null);
    setUploading(true);
    setProgress(0);
    try {
      await uploadVideo(
        DEMO_INVITE_TOKEN, uri,
        { agreed: true, agreedAt: agreedAt ?? new Date().toISOString(), singleSession: true, platform: Platform.OS },
        fmt(length), setProgress,
      );
      setStage('done');
    } catch (e: any) {
      setError(e.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  /* ---------- intro / consent ---------- */
  if (stage === 'intro') {
    return (
      <View style={[styles.full, { paddingTop: insets.top + space.lg, paddingHorizontal: space.xl }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.close}><Ionicons name="close" size={22} color="#fff" /></Pressable>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.big}><Ionicons name="videocam" size={34} color="#fff" /></View>
          <Text style={styles.title}>Hartley Roofing would love to hear how it went</Text>
          <Text style={styles.sub}>It takes two minutes. The words are on screen, so you don't have to think of what to say. No app, no account.</Text>
          {['Recorded right here from your phone', 'The business approves it before anyone sees it', 'You can stop and say never contact me again'].map((p) => (
            <View key={p} style={styles.point}>
              <Ionicons name="checkmark-circle" size={18} color={colors.green} /><Text style={styles.pt}>{p}</Text>
            </View>
          ))}
        </View>
        <Button title="I agree, open camera" icon="videocam" onPress={begin} style={{ marginBottom: insets.bottom + space.lg }} />
      </View>
    );
  }

  /* ---------- done ---------- */
  if (stage === 'done') {
    return (
      <View style={[styles.full, { alignItems: 'center', justifyContent: 'center', padding: space.xl }]}>
        <View style={[styles.big, { backgroundColor: colors.green }]}><Ionicons name="checkmark" size={38} color="#fff" /></View>
        <Text style={[styles.title, { textAlign: 'center' }]}>Thank you!</Text>
        <Text style={[styles.sub, { textAlign: 'center' }]}>Your video has been sent to Hartley Roofing. They will review it before it goes anywhere.</Text>
        <Button title="Done" style={{ marginTop: space.xl, alignSelf: 'stretch' }} onPress={() => navigation.goBack()} />
      </View>
    );
  }

  /* ---------- camera / review ---------- */
  const reviewing = stage === 'review' && !!uri;
  return (
    <View style={styles.full}>
      {reviewing ? (
        <Review uri={uri!} />
      ) : (
        <CameraView ref={camRef} style={StyleSheet.absoluteFill} facing={facing} mode="video" mirror videoQuality="720p" onCameraReady={() => setReady(true)} />
      )}
      <View style={styles.shade} pointerEvents="none" />

      <View style={[styles.topRow, { paddingTop: insets.top + space.md, paddingHorizontal: space.lg }]}>
        <View style={styles.recPill}>
          {recording && <View style={styles.dot} />}
          <Text style={styles.recText}>{reviewing ? 'PREVIEW' : recording ? `REC  ${fmt(t)}` : 'READY'}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {!reviewing && !recording && (
            <Pressable onPress={() => setFacing((f) => (f === 'front' ? 'back' : 'front'))} style={styles.close}>
              <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
            </Pressable>
          )}
          <Pressable onPress={() => { if (recording) stop(); navigation.goBack(); }} style={styles.close}><Ionicons name="close" size={22} color="#fff" /></Pressable>
        </View>
      </View>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + space.lg }]}>
        {!reviewing && (
          <View style={styles.prompter}>
            <Text style={styles.label}>JUST READ THIS</Text>
            {script.map((s, i) => (
              <Text key={s} style={[styles.line, i === line && recording && styles.lineLive]}>{s}</Text>
            ))}
          </View>
        )}

        {reviewing ? (
          <View style={{ gap: space.sm }}>
            {error && <Text style={styles.err}>{error}</Text>}
            <Button title={uploading ? `Sending… ${Math.round(progress * 100)}%` : error ? 'Try again' : 'Send my video'} icon={uploading ? undefined : 'send'} onPress={send} />
            {uploading && <View style={styles.bar}><View style={[styles.barFill, { width: `${Math.round(progress * 100)}%` }]} /></View>}
            {!uploading && <Button title="Record again" variant="ghost" onPress={() => { setUri(null); setT(0); setReady(false); setStage('camera'); }} />}
          </View>
        ) : recording ? (
          <Pressable onPress={stop} style={styles.recOuter}><View style={styles.stop} /></Pressable>
        ) : (
          <Pressable onPress={start} disabled={!ready} style={[styles.recOuter, !ready && { opacity: 0.4 }]}><View style={styles.recInner} /></Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: colors.bg },
  shade: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.15)' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottom: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: space.lg },
  close: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
  recPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: radius.pill },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.rec, marginRight: 7 },
  recText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  prompter: { backgroundColor: 'rgba(10,10,18,0.72)', borderRadius: radius.lg, padding: space.lg, marginBottom: space.xl },
  label: { color: colors.muted, fontSize: 11, letterSpacing: 1.4, fontWeight: '700', marginBottom: space.sm },
  line: { color: 'rgba(255,255,255,0.45)', fontSize: 20, lineHeight: 30, fontWeight: '600' },
  lineLive: { color: '#fff' },
  recOuter: { alignSelf: 'center', width: 78, height: 78, borderRadius: 39, borderWidth: 5, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  recInner: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.rec },
  stop: { width: 30, height: 30, borderRadius: 8, backgroundColor: colors.rec },
  err: { color: colors.rec, textAlign: 'center', fontSize: 13 },
  bar: { height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden' },
  barFill: { height: 4, backgroundColor: colors.primary },
  big: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.rec, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: space.xl },
  title: { color: '#fff', fontSize: 26, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5 },
  sub: { color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: space.md, marginBottom: space.xl },
  point: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pt: { color: colors.text, marginLeft: 10, fontSize: 14, flex: 1 },
});
