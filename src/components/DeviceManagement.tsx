import { useState } from 'react';
import { Search, Filter, Plus, Cpu, MapPin, Wifi, WifiOff, MoreVertical, Edit, Trash2, Power, Shield, Key, FileText, Upload, Download, RefreshCw, Settings, AlertTriangle, CheckCircle, Clock, Lock, Unlock, GitBranch, Activity, Terminal, Database, Zap, Cloud, ArrowLeft, ExternalLink, Copy, X, ChevronRight } from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'warning' | 'provisioning';
  lastSeen: string;
  dataRate: string;
  protocol: string;
  firmware: string;
  authMethod: 'certificate' | 'sas-token' | 'symmetric-key';
  certExpiry?: string;
  tokenExpiry?: string;
  lastAuth: string;
  securityStatus: 'secure' | 'warning' | 'expired';
  cloudPlatform?: string;
  ipAddress?: string;
  uptime?: string;
  memoryUsage?: string;
  cpuUsage?: string;
}

const mockDevices: Device[] = [
  { id: 'TMP-001', name: 'Temperature Sensor 001', type: 'Temperature', location: 'Building A - Floor 2', status: 'online', lastSeen: '2 min ago', dataRate: '1 msg/sec', protocol: 'MQTT', firmware: 'v2.1.3', authMethod: 'certificate', certExpiry: '2025-12-15', lastAuth: '2 min ago', securityStatus: 'secure', cloudPlatform: 'Azure IoT Hub', ipAddress: '192.168.1.42', uptime: '45 days', memoryUsage: '42%', cpuUsage: '23%' },
  { id: 'HUM-015', name: 'Humidity Sensor 015', type: 'Humidity', location: 'Building A - Floor 3', status: 'online', lastSeen: '1 min ago', dataRate: '2 msg/sec', protocol: 'MQTT', firmware: 'v2.0.1', authMethod: 'sas-token', tokenExpiry: '2025-03-20', lastAuth: '1 min ago', securityStatus: 'secure', cloudPlatform: 'AWS IoT Core', ipAddress: '192.168.1.43', uptime: '23 days', memoryUsage: '38%', cpuUsage: '18%' },
  { id: 'PRS-023', name: 'Pressure Sensor 023', type: 'Pressure', location: 'Building B - Floor 1', status: 'offline', lastSeen: '2 hours ago', dataRate: '0 msg/sec', protocol: 'CoAP', firmware: 'v1.8.2', authMethod: 'certificate', certExpiry: '2025-01-10', lastAuth: '2 hours ago', securityStatus: 'warning', cloudPlatform: 'Google Cloud IoT', ipAddress: '192.168.1.44', uptime: '12 days', memoryUsage: '55%', cpuUsage: '67%' },
  { id: 'FLW-042', name: 'Flow Meter 042', type: 'Flow', location: 'Building C - Basement', status: 'warning', lastSeen: '30 sec ago', dataRate: '0.5 msg/sec', protocol: 'MQTT', firmware: 'v2.1.0', authMethod: 'sas-token', tokenExpiry: '2024-12-30', lastAuth: '30 sec ago', securityStatus: 'expired', cloudPlatform: 'Azure IoT Hub', ipAddress: '192.168.1.45', uptime: '89 days', memoryUsage: '78%', cpuUsage: '45%' },
  { id: 'ACT-087', name: 'Actuator 087', type: 'Actuator', location: 'Building A - Floor 1', status: 'online', lastSeen: '5 sec ago', dataRate: '0.2 msg/sec', protocol: 'MQTT', firmware: 'v3.0.1', authMethod: 'symmetric-key', lastAuth: '5 sec ago', securityStatus: 'secure', cloudPlatform: 'AWS IoT Core', ipAddress: '192.168.1.46', uptime: '120 days', memoryUsage: '32%', cpuUsage: '15%' },
  { id: 'TMP-122', name: 'Temperature Sensor 122', type: 'Temperature', location: 'Building D - Floor 4', status: 'provisioning', lastSeen: 'Never', dataRate: '0 msg/sec', protocol: 'MQTT', firmware: 'v2.1.3', authMethod: 'certificate', certExpiry: '2026-06-30', lastAuth: 'Not authenticated', securityStatus: 'secure', ipAddress: '192.168.1.47', uptime: '0 days', memoryUsage: 'N/A', cpuUsage: 'N/A' },
  { id: 'HUM-145', name: 'Humidity Sensor 145', type: 'Humidity', location: 'Building B - Floor 2', status: 'online', lastSeen: '3 min ago', dataRate: '2 msg/sec', protocol: 'CoAP', firmware: 'v2.0.1', authMethod: 'certificate', certExpiry: '2025-08-20', lastAuth: '3 min ago', securityStatus: 'secure', cloudPlatform: 'Azure IoT Hub', ipAddress: '192.168.1.48', uptime: '67 days', memoryUsage: '41%', cpuUsage: '22%' },
  { id: 'TMP-089', name: 'Temperature Sensor 089', type: 'Temperature', location: 'Building C - Floor 1', status: 'warning', lastSeen: '8 min ago', dataRate: '0.8 msg/sec', protocol: 'MQTT', firmware: 'v2.0.5', authMethod: 'sas-token', tokenExpiry: '2025-05-15', lastAuth: '8 min ago', securityStatus: 'secure', cloudPlatform: 'AWS IoT Core', ipAddress: '192.168.1.49', uptime: '34 days', memoryUsage: '85%', cpuUsage: '72%' },
];

