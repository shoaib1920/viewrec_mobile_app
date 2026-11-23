import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, H1, Body, Button } from '../components/ui';
import { colors, radius, space } from '../theme';

const points = [
  'Nothing for your customer to install',
  'You approve every video before anyone sees it',
  'Opt-outs respected everywhere, for good',
];

export default function Welcome({ navigation }: any) {
  return (
    <Screen>
      <View style={styles.logoRow}>
        <LinearGradient colors={['#8b6dff', '#6a4cf0']} style={styles.logo}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
        </LinearGradient>
        <Text style={styles.brand}>ViewRec</Text>
      </View>

      <View style={styles.pill}><Text style={styles.pillText}>Video testimonials you can stand behind</Text></View>
      <H1 style={{ fontSize: 38, lineHeight: 44, marginTop: space.lg }}>
        Your happiest customer is <Text style={{ color: colors.primary }}>your best salesperson.</Text>
      </H1>
      <Body style={{ marginTop: space.lg }}>
        They already told their friends. ViewRec gets them saying it on camera — two minutes, from their own phone, with the words on screen.
      </Body>

      <View style={styles.phone}>
        <View style={styles.recRow}>
          <View style={styles.recDot} /><Text style={styles.recText}>REC  00:14</Text>
        </View>
        <View style={styles.prompter}>
          <Text style={styles.pLabel}>JUST READ THIS</Text>
          <Text style={styles.pDim}>They turned up when they said they would,</Text>
          <Text style={styles.pLive}>cleaned up after themselves,</Text>
          <Text style={styles.pDim}>and the roof has been perfect since.</Text>
        </View>
        <View style={styles.recBtnOuter}><View style={styles.recBtn} /></View>
      </View>

      <View style={{ marginTop: space.xl }}>
        {points.map((p) => (
          <View key={p} style={styles.point}>
            <Ionicons name="checkmark-circle" size={18} color={colors.green} />
            <Text style={styles.pointText}>{p}</Text>
          </View>
        ))}
      </View>

      <Button title="Get started for $1" icon="arrow-forward" style={{ marginTop: space.xl }} onPress={() => navigation.replace('Tabs')} />
      <Button title="Sign in" variant="ghost" style={{ marginTop: space.md }} onPress={() => navigation.replace('Tabs')} />
      <Body style={{ fontSize: 12, textAlign: 'center', marginTop: space.lg }}>
        $1 starts your first 15 days. After that it is $49. No card needed today.
      </Body>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space.xl },
  logo: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  brand: { color: colors.text, fontWeight: '800', fontSize: 20, marginLeft: 10 },
  pill: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill },
  pillText: { color: '#b8a6ff', fontSize: 12, fontWeight: '600' },
  phone: { marginTop: space.xl, height: 380, borderRadius: 36, borderWidth: 6, borderColor: '#1e1e30', backgroundColor: '#15121f', padding: space.lg, justifyContent: 'space-between' },
  recRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  recDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.rec, marginRight: 6 },
  recText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  prompter: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.md, padding: space.lg },
  pLabel: { color: colors.muted, fontSize: 10, letterSpacing: 1.2, fontWeight: '700', marginBottom: 8 },
  pDim: { color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 24 },
  pLive: { color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 24 },
  recBtnOuter: { alignSelf: 'center', width: 64, height: 64, borderRadius: 32, borderWidth: 4, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  recBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.rec },
  point: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pointText: { color: colors.text, marginLeft: 10, fontSize: 14 },
});
