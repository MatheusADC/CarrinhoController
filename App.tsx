import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PermissionsAndroid, Platform } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import BluetoothListScreen from './src/screens/BluetoothListScreen';
import ControlScreen from './src/screens/ControlScreen';

const Stack = createStackNavigator();

async function requestPermissions() {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    } catch (e) {
      console.warn('Permissões não concedidas:', e);
    }
  }
}

export default function App() {
  React.useEffect(() => {
    requestPermissions();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BluetoothList" component={BluetoothListScreen} />
        <Stack.Screen name="ControlScreen" component={ControlScreen} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
