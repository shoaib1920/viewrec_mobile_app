import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, BackHeader, H1, Body, Card, Button, Chip } from '../components/ui';
import { colors, space, radius } from '../theme';
import { plans } from '../data';

export default function Pricing({ navigation }: any) {
  const [yearly, setYearly] = useState(false);
  return (
    <Screen>
      <BackHeader title="Plans" onBack={() => navigation.goBack()} />
      <H1 style={{ fontSize: 26 }}>Choose the level of support you need</H1>
      <Body style={{ marginTop: 8 }}>Start for $1. Someone from our team calls and switches your account on, then you have 15 days of full Pro.</Body>

      <View style={{ flexDirection: 'row', marginVertical: space.lg }}>
        <Chip label="Monthly" active={!yearly} onPress={() => setYearly(false)} />
        <Chip label="Yearly · 2 months free" active={yearly} onPress={() => setYearly(true)} />
      </View>

      {plans.map((p) => {
        const price = yearly ? '$' + Math.round(parseInt(p.price.slice(1), 10) * 10 / 12) : p.price;
        return (
          <Card key={p.id} style={[{ marginBottom: space.lg }, p.recommended && { borderColor: colors.primary, borderWidth: 2 }]}>
            {p.recommended && <View style={styles.rec}><Text style={styles.recText}>Recommended</Text></View>}
            <Text style={styles.name}>{p.name}</Text>
            <Text style={styles.blurb}>{p.blurb}</Text>
            <Text style={styles.price}>{price}<Text style={styles.per}> / month</Text></Text>
            {p.features.map((f) => (
              <View key={f} style={styles.feat}>
                <Ionicons name="checkmark-circle" size={17} color={colors.green} /><Text style={styles.featText}>{f}</Text>
              </View>
            ))}
            <Button title="Start for $1" variant={p.recommended ? 'primary' : 'ghost'} style={{ marginTop: space.lg }} />
          </Card>
        );
      })}

      <Card>
        <Text style={styles.name}>Managed Services</Text>
        <Text style={styles.blurb}>We run your Google, Meta and Local Services ads, with your own agent around the clock.</Text>
        <Button title="Talk to our team" variant="ghost" icon="call-outline" style={{ marginTop: space.lg }} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { color: colors.text, fontSize: 20, fontWeight: '800' },
  blurb: { color: colors.muted, marginTop: 4, fontSize: 14, lineHeight: 20 },
  price: { color: colors.text, fontSize: 36, fontWeight: '800', marginVertical: space.md },
  per: { color: colors.muted, fontSize: 14, fontWeight: '500' },
  feat: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featText: { color: colors.text, marginLeft: 8, fontSize: 14, flex: 1 },
  rec: { alignSelf: 'flex-start', backgroundColor: colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill, marginBottom: 10 },
  recText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
