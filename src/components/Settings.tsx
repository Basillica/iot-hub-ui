import { useState } from 'react';
import { User, Shield, Bell, Database, Cloud, Key, Globe, Save, Plus, Edit, Trash2, UserPlus, Mail } from 'lucide-react';

interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer' | 'developer';
  status: 'active' | 'invited' | 'suspended';
  lastActive: string;
  joinedDate: string;
}

const mockUsers: OrgUser[] = [
  { id: 'U001', name: 'John Smith', email: 'john@acme.com', role: 'admin', status: 'active', lastActive: '5 min ago', joinedDate: '2023-06-15' },
  { id: 'U002', name: 'Sarah Johnson', email: 'sarah@acme.com', role: 'operator', status: 'active', lastActive: '2 hours ago', joinedDate: '2023-07-20' },
  { id: 'U003', name: 'Mike Davis', email: 'mike@acme.com', role: 'developer', status: 'active', lastActive: '1 day ago', joinedDate: '2023-08-10' },
  { id: 'U004', name: 'Emily Chen', email: 'emily@acme.com', role: 'viewer', status: 'active', lastActive: '3 hours ago', joinedDate: '2023-09-05' },
  { id: 'U005', name: 'Alex Brown', email: 'alex@acme.com', role: 'operator', status: 'invited', lastActive: 'Never', joinedDate: '2024-01-15' },
];

