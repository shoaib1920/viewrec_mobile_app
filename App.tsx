import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import Welcome from './src/screens/Welcome';
import Home from './src/screens/Home';
import Customers from './src/screens/Customers';
import Videos from './src/screens/Videos';
import More from './src/screens/More';
import VideoDetail from './src/screens/VideoDetail';
import Record from './src/screens/Record';
import Import from './src/screens/Import';
import Pricing from './src/screens/Pricing';
import Notifications from './src/screens/Notifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.bg, card: colors.surface, border: colors.border, primary: colors.primary } };

function RecordButton({ onPress }: { onPress?: (e: any) => void }) {
  return (
    <Pressable onPress={onPress} style={styles.fabWrap}>
      <View style={styles.fab}><Ionicons name="videocam" size={26} color="#fff" /></View>
    </Pressable>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 64, paddingTop: 6 },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 6 },
        tabBarIcon: ({ color, focused }) => {
          const icons: Record<string, [any, any]> = {
            Home: ['home', 'home-outline'], Customers: ['people', 'people-outline'], Videos: ['play-circle', 'play-circle-outline'], More: ['menu', 'menu-outline'],
          };
          const [a, b] = icons[route.name] ?? ['ellipse', 'ellipse-outline'];
          return <Ionicons name={focused ? a : b} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Customers" component={Customers} />
      <Tab.Screen name="RecordTab" component={Home}
        options={({ navigation }) => ({ tabBarButton: () => <RecordButton onPress={() => navigation.getParent()?.navigate('Record')} /> })} />
      <Tab.Screen name="Videos" component={Videos} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="VideoDetail" component={VideoDetail} />
          <Stack.Screen name="Import" component={Import} />
          <Stack.Screen name="Pricing" component={Pricing} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Record" component={Record} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  fabWrap: { top: -18 },
  fab: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.rec, alignItems: 'center', justifyContent: 'center' },
});
