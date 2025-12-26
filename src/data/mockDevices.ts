import type { Device, Sensor } from '../types/device';

// Helper function to generate sensors for a device
const generateSensors = (prefix: string, configs: Array<{ type: string; unit: string; category: any; count: number }>) => {
  const sensors: Sensor[] = [];
  let sensorIndex = 1;

  configs.forEach(config => {
    for (let i = 0; i < config.count; i++) {
      sensors.push({
        id: `${prefix}-${config.type.toUpperCase()}-${sensorIndex.toString().padStart(3, '0')}`,
        name: `${config.type} Sensor ${sensorIndex}`,
        type: config.type,
        unit: config.unit,
        category: config.category,
        currentValue: Math.random() * 100,
        status: Math.random() > 0.1 ? 'active' : (Math.random() > 0.5 ? 'inactive' : 'error'),
        lastReading: new Date(Date.now() - Math.random() * 60000).toISOString(),
      });
      sensorIndex++;
    }
  });

  return sensors;
};

export const mockDevices: Device[] = [
  // Industrial HVAC System
  {
    id: 'HVAC-001',
    name: 'Central HVAC System - Building A',
    type: 'HVAC System',
    location: 'Building A - Roof',
    status: 'online',
    manufacturer: 'Carrier',
    model: 'AquaEdge 19DV',
    serialNumber: 'CAR-19DV-2024-001',
    firmwareVersion: 'v3.2.1',
    sensors: generateSensors('HVAC-001', [
      { type: 'temperature', unit: '°C', category: 'environmental', count: 24 },
      { type: 'humidity', unit: '%', category: 'environmental', count: 12 },
      { type: 'pressure', unit: 'kPa', category: 'mechanical', count: 18 },
      { type: 'airflow', unit: 'm³/h', category: 'mechanical', count: 16 },
      { type: 'co2_level', unit: 'ppm', category: 'environmental', count: 8 },
      { type: 'vibration', unit: 'mm/s', category: 'diagnostic', count: 6 },
      { type: 'power_consumption', unit: 'kW', category: 'electrical', count: 4 },
      { type: 'fan_speed', unit: 'RPM', category: 'mechanical', count: 12 },
    ]),
    totalSensors: 100,
    activeSensors: 94,
    hasAccess: true,
  },

  // CNC Machining Center
  {
    id: 'CNC-042',
    name: 'CNC Machining Center 042',
    type: 'CNC Machine',
    location: 'Building B - Production Floor 2',
    status: 'online',
    manufacturer: 'Haas Automation',
    model: 'VF-4SS',
    serialNumber: 'HAS-VF4-2023-042',
    firmwareVersion: 'v5.1.8',
    sensors: generateSensors('CNC-042', [
      { type: 'temperature', unit: '°C', category: 'environmental', count: 15 },
      { type: 'vibration', unit: 'mm/s', category: 'diagnostic', count: 12 },
      { type: 'spindle_speed', unit: 'RPM', category: 'production', count: 3 },
      { type: 'torque', unit: 'Nm', category: 'mechanical', count: 8 },
      { type: 'position_x', unit: 'mm', category: 'production', count: 1 },
      { type: 'position_y', unit: 'mm', category: 'production', count: 1 },
      { type: 'position_z', unit: 'mm', category: 'production', count: 1 },
      { type: 'coolant_temp', unit: '°C', category: 'environmental', count: 4 },
      { type: 'coolant_flow', unit: 'L/min', category: 'mechanical', count: 4 },
      { type: 'tool_wear', unit: 'μm', category: 'diagnostic', count: 8 },
      { type: 'power_consumption', unit: 'kW', category: 'electrical', count: 6 },
      { type: 'acoustic_emission', unit: 'dB', category: 'diagnostic', count: 4 },
    ]),
    totalSensors: 67,
    activeSensors: 65,
    hasAccess: true,
  },

  // Industrial Boiler
  {
    id: 'BOIL-003',
    name: 'Industrial Steam Boiler 003',
    type: 'Boiler System',
    location: 'Building C - Utilities',
    status: 'online',
    manufacturer: 'Cleaver-Brooks',
    model: 'CBLE-700',
    serialNumber: 'CB-700-2022-003',
    firmwareVersion: 'v2.9.4',
    sensors: generateSensors('BOIL-003', [
      { type: 'temperature', unit: '°C', category: 'environmental', count: 32 },
      { type: 'pressure', unit: 'bar', category: 'mechanical', count: 28 },
      { type: 'water_level', unit: 'mm', category: 'safety', count: 8 },
      { type: 'steam_flow', unit: 'kg/h', category: 'production', count: 12 },
      { type: 'oxygen_level', unit: '%', category: 'safety', count: 6 },
      { type: 'flame_intensity', unit: 'lux', category: 'safety', count: 4 },
      { type: 'gas_flow', unit: 'm³/h', category: 'mechanical', count: 8 },
      { type: 'efficiency', unit: '%', category: 'diagnostic', count: 4 },
      { type: 'emissions_co', unit: 'ppm', category: 'environmental', count: 4 },
      { type: 'emissions_nox', unit: 'ppm', category: 'environmental', count: 4 },
    ]),
    totalSensors: 110,
    activeSensors: 108,
    hasAccess: true,
  },

  // Automated Assembly Line
  {
    id: 'ASM-LINE-05',
    name: 'Automated Assembly Line 05',
    type: 'Assembly System',
    location: 'Building B - Production Floor 3',
    status: 'online',
    manufacturer: 'ABB Robotics',
    model: 'FlexLine Pro',
    serialNumber: 'ABB-FLP-2023-005',
    firmwareVersion: 'v4.3.2',
    sensors: generateSensors('ASM-005', [
      { type: 'position_sensor', unit: 'mm', category: 'production', count: 48 },
      { type: 'proximity_sensor', unit: 'binary', category: 'safety', count: 64 },
      { type: 'force_sensor', unit: 'N', category: 'mechanical', count: 24 },
      { type: 'vision_sensor', unit: 'px', category: 'production', count: 12 },
      { type: 'barcode_scanner', unit: 'scan', category: 'production', count: 8 },
      { type: 'weight_sensor', unit: 'kg', category: 'production', count: 16 },
      { type: 'conveyor_speed', unit: 'm/min', category: 'mechanical', count: 12 },
      { type: 'motor_current', unit: 'A', category: 'electrical', count: 20 },
      { type: 'motor_temp', unit: '°C', category: 'environmental', count: 20 },
      { type: 'cycle_time', unit: 's', category: 'production', count: 8 },
    ]),
    totalSensors: 232,
    activeSensors: 228,
    hasAccess: true,
  },

  // Water Treatment Plant
  {
    id: 'WTR-001',
    name: 'Water Treatment Plant - Primary',
    type: 'Water Treatment',
    location: 'Building D - Facility',
    status: 'online',
    manufacturer: 'Siemens',
    model: 'SIWA M200',
    serialNumber: 'SIE-M200-2021-001',
    firmwareVersion: 'v6.1.0',
    sensors: generateSensors('WTR-001', [
      { type: 'ph_level', unit: 'pH', category: 'environmental', count: 16 },
      { type: 'turbidity', unit: 'NTU', category: 'environmental', count: 12 },
      { type: 'conductivity', unit: 'μS/cm', category: 'environmental', count: 12 },
      { type: 'dissolved_oxygen', unit: 'mg/L', category: 'environmental', count: 10 },
      { type: 'chlorine_level', unit: 'mg/L', category: 'safety', count: 14 },
      { type: 'flow_rate', unit: 'L/s', category: 'mechanical', count: 24 },
      { type: 'pressure', unit: 'bar', category: 'mechanical', count: 20 },
      { type: 'temperature', unit: '°C', category: 'environmental', count: 18 },
      { type: 'uv_intensity', unit: 'mW/cm²', category: 'safety', count: 8 },
      { type: 'tank_level', unit: 'm', category: 'mechanical', count: 12 },
    ]),
    totalSensors: 146,
    activeSensors: 143,
    hasAccess: true,
  },

  // Electrical Substation
  {
    id: 'SUB-STAT-02',
    name: 'Electrical Substation 02',
    type: 'Power Distribution',
    location: 'Building E - Substation',
    status: 'online',
    manufacturer: 'Schneider Electric',
    model: 'EcoStruxure Grid',
    serialNumber: 'SCH-ESG-2022-002',
    firmwareVersion: 'v3.7.1',
    sensors: generateSensors('SUB-002', [
      { type: 'voltage', unit: 'V', category: 'electrical', count: 36 },
      { type: 'current', unit: 'A', category: 'electrical', count: 36 },
      { type: 'power_factor', unit: '', category: 'electrical', count: 12 },
      { type: 'frequency', unit: 'Hz', category: 'electrical', count: 12 },
      { type: 'active_power', unit: 'kW', category: 'electrical', count: 18 },
      { type: 'reactive_power', unit: 'kVAR', category: 'electrical', count: 18 },
      { type: 'temperature', unit: '°C', category: 'environmental', count: 24 },
      { type: 'oil_temp', unit: '°C', category: 'diagnostic', count: 8 },
      { type: 'partial_discharge', unit: 'pC', category: 'diagnostic', count: 12 },
      { type: 'harmonics_thd', unit: '%', category: 'electrical', count: 12 },
    ]),
    totalSensors: 188,
    activeSensors: 185,
    hasAccess: true,
  },

  // Restricted Device (No Access)
  {
    id: 'SEC-SYS-01',
    name: 'Security System - Restricted Area',
    type: 'Security System',
    location: 'Building F - Restricted',
    status: 'online',
    manufacturer: 'Honeywell',
    model: 'Pro-Watch',
    serialNumber: 'HON-PW-2023-001',
    firmwareVersion: 'v5.2.3',
    sensors: generateSensors('SEC-001', [
      { type: 'motion_sensor', unit: 'binary', category: 'safety', count: 48 },
      { type: 'door_sensor', unit: 'binary', category: 'safety', count: 32 },
      { type: 'glass_break', unit: 'binary', category: 'safety', count: 24 },
    ]),
    totalSensors: 104,
    activeSensors: 102,
    hasAccess: false, // No permission
  },
];

// Helper to get sensors by category for a device
export const getSensorsByCategory = (device: Device) => {
  const categories = new Map<string, Sensor[]>();
  
  device.sensors.forEach(sensor => {
    if (!categories.has(sensor.category)) {
      categories.set(sensor.category, []);
    }
    categories.get(sensor.category)?.push(sensor);
  });

  return Array.from(categories.entries()).map(([category, sensors]) => ({
    id: category,
    name: category.charAt(0).toUpperCase() + category.slice(1),
    sensors,
    count: sensors.length,
  }));
};
