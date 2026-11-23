import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, space } from '../theme';

export function Screen({ children, scroll = true, pad = true }: { children: React.ReactNode; scroll?: boolean; pad?: boolean }) {
  const insets = useSafeAreaInsets();
  const style = { paddingTop: insets.top + space.md, paddingHorizontal: pad ? space.lg : 0, paddingBottom: space.xxl };
  if (!scroll) return <View style={[styles.screen, style]}>{children}</View>;
  return (
    <ScrollView style={styles.screen} contentContainerStyle={style} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

export function H1({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.h1, style]}>{children}</Text>;
}
export function H2({ children, style }: { children: React.ReactNode; style?: TextStyle }) {
  return <Text style={[styles.h2, style]}>{children}</Text>;
}
export function Body({ children, style, muted = true }: { children: React.ReactNode; style?: TextStyle; muted?: boolean }) {
  return <Text style={[styles.body, muted && { color: colors.muted }, style]}>{children}</Text>;
}

export function Button({ title, onPress, variant = 'primary', icon, style, small }: {
  title: string; onPress?: () => void; variant?: 'primary' | 'ghost' | 'danger'; icon?: any; style?: ViewStyle; small?: boolean;
}) {
  const content = (
    <View style={[styles.btnInner, small && { paddingVertical: 10 }]}>
      {icon && <Ionicons name={icon} size={18} color="#fff" style={{ marginRight: 8 }} />}
      <Text style={styles.btnText}>{title}</Text>
    </View>
  );
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }, style]}>
      {variant === 'primary' ? (
        <LinearGradient colors={['#8b6dff', '#6a4cf0']} style={styles.btn}>{content}</LinearGradient>
      ) : (
        <View style={[styles.btn, variant === 'ghost' ? styles.btnGhost : { backgroundColor: colors.rec }]}>{content}</View>
      )}
    </Pressable>
  );
}

export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const C: any = onPress ? Pressable : View;
  return <C onPress={onPress} style={[styles.card, style]}>{children}</C>;
}

export function Chip({ label, active, onPress, color }: { label: string; active?: boolean; onPress?: () => void; color?: string }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
      <Text style={[styles.chipText, active && { color: '#fff' }, color ? { color } : null]}>{label}</Text>
    </Pressable>
  );
}

const badgeColors: Record<string, string> = {
  suggested: colors.amber, approved: colors.primary, invited: '#5ab0ff', recorded: colors.green, skipped: colors.muted,
  pending: colors.amber, published: colors.green,
};
export function Badge({ status }: { status: string }) {
  const c = badgeColors[status] ?? colors.muted;
  return (
    <View style={[styles.badge, { backgroundColor: c + '26' }]}>
      <View style={[styles.dot, { backgroundColor: c }]} />
      <Text style={[styles.badgeText, { color: c }]}>{status}</Text>
    </View>
  );
}

export function Stat({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon: any }) {
  return (
    <Card style={{ flex: 1, minWidth: '45%' }}>
      <View style={styles.statIcon}><Ionicons name={icon} size={16} color={colors.primary} /></View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {delta && <Text style={styles.statDelta}>{delta}</Text>}
    </Card>
  );
}

export function Avatar({ name, size = 44, color = colors.primary }: { name: string; size?: number; color?: string }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color + '33', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.text, fontWeight: '700', fontSize: size * 0.36 }}>{initials}</Text>
    </View>
  );
}

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <H2>{title}</H2>
      {action && <Pressable onPress={onAction}><Text style={{ color: colors.primary, fontWeight: '600' }}>{action}</Text></Pressable>}
    </View>
  );
}

export function BackHeader({ title, onBack, right }: { title: string; onBack: () => void; right?: React.ReactNode }) {
  return (
    <View style={styles.backHeader}>
      <Pressable onPress={onBack} style={styles.iconBtn}><Ionicons name="chevron-back" size={20} color={colors.text} /></Pressable>
      <Text style={styles.backTitle}>{title}</Text>
      <View style={{ width: 40, alignItems: 'flex-end' }}>{right}</View>
    </View>
  );
}

export function Thumb({ hue, duration, height = 150, play = true }: { hue: string; duration?: string; height?: number; play?: boolean }) {
  return (
    <LinearGradient colors={[hue, '#0a0a12']} style={{ height, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {play && (
        <View style={styles.playBtn}><Ionicons name="play" size={22} color="#fff" style={{ marginLeft: 3 }} /></View>
      )}
      {duration && <View style={styles.dur}><Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>{duration}</Text></View>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  h1: { color: colors.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.8, lineHeight: 36 },
  h2: { color: colors.text, fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
  body: { color: colors.text, fontSize: 15, lineHeight: 22 },
  btn: { borderRadius: radius.pill, overflow: 'hidden' },
  btnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 15, paddingHorizontal: 22 },
  btnGhost: { backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.border },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: space.lg },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginRight: 8 },
  chipText: { color: colors.muted, fontWeight: '600', fontSize: 13 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 4, borderRadius: radius.pill, alignSelf: 'flex-start' },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  statIcon: { width: 30, height: 30, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statValue: { color: colors.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  statLabel: { color: colors.muted, fontSize: 13, marginTop: 2 },
  statDelta: { color: colors.green, fontSize: 12, fontWeight: '600', marginTop: 6 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: space.xl, marginBottom: space.md },
  backHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.lg },
  backTitle: { color: colors.text, fontWeight: '700', fontSize: 17 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  dur: { position: 'absolute', right: 10, bottom: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
});
