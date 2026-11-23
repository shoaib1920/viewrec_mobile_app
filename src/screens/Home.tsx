import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, H1, Body, Card, Stat, SectionHeader, Avatar, Badge, Thumb, Button } from '../components/ui';
import { colors, space, radius } from '../theme';
import { customers, videos } from '../data';

export default function Home({ navigation }: any) {
  const toApprove = customers.filter((c) => c.status === 'suggested');
  return (
    <Screen>
      <View style={styles.top}>
        <View>
          <Body style={{ fontSize: 13 }}>Good morning</Body>
          <H1 style={{ fontSize: 26 }}>Hartley Roofing</H1>
        </View>
        <Pressable style={styles.bell} onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={20} color={colors.text} />
          <View style={styles.bellDot} />
        </Pressable>
      </View>

      <LinearGradient colors={['#3a2a8c', '#1c1544']} style={styles.hero}>
        <Text style={styles.heroTag}>TRIAL · DAY 4 OF 15</Text>
        <Text style={styles.heroTitle}>Ask your next 20 customers for a video</Text>
        <Text style={styles.heroSub}>We found 143 past customers we can reach. Expect around 18 videos.</Text>
        <View style={styles.progress}><View style={styles.progressFill} /></View>
        <Button title="Import customers" icon="cloud-upload-outline" variant="ghost" small style={{ marginTop: space.md }} onPress={() => navigation.navigate('Import')} />
      </LinearGradient>

      <View style={styles.statsGrid}>
        <Stat icon="videocam-outline" label="Videos recorded" value="18" delta="+4 this week" />
        <Stat icon="paper-plane-outline" label="Invites sent" value="64" delta="28% response" />
        <Stat icon="eye-outline" label="Video views" value="2.4k" delta="+312 this week" />
        <Stat icon="checkmark-done-outline" label="Published" value="11" />
      </View>

      <SectionHeader title="Needs your approval" action="See all" onAction={() => navigation.navigate('Customers')} />
      {toApprove.map((c) => (
        <Card key={c.id} style={{ marginBottom: space.md }} onPress={() => navigation.navigate('Customers')}>
          <View style={styles.row}>
            <Avatar name={c.name} />
            <View style={{ flex: 1, marginLeft: space.md }}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.sub}>{c.job} · {c.date}</Text>
            </View>
            <Badge status={c.status} />
          </View>
          <Text style={styles.why}>Why: {c.reason}</Text>
        </Card>
      ))}

      <SectionHeader title="Latest videos" action="Library" onAction={() => navigation.navigate('Videos')} />
      {videos.slice(0, 2).map((v) => (
        <Pressable key={v.id} onPress={() => navigation.navigate('VideoDetail', { video: v })} style={{ marginBottom: space.md }}>
          <Thumb hue={v.hue} duration={v.duration} />
          <View style={[styles.row, { marginTop: 10 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{v.name}</Text>
              <Text style={styles.sub}>{v.job}</Text>
            </View>
            <Badge status={v.status} />
          </View>
        </Pressable>
      ))}

      <Card style={{ marginTop: space.md, flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('Record', { demo: true })}>
        <View style={styles.recIcon}><Ionicons name="videocam" size={20} color="#fff" /></View>
        <View style={{ flex: 1, marginLeft: space.md }}>
          <Text style={styles.name}>Preview the customer experience</Text>
          <Text style={styles.sub}>See what your customer sees when they record</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.muted} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: space.lg },
  bell: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  bellDot: { position: 'absolute', top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.rec },
  hero: { borderRadius: radius.lg, padding: space.lg, borderWidth: 1, borderColor: '#43359a' },
  heroTag: { color: '#b8a6ff', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 21, fontWeight: '800', marginTop: 8, lineHeight: 27 },
  heroSub: { color: '#cbc3f0', marginTop: 6, fontSize: 14, lineHeight: 20 },
  progress: { height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.15)', marginTop: space.lg },
  progressFill: { width: '27%', height: 6, borderRadius: 3, backgroundColor: colors.primary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.md, marginTop: space.lg },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  sub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  why: { color: colors.muted, fontSize: 12, marginTop: space.md, fontStyle: 'italic' },
  recIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.rec, alignItems: 'center', justifyContent: 'center' },
});
