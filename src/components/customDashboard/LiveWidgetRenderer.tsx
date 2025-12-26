import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wifi, WifiOff, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import type { Widget } from '../CustomDashboards';
import { DataFilterPanel } from './DataFilterPanel';
import { getSensorDataType, createDefaultFilter, applyFilter, type DataFilter } from '../../utils/dataFilters';

interface DataPoint {
  timestamp: number;
  time: string;
  value: number;
}

interface ConnectionStatus {
  connected: boolean;
  lastUpdate: number;
  latency: number;
}

type TimeRange = '2h' | '24h' | '7d' | '30d';

interface TimeRangeConfig {
  id: TimeRange;
  label: string;
  duration: number; // in milliseconds
  interval: number; // data point interval in milliseconds
  maxPoints: number;
}

const TIME_RANGES: TimeRangeConfig[] = [
  { id: '2h', label: '2h', duration: 2 * 60 * 60 * 1000, interval: 50000, maxPoints: 144 },
  { id: '24h', label: '24h', duration: 24 * 60 * 60 * 1000, interval: 600000, maxPoints: 144 },
  { id: '7d', label: '7d', duration: 7 * 24 * 60 * 60 * 1000, interval: 3600000, maxPoints: 168 },
  { id: '30d', label: '30d', duration: 30 * 24 * 60 * 60 * 1000, interval: 14400000, maxPoints: 180 },
];

// Simulate real-time data stream
class DataStream {
  private subscribers: Map<string, (data: DataPoint) => void> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  subscribe(widgetId: string, sensorType: string, callback: (data: DataPoint) => void) {
    this.subscribers.set(widgetId, callback);

    const baseValue = this.getBaseValue(sensorType);
    let offset = 0;

    // Simulate data coming in every 5 seconds
    const interval = setInterval(() => {
      offset += 0.1;
      const value = baseValue + Math.sin(offset) * 3 + (Math.random() - 0.5) * 2;
      const now = Date.now();

      callback({
        timestamp: now,
        time: new Date(now).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        value: parseFloat(value.toFixed(2)),
      });
    }, 5000); // Update every 5 seconds

    this.intervals.set(widgetId, interval);
  }

  unsubscribe(widgetId: string) {
    const interval = this.intervals.get(widgetId);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(widgetId);
    }
    this.subscribers.delete(widgetId);
  }

  private getBaseValue(sensorType: string): number {
    const baseValues: Record<string, number> = {
      temperature: 22,
      humidity: 45,
      pressure: 101,
      flow_rate: 12,
      airflow: 50,
    };
    return baseValues[sensorType] || 50;
  }
}

const dataStream = new DataStream();

interface Props {
  widget: Widget;
}

