import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen, BackHeader, H1, Body, Card, Button, H2 } from '../components/ui';
import { colors, space, radius } from '../theme';

export default function Import({ navigation }: any) {
  const [step, setStep] = useState(0);
  return (
    <Screen>
      <BackHeader title="Bring your past customers" onBack={() => navigation.goBack()} />
      <View style={styles.steps}>
        {[0, 1, 2].map((i) => <View key={i} style={[styles.seg, i <= step && { backgroundColor: colors.primary }]} />)}
      </View>

      {step === 0 && (
        <>
          <H1 style={{ fontSize: 26 }}>Export your completed jobs</H1>
          <Body style={{ marginTop: 8 }}>Upload a spreadsheet or CSV with names, phone or email, and the job done. We tell you honestly how many we can reach before anything is promised.</Body>
          <Card style={styles.drop}>
            <Ionicons name="cloud-upload-outline" size={34} color={colors.primary} />
            <Text style={styles.dropTitle}>Choose a file</Text>
            <Text style={styles.dropSub}>.csv or .xlsx · up to 10,000 rows</Text>
          </Card>
          <Button title="Use sample list" style={{ marginTop: space.xl }} onPress={() => setStep(1)} />
        </>
      )}

      {step === 1 && (
        <>
          <H1 style={{ fontSize: 26 }}>Here is what we found</H1>
          <Card style={{ marginTop: space.lg }}>
            <Row k="Rows in your file" v="212" />
            <Row k="Customers we can reach" v="143" />
            <Row k="Opted out or duplicates" v="69" />
            <View style={styles.est}>
              <Text style={{ color: '#b8a6ff', fontWeight: '700', fontSize: 12 }}>REALISTIC ESTIMATE</Text>
              <Text style={styles.estNum}>12 – 22 videos</Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>Past customers answer less often than recent ones. This is the honest range, not the flattering one.</Text>
            </View>
          </Card>
          <Button title="Continue" style={{ marginTop: space.xl }} onPress={() => setStep(2)} />
        </>
      )}

      {step === 2 && (
        <>
          <H1 style={{ fontSize: 26 }}>You approve every name</H1>
          <Body style={{ marginTop: 8 }}>We suggest who to ask first and why. You take off anyone the job went badly with.</Body>
          <Card style={{ marginTop: space.lg, gap: 10 }}>
            <Pt icon="time-outline" t="Invitations go out 8am–8pm where you are" />
            <Pt icon="repeat-outline" t="Never the same person twice in six months" />
            <Pt icon="hand-left-outline" t="An opt-out is final, for everyone" />
          </Card>
          <Button title="Review suggested customers" icon="people" style={{ marginTop: space.xl }} onPress={() => navigation.navigate('Tabs', { screen: 'Customers' })} />
        </>
      )}
    </Screen>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (
  <View style={styles.row}><Text style={{ color: colors.muted }}>{k}</Text><Text style={{ color: colors.text, fontWeight: '700' }}>{v}</Text></View>
);
const Pt = ({ icon, t }: { icon: any; t: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name={icon} size={20} color={colors.primary} /><Text style={{ color: colors.text, marginLeft: 10, flex: 1 }}>{t}</Text>
  </View>
);

const styles = StyleSheet.create({
  steps: { flexDirection: 'row', gap: 6, marginBottom: space.xl },
  seg: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.surface2 },
  drop: { alignItems: 'center', paddingVertical: 40, marginTop: space.xl, borderStyle: 'dashed', borderColor: colors.primary },
  dropTitle: { color: colors.text, fontWeight: '700', fontSize: 16, marginTop: 10 },
  dropSub: { color: colors.muted, fontSize: 13, marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  est: { backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: space.lg, marginTop: space.lg },
  estNum: { color: '#fff', fontSize: 28, fontWeight: '800', marginVertical: 4 },
});
