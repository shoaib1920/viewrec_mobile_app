import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, H1, Body, Card, Chip, Avatar, Badge, Button } from '../components/ui';
import { colors, space, radius } from '../theme';
import { customers as seed, Customer } from '../data';
import { api } from '../api';

const filters = ['all', 'suggested', 'approved', 'invited', 'recorded', 'skipped'] as const;

export default function Customers({ navigation }: any) {
  const [list, setList] = useState<Customer[]>(seed);
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [q, setQ] = useState('');
  const shown = list.filter((c) => (filter === 'all' || c.status === filter) && c.name.toLowerCase().includes(q.toLowerCase()));
  const [offline, setOffline] = useState(false);
  useEffect(() => { api.customers().then(setList).catch(() => setOffline(true)); }, []);
  const set = (id: string, status: Customer['status']) => {
    const prev = list;
    setList((l) => l.map((c) => (c.id === id ? { ...c, status } : c)));
    if (!offline) api.setCustomerStatus(id, status).catch(() => setList(prev));
  };
  const pending = list.filter((c) => c.status === 'suggested');

  return (
    <Screen>
      <View style={styles.head}>
        <H1>Customers</H1>
        <Pressable style={styles.add} onPress={() => navigation.navigate('Import')}>
          <Ionicons name="add" size={22} color="#fff" />
        </Pressable>
      </View>
      <Body style={{ marginTop: 4 }}>You approve every name. Nothing is sent until you press approve.</Body>

      {offline && <Text style={{ color: colors.amber, fontSize: 12, marginTop: space.sm }}>Can't reach the server - showing demo data.</Text>}
      <View style={styles.search}>
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search customers" placeholderTextColor={colors.muted} style={styles.input} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: space.md }}>
        {filters.map((f) => (
          <Chip key={f} label={f[0].toUpperCase() + f.slice(1)} active={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>

      {pending.length > 1 && (
        <Button title={`Approve all ${pending.length} suggested`} icon="checkmark-done" small style={{ marginBottom: space.md }}
          onPress={() => pending.forEach((c) => set(c.id, 'approved'))} />
      )}

      {shown.map((c) => (
        <Card key={c.id} style={{ marginBottom: space.md }}>
          <View style={styles.row}>
            <Avatar name={c.name} />
            <View style={{ flex: 1, marginLeft: space.md }}>
              <Text style={styles.name}>{c.name}</Text>
              <Text style={styles.sub}>{c.job} · {c.date}</Text>
            </View>
            <Badge status={c.status} />
          </View>
          <Text style={styles.why}>{c.reason}</Text>
          {c.status === 'suggested' && (
            <View style={[styles.row, { marginTop: space.md, gap: space.sm }]}>
              <Button title="Approve" small style={{ flex: 1 }} onPress={() => set(c.id, 'approved')} />
              <Button title="Skip" variant="ghost" small style={{ flex: 1 }} onPress={() => set(c.id, 'skipped')} />
            </View>
          )}
          {c.status === 'approved' && (
            <Button title="Send invitation" icon="paper-plane" small style={{ marginTop: space.md }} onPress={() => set(c.id, 'invited')} />
          )}
        </Card>
      ))}
      {shown.length === 0 && <Body style={{ textAlign: 'center', marginTop: space.xl }}>No customers here yet.</Body>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  add: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, marginTop: space.lg },
  input: { flex: 1, color: colors.text, paddingVertical: 12, marginLeft: 8, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '700', fontSize: 15 },
  sub: { color: colors.muted, fontSize: 13, marginTop: 2 },
  why: { color: colors.muted, fontSize: 12, marginTop: space.md, fontStyle: 'italic' },
});
