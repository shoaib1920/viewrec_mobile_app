import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Screen, H1, Body, Chip, Badge, Thumb } from '../components/ui';
import { colors, space } from '../theme';
import { videos as seed, Video } from '../data';
import { api, API_URL } from '../api';

const filters = ['all', 'pending', 'approved', 'published'] as const;

export default function Videos({ navigation }: any) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [videos, setVideos] = useState<Video[]>(seed);
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const load = () => api.videos().then((v) => { setVideos(v); setOffline(false); }).catch(() => setOffline(true));
    load();
    return navigation.addListener('focus', load);
  }, [navigation]);
  const shown = videos.filter((v) => filter === 'all' || v.status === filter);
  return (
    <Screen>
      <H1>Video library</H1>
      <Body style={{ marginTop: 4 }}>One recording, used everywhere your customers look.</Body>
      {offline && <Text style={{ color: colors.amber, fontSize: 12, marginTop: space.sm }}>Can't reach the server - showing demo data.</Text>}
      {!offline && videos.length === 0 && <Body style={{ marginTop: space.xl, textAlign: 'center' }}>No videos yet. They appear here when customers record.</Body>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: space.lg }}>
        {filters.map((f) => (
          <Chip key={f} label={f[0].toUpperCase() + f.slice(1)} active={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>
      {shown.map((v) => (
        <Pressable key={v.id} style={{ marginBottom: space.xl }} onPress={() => navigation.navigate('VideoDetail', { video: v })}>
          <Thumb hue={v.hue} duration={v.duration} height={190} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{v.name}</Text>
              <Text style={styles.sub}>{v.job} · {v.views.toLocaleString()} views</Text>
            </View>
            <Badge status={v.status} />
          </View>
          <Text style={styles.quote} numberOfLines={2}>“{v.quote}”</Text>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  name: { color: colors.text, fontWeight: '700', fontSize: 16 },
  sub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  quote: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 8 },
});