export function LiveWidgetRenderer({ widget }: Props) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: true,
    lastUpdate: Date.now(),
    latency: 45,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('2h');
  const maxDataPoints = TIME_RANGES.find(range => range.id === timeRange)?.maxPoints || 144;
  const [filter, setFilter] = useState<DataFilter>(createDefaultFilter(getSensorDataType(widget.sensorType), widget.sensorType));

  useEffect(() => {
    // Initialize with historical data (last 2 hours)
    const now = Date.now();
    const timeRangeConfig = TIME_RANGES.find(range => range.id === timeRange);
    if (!timeRangeConfig) return;
    const { duration, interval, maxPoints } = timeRangeConfig;
    const startTime = now - duration;
    const baseValue = getBaseValue(widget.sensorType);
    const initialData: DataPoint[] = [];

    // Format time based on time range
    const formatTime = (timestamp: number) => {
      const date = new Date(timestamp);
      if (timeRange === '2h') {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange === '24h') {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange === '7d') {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' });
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    };

    for (let i = 0; i < maxPoints; i++) {
      const timestamp = startTime + (i * interval);
      const value = baseValue + Math.sin(i / 10) * 3 + (Math.random() - 0.5) * 2;
      initialData.push({
        timestamp,
        time: formatTime(timestamp),
        value: parseFloat(value.toFixed(2)),
      });
    }

    setData(initialData);

    // Subscribe to real-time updates
    dataStream.subscribe(widget.id, widget.sensorType, (newDataPoint) => {
      setData(prevData => {
        const updatedData = [...prevData, newDataPoint];
        // Keep only last 2 hours of data
        if (updatedData.length > maxDataPoints) {
          return updatedData.slice(-maxDataPoints);
        }
        return updatedData;
      });

      setConnectionStatus({
        connected: true,
        lastUpdate: newDataPoint.timestamp,
        latency: Math.floor(Math.random() * 50) + 30, // Simulate 30-80ms latency
      });

      // Flash refresh indicator
      setIsRefreshing(true);
      setTimeout(() => setIsRefreshing(false), 300);
    });

    // Check for stale data (no updates in 30 seconds)
    const staleCheckInterval = setInterval(() => {
      const timeSinceLastUpdate = Date.now() - connectionStatus.lastUpdate;
      if (timeSinceLastUpdate > 30000) {
        setConnectionStatus(prev => ({ ...prev, connected: false }));
      }
    }, 5000);

    return () => {
      dataStream.unsubscribe(widget.id);
      clearInterval(staleCheckInterval);
    };
  }, [widget.id, widget.sensorType, timeRange]);

  const getBaseValue = (sensorType: string): number => {
    const baseValues: Record<string, number> = {
      temperature: 22,
      humidity: 45,
      pressure: 101,
      flow_rate: 12,
      airflow: 50,
    };
    return baseValues[sensorType] || 50;
  };

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-spin" />
          <p className="text-slate-400 text-sm">Loading data stream...</p>
        </div>
      </div>
    );
  }

  const currentValue = data[data.length - 1].value;
  const previousValue = data[data.length - 2]?.value || currentValue;
  const trend = currentValue > previousValue ? 'up' : 'down';
  const trendPercent = Math.abs(((currentValue - previousValue) / previousValue) * 100).toFixed(1);
  const timeSinceUpdate = Math.floor((Date.now() - connectionStatus.lastUpdate) / 1000);

  // Apply filters to data
  const filteredData = data.filter(point => applyFilter(point.value, filter));

  // Calculate data range for numeric filters
  const dataRange = data.length > 0 ? {
    min: Math.min(...data.map(d => d.value)),
    max: Math.max(...data.map(d => d.value)),
  } : { min: 0, max: 100 };

  // Time Range Selector Component
  const TimeRangeSelector = () => (
    <div className="mb-3 flex items-center justify-between">
      <div className="inline-flex bg-slate-900/50 border border-slate-700 rounded-lg p-0.5">
        {TIME_RANGES.map((range) => (
          <button
            key={range.id}
            onClick={() => setTimeRange(range.id)}
            className={`px-3 py-1.5 rounded-md text-xs transition-all ${timeRange === range.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
          >
            {range.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-slate-500">
        {data.length} data points
      </div>
    </div>
  );

  // Connection Status Bar Component
  const ConnectionStatusBar = () => (
    <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700/50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {connectionStatus.connected ? (
            <>
              <div className="relative">
                <Wifi className="w-3.5 h-3.5 text-green-400" />
                {isRefreshing && (
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <span className="text-green-400 text-xs">Live</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
              <span className="text-red-400 text-xs">Disconnected</span>
            </>
          )}
        </div>
        {connectionStatus.connected && (
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <Clock className="w-3 h-3" />
            <span>{timeSinceUpdate}s ago</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span>{connectionStatus.latency}ms</span>
        <div className={`w-1.5 h-1.5 rounded-full ${connectionStatus.latency < 50 ? 'bg-green-500' :
          connectionStatus.latency < 100 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
      </div>
    </div>
  );

  switch (widget.type) {
    case 'line-chart':
      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fontSize: 10 }}
                interval={Math.floor(filteredData.length / 6)}
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelFormatter={(value) => `Time: ${value}`}
                formatter={(value: any) => [`${value}${widget.config.unit}`, 'Value']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs">Current:</span>
              <span className="text-white">{currentValue}{widget.config.unit}</span>
            </div>
            <div className="flex items-center gap-2">
              {filter.enabled && (
                <span className="text-blue-400 text-xs">
                  Showing {filteredData.length}/{data.length}
                </span>
              )}
              <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trendPercent}%
              </div>
            </div>
          </div>
        </div>
      );

    case 'area-chart':
      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fontSize: 10 }}
                interval={Math.floor(filteredData.length / 6)}
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-slate-400 text-xs">Current: {currentValue}{widget.config.unit}</span>
            <div className="flex items-center gap-2">
              {filter.enabled && (
                <span className="text-blue-400 text-xs">
                  {filteredData.length}/{data.length}
                </span>
              )}
              <div className={`flex items-center gap-1 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trendPercent}%
              </div>
            </div>
          </div>
        </div>
      );

    case 'bar-chart':
      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredData.slice(-20)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fontSize: 10 }}
                interval={4}
              />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="value" fill="#10b981" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-slate-400 text-xs">
              Avg: {(filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length).toFixed(2)}{widget.config.unit}
            </span>
            {filter.enabled && (
              <span className="text-blue-400 text-xs">
                {filteredData.length}/{data.length}
              </span>
            )}
          </div>
        </div>
      );

    case 'gauge':
      const min = widget.config.min || 0;
      const max = widget.config.max || 100;
      const percentage = ((currentValue - min) / (max - min)) * 100;
      const rotation = (percentage / 100) * 180 - 90;

      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-48 h-24">
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
            <div className="text-center mt-2">
              <div className="text-white text-3xl">{currentValue.toFixed(1)}{widget.config.unit}</div>
              <div className="text-slate-400 text-sm mt-1">
                Range: {min} - {max}{widget.config.unit}
              </div>
            </div>
          </div>
        </div>
      );

    case 'value-card':
      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">{widget.sensorType.replace('_', ' ').toUpperCase()}</div>
              <div className="text-white text-5xl mb-2">{currentValue.toFixed(1)}</div>
              <div className="text-slate-400 text-xl mb-3">{widget.config.unit}</div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                <span>{trendPercent}% from last reading</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'table':
      return (
        <div>
          <ConnectionStatusBar />
          <DataFilterPanel
            filter={filter}
            onFilterChange={setFilter}
            dataRange={dataRange}
            sensorUnit={widget.config.unit}
          />
          <TimeRangeSelector />
          <div className="overflow-x-auto max-h-64">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-800">
                <tr className="border-b border-slate-700">
                  <th className="text-left px-3 py-2 text-slate-400">Time</th>
                  <th className="text-right px-3 py-2 text-slate-400">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(-10).reverse().map((row, index) => (
                  <tr key={index} className="border-b border-slate-700/50">
                    <td className="px-3 py-2 text-slate-300">{row.time}</td>
                    <td className="px-3 py-2 text-right text-white">
                      {row.value}{widget.config.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filter.enabled && (
            <div className="mt-2 text-center text-xs text-blue-400">
              Showing {filteredData.length} of {data.length} rows
            </div>
          )}
        </div>
      );

    case 'status-indicator':
      const threshold = widget.config.threshold;
      const isWarning = threshold?.warning && currentValue >= threshold.warning;
      const isCritical = threshold?.critical && currentValue >= threshold.critical;
      const isNormal = !isWarning && !isCritical;

      return (
        <div>
          <ConnectionStatusBar />
          <TimeRangeSelector />
          <div className="flex flex-col items-center justify-center py-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-3 ${isCritical ? 'bg-red-500/20 border-4 border-red-500' :
              isWarning ? 'bg-yellow-500/20 border-4 border-yellow-500' :
                'bg-green-500/20 border-4 border-green-500'
              }`}>
              <div className={`text-2xl ${isCritical ? 'text-red-400' :
                isWarning ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                {isCritical ? <AlertCircle className="w-8 h-8" /> :
                  isWarning ? '!' : '✓'}
              </div>
            </div>
            <div className="text-center">
              <div className={`text-lg mb-2 ${isCritical ? 'text-red-400' :
                isWarning ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                {isCritical ? 'Critical' : isWarning ? 'Warning' : 'Normal'}
              </div>
              <div className="text-white text-3xl mb-1">{currentValue.toFixed(1)}{widget.config.unit}</div>
              <div className="text-slate-400 text-sm">{widget.deviceName}</div>
            </div>
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