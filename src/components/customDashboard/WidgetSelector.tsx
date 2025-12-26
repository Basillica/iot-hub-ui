import { useState } from 'react';
import { X, LineChart, Gauge, BarChart3, AreaChart, Table, Activity, Search, Filter } from 'lucide-react';
import type { Widget } from '../CustomDashboards';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  sensors: string[];
  hasAccess: boolean; // Permission-based
}

// Mock devices with permission filtering
const mockDevices: Device[] = [
  { id: 'TMP-001', name: 'Temperature Sensor 001', type: 'Temperature', location: 'Building A - Floor 2', sensors: ['temperature'], hasAccess: true },
  { id: 'HUM-015', name: 'Humidity Sensor 015', type: 'Humidity', location: 'Building A - Floor 3', sensors: ['humidity'], hasAccess: true },
  { id: 'PRS-023', name: 'Pressure Sensor 023', type: 'Pressure', location: 'Building B - Floor 1', sensors: ['pressure'], hasAccess: true },
  { id: 'FLW-042', name: 'Flow Meter 042', type: 'Flow', location: 'Building C - Basement', sensors: ['flow_rate'], hasAccess: false }, // No access
  { id: 'TMP-122', name: 'Temperature Sensor 122', type: 'Temperature', location: 'Building D - Floor 4', sensors: ['temperature'], hasAccess: true },
  { id: 'HVAC-001', name: 'HVAC System 001', type: 'Multi-Sensor', location: 'Building A - Roof', sensors: ['temperature', 'humidity', 'pressure', 'airflow'], hasAccess: true },
];

const widgetTypes = [
  { id: 'line-chart', name: 'Line Chart', icon: LineChart, description: 'Time-series data visualization' },
  { id: 'gauge', name: 'Gauge', icon: Gauge, description: 'Circular gauge for current values' },
  { id: 'value-card', name: 'Value Card', icon: Activity, description: 'Display current value with trend' },
  { id: 'bar-chart', name: 'Bar Chart', icon: BarChart3, description: 'Compare values over time' },
  { id: 'area-chart', name: 'Area Chart', icon: AreaChart, description: 'Filled area time-series chart' },
  { id: 'table', name: 'Data Table', icon: Table, description: 'Tabular data display' },
];

interface Props {
  organizationId: string;
  userRole: 'admin' | 'operator' | 'developer' | 'viewer';
  onSelect: (widget: Widget) => void;
  onClose: () => void;
}

export function WidgetSelector({ organizationId, userRole, onSelect, onClose }: Props) {
  const [step, setStep] = useState<'type' | 'device' | 'sensor'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Filter devices based on permissions and search
  const filteredDevices = mockDevices.filter(device => {
    if (!device.hasAccess) return false; // Permission check
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || device.type === filterType;
    return matchesSearch && matchesType;
  });

  const deviceTypes = Array.from(new Set(mockDevices.filter(d => d.hasAccess).map(d => d.type)));

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId);
    setStep('device');
  };

  const handleSelectDevice = (device: Device) => {
    setSelectedDevice(device);
    if (device.sensors.length === 1) {
      // If only one sensor, create widget immediately
      createWidget(device, device.sensors[0]);
    } else {
      // If multiple sensors, go to sensor selection
      setStep('sensor');
    }
  };

  const handleSelectSensor = (sensorType: string) => {
    if (selectedDevice) {
      createWidget(selectedDevice, sensorType);
    }
  };

  const createWidget = (device: Device, sensorType: string) => {
    const widget: Widget = {
      id: `widget-${Date.now()}`,
      type: selectedType as any,
      title: `${device.name} - ${sensorType}`,
      deviceId: device.id,
      deviceName: device.name,
      sensorType: sensorType,
      position: { x: 0, y: 0, w: 4, h: 2 },
      config: {
        refreshInterval: 5000,
        showLegend: true,
        timeRange: '24h',
        unit: getSensorUnit(sensorType),
      },
    };
    onSelect(widget);
  };

  const getSensorUnit = (sensorType: string): string => {
    const units: Record<string, string> = {
      temperature: '°C',
      humidity: '%',
      pressure: 'kPa',
      flow_rate: 'L/min',
      airflow: 'm³/h',
    };
    return units[sensorType] || '';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-white text-xl">Add Widget</h3>
            <p className="text-slate-400 text-sm mt-1">
              {step === 'type' && 'Step 1: Select widget type'}
              {step === 'device' && 'Step 2: Select device'}
              {step === 'sensor' && 'Step 3: Select sensor'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center px-6 py-4 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'type' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              1
            </div>
            <span className="text-slate-300 text-sm">Type</span>
          </div>
          <div className="w-12 h-px bg-slate-700 mx-2"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'device' ? 'bg-blue-600 text-white' : 
              step === 'sensor' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              2
            </div>
            <span className="text-slate-300 text-sm">Device</span>
          </div>
          {selectedDevice && selectedDevice.sensors.length > 1 && (
            <>
              <div className="w-12 h-px bg-slate-700 mx-2"></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step === 'sensor' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  3
                </div>
                <span className="text-slate-300 text-sm">Sensor</span>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Widget Type Selection */}
          {step === 'type' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {widgetTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleSelectType(type.id)}
                    className="flex flex-col items-start gap-3 p-5 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-700/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{type.name}</h4>
                      <p className="text-slate-400 text-sm">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Step 2: Device Selection */}
          {step === 'device' && (
            <div className="space-y-4">
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search devices..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  {deviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Devices List */}
              <div className="grid grid-cols-1 gap-3">
                {filteredDevices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => handleSelectDevice(device)}
                    className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-700/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white">{device.name}</h4>
                      <p className="text-slate-400 text-sm">{device.location}</p>
                      <div className="flex gap-2 mt-2">
                        {device.sensors.map(sensor => (
                          <span key={sensor} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                            {sensor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                      {device.type}
                    </div>
                  </button>
                ))}
              </div>

              {filteredDevices.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No devices found matching your criteria</p>
                  <p className="text-slate-500 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              )}

              <button
                onClick={() => setStep('type')}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Back to Widget Types
              </button>
            </div>
          )}

          {/* Step 3: Sensor Selection */}
          {step === 'sensor' && selectedDevice && (
            <div className="space-y-4">
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                <p className="text-slate-400 text-sm mb-2">Selected Device:</p>
                <h4 className="text-white">{selectedDevice.name}</h4>
                <p className="text-slate-400 text-sm">{selectedDevice.location}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDevice.sensors.map((sensor) => (
                  <button
                    key={sensor}
                    onClick={() => handleSelectSensor(sensor)}
                    className="flex flex-col items-start gap-2 p-4 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-700/50 transition-all"
                  >
                    <h4 className="text-white capitalize">{sensor.replace('_', ' ')}</h4>
                    <p className="text-slate-400 text-sm">Unit: {getSensorUnit(sensor)}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setStep('device');
                  setSelectedDevice(null);
                }}
                className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Back to Devices
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
