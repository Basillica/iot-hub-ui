import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Box, Thermometer, Droplets, Gauge, TrendingUp, Clock, Database, Cpu, Package, Layers, Activity, AlertTriangle, CheckCircle, Factory, MapPin, User, Zap, Settings, Play, Pause, RotateCcw, Download, Eye, Brain, Sparkles, Target, Shield } from 'lucide-react';

// Performance data for component twins
const componentPerformanceData = [
  { time: '10:00', wear: 15, predicted: 14, threshold: 80 },
  { time: '10:30', wear: 18, predicted: 17, threshold: 80 },
  { time: '11:00', wear: 22, predicted: 21, threshold: 80 },
  { time: '11:30', wear: 25, predicted: 24, threshold: 80 },
  { time: '12:00', wear: 28, predicted: 29, threshold: 80 },
  { time: '12:30', wear: 31, predicted: 33, threshold: 80 },
];

// System efficiency data
const systemEfficiencyData = [
  { time: '10:00', efficiency: 92, target: 95 },
  { time: '10:30', efficiency: 89, target: 95 },
  { time: '11:00', efficiency: 94, target: 95 },
  { time: '11:30', efficiency: 91, target: 95 },
  { time: '12:00', efficiency: 96, target: 95 },
  { time: '12:30', efficiency: 93, target: 95 },
];

// Process throughput data
const processThroughputData = [
  { time: '08:00', actual: 850, target: 1000, predicted: 820 },
  { time: '10:00', actual: 920, target: 1000, predicted: 950 },
  { time: '12:00', actual: 980, target: 1000, predicted: 990 },
  { time: '14:00', actual: 1050, target: 1000, predicted: 1020 },
  { time: '16:00', actual: 970, target: 1000, predicted: 960 },
  { time: '18:00', actual: 890, target: 1000, predicted: 900 },
];

// Health metrics radar
const healthMetricsData = [
  { metric: 'Performance', current: 92, baseline: 95 },
  { metric: 'Efficiency', current: 88, baseline: 90 },
  { metric: 'Reliability', current: 96, baseline: 98 },
  { metric: 'Quality', current: 94, baseline: 95 },
  { metric: 'Safety', current: 99, baseline: 100 },
];

// Lifecycle stages
const lifecycleData = [
  { stage: 'Design', value: 100 },
  { stage: 'Manufacturing', value: 100 },
  { stage: 'Deployment', value: 100 },
  { stage: 'Operation', value: 65 },
  { stage: 'Maintenance', value: 30 },
  { stage: 'Decommission', value: 0 },
];

const twinTypes = [
  { id: 'component', name: 'Component Twins', icon: Package, count: 247, color: 'blue' },
  { id: 'asset', name: 'Asset Twins', icon: Box, count: 89, color: 'purple' },
  { id: 'system', name: 'System Twins', icon: Layers, count: 12, color: 'cyan' },
  { id: 'process', name: 'Process Twins', icon: Factory, count: 3, color: 'orange' },
  { id: 'people', name: 'People Twins', icon: User, count: 156, color: 'green' },
  { id: 'location', name: 'Location Twins', icon: MapPin, count: 8, color: 'pink' },
];

const componentTwins = [
  { id: 'COMP-001', name: 'Motor Bearing A3', type: 'Component', assetId: 'ASSET-005', wear: 31, health: 89, status: 'normal', predictedFailure: '45 days', lastMaintenance: '12 days ago' },
  { id: 'COMP-002', name: 'Hydraulic Pump B2', type: 'Component', assetId: 'ASSET-007', wear: 68, health: 42, status: 'warning', predictedFailure: '8 days', lastMaintenance: '3 days ago' },
  { id: 'COMP-003', name: 'Conveyor Belt C1', type: 'Component', assetId: 'ASSET-012', wear: 24, health: 94, status: 'normal', predictedFailure: '120 days', lastMaintenance: '5 days ago' },
];

