import { useState } from 'react';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle, Mail, MessageSquare, Smartphone, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  device: string;
  timestamp: string;
  read: boolean;
  channels: ('email' | 'sms' | 'slack')[];
}

const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'critical',
    title: 'Critical Temperature Exceeded',
    message: 'Device TMP-042 has exceeded critical temperature threshold (35°C) for 5 consecutive readings',
    device: 'TMP-042',
    timestamp: '2 minutes ago',
    read: false,
    channels: ['email', 'sms', 'slack'],
  },
  {
    id: 'N002',
    type: 'warning',
    title: 'Low Humidity Detected',
    message: 'Humidity sensor HUM-015 reporting values below 30% for the past 10 minutes',
    device: 'HUM-015',
    timestamp: '15 minutes ago',
    read: false,
    channels: ['slack'],
  },
  {
    id: 'N003',
    type: 'critical',
    title: 'Device Offline',
    message: 'Pressure sensor PRS-023 has been offline for more than 2 hours',
    device: 'PRS-023',
    timestamp: '2 hours ago',
    read: true,
    channels: ['email', 'sms'],
  },
  {
    id: 'N004',
    type: 'warning',
    title: 'Flow Rate Anomaly',
    message: 'Flow meter FLW-042 showing deviation of 25% from average baseline',
    device: 'FLW-042',
    timestamp: '3 hours ago',
    read: true,
    channels: ['email', 'slack'],
  },
  {
    id: 'N005',
    type: 'info',
    title: 'Device Reconnected',
    message: 'Temperature sensor TMP-089 has successfully reconnected to the network',
    device: 'TMP-089',
    timestamp: '5 hours ago',
    read: true,
    channels: ['slack'],
  },
  {
    id: 'N006',
    type: 'success',
    title: 'Threshold Back to Normal',
    message: 'Temperature on TMP-001 has returned to normal range',
    device: 'TMP-001',
    timestamp: '6 hours ago',
    read: true,
    channels: ['email'],
  },
];

export function Notifications({ organizationId }: { organizationId: string }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filterType, setFilterType] = useState<string>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notif => {
    const matchesType = filterType === 'all' || notif.type === filterType;
    const matchesRead = !showUnreadOnly || !notif.read;
    return matchesType && matchesRead;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'red';
      case 'warning':
        return 'orange';
      case 'success':
        return 'green';
      default:
        return 'blue';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-white text-2xl">Notifications & Alerts</h2>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-1">Real-time alerts from rule engine threshold violations</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Mark All as Read
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Alerts</p>
          <p className="text-white text-2xl mt-1">{notifications.length}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-red-400 text-sm">Critical</p>
          <p className="text-red-400 text-2xl mt-1">{notifications.filter(n => n.type === 'critical').length}</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <p className="text-orange-400 text-sm">Warning</p>
          <p className="text-orange-400 text-2xl mt-1">{notifications.filter(n => n.type === 'warning').length}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <p className="text-blue-400 text-sm">Info</p>
          <p className="text-blue-400 text-2xl mt-1">{notifications.filter(n => n.type === 'info').length}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <p className="text-green-400 text-sm">Success</p>
          <p className="text-green-400 text-2xl mt-1">{notifications.filter(n => n.type === 'success').length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex gap-2 flex-wrap">
          {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm capitalize ${filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 cursor-pointer hover:bg-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Unread only</span>
        </label>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No notifications found</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const Icon = getIcon(notif.type);
            const color = getColor(notif.type);
            const colorClasses = {
              red: 'bg-red-500/20 border-red-500/30 text-red-400',
              orange: 'bg-orange-500/20 border-orange-500/30 text-orange-400',
              green: 'bg-green-500/20 border-green-500/30 text-green-400',
              blue: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
            };

            return (
              <div
                key={notif.id}
                className={`bg-slate-800/50 backdrop-blur-sm border rounded-xl p-5 transition-all ${notif.read ? 'border-slate-700' : 'border-blue-500/50 bg-blue-500/5'
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClasses[color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-white">{notif.title}</h4>
                        <p className="text-slate-400 text-sm mt-1">{notif.message}</p>
                      </div>
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs">Device:</span>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          {notif.device}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs">Sent via:</span>
                        <div className="flex gap-1">
                          {notif.channels.map((channel) => (
                            <div key={channel} className="p-1 bg-slate-700 rounded" title={channel}>
                              {channel === 'email' && <Mail className="w-3 h-3 text-slate-400" />}
                              {channel === 'sms' && <Smartphone className="w-3 h-3 text-slate-400" />}
                              {channel === 'slack' && <MessageSquare className="w-3 h-3 text-slate-400" />}
                            </div>
                          ))}
                        </div>
                      </div>

                      <span className="text-slate-500 text-xs ml-auto">{notif.timestamp}</span>

                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <h4 className="text-white">Email</h4>
            </div>
            <p className="text-slate-400 text-sm mb-3">Send alerts to configured email addresses</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Configured</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <h4 className="text-white">SMS</h4>
            </div>
            <p className="text-slate-400 text-sm mb-3">Send critical alerts via SMS</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Twilio Connected</span>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-orange-400" />
              <h4 className="text-white">Slack</h4>
            </div>
            <p className="text-slate-400 text-sm mb-3">Post alerts to Slack channels</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Webhook Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}