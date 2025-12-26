import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Cpu, HardDrive, Zap, Server, AlertCircle, TrendingUp } from 'lucide-react';

const cpuData = [
  { time: '10:00', usage: 45 },
  { time: '10:15', usage: 52 },
  { time: '10:30', usage: 48 },
  { time: '10:45', usage: 65 },
  { time: '11:00', usage: 58 },
  { time: '11:15', usage: 62 },
  { time: '11:30', usage: 55 },
];

const memoryData = [
  { time: '10:00', usage: 2.1 },
  { time: '10:15', usage: 2.3 },
  { time: '10:30', usage: 2.5 },
  { time: '10:45', usage: 2.8 },
  { time: '11:00', usage: 2.6 },
  { time: '11:15', usage: 2.9 },
  { time: '11:30', usage: 3.1 },
];

const requestData = [
  { time: '10:00', requests: 1200 },
  { time: '10:15', requests: 1500 },
  { time: '10:30', requests: 1800 },
  { time: '10:45', requests: 2200 },
  { time: '11:00', requests: 1900 },
  { time: '11:15', requests: 2100 },
  { time: '11:30', requests: 2400 },
];

const latencyData = [
  { time: '10:00', p50: 12, p95: 45, p99: 120 },
  { time: '10:15', p50: 15, p95: 52, p99: 135 },
  { time: '10:30', p50: 13, p95: 48, p99: 125 },
  { time: '10:45', p50: 18, p95: 65, p99: 180 },
  { time: '11:00', p50: 16, p95: 58, p99: 160 },
  { time: '11:15', p50: 14, p95: 55, p99: 150 },
  { time: '11:30', p50: 17, p95: 62, p99: 175 },
];

const services = [
  { name: 'Device Registry', status: 'healthy', cpu: 12, memory: 256, replicas: 3, uptime: '99.98%' },
  { name: 'Auth Service', status: 'healthy', cpu: 8, memory: 128, replicas: 2, uptime: '99.99%' },
  { name: 'Data Ingestion', status: 'healthy', cpu: 45, memory: 512, replicas: 5, uptime: '99.95%' },
  { name: 'EMQX Broker', status: 'healthy', cpu: 38, memory: 1024, replicas: 3, uptime: '99.97%' },
  { name: 'Kafka Cluster', status: 'healthy', cpu: 52, memory: 2048, replicas: 3, uptime: '99.99%' },
  { name: 'Flink Processing', status: 'warning', cpu: 72, memory: 4096, replicas: 4, uptime: '99.85%' },
  { name: 'Rule Engine', status: 'healthy', cpu: 28, memory: 512, replicas: 3, uptime: '99.96%' },
  { name: 'Digital Twin', status: 'healthy', cpu: 22, memory: 384, replicas: 2, uptime: '99.94%' },
  { name: 'Notification', status: 'healthy', cpu: 15, memory: 256, replicas: 2, uptime: '99.92%' },
  { name: 'TimescaleDB', status: 'healthy', cpu: 35, memory: 3072, replicas: 3, uptime: '99.98%' },
  { name: 'Redis Cluster', status: 'healthy', cpu: 18, memory: 1024, replicas: 3, uptime: '99.99%' },
];

export function Monitoring() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl">System Monitoring</h2>
        <p className="text-slate-400 text-sm mt-1">Real-time performance metrics and service health monitoring</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Cluster CPU</p>
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-white text-3xl">55%</p>
          <p className="text-green-400 text-xs mt-1">↓ 3% from last hour</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Memory Usage</p>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-white text-3xl">3.1 GB</p>
          <p className="text-slate-400 text-xs mt-1">of 16 GB total</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Requests/min</p>
            <Zap className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-white text-3xl">2.4k</p>
          <p className="text-green-400 text-xs mt-1">↑ 12% from last hour</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-slate-400 text-sm">Avg Latency</p>
            <Activity className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-white text-3xl">17ms</p>
          <p className="text-green-400 text-xs mt-1">P95: 62ms</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU Usage */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">CPU Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={cpuData}>
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
              <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Memory Usage */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Memory Usage (GB)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={memoryData}>
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
              <Area type="monotone" dataKey="usage" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Request Rate */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Request Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={requestData}>
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
              <Bar dataKey="requests" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Latency */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Response Latency (ms)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={latencyData}>
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
              <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} name="P50" />
              <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} name="P95" />
              <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} name="P99" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Health */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Service Health Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Service</th>
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Status</th>
                <th className="text-left px-4 py-3 text-slate-400 text-sm">CPU %</th>
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Memory (MB)</th>
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Replicas</th>
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-400" />
                      <span className="text-white text-sm">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <span className={`text-sm capitalize ${
                        service.status === 'healthy' ? 'text-green-400' : 'text-orange-400'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm ${
                      service.cpu > 70 ? 'text-red-400' : 
                      service.cpu > 50 ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {service.cpu}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300 text-sm">{service.memory} MB</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {service.replicas}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300 text-sm">{service.uptime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monitoring Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-white">Prometheus</h3>
          </div>
          <p className="text-slate-400 text-sm mb-3">Metrics collection and alerting</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">Active - 12 exporters</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white">Grafana</h3>
          </div>
          <p className="text-slate-400 text-sm mb-3">Visualization and dashboards</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">22 dashboards configured</span>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white">ELK Stack</h3>
          </div>
          <p className="text-slate-400 text-sm mb-3">Centralized logging system</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">Processing 50k logs/min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
