import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BluetoothService from '../services/BluetoothService';

interface BluetoothDevice {
  id: string;
  name: string;
  isConnected?: boolean;
}

interface BluetoothListScreenProps {
  navigation: any;
}

export default function BluetoothListScreen({ navigation }: BluetoothListScreenProps) {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  // Escanear dispositivos Bluetooth
  useEffect(() => {
    scanDevices();
  }, []);

  const scanDevices = async () => {
    setScanning(true);
    try {
      const foundDevices = await BluetoothService.scanDevices();
      // Remover duplicados pelo id
      const uniqueDevices = foundDevices.filter((device, index, self) =>
        index === self.findIndex((d) => d.id === device.id)
      );
      setDevices(uniqueDevices);
    } catch (error) {
      console.error('Erro ao escanear dispositivos:', error);
      // Remover fallback para dispositivos mockados
      setDevices([]);
    } finally {
      setScanning(false);
    }
  };

  // Adicionar botão para reescanear
  const handleRescan = () => {
    scanDevices();
  };

  const handleConnect = async (device: BluetoothDevice) => {
    Alert.alert(
      'Conectar',
      `Deseja conectar ao dispositivo ${device.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Conectar',
          onPress: async () => {
            try {
              const success = await BluetoothService.connectToDevice(device.id);
              if (success) {
                navigation.navigate('ControlScreen', { deviceName: device.name });
              } else {
                Alert.alert('Erro', 'Falha ao conectar ao dispositivo');
              }
            } catch (error) {
              console.error('Erro na conexão:', error);
              Alert.alert('Erro', 'Erro ao conectar ao dispositivo');
            }
          },
        },
      ]
    );
  };

  const renderDevice = ({ item }: { item: BluetoothDevice }) => (
    <View style={styles.deviceItem}>
      <View style={styles.deviceInfo}>
        <Ionicons name="bluetooth" size={24} color="#0066CC" />
        <Text style={styles.deviceName}>{item.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => handleConnect(item)}
      >
        <Text style={styles.connectButtonText}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dispositivos Bluetooth</Text>
        <TouchableOpacity
          style={styles.rescanButton}
          onPress={handleRescan}
        >
          <Ionicons name="refresh" size={24} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {scanning && (
        <View style={styles.scanningContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.scanningText}>Procurando dispositivos...</Text>
        </View>
      )}

      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id}
        style={styles.deviceList}
        showsVerticalScrollIndicator={false}
      />
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#001122',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  rescanButton: {
    marginLeft: 15,
  },
  scanningContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scanningText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  deviceList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#001122',
    padding: 20,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#003366',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
    fontWeight: '500',
  },
  connectButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 