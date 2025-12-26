import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Cpu, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

const deviceData = [
  { time: '00:00', active: 245, offline: 15, total: 260 },
  { time: '04:00', active: 238, offline: 22, total: 260 },
  { time: '08:00', active: 252, offline: 8, total: 260 },
  { time: '12:00', active: 258, offline: 2, total: 260 },
  { time: '16:00', active: 255, offline: 5, total: 260 },
  { time: '20:00', active: 248, offline: 12, total: 260 },
  { time: '24:00', active: 260, offline: 0, total: 260 },
];

const dataIngestionRate = [
  { time: '00:00', messages: 1200 },
  { time: '04:00', messages: 800 },
  { time: '08:00', messages: 2400 },
  { time: '12:00', messages: 3200 },
  { time: '16:00', messages: 2800 },
  { time: '20:00', messages: 1600 },
  { time: '24:00', messages: 1400 },
];

const thresholdViolations = [
  { time: '00:00', critical: 2, warning: 5 },
  { time: '04:00', critical: 1, warning: 3 },
  { time: '08:00', critical: 5, warning: 12 },
  { time: '12:00', critical: 3, warning: 8 },
  { time: '16:00', critical: 7, warning: 15 },
  { time: '20:00', critical: 4, warning: 9 },
  { time: '24:00', critical: 2, warning: 6 },
];

const deviceTypeDistribution = [
  { name: 'Temperature Sensors', value: 85, color: '#3b82f6' },
  { name: 'Humidity Sensors', value: 62, color: '#8b5cf6' },
  { name: 'Pressure Sensors', value: 45, color: '#ec4899' },
  { name: 'Flow Meters', value: 38, color: '#10b981' },
  { name: 'Actuators', value: 30, color: '#f59e0b' },
];

export function Dashboard({ organizationId }: { organizationId: string }) {
  const stats = [
    {
      label: 'Total Devices',
      value: '260',
      change: '+12',
      trend: 'up',
      icon: Cpu,
      color: 'blue',
    },
    {
      label: 'Active Devices',
      value: '258',
      change: '99.2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Messages/sec',
      value: '3,247',
      change: '+18%',
      trend: 'up',
      icon: Activity,
      color: 'purple',
    },
    {
      label: 'Active Alerts',
      value: '23',
      change: '-5',
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            purple: 'from-purple-500 to-purple-600',
            orange: 'from-orange-500 to-orange-600',
          };

          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-white text-3xl mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Device Status Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={deviceData}>
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
              <Area type="monotone" dataKey="active" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="offline" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Data Ingestion Rate */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Data Ingestion Rate (msg/sec)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataIngestionRate}>
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
              <Line type="monotone" dataKey="messages" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threshold Violations */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Threshold Violations</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={thresholdViolations}>
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
              <Bar dataKey="critical" fill="#ef4444" />
              <Bar dataKey="warning" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Device Type Distribution */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Device Type Distribution</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Recent System Activity</h3>
        <div className="space-y-3">
          {[
            { type: 'success', message: 'Device TMP-085 registered successfully', time: '2 minutes ago' },
            { type: 'warning', message: 'Temperature threshold exceeded on device TMP-042', time: '5 minutes ago' },
            { type: 'info', message: 'MQTT broker reconnected - 15 devices restored', time: '12 minutes ago' },
            { type: 'critical', message: 'Critical: Pressure sensor PRS-023 offline', time: '18 minutes ago' },
            { type: 'success', message: 'Rule engine updated: 3 new threshold rules deployed', time: '25 minutes ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-orange-500' :
                activity.type === 'critical' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-slate-200 text-sm">{activity.message}</p>
                <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}