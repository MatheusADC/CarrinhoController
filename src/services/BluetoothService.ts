import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

class BluetoothService {
  private bleManager: BleManager;
  private connectedDevice: any = null;

  constructor() {
    this.bleManager = new BleManager();
  }

  // Scan para BLE
  async scanDevices(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const devices: any[] = [];
      this.bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          this.bleManager.stopDeviceScan();
          reject(error);
          return;
        }
        if (device && device.name && !devices.find(d => d.id === device.id)) {
          devices.push({
            id: device.id,
            name: device.name,
            rssi: device.rssi,
          });
        }
      });
      setTimeout(() => {
        this.bleManager.stopDeviceScan();
        resolve(devices);
      }, 5000);
    });
  }

  // Conectar ao Arduino R4
  async connectToDevice(deviceId: string): Promise<boolean> {
    try {
      const device = await this.bleManager.devices([deviceId]);
      if (device.length > 0) {
        const connectedDevice = await device[0].connect();
        await connectedDevice.discoverAllServicesAndCharacteristics();
        this.connectedDevice = connectedDevice;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro na conexão:', error);
      return false;
    }
  }

  async sendCommand(command: string): Promise<boolean> {
    if (!this.connectedDevice) {
      console.error('Nenhum dispositivo conectado');
      return false;
    }
  
    try {
      const serviceUUID = '00001101-0000-1000-8000-00805f9b34fb';
      const characteristicUUID = '00002101-0000-1000-8000-00805f9b34fb';
  
      const services = await this.connectedDevice.services();
      const targetService = services.find((s: any) => s.uuid.toLowerCase() === serviceUUID);
  
      if (targetService) {
        const characteristics = await targetService.characteristics();
        const targetCharacteristic = characteristics.find((c: any) => c.uuid.toLowerCase() === characteristicUUID);
  
        if (targetCharacteristic && targetCharacteristic.isWritableWithResponse) {
          const base64Command = Buffer.from(command).toString('base64');
          await targetCharacteristic.writeWithResponse(base64Command);
          console.log(`Comando enviado: ${command} (${base64Command})`);
          return true;
        }
      }
  
      return false;
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
      return false;
    }
  }
  

  // Desconectar
  async disconnect(): Promise<void> {
    if (this.connectedDevice) {
      try {
        await this.connectedDevice.cancelConnection();
        this.connectedDevice = null;
        console.log('Dispositivo desconectado');
      } catch (error) {
        console.error('Erro ao desconectar:', error);
      }
    }
  }

  // Verificar se está conectado
  isConnected(): boolean {
    return this.connectedDevice !== null;
  }

  // Obter dispositivo conectado
  getConnectedDevice(): any {
    return this.connectedDevice;
  }

  // Limpar recursos
  destroy(): void {
    if (this.bleManager) {
      this.bleManager.destroy();
    }
  }
}

export default new BluetoothService(); 