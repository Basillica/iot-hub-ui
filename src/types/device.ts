export interface Sensor {
  id: string;
  name: string;
  type: string;
  unit: string;
  category: 'environmental' | 'mechanical' | 'electrical' | 'production' | 'safety' | 'diagnostic';
  currentValue?: number;
  status: 'active' | 'inactive' | 'error';
  lastReading?: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  sensors: Sensor[];
  totalSensors: number;
  activeSensors: number;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  hasAccess: boolean; // Permission-based
}

export interface SensorCategory {
  id: string;
  name: string;
  sensors: Sensor[];
  count: number;
}