const assetTwins = [
  { id: 'ASSET-005', name: 'CNC Machine 3-Axis', type: 'Asset', components: 18, uptime: 98.5, efficiency: 92, status: 'normal', location: 'Floor 2 - Bay A', lastSync: '2 sec ago' },
  { id: 'ASSET-007', name: 'Robotic Arm Delta-5', type: 'Asset', components: 12, uptime: 94.2, efficiency: 88, status: 'warning', location: 'Floor 1 - Bay C', lastSync: '5 sec ago' },
  { id: 'ASSET-012', name: 'Assembly Line Conveyor', type: 'Asset', components: 8, uptime: 99.1, efficiency: 96, status: 'normal', location: 'Floor 3 - Main', lastSync: '1 sec ago' },
];

const systemTwins = [
  { id: 'SYS-001', name: 'Production Line Alpha', type: 'System', assets: 24, throughput: 980, efficiency: 93, status: 'normal', oee: 89.4, bottleneck: 'Station 7' },
  { id: 'SYS-002', name: 'Quality Control System', type: 'System', assets: 8, throughput: 1050, efficiency: 96, status: 'normal', oee: 94.2, bottleneck: 'None' },
  { id: 'SYS-003', name: 'Packaging & Logistics', type: 'System', assets: 15, throughput: 870, efficiency: 87, status: 'warning', oee: 82.1, bottleneck: 'Palletizer' },
];

const processTwins = [
  { id: 'PROC-001', name: 'Manufacturing Plant East', type: 'Process', systems: 8, workers: 156, dailyOutput: 12400, efficiency: 91, status: 'normal', shift: 'Day Shift' },
  { id: 'PROC-002', name: 'Distribution Center North', type: 'Process', systems: 5, workers: 89, dailyOutput: 8900, efficiency: 88, status: 'normal', shift: 'Night Shift' },
];

const peopleTwins = [
  { id: 'PEOPLE-042', name: 'Operator - Station 7', type: 'People', heartRate: 78, activityLevel: 'Moderate', alertness: 92, location: 'Floor 2 - Station 7', status: 'normal', shift: '8h remaining' },
  { id: 'PEOPLE-089', name: 'Maintenance Tech - Bay C', type: 'People', heartRate: 95, activityLevel: 'High', alertness: 87, location: 'Floor 1 - Bay C', status: 'normal', shift: '4h remaining' },
];

const locationTwins = [
  { id: 'LOC-001', name: 'Smart Factory - Building A', type: 'Location', area: '45,000 sqft', temperature: 22.5, occupancy: 142, energy: 1240, airQuality: 'Good', status: 'normal' },
  { id: 'LOC-002', name: 'Warehouse - Section C', type: 'Location', area: '28,000 sqft', temperature: 18.2, occupancy: 34, energy: 520, airQuality: 'Excellent', status: 'normal' },
];

