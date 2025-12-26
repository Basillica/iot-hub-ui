import { useState } from 'react';
import { Plus, Play, Pause, Edit, Trash2, AlertTriangle, CheckCircle, Clock, Workflow } from 'lucide-react';
import { VisualRuleBuilder } from './VisualRuleBuilder';

interface Rule {
  id: string;
  name: string;
  description: string;
  deviceType: string;
  condition: string;
  threshold: number;
  windowType: 'count' | 'time';
  windowSize: number;
  action: string;
  status: 'active' | 'paused';
  triggered: number;
  lastTriggered: string;
}

const mockRules: Rule[] = [
  {
    id: 'R001',
    name: 'High Temperature Alert',
    description: 'Trigger when temperature exceeds threshold for 5 consecutive readings',
    deviceType: 'Temperature',
    condition: 'greater_than',
    threshold: 30,
    windowType: 'count',
    windowSize: 5,
    action: 'Send Email & SMS',
    status: 'active',
    triggered: 12,
    lastTriggered: '2 hours ago',
  },
  {
    id: 'R002',
    name: 'Low Humidity Warning',
    description: 'Alert when humidity drops below 30% for 10 minutes',
    deviceType: 'Humidity',
    condition: 'less_than',
    threshold: 30,
    windowType: 'time',
    windowSize: 10,
    action: 'Send Slack Notification',
    status: 'active',
    triggered: 5,
    lastTriggered: '1 day ago',
  },
  {
    id: 'R003',
    name: 'Pressure Spike Detection',
    description: 'Detect sudden pressure increases over 3 data points',
    deviceType: 'Pressure',
    condition: 'rate_of_change',
    threshold: 5,
    windowType: 'count',
    windowSize: 3,
    action: 'Send Email',
    status: 'paused',
    triggered: 28,
    lastTriggered: '3 days ago',
  },
  {
    id: 'R004',
    name: 'Flow Rate Anomaly',
    description: 'Trigger when flow rate deviates by more than 20% from average',
    deviceType: 'Flow',
    condition: 'deviation',
    threshold: 20,
    windowType: 'time',
    windowSize: 15,
    action: 'Send Email & Dashboard Alert',
    status: 'active',
    triggered: 3,
    lastTriggered: '5 hours ago',
  },
];

export function RuleEngine({ organizationId }: { organizationId: string }) {
  const [rules, setRules] = useState(mockRules);
  const [showAddRule, setShowAddRule] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'visual'>('list');

  const toggleRuleStatus = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ));
  };

  // If visual mode, show the Visual Rule Builder
  if (viewMode === 'visual') {
    return (
      <div className="h-full">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl">Logic Architect Pro</h2>
            <p className="text-slate-400 text-sm mt-1">Drag and connect nodes to create complex rules</p>
          </div>
          <button
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Back to List View
          </button>
        </div>
        <VisualRuleBuilder />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl">Rule Engine</h2>
          <p className="text-slate-400 text-sm mt-1">Configure threshold-based rules with stateful processing and sliding windows</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAddRule(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Rule
          </button>
          <button
            onClick={() => setViewMode('visual')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Workflow className="w-4 h-4" />
            Visual Rule Builder
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Rules</p>
          <p className="text-white text-3xl mt-1">{rules.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Active Rules</p>
          <p className="text-green-400 text-3xl mt-1">{rules.filter(r => r.status === 'active').length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Paused Rules</p>
          <p className="text-orange-400 text-3xl mt-1">{rules.filter(r => r.status === 'paused').length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Triggers (24h)</p>
          <p className="text-blue-400 text-3xl mt-1">{rules.reduce((sum, r) => sum + r.triggered, 0)}</p>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white text-lg">{rule.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    rule.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {rule.status === 'active' ? 'Active' : 'Paused'}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                    {rule.deviceType}
                  </span>
                </div>
                <p className="text-slate-400 text-sm">{rule.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRuleStatus(rule.id)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  title={rule.status === 'active' ? 'Pause' : 'Resume'}
                >
                  {rule.status === 'active' ? (
                    <Pause className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Play className="w-4 h-4 text-green-400" />
                  )}
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                  <Edit className="w-4 h-4 text-slate-400" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-slate-700">
              <div>
                <p className="text-slate-400 text-xs mb-1">Condition</p>
                <p className="text-white text-sm capitalize">{rule.condition.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Threshold</p>
                <p className="text-white text-sm">{rule.threshold}{rule.condition === 'deviation' ? '%' : '°C'}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Window</p>
                <p className="text-white text-sm">
                  {rule.windowSize} {rule.windowType === 'count' ? 'points' : 'min'}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Triggered</p>
                <p className="text-white text-sm">{rule.triggered} times</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs mb-1">Last Triggered</p>
                <p className="text-white text-sm">{rule.lastTriggered}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-blue-400" />
                <p className="text-slate-300 text-sm">Action: {rule.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Engine Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Stream Processing Engine</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Processing Framework</p>
            <p className="text-white">Apache Flink</p>
            <p className="text-slate-500 text-xs mt-1">Stateful stream processing</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">State Backend</p>
            <p className="text-white">Redis Cluster</p>
            <p className="text-slate-500 text-xs mt-1">Distributed state storage</p>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <p className="text-slate-400 text-sm mb-2">Event Time Processing</p>
            <p className="text-white">Enabled</p>
            <p className="text-slate-500 text-xs mt-1">Watermarking for out-of-order data</p>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddRule && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-white text-xl mb-4">Create New Rule</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Rule Name</label>
                  <input
                    type="text"
                    placeholder="e.g., High Temperature Alert"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Device Type</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Temperature</option>
                    <option>Humidity</option>
                    <option>Pressure</option>
                    <option>Flow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm block mb-2">Description</label>
                <textarea
                  placeholder="Describe when this rule should trigger..."
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Condition</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Greater Than</option>
                    <option>Less Than</option>
                    <option>Equal To</option>
                    <option>Rate of Change</option>
                    <option>Deviation from Average</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Threshold Value</label>
                  <input
                    type="number"
                    placeholder="e.g., 30"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Window Type</label>
                  <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Count-based (N data points)</option>
                    <option>Time-based (N minutes)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Window Size</label>
                  <input
                    type="number"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 text-sm block mb-2">Action</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="checkbox" className="rounded" />
                    Send Email Notification
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="checkbox" className="rounded" />
                    Send SMS Alert
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="checkbox" className="rounded" />
                    Send Slack Message
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 text-sm">
                    <input type="checkbox" className="rounded" />
                    Dashboard Alert
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddRule(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Create Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}