import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, H1, Card, Avatar, SectionHeader, Body } from '../components/ui';
import { colors, space } from '../theme';

export default function More({ navigation }: any) {
  const [quiet, setQuiet] = useState(true);
  const [push, setPush] = useState(true);
  const items: { icon: any; label: string; onPress?: () => void }[] = [
    { icon: 'card-outline', label: 'Plans & billing', onPress: () => navigation.navigate('Pricing') },
    { icon: 'globe-outline', label: 'Connected platforms' },
    { icon: 'color-palette-outline', label: 'Branding & invitations' },
    { icon: 'gift-outline', label: 'Customer rewards' },
    { icon: 'ban-outline', label: 'Opt-out list' },
    { icon: 'help-circle-outline', label: 'Help & support' },
  ];
  return (
    <Screen>
      <H1>More</H1>
      <Card style={{ flexDirection: 'row', alignItems: 'center', marginTop: space.lg }}>
        <Avatar name="Hartley Roofing" size={54} />
        <View style={{ flex: 1, marginLeft: space.md }}>
          <Text style={styles.name}>Hartley Roofing</Text>
          <Text style={styles.sub}>Home & Trades · Pro trial</Text>
        </View>
      </Card>

      <SectionHeader title="Preferences" />
      <Card style={{ gap: space.md }}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><Text style={styles.name}>Polite hours only</Text><Text style={styles.sub}>Invitations go out 8am–8pm</Text></View>
          <Switch value={quiet} onValueChange={setQuiet} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
        </View>
        <View style={styles.row}>
          <View style={{ flex: 1 }}><Text style={styles.name}>Push notifications</Text><Text style={styles.sub}>New videos and approvals</Text></View>
          <Switch value={push} onValueChange={setPush} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
        </View>
      </Card>

      <SectionHeader title="Account" />
      <Card style={{ paddingVertical: 4 }}>
        {items.map((it, i) => (
          <Pressable key={it.label} onPress={it.onPress} style={[styles.item, i < items.length - 1 && styles.line]}>
            <Ionicons name={it.icon} size={20} color={colors.primary} />
            <Text style={styles.itemText}>{it.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </Card>
      <Pressable onPress={() => navigation.replace('Welcome')} style={{ marginTop: space.xl, alignItems: 'center' }}>
        <Text style={{ color: colors.rec, fontWeight: '700' }}>Sign out</Text>
      </Pressable>
      <Body style={{ textAlign: 'center', fontSize: 12, marginTop: space.lg }}>ViewRec v1.0.0</Body>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  sub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  line: { borderBottomWidth: 1, borderBottomColor: colors.border },
  itemText: { flex: 1, color: colors.text, marginLeft: 12, fontSize: 15 },
});