export function DigitalTwins({ organizationId }: { organizationId: string }) {
  const [selectedTwinType, setSelectedTwinType] = useState('component');
  const [selectedTwin, setSelectedTwin] = useState<any>(componentTwins[0]);
  const [viewMode, setViewMode] = useState<'dashboard' | 'lifecycle' | 'simulation'>('dashboard');

  const getCurrentTwins = () => {
    switch (selectedTwinType) {
      case 'component': return componentTwins;
      case 'asset': return assetTwins;
      case 'system': return systemTwins;
      case 'process': return processTwins;
      case 'people': return peopleTwins;
      case 'location': return locationTwins;
      default: return componentTwins;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'green';
      case 'warning': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const renderTwinDetails = () => {
    if (selectedTwinType === 'component') {
      return (
        <>
          {/* Component Health Overview */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Component Health & Wear Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Health Score</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.health}%</p>
                <p className="text-slate-500 text-xs mt-1">Excellent condition</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 text-sm">Wear Level</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.wear}%</p>
                <p className="text-slate-500 text-xs mt-1">Threshold: 80%</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm">Predicted Failure</span>
                </div>
                <p className="text-white text-xl">{selectedTwin.predictedFailure}</p>
                <p className="text-slate-500 text-xs mt-1">AI-based prediction</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-sm">Last Maintenance</span>
                </div>
                <p className="text-white text-xl">{selectedTwin.lastMaintenance}</p>
                <p className="text-slate-500 text-xs mt-1">Preventative</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={componentPerformanceData}>
                <defs>
                  <linearGradient id="wearGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="threshold" stroke="#ef4444" fill="none" strokeDasharray="5 5" name="Threshold" />
                <Area type="monotone" dataKey="wear" stroke="#f97316" fill="url(#wearGradient)" strokeWidth={2} name="Actual Wear" />
                <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="url(#predictedGradient)" strokeWidth={2} strokeDasharray="5 5" name="Predicted Wear" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Maintenance Recommendations */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              AI-Powered Maintenance Insights
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-white">Schedule maintenance in next 8 days</p>
                  <p className="text-slate-400 text-sm mt-1">Wear level approaching 70% threshold. Predicted failure: {selectedTwin.predictedFailure}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white">Optimize operating temperature</p>
                  <p className="text-slate-400 text-sm mt-1">Reducing temperature by 2°C could extend lifespan by 18%</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Performance within normal range</p>
                  <p className="text-slate-400 text-sm mt-1">All metrics tracking as expected based on digital twin simulation</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedTwinType === 'asset') {
      return (
        <>
          {/* Asset Performance */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <Box className="w-5 h-5 text-purple-400" />
              Asset Performance & Component Interactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Uptime</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.uptime}%</p>
                <p className="text-slate-500 text-xs mt-1">Last 30 days</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">Efficiency</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.efficiency}%</p>
                <p className="text-slate-500 text-xs mt-1">Target: 95%</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm">Components</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.components}</p>
                <p className="text-slate-500 text-xs mt-1">All monitored</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={healthMetricsData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Baseline" dataKey="baseline" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeDasharray="5 5" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Details */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4">Asset Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Asset ID</p>
                <p className="text-white mt-1">{selectedTwin.id}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Location</p>
                <p className="text-white mt-1">{selectedTwin.location}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Last Sync</p>
                <p className="text-white mt-1">{selectedTwin.lastSync}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Components</p>
                <p className="text-white mt-1">{selectedTwin.components} monitored parts</p>
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedTwinType === 'system') {
      return (
        <>
          {/* System Performance */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              System Efficiency & Throughput
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Box className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-400 text-sm">Assets</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.assets}</p>
                <p className="text-slate-500 text-xs mt-1">Interconnected</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Throughput</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.throughput}</p>
                <p className="text-slate-500 text-xs mt-1">units/hour</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">OEE Score</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.oee}%</p>
                <p className="text-slate-500 text-xs mt-1">Overall efficiency</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 text-sm">Bottleneck</span>
                </div>
                <p className="text-white text-xl">{selectedTwin.bottleneck}</p>
                <p className="text-slate-500 text-xs mt-1">Identified</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={systemEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeDasharray="5 5" strokeWidth={2} name="Target" />
                <Line type="monotone" dataKey="efficiency" stroke="#06b6d4" strokeWidth={3} name="Actual Efficiency" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bottleneck Analysis */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-400" />
              Bottleneck Analysis & Optimization
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-white">Station 7 limiting throughput by 15%</p>
                  <p className="text-slate-400 text-sm mt-1">Recommended action: Add parallel processing unit or optimize cycle time</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white">Simulated improvement: +180 units/hour</p>
                  <p className="text-slate-400 text-sm mt-1">Digital twin simulation shows potential 18% throughput increase</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedTwinType === 'process') {
      return (
        <>
          {/* Process Overview */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <Factory className="w-5 h-5 text-orange-400" />
              End-to-End Process Performance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 text-sm">Systems</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.systems}</p>
                <p className="text-slate-500 text-xs mt-1">Interconnected</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Workers</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.workers}</p>
                <p className="text-slate-500 text-xs mt-1">Active now</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">Daily Output</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.dailyOutput}</p>
                <p className="text-slate-500 text-xs mt-1">units today</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm">Efficiency</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.efficiency}%</p>
                <p className="text-slate-500 text-xs mt-1">Process-wide</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={processThroughputData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fill="url(#actualGradient)" strokeWidth={2} name="Actual" />
                <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeDasharray="5 5" strokeWidth={2} name="Target" />
                <Line type="monotone" dataKey="predicted" stroke="#06b6d4" strokeDasharray="3 3" strokeWidth={2} name="AI Prediction" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Process Insights */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              Process-Level Intelligence
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-sm">Current Shift</p>
                <p className="text-white mt-1">{selectedTwin.shift}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Energy Consumption</p>
                <p className="text-white mt-1">1,240 kWh (optimized)</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Waste Reduction</p>
                <p className="text-white mt-1">23% below baseline</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Predictive Downtime</p>
                <p className="text-white mt-1">0.5 hours expected today</p>
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedTwinType === 'people') {
      return (
        <>
          {/* People Twin Health */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-green-400" />
              Worker Health & Performance Monitoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-red-400" />
                  <span className="text-slate-400 text-sm">Heart Rate</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.heartRate}</p>
                <p className="text-slate-500 text-xs mt-1">BPM - Normal</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-400 text-sm">Activity</span>
                </div>
                <p className="text-white text-xl">{selectedTwin.activityLevel}</p>
                <p className="text-slate-500 text-xs mt-1">Current state</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-slate-400 text-sm">Alertness</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.alertness}%</p>
                <p className="text-slate-500 text-xs mt-1">Good level</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">Location</span>
                </div>
                <p className="text-white text-sm">{selectedTwin.location}</p>
                <p className="text-slate-500 text-xs mt-1">Real-time</p>
              </div>
            </div>
          </div>

          {/* Safety & Compliance */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Safety & Compliance
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">All safety parameters normal</p>
                  <p className="text-slate-400 text-sm mt-1">PPE detected, proximity alerts active, fatigue level acceptable</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white">Shift time remaining: {selectedTwin.shift}</p>
                  <p className="text-slate-400 text-sm mt-1">Break recommended in 45 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (selectedTwinType === 'location') {
      return (
        <>
          {/* Location Twin Environment */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-pink-400" />
              Smart Location Environmental Control
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-400 text-sm">Temperature</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.temperature}°C</p>
                <p className="text-slate-500 text-xs mt-1">Optimal range</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-slate-400 text-sm">Occupancy</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.occupancy}</p>
                <p className="text-slate-500 text-xs mt-1">people</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-slate-400 text-sm">Energy</span>
                </div>
                <p className="text-white text-3xl">{selectedTwin.energy}</p>
                <p className="text-slate-500 text-xs mt-1">kWh current</p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-400 text-sm">Air Quality</span>
                </div>
                <p className="text-white text-xl">{selectedTwin.airQuality}</p>
                <p className="text-slate-500 text-xs mt-1">AQI monitored</p>
              </div>
            </div>
          </div>

          {/* Smart Building Optimization */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <h3 className="text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Smart Building Optimization
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Energy consumption 12% below target</p>
                  <p className="text-slate-400 text-sm mt-1">AI-optimized HVAC based on occupancy patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-white">Predictive maintenance scheduled</p>
                  <p className="text-slate-400 text-sm mt-1">HVAC system filter replacement in 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl">Digital Twins</h2>
        <p className="text-slate-400 text-sm mt-1">
          Real-time virtual representations with continuous IoT sensor data, AI-powered predictive analytics, and lifecycle management
        </p>
      </div>

      {/* Twin Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {twinTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedTwinType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => {
                setSelectedTwinType(type.id);
                setSelectedTwin(getCurrentTwins()[0]);
              }}
              className={`p-4 rounded-xl border transition-all ${
                isSelected
                  ? `bg-${type.color}-600/20 border-${type.color}-500`
                  : 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50'
              }`}
            >
              <Icon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? `text-${type.color}-400` : 'text-slate-400'}`} />
              <p className={`text-sm ${isSelected ? 'text-white' : 'text-slate-400'}`}>{type.name}</p>
              <p className={`text-2xl mt-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>{type.count}</p>
            </button>
          );
        })}
      </div>

      {/* View Mode Tabs */}
      <div className="flex gap-2 bg-slate-800/50 p-2 rounded-lg border border-slate-700 w-fit">
        <button
          onClick={() => setViewMode('dashboard')}
          className={`px-4 py-2 rounded-lg transition-all ${
            viewMode === 'dashboard'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4 inline mr-2" />
          Live Dashboard
        </button>
        <button
          onClick={() => setViewMode('lifecycle')}
          className={`px-4 py-2 rounded-lg transition-all ${
            viewMode === 'lifecycle'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Lifecycle
        </button>
        <button
          onClick={() => setViewMode('simulation')}
          className={`px-4 py-2 rounded-lg transition-all ${
            viewMode === 'simulation'
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4 inline mr-2" />
          Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Twin List Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <h3 className="text-white mb-4">Active {twinTypes.find(t => t.id === selectedTwinType)?.name}</h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {getCurrentTwins().map((twin) => {
                const status = getStatusColor(twin.status);
                return (
                  <button
                    key={twin.id}
                    onClick={() => setSelectedTwin(twin)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedTwin.id === twin.id
                        ? 'bg-blue-600/20 border-blue-500'
                        : 'bg-slate-900/50 border-slate-700 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full bg-${status}-500`}></div>
                      <p className="text-white text-sm truncate flex-1">{twin.name}</p>
                    </div>
                    <p className="text-slate-400 text-xs">{twin.id}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-4">
          {viewMode === 'dashboard' && (
            <>
              {/* Twin Header */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-white text-xl">{selectedTwin.name}</h3>
                    <p className="text-slate-400 text-sm mt-1">{selectedTwin.id} • {selectedTwin.type}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-sm bg-${getStatusColor(selectedTwin.status)}-500/20 text-${getStatusColor(selectedTwin.status)}-400`}>
                    {selectedTwin.status === 'normal' ? 'Synchronized' :
                     selectedTwin.status === 'warning' ? 'Warning' : 'Critical'}
                  </div>
                </div>
              </div>

              {renderTwinDetails()}

              {/* Actions */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Twin Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Force Sync
                  </button>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Full History
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Run Simulation
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Twin
                  </button>
                </div>
              </div>
            </>
          )}

          {viewMode === 'lifecycle' && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Product Lifecycle Tracking
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Track the complete lifecycle from design through decommission with real-world usage data closing the feedback loop
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={lifecycleData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="stage" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e293b', 
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm">Current Stage</p>
                  <p className="text-white mt-1">Operation (65% complete)</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm">Estimated Remaining Life</p>
                  <p className="text-white mt-1">5.2 years</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm">Total Runtime</p>
                  <p className="text-white mt-1">18,450 hours</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm">Lifecycle Cost</p>
                  <p className="text-white mt-1">$47,200 (62% of budget)</p>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'simulation' && (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Physics-Based Simulation vs Real-Time Data
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Compare digital twin simulation against actual sensor readings to identify discrepancies and optimize models
              </p>
              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-white mb-2">Simulation Mode: What-If Analysis</p>
                      <p className="text-slate-400 text-sm">Test hypothetical scenarios before deploying to physical assets</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Simulated Efficiency</p>
                    <p className="text-white text-2xl">94.5%</p>
                    <p className="text-green-400 text-xs mt-1">+2.5% improvement</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Actual Efficiency</p>
                    <p className="text-white text-2xl">92.0%</p>
                    <p className="text-slate-400 text-xs mt-1">Current baseline</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                    <p className="text-slate-400 text-sm mb-1">Model Accuracy</p>
                    <p className="text-white text-2xl">97.3%</p>
                    <p className="text-blue-400 text-xs mt-1">High confidence</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Run Simulation
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
