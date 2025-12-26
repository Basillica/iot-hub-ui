import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Widget } from '../CustomDashboards';

// Mock data generator
const generateMockData = (sensorType: string, dataPoints: number = 20) => {
  const data = [];
  const now = Date.now();
  const baseValue = sensorType === 'temperature' ? 22 :
                    sensorType === 'humidity' ? 45 :
                    sensorType === 'pressure' ? 101 :
                    sensorType === 'flow_rate' ? 12 : 50;

  for (let i = 0; i < dataPoints; i++) {
    const time = new Date(now - (dataPoints - i) * 60000);
    const value = baseValue + Math.sin(i / 3) * 3 + (Math.random() - 0.5) * 2;
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: parseFloat(value.toFixed(2)),
    });
  }
  return data;
};

interface Props {
  widget: Widget;
}

export function WidgetRenderer({ widget }: Props) {
  const data = generateMockData(widget.sensorType);
  const currentValue = data[data.length - 1].value;
  const previousValue = data[data.length - 2].value;
  const trend = currentValue > previousValue ? 'up' : 'down';
  const trendPercent = Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1);

  switch (widget.type) {
    case 'line-chart':
      return (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-slate-400 text-xs">Current: {currentValue}{widget.config.unit}</span>
            <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trendPercent}%
            </div>
          </div>
        </div>
      );

    case 'area-chart':
      return (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-slate-400 text-xs">Current: {currentValue}{widget.config.unit}</span>
            <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trendPercent}%
            </div>
          </div>
        </div>
      );

    case 'bar-chart':
      return (
        <div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.slice(-10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-slate-400 text-xs">Average: {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(2)}{widget.config.unit}</span>
          </div>
        </div>
      );

    case 'gauge':
      const min = widget.config.min || 0;
      const max = widget.config.max || 100;
      const percentage = ((currentValue - min) / (max - min)) * 100;
      const rotation = (percentage / 100) * 180 - 90;

      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-48 h-24">
            {/* Gauge background */}
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#334155"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 20 90 A 80 80 0 0 1 180 90"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
              />
              {/* Needle */}
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="30"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transformOrigin: '100px 90px', transform: `rotate(${rotation}deg)` }}
              />
              <circle cx="100" cy="90" r="4" fill="#fff" />
            </svg>
          </div>
          <div className="text-center mt-4">
            <div className="text-white text-3xl">{currentValue.toFixed(1)}{widget.config.unit}</div>
            <div className="text-slate-400 text-sm mt-1">
              Range: {min} - {max}{widget.config.unit}
            </div>
          </div>
        </div>
      );

    case 'value-card':
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-center">
            <div className="text-slate-400 text-sm mb-2">{widget.sensorType.replace('_', ' ').toUpperCase()}</div>
            <div className="text-white text-5xl mb-4">{currentValue.toFixed(1)}</div>
            <div className="text-slate-400 text-xl mb-4">{widget.config.unit}</div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              <span>{trendPercent}% from last reading</span>
            </div>
          </div>
        </div>
      );

    case 'table':
      return (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-3 py-2 text-slate-400">Time</th>
                <th className="text-right px-3 py-2 text-slate-400">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(-8).reverse().map((row, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="px-3 py-2 text-slate-300">{row.time}</td>
                  <td className="px-3 py-2 text-right text-white">{row.value}{widget.config.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'status-indicator':
      const isNormal = currentValue >= (widget.config.threshold?.warning || 0) && 
                       currentValue <= (widget.config.threshold?.critical || 100);
      
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
            isNormal ? 'bg-green-500/20 border-4 border-green-500' : 'bg-red-500/20 border-4 border-red-500'
          }`}>
            <div className={`text-2xl ${isNormal ? 'text-green-400' : 'text-red-400'}`}>
              {isNormal ? '✓' : '!'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-xl mb-2 ${isNormal ? 'text-green-400' : 'text-red-400'}`}>
              {isNormal ? 'Normal' : 'Alert'}
            </div>
            <div className="text-white text-3xl mb-1">{currentValue.toFixed(1)}{widget.config.unit}</div>
            <div className="text-slate-400 text-sm">{widget.deviceName}</div>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-slate-400">Widget type not supported</p>
        </div>
      );
  }
}
