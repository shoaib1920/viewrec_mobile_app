import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, BackHeader, Card } from '../components/ui';
import { colors, space } from '../theme';

const items = [
  { icon: 'videocam', color: colors.green, t: 'Lena Fischer recorded a video', s: 'Ready for your approval · 2h ago' },
  { icon: 'people', color: colors.amber, t: '2 customers suggested', s: 'Approve before invitations go out · 5h ago' },
  { icon: 'eye', color: colors.primary, t: 'Priya Nair\'s video hit 1,000 views', s: 'On Google and your website · 1d ago' },
  { icon: 'paper-plane', color: '#5ab0ff', t: 'Invitation sent to Tom Hendricks', s: 'Reminder goes out in 3 days · 2d ago' },
];

export default function Notifications({ navigation }: any) {
  return (
    <Screen>
      <BackHeader title="Notifications" onBack={() => navigation.goBack()} />
      {items.map((n) => (
        <Card key={n.t} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: space.md }}>
          <View style={[styles.ic, { backgroundColor: n.color + '26' }]}><Ionicons name={n.icon as any} size={18} color={n.color} /></View>
          <View style={{ flex: 1, marginLeft: space.md }}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{n.t}</Text>
            <Text style={{ color: colors.muted, fontSize: 13, marginTop: 2 }}>{n.s}</Text>
          </View>
        </Card>
      ))}
    </Screen>
  );
}
const styles = StyleSheet.create({ ic: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' } });
