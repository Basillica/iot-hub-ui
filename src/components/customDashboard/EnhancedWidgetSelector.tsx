import { useState } from 'react';
import { X, LineChart, Gauge, BarChart3, AreaChart, Table, Activity, Search, Filter, ChevronRight, Layers } from 'lucide-react';
import type { Widget } from '../CustomDashboards';
import type { Device, Sensor } from '../../types/device';
import { mockDevices, getSensorsByCategory } from '../../data/mockDevices';

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

export function EnhancedWidgetSelector({ organizationId, userRole, onSelect, onClose }: Props) {
  const [step, setStep] = useState<'type' | 'device' | 'sensor'>('type');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [sensorSearchTerm, setSensorSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter devices based on permissions and search
  const filteredDevices = mockDevices.filter(device => {
    if (!device.hasAccess) return false;
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
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
    setStep('sensor');
  };

  const handleSelectSensor = (sensor: Sensor) => {
    if (selectedDevice) {
      createWidget(selectedDevice, sensor);
    }
  };

  const createWidget = (device: Device, sensor: Sensor) => {
    const widget: Widget = {
      id: `widget-${Date.now()}`,
      type: selectedType as any,
      title: `${device.name} - ${sensor.name}`,
      deviceId: device.id,
      deviceName: device.name,
      sensorType: sensor.type,
      position: { x: 0, y: 0, w: 4, h: 2 },
      config: {
        refreshInterval: 5000,
        showLegend: true,
        timeRange: '24h',
        unit: sensor.unit,
      },
    };
    onSelect(widget);
  };

  // Get categorized sensors for selected device
  const sensorCategories = selectedDevice ? getSensorsByCategory(selectedDevice) : [];

  // Filter sensors based on search and category
  const getFilteredSensors = () => {
    if (!selectedDevice) return [];
    
    let sensors = selectedDevice.sensors;

    // Filter by category
    if (selectedCategory !== 'all') {
      sensors = sensors.filter(s => s.category === selectedCategory);
    }

    // Filter by search term
    if (sensorSearchTerm) {
      sensors = sensors.filter(s => 
        s.name.toLowerCase().includes(sensorSearchTerm.toLowerCase()) ||
        s.type.toLowerCase().includes(sensorSearchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(sensorSearchTerm.toLowerCase())
      );
    }

    return sensors;
  };

  const filteredSensors = getFilteredSensors();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h3 className="text-white text-xl">Add Widget</h3>
            <p className="text-slate-400 text-sm mt-1">
              {step === 'type' && 'Step 1: Select widget type'}
              {step === 'device' && 'Step 2: Select device'}
              {step === 'sensor' && `Step 3: Select sensor from ${selectedDevice?.name}`}
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
          <ChevronRight className="w-4 h-4 text-slate-600 mx-2" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'device' ? 'bg-blue-600 text-white' : 
              step === 'sensor' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              2
            </div>
            <span className="text-slate-300 text-sm">Device</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600 mx-2" />
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'sensor' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'
            }`}>
              3
            </div>
            <span className="text-slate-300 text-sm">Sensor</span>
          </div>
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
                    placeholder="Search devices by name, location, or manufacturer..."
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
                    className="flex items-center gap-4 p-5 bg-slate-900/50 border border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-700/50 transition-all text-left"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white mb-1">{device.name}</h4>
                          <p className="text-slate-400 text-sm">{device.location}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            device.status === 'online' ? 'bg-green-500' :
                            device.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className={`text-xs capitalize ${
                            device.status === 'online' ? 'text-green-400' :
                            device.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {device.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{device.manufacturer} {device.model}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {device.totalSensors} sensors ({device.activeSensors} active)
                        </span>
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
              {/* Device Info Card */}
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-slate-700 rounded-xl p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white text-lg mb-1">{selectedDevice.name}</h4>
                    <p className="text-slate-400 text-sm mb-3">{selectedDevice.location}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{selectedDevice.manufacturer} {selectedDevice.model}</span>
                      <span>•</span>
                      <span>Serial: {selectedDevice.serialNumber}</span>
                      <span>•</span>
                      <span>Firmware: {selectedDevice.firmwareVersion}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-blue-400">{selectedDevice.totalSensors}</div>
                    <div className="text-slate-400 text-sm">Total Sensors</div>
                    <div className="text-green-400 text-xs mt-1">{selectedDevice.activeSensors} active</div>
                  </div>
                </div>
              </div>

              {/* Sensor Filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search sensors by name, type, or ID..."
                    value={sensorSearchTerm}
                    onChange={(e) => setSensorSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Categories</option>
                  {sensorCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name} ({cat.count})</option>
                  ))}
                </select>
              </div>

              {/* Category Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {sensorCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id === selectedCategory ? 'all' : category.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-xs capitalize mb-1">{category.name}</div>
                    <div className="text-lg">{category.count}</div>
                  </button>
                ))}
              </div>

              {/* Sensors Grid */}
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredSensors.map((sensor) => (
                    <button
                      key={sensor.id}
                      onClick={() => handleSelectSensor(sensor)}
                      className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500 hover:bg-slate-700/50 transition-all text-left"
                    >
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        sensor.status === 'active' ? 'bg-green-500' :
                        sensor.status === 'inactive' ? 'bg-slate-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-white text-sm truncate">{sensor.name}</h5>
                          <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded text-xs ml-2">
                            {sensor.unit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="truncate">{sensor.id}</span>
                          <span>•</span>
                          <span className="capitalize">{sensor.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {filteredSensors.length === 0 && (
                  <div className="text-center py-12">
                    <Filter className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No sensors found</p>
                    <p className="text-slate-500 text-sm mt-2">Try adjusting your search or category filter</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-slate-400 px-2">
                <span>Showing {filteredSensors.length} of {selectedDevice.sensors.length} sensors</span>
                <button
                  onClick={() => {
                    setStep('device');
                    setSelectedDevice(null);
                    setSensorSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Back to Devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
