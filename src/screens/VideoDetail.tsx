import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, BackHeader, Thumb, Card, H2, Body, Badge, Button, Stat } from '../components/ui';
import { colors, space } from '../theme';
import { platforms, Video } from '../data';
import { api } from '../api';

export default function VideoDetail({ route, navigation }: any) {
  const v: Video = route.params.video;
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(platforms.map((p) => [p.id, false])));
  const [approved, setApproved] = useState(v.status !== 'pending');

  return (
    <Screen>
      <BackHeader title="Testimonial" onBack={() => navigation.goBack()} right={<Ionicons name="share-outline" size={22} color={colors.text} />} />
      <Thumb hue={v.hue} duration={v.duration} height={240} />
      <View style={styles.head}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{v.name}</Text>
          <Text style={styles.sub}>{v.job}</Text>
        </View>
        <Badge status={approved && v.status === 'pending' ? 'approved' : v.status} />
      </View>
      <Body style={{ marginTop: space.md, color: colors.text }}>“{v.quote}”</Body>

      <Card style={{ marginTop: space.lg, flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="shield-checkmark" size={26} color={colors.green} />
        <View style={{ flex: 1, marginLeft: space.md }}>
          <Text style={styles.name}>Verified capture</Text>
          <Text style={styles.sub}>Recorded in one session, in the browser, with permission given on the page.</Text>
        </View>
      </Card>

      <View style={styles.stats}>
        <Stat icon="eye-outline" label="Views" value={v.views.toLocaleString()} />
        <Stat icon="share-social-outline" label="Shared to" value={String(v.platforms.length)} />
      </View>

      {!approved ? (
        <View style={{ gap: space.sm, marginTop: space.lg }}>
          <Button title="Approve video" icon="checkmark" onPress={() => { setApproved(true); api.updateVideo(v.id, { status: 'approved' }).catch(() => {}); }} />
          <Button title="Request a re-record" variant="ghost" />
        </View>
      ) : (
        <>
          <H2 style={{ marginTop: space.xl, marginBottom: space.md }}>Publish to</H2>
          <Body style={{ marginBottom: space.md }}>You choose each one. Nothing goes out on its own.</Body>
          {platforms.map((p) => (
            <View key={p.id} style={styles.platform}>
              <View style={styles.pIcon}><Ionicons name={p.icon as any} size={18} color={colors.text} /></View>
              <Text style={styles.pName}>{p.name}</Text>
              <Switch value={on[p.id] || v.platforms.includes(p.name.split(' ')[0])} onValueChange={(x) => setOn({ ...on, [p.id]: x })}
                trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
            </View>
          ))}
          <Button title="Publish selected" icon="rocket-outline" style={{ marginTop: space.lg }} onPress={() => api.updateVideo(v.id, { status: 'published', platforms: platforms.filter((p) => on[p.id]).map((p) => p.name) }).then(() => navigation.goBack()).catch(() => {})} />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', marginTop: space.lg },
  name: { color: colors.text, fontWeight: '700', fontSize: 17 },
  sub: { color: colors.muted, fontSize: 13, marginTop: 2, lineHeight: 18 },
  stats: { flexDirection: 'row', gap: space.md, marginTop: space.lg },
  platform: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  pIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surface2, alignItems: 'center', justifyContent: 'center' },
  pName: { flex: 1, color: colors.text, fontSize: 15, marginLeft: space.md },
});
