import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BluetoothService from '../services/BluetoothService';

interface ControlScreenProps {
  navigation: any;
  route: any;
}

export default function ControlScreen({ navigation, route }: ControlScreenProps) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { deviceName } = route.params;

  // Função para enviar comando
  const sendCommand = async (command: string) => {
    try {
      const success = await BluetoothService.sendCommand(command);
      if (success) {
        console.log(`Comando enviado com sucesso: ${command}`);
      } else {
        console.error('Falha ao enviar comando');
      }
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

  const handleDisconnect = () => {
    Alert.alert(
      'Desconectar',
      'Deseja desconectar do dispositivo?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Desconectar',
          onPress: async () => {
            try {
              await BluetoothService.disconnect();
              navigation.navigate('Home');
            } catch (error) {
              console.error('Erro ao desconectar:', error);
              navigation.navigate('Home');
            }
          },
        },
      ]
    );
  };

  // Função para parar o carrinho
  const handleStop = () => {
    sendCommand('S');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{deviceName}</Text>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={handleDisconnect}
        >
          <Ionicons name="bluetooth" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>

      <View style={[styles.controlContainer, isLandscape ? styles.landscape : null]}>
        {/* Controles verticais */}
        <View style={styles.arrowGroup}>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => sendCommand('F')} onPressOut={handleStop}>
            <Ionicons name="arrow-up" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => sendCommand('B')} onPressOut={handleStop}>
            <Ionicons name="arrow-down" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        {/* Controles horizontais */}
        <View style={styles.arrowGroup}>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => sendCommand('L')} onPressOut={handleStop}>
            <Ionicons name="arrow-back" size={40} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrowButton} onPressIn={() => sendCommand('R')} onPressOut={handleStop}>
            <Ionicons name="arrow-forward" size={40} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <Ionicons name="bluetooth" size={20} color="#00FF00" />
          <Text style={styles.statusText}>Conectado</Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="battery-charging" size={20} color="#00FF00" />
          <Text style={styles.statusText}>100%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#001122',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  disconnectButton: {
    padding: 5,
  },
  controlContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  arrowGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  arrowButton: {
    backgroundColor: '#003366',
    borderRadius: 50,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#001122',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
}); 