export function Settings({ organizationId }: { organizationId: string }) {
  const [activeSection, setActiveSection] = useState('general');
  const [users] = useState(mockUsers);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const sections = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'users', label: 'Users & Permissions', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'storage', label: 'Storage', icon: Database },
    { id: 'deployment', label: 'Deployment', icon: Cloud },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-500/20 text-purple-400';
      case 'operator':
        return 'bg-blue-500/20 text-blue-400';
      case 'developer':
        return 'bg-green-500/20 text-green-400';
      case 'viewer':
        return 'bg-slate-500/20 text-slate-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'invited':
        return 'bg-orange-500/20 text-orange-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl">Organization Settings</h2>
        <p className="text-slate-400 text-sm mt-1">Configure organization-specific parameters, users, and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Organization Name</label>
                    <input
                      type="text"
                      defaultValue="Acme Manufacturing"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Industry</label>
                    <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Manufacturing</option>
                      <option>Logistics</option>
                      <option>Healthcare</option>
                      <option>Energy</option>
                      <option>Agriculture</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Time Zone</label>
                    <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>UTC</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                      <option>Asia/Tokyo</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Data Retention Period (days)</label>
                    <input
                      type="number"
                      defaultValue={90}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="space-y-4">
              {/* User Management Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white">Users & Permissions</h3>
                  <p className="text-slate-400 text-sm mt-1">Manage organization members and their access levels</p>
                </div>
                <button 
                  onClick={() => setShowInviteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Invite User
                </button>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-white text-2xl mt-1">{users.length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <p className="text-slate-400 text-sm">Active</p>
                  <p className="text-green-400 text-2xl mt-1">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <p className="text-slate-400 text-sm">Invited</p>
                  <p className="text-orange-400 text-2xl mt-1">{users.filter(u => u.status === 'invited').length}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
                  <p className="text-slate-400 text-sm">Admins</p>
                  <p className="text-purple-400 text-2xl mt-1">{users.filter(u => u.role === 'admin').length}</p>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">User</th>
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">Role</th>
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">Status</th>
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">Last Active</th>
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">Joined</th>
                        <th className="text-left px-6 py-4 text-slate-400 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">{user.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div>
                                <p className="text-white text-sm">{user.name}</p>
                                <p className="text-slate-400 text-xs">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs capitalize ${getRoleBadgeColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs capitalize ${getStatusBadgeColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-300 text-sm">{user.lastActive}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-300 text-sm">{user.joinedDate}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-slate-600 rounded transition-colors" title="Edit">
                                <Edit className="w-4 h-4 text-slate-400" />
                              </button>
                              <button className="p-1 hover:bg-slate-600 rounded transition-colors" title="Remove">
                                <Trash2 className="w-4 h-4 text-slate-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Role Permissions */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Role-Based Access Control (RBAC)</h3>
                <div className="space-y-4">
                  {[
                    { 
                      role: 'Admin', 
                      color: 'purple', 
                      permissions: ['Full system access', 'User management', 'Organization settings', 'Billing & plans', 'All device operations', 'Rule management', 'API access']
                    },
                    { 
                      role: 'Operator', 
                      color: 'blue', 
                      permissions: ['Device management', 'View analytics', 'Create/edit rules', 'Manage alerts', 'Read-only settings']
                    },
                    { 
                      role: 'Developer', 
                      color: 'green', 
                      permissions: ['API access', 'Rule configuration', 'View devices', 'Integration management', 'Read analytics']
                    },
                    { 
                      role: 'Viewer', 
                      color: 'slate', 
                      permissions: ['Read-only dashboard access', 'View device status', 'View analytics', 'View alerts']
                    },
                  ].map((roleInfo, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white">{roleInfo.role}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          roleInfo.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          roleInfo.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          roleInfo.color === 'green' ? 'bg-green-500/20 text-green-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {users.filter(u => u.role.toLowerCase() === roleInfo.role.toLowerCase()).length} users
                        </span>
                      </div>
                      <div className="space-y-1">
                        {roleInfo.permissions.map((perm, pIndex) => (
                          <div key={pIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                            <p className="text-slate-400 text-sm">{perm}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Authentication Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Authentication Method</label>
                    <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>OAuth 2.0</option>
                      <option>JWT</option>
                      <option>SAML</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      defaultValue={60}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Enable Two-Factor Authentication (2FA)
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Require TLS/SSL for all connections
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      Enable IP whitelisting
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Device Authentication</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Device Auth Protocol</label>
                    <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>X.509 Certificates</option>
                      <option>Pre-shared Keys</option>
                      <option>OAuth 2.0 Client Credentials</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Certificate Validity (days)</label>
                    <input
                      type="number"
                      defaultValue={365}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Email Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">SMTP Server</label>
                    <input
                      type="text"
                      placeholder="smtp.example.com"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm block mb-2">Port</label>
                      <input
                        type="number"
                        defaultValue={587}
                        className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm block mb-2">Encryption</label>
                      <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>TLS</option>
                        <option>SSL</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Slack Integration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Webhook URL</label>
                    <input
                      type="text"
                      placeholder="https://hooks.slack.com/services/..."
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Default Channel</label>
                    <input
                      type="text"
                      placeholder="#iot-alerts"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">SMS Configuration (Twilio)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Account SID</label>
                    <input
                      type="text"
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Auth Token</label>
                    <input
                      type="password"
                      placeholder="••••••••••••••••••••••••••••••••"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'storage' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Database Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'TimescaleDB', type: 'Time-Series', status: 'Connected', usage: '45%' },
                    { name: 'MongoDB', type: 'Document Store', status: 'Connected', usage: '32%' },
                    { name: 'Redis Cluster', type: 'Cache/State', status: 'Connected', usage: '18%' },
                    { name: 'etcd', type: 'Service Registry', status: 'Connected', usage: '8%' },
                  ].map((db, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white text-sm">{db.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-green-400 text-xs">{db.status}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mb-2">{db.type}</p>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: db.usage }}
                        ></div>
                      </div>
                      <p className="text-slate-500 text-xs mt-1">Usage: {db.usage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'deployment' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Kubernetes Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Cluster Name</label>
                    <input
                      type="text"
                      defaultValue="iot-platform-prod"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Namespace</label>
                    <input
                      type="text"
                      defaultValue="iot-platform"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Enable Horizontal Pod Autoscaling (HPA)
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      Enable Service Mesh (Istio)
                    </label>
                    <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      Enable Pod Disruption Budgets
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-white mb-4">Helm Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Chart Version</label>
                    <input
                      type="text"
                      defaultValue="1.2.3"
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Values File</label>
                    <textarea
                      rows={4}
                      placeholder="Custom Helm values..."
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'api' && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">API Keys</h3>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Generate New API Key
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Production Key', key: 'sk_prod_...xyz123', created: '2024-01-15', status: 'active' },
                    { name: 'Development Key', key: 'sk_dev_...abc456', created: '2024-01-10', status: 'active' },
                    { name: 'Testing Key', key: 'sk_test_...def789', created: '2024-01-05', status: 'revoked' },
                  ].map((apiKey, index) => (
                    <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">{apiKey.name}</p>
                          <p className="text-slate-400 text-xs font-mono mt-1">{apiKey.key}</p>
                          <p className="text-slate-500 text-xs mt-1">Created: {apiKey.created}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            apiKey.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {apiKey.status}
                          </span>
                          {apiKey.status === 'active' && (
                            <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors">
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-xl mb-4">Invite New User</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Role</label>
                <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Admin</option>
                  <option>Operator</option>
                  <option>Developer</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Personal Message (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Welcome to our IoT platform..."
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                  Send Invitation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