type ViewMode = 'list' | 'device-detail';
type DeviceDetailTab = 'overview' | 'security' | 'configuration' | 'diagnostics' | 'firmware' | 'logs';

export function DeviceManagement({ organizationId }: { organizationId: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceDetailTab, setDeviceDetailTab] = useState<DeviceDetailTab>('overview');
  const [showProvisioningWizard, setShowProvisioningWizard] = useState(false);

  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getAuthIcon = (method: string) => {
    switch (method) {
      case 'certificate': return Shield;
      case 'sas-token': return Key;
      case 'symmetric-key': return Lock;
      default: return Shield;
    }
  };

  const openDeviceDetail = (device: Device) => {
    setSelectedDevice(device);
    setViewMode('device-detail');
    setDeviceDetailTab('overview');
  };

  const closeDeviceDetail = () => {
    setSelectedDevice(null);
    setViewMode('list');
  };

  const renderDeviceList = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Devices', value: mockDevices.length, icon: Cpu, color: 'blue' },
          { label: 'Online', value: mockDevices.filter(d => d.status === 'online').length, icon: CheckCircle, color: 'green' },
          { label: 'Offline', value: mockDevices.filter(d => d.status === 'offline').length, icon: WifiOff, color: 'red' },
          { label: 'Provisioning', value: mockDevices.filter(d => d.status === 'provisioning').length, icon: Settings, color: 'purple' },
          { label: 'Security Issues', value: mockDevices.filter(d => d.securityStatus !== 'secure').length, icon: AlertTriangle, color: 'orange' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-sm">{stat.label}</p>
                <Icon className={`w-4 h-4 text-${stat.color}-400`} />
              </div>
              <p className={`text-3xl text-${stat.color}-400`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Devices Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Device</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Status</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Location</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Authentication</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Security</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Firmware</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Cloud Platform</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device) => {
                const AuthIcon = getAuthIcon(device.authMethod);
                return (
                  <tr key={device.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                          <Cpu className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <button 
                            onClick={() => openDeviceDetail(device)}
                            className="text-white text-sm hover:text-blue-400 transition-colors flex items-center gap-1"
                          >
                            {device.name}
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <p className="text-slate-400 text-xs">{device.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {device.status === 'online' && <Wifi className="w-4 h-4 text-green-500" />}
                        {device.status === 'offline' && <WifiOff className="w-4 h-4 text-red-500" />}
                        {device.status === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                        {device.status === 'provisioning' && <Settings className="w-4 h-4 text-purple-500 animate-spin" />}
                        <span className={`text-sm ${
                          device.status === 'online' ? 'text-green-400' :
                          device.status === 'offline' ? 'text-red-400' :
                          device.status === 'warning' ? 'text-orange-400' : 'text-purple-400'
                        }`}>
                          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 text-sm">{device.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <AuthIcon className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300 text-xs">
                          {device.authMethod === 'certificate' ? 'X.509 Cert' :
                           device.authMethod === 'sas-token' ? 'SAS Token' : 'Symmetric Key'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        device.securityStatus === 'secure' ? 'bg-green-500/20 text-green-400' :
                        device.securityStatus === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {device.securityStatus === 'secure' ? '✓ Secure' :
                         device.securityStatus === 'warning' ? '⚠ Warning' : '✗ Expired'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300 text-sm">{device.firmware}</span>
                    </td>
                    <td className="px-6 py-4">
                      {device.cloudPlatform ? (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded flex items-center gap-1 w-fit">
                          <Cloud className="w-3 h-3" />
                          {device.cloudPlatform}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs">Not configured</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => openDeviceDetail(device)}
                          className="p-1 hover:bg-slate-600 rounded transition-colors" 
                          title="View Details"
                        >
                          <ExternalLink className="w-4 h-4 text-blue-400" />
                        </button>
                        <button 
                          className="p-1 hover:bg-slate-600 rounded transition-colors" 
                          title="Reboot"
                        >
                          <RefreshCw className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          className="p-1 hover:bg-slate-600 rounded transition-colors" 
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          className="p-1 hover:bg-slate-600 rounded transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderDeviceDetail = () => {
    if (!selectedDevice) return null;

    const AuthIcon = getAuthIcon(selectedDevice.authMethod);

    return (
      <div className="space-y-6">
        {/* Back Button & Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={closeDeviceDetail}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex-1">
            <h3 className="text-white text-xl">{selectedDevice.name}</h3>
            <p className="text-slate-400 text-sm">{selectedDevice.id} • {selectedDevice.type}</p>
          </div>
          <div className="flex items-center gap-2">
            {selectedDevice.status === 'online' && (
              <>
                <Wifi className="w-5 h-5 text-green-500" />
                <span className="text-green-400">Online</span>
              </>
            )}
            {selectedDevice.status === 'offline' && (
              <>
                <WifiOff className="w-5 h-5 text-red-500" />
                <span className="text-red-400">Offline</span>
              </>
            )}
            {selectedDevice.status === 'warning' && (
              <>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-orange-400">Warning</span>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-800/50 p-2 rounded-lg border border-slate-700 overflow-x-auto">
          {[
            { id: 'overview' as DeviceDetailTab, label: 'Overview', icon: Activity },
            { id: 'security' as DeviceDetailTab, label: 'Security & Auth', icon: Shield },
            { id: 'configuration' as DeviceDetailTab, label: 'Configuration', icon: Settings },
            { id: 'diagnostics' as DeviceDetailTab, label: 'Diagnostics', icon: Terminal },
            { id: 'firmware' as DeviceDetailTab, label: 'Firmware', icon: GitBranch },
            { id: 'logs' as DeviceDetailTab, label: 'Logs', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setDeviceDetailTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  deviceDetailTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {deviceDetailTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Uptime', value: selectedDevice.uptime || 'N/A', icon: Clock },
                { label: 'Data Rate', value: selectedDevice.dataRate, icon: Activity },
                { label: 'Memory Usage', value: selectedDevice.memoryUsage || 'N/A', icon: Database },
                { label: 'CPU Usage', value: selectedDevice.cpuUsage || 'N/A', icon: Cpu },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <p className="text-white text-xl">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Device Information */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">Device Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Device ID', value: selectedDevice.id },
                  { label: 'Type', value: selectedDevice.type },
                  { label: 'Location', value: selectedDevice.location },
                  { label: 'IP Address', value: selectedDevice.ipAddress || 'N/A' },
                  { label: 'Protocol', value: selectedDevice.protocol },
                  { label: 'Firmware Version', value: selectedDevice.firmware },
                  { label: 'Last Seen', value: selectedDevice.lastSeen },
                  { label: 'Cloud Platform', value: selectedDevice.cloudPlatform || 'Not configured' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-white text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">Quick Actions</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reboot
                </button>
                <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Activity className="w-4 h-4" />
                  Ping
                </button>
                <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Remote Shell
                </button>
                <button className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Power className="w-4 h-4" />
                  Disable
                </button>
              </div>
            </div>
          </div>
        )}

        {deviceDetailTab === 'security' && (
          <div className="space-y-6">
            {/* Security Status */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Security Status
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Authentication Method</p>
                  <div className="flex items-center gap-2">
                    <AuthIcon className="w-5 h-5 text-blue-400" />
                    <p className="text-white">
                      {selectedDevice.authMethod === 'certificate' ? 'X.509 Certificate' :
                       selectedDevice.authMethod === 'sas-token' ? 'SAS Token' : 'Symmetric Key'}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Last Authentication</p>
                  <p className="text-white">{selectedDevice.lastAuth}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Security Status</p>
                  <span className={`px-3 py-1 rounded text-sm inline-block ${
                    selectedDevice.securityStatus === 'secure' ? 'bg-green-500/20 text-green-400' :
                    selectedDevice.securityStatus === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedDevice.securityStatus === 'secure' ? '✓ Secure' :
                     selectedDevice.securityStatus === 'warning' ? '⚠ Warning' : '✗ Expired'}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Management */}
            {selectedDevice.authMethod === 'certificate' && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  X.509 Certificate Management
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Certificate Thumbprint</p>
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-mono">3A:4F:9E:2B:1C:8D:7F:6A</p>
                        <button className="p-1 hover:bg-slate-600 rounded transition-colors">
                          <Copy className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Issuer</p>
                      <p className="text-white text-sm">DigiCert IoT CA</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Valid From</p>
                      <p className="text-white text-sm">2024-12-15</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Expires</p>
                      <p className={`text-sm ${
                        selectedDevice.securityStatus === 'secure' ? 'text-green-400' :
                        selectedDevice.securityStatus === 'warning' ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {selectedDevice.certExpiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                      Renew Certificate
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Download Certificate
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Upload New Certificate
                    </button>
                    <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors text-sm">
                      Revoke Certificate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SAS Token Management */}
            {selectedDevice.authMethod === 'sas-token' && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-white mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-purple-400" />
                  SAS Token Management
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-2">Shared Access Signature</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="SharedAccessSignature sr=iothub.azure-devices.net%2Fdevices%2FTMP-001..."
                        readOnly
                        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono"
                      />
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Token Expiry</p>
                      <p className={`text-sm ${
                        selectedDevice.securityStatus === 'secure' ? 'text-green-400' :
                        selectedDevice.securityStatus === 'warning' ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {selectedDevice.tokenExpiry}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Policy</p>
                      <p className="text-white text-sm">device-connect</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                      Regenerate Token
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Symmetric Key */}
            {selectedDevice.authMethod === 'symmetric-key' && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h4 className="text-white mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-cyan-400" />
                  Symmetric Key Authentication
                </h4>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-4">
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-2">Primary Key</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="B7j9KpL3mN8qRsT2uVwX4yZ6aC1dEf5gH..."
                        readOnly
                        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono"
                      />
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-2">Secondary Key</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="K8mN2pQ4rS6tU9vW1xY3zA5bC7dE0fG..."
                        readOnly
                        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm font-mono"
                      />
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm">
                      Regenerate Primary Key
                    </button>
                    <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                      Regenerate Secondary Key
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Audit Log for this device */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">Security Audit Log</h4>
              <div className="space-y-2">
                {[
                  { event: 'Certificate renewed', time: '2 days ago', type: 'success' },
                  { event: 'Successful authentication', time: '2 min ago', type: 'success' },
                  { event: 'Configuration updated', time: '5 days ago', type: 'info' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'success' ? 'bg-green-500' :
                        log.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}></div>
                      <p className="text-white text-sm">{log.event}</p>
                    </div>
                    <span className="text-slate-500 text-xs">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {deviceDetailTab === 'configuration' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">Device Configuration</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Device Name</label>
                  <input
                    type="text"
                    value={selectedDevice.name}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Location</label>
                  <input
                    type="text"
                    value={selectedDevice.location}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Protocol</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>MQTT</option>
                    <option>CoAP</option>
                    <option>HTTP</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Reporting Interval (seconds)</label>
                  <input
                    type="number"
                    defaultValue="60"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Cloud Platform</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Azure IoT Hub</option>
                    <option>AWS IoT Core</option>
                    <option>Google Cloud IoT</option>
                    <option>None</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    Save Configuration
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    Reset to Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {deviceDetailTab === 'diagnostics' && (
          <div className="space-y-6">
            {/* Connectivity Test */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Connectivity Test
              </h4>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors mb-3">
                Run Ping Test
              </button>
              <div className="bg-black rounded-lg p-4 font-mono text-xs text-green-400">
                <p>$ ping {selectedDevice.id}</p>
                <p>PING {selectedDevice.id} ({selectedDevice.ipAddress}): 56 data bytes</p>
                <p>64 bytes from {selectedDevice.ipAddress}: icmp_seq=0 ttl=64 time=12.3 ms</p>
                <p>64 bytes from {selectedDevice.ipAddress}: icmp_seq=1 ttl=64 time=11.8 ms</p>
                <p>64 bytes from {selectedDevice.ipAddress}: icmp_seq=2 ttl=64 time=13.1 ms</p>
                <p className="mt-2">--- {selectedDevice.id} ping statistics ---</p>
                <p>3 packets transmitted, 3 packets received, 0.0% packet loss</p>
              </div>
            </div>

            {/* System Metrics */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">System Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">Memory Usage</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: selectedDevice.memoryUsage }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedDevice.memoryUsage}</span>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-2">CPU Usage</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: selectedDevice.cpuUsage }}></div>
                    </div>
                    <span className="text-white text-sm">{selectedDevice.cpuUsage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Issues */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4">Diagnostic Events</h4>
              <div className="space-y-2">
                {selectedDevice.status === 'offline' && (
                  <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-white text-sm">Device offline for {selectedDevice.lastSeen}</p>
                        <p className="text-slate-400 text-xs">Last communication failed</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedDevice.status === 'warning' && (
                  <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-white text-sm">High resource usage detected</p>
                        <p className="text-slate-400 text-xs">Memory at {selectedDevice.memoryUsage}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white text-sm">Connectivity test passed</p>
                      <p className="text-slate-400 text-xs">5 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {deviceDetailTab === 'firmware' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-green-400" />
                Firmware Management
              </h4>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Current Version</p>
                    <p className="text-white text-xl">{selectedDevice.firmware}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Latest Available</p>
                    <p className="text-green-400 text-xl">v2.1.4</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                <h5 className="text-white mb-2">Update Available: v2.1.4</h5>
                <p className="text-slate-400 text-sm mb-3">• Security patch for CVE-2024-1234<br/>• Performance improvements<br/>• Bug fixes</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                    Update Now
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                    Schedule Update
                  </button>
                </div>
              </div>

              <h5 className="text-white mb-3">Update History</h5>
              <div className="space-y-2">
                {[
                  { from: 'v2.1.2', to: 'v2.1.3', date: '2024-11-15', status: 'success' },
                  { from: 'v2.1.1', to: 'v2.1.2', date: '2024-10-20', status: 'success' },
                ].map((update, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div>
                        <p className="text-white text-sm">{update.from} → {update.to}</p>
                        <p className="text-slate-400 text-xs">{update.date}</p>
                      </div>
                    </div>
                    <span className="text-green-400 text-xs">Success</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {deviceDetailTab === 'logs' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white">Device Logs</h4>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-black rounded-lg p-4 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto">
                <p className="text-green-400">[2024-12-26 10:23:45] INFO: Device startup complete</p>
                <p className="text-blue-400">[2024-12-26 10:23:46] INFO: Connecting to MQTT broker...</p>
                <p className="text-green-400">[2024-12-26 10:23:47] INFO: Connected to broker successfully</p>
                <p className="text-blue-400">[2024-12-26 10:23:48] INFO: Authenticated with certificate</p>
                <p className="text-slate-400">[2024-12-26 10:24:00] DEBUG: Sending telemetry data</p>
                <p className="text-slate-400">[2024-12-26 10:24:15] DEBUG: Sending telemetry data</p>
                <p className="text-slate-400">[2024-12-26 10:24:30] DEBUG: Sending telemetry data</p>
                {selectedDevice.status === 'warning' && (
                  <p className="text-orange-400">[2024-12-26 10:25:00] WARN: Memory usage high: {selectedDevice.memoryUsage}</p>
                )}
                {selectedDevice.status === 'offline' && (
                  <p className="text-red-400">[2024-12-26 08:00:00] ERROR: Connection lost to broker</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header - Only show when in list view */}
      {viewMode === 'list' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-white text-2xl">IIoT Device Management</h2>
              <p className="text-slate-400 text-sm mt-1">Secure provisioning, authentication, monitoring & lifecycle management</p>
            </div>
            <button 
              onClick={() => setShowProvisioningWizard(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Provision New Device
            </button>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search devices by name, ID, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="warning">Warning</option>
                <option value="provisioning">Provisioning</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Content based on view mode */}
      {viewMode === 'list' ? renderDeviceList() : renderDeviceDetail()}
    </div>
  );
}
