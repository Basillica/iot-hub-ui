import { useState } from 'react';
import { Building2, Users, Cpu, Crown, Plus, Settings, ExternalLink, MoreVertical, Edit, Trash2 } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  users: number;
  devices: number;
  created: string;
  status: 'active' | 'suspended';
}

const mockOrganizations: Organization[] = [
  {
    id: 'org-001',
    name: 'Acme Manufacturing',
    plan: 'enterprise',
    users: 45,
    devices: 260,
    created: '2023-06-15',
    status: 'active',
  },
  {
    id: 'org-002',
    name: 'TechCorp Industries',
    plan: 'professional',
    users: 18,
    devices: 125,
    created: '2023-09-22',
    status: 'active',
  },
  {
    id: 'org-003',
    name: 'Global Logistics Inc',
    plan: 'enterprise',
    users: 62,
    devices: 485,
    created: '2023-03-10',
    status: 'active',
  },
  {
    id: 'org-004',
    name: 'Smart Factory Solutions',
    plan: 'starter',
    users: 8,
    devices: 42,
    created: '2024-01-05',
    status: 'active',
  },
];

interface Props {
  onSelectOrganization: (org: { id: string; name: string; plan: string }) => void;
}

export function Organizations({ onSelectOrganization }: Props) {
  const [organizations] = useState(mockOrganizations);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'from-purple-500 to-purple-600';
      case 'professional':
        return 'from-blue-500 to-blue-600';
      case 'starter':
        return 'from-green-500 to-green-600';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'professional':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'starter':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl">Organizations</h2>
          <p className="text-slate-400 text-sm mt-1">Manage multi-tenant organizations and their resources</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Organization
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Organizations</p>
          <p className="text-white text-3xl mt-1">{organizations.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Users</p>
          <p className="text-blue-400 text-3xl mt-1">{organizations.reduce((sum, o) => sum + o.users, 0)}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Devices</p>
          <p className="text-purple-400 text-3xl mt-1">{organizations.reduce((sum, o) => sum + o.devices, 0)}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Active Organizations</p>
          <p className="text-green-400 text-3xl mt-1">{organizations.filter(o => o.status === 'active').length}</p>
        </div>
      </div>

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all"
          >
            {/* Card Header */}
            <div className={`h-24 bg-gradient-to-br ${getPlanColor(org.plan)} relative`}>
              <div className="absolute top-3 right-3">
                <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute -bottom-6 left-6">
                <div className="w-16 h-16 bg-slate-800 border-4 border-slate-900 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 pt-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white text-lg mb-1">{org.name}</h3>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 border rounded text-xs capitalize ${getPlanBadgeColor(org.plan)}`}>
                    {org.plan === 'enterprise' && <Crown className="w-3 h-3" />}
                    {org.plan} Plan
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Users className="w-4 h-4" />
                    <span>Users</span>
                  </div>
                  <span className="text-white">{org.users}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Cpu className="w-4 h-4" />
                    <span>Devices</span>
                  </div>
                  <span className="text-white">{org.devices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Status</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${org.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm capitalize ${org.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                      {org.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                  <span className="text-slate-400 text-sm">Created</span>
                  <span className="text-slate-300 text-sm">{org.created}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onSelectOrganization({ id: org.id, name: org.name, plan: org.plan })}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </button>
                <button className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plan Comparison */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Plan Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-sm">Feature</th>
                <th className="text-center px-4 py-3 text-slate-400 text-sm">Starter</th>
                <th className="text-center px-4 py-3 text-slate-400 text-sm">Professional</th>
                <th className="text-center px-4 py-3 text-slate-400 text-sm">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Max Devices', starter: '50', professional: '200', enterprise: 'Unlimited' },
                { feature: 'Max Users', starter: '10', professional: '50', enterprise: 'Unlimited' },
                { feature: 'Data Retention', starter: '30 days', professional: '90 days', enterprise: 'Custom' },
                { feature: 'Digital Twins', starter: '✓', professional: '✓', enterprise: '✓' },
                { feature: 'Rule Engine', starter: 'Basic', professional: 'Advanced', enterprise: 'Advanced' },
                { feature: 'Multi-Channel Alerts', starter: '✗', professional: '✓', enterprise: '✓' },
                { feature: 'Custom Integrations', starter: '✗', professional: '✗', enterprise: '✓' },
                { feature: 'Dedicated Support', starter: '✗', professional: '✗', enterprise: '✓' },
                { feature: 'SLA', starter: '99%', professional: '99.5%', enterprise: '99.9%' },
              ].map((row, index) => (
                <tr key={index} className="border-b border-slate-700/50">
                  <td className="px-4 py-3 text-slate-300 text-sm">{row.feature}</td>
                  <td className="px-4 py-3 text-slate-400 text-sm text-center">{row.starter}</td>
                  <td className="px-4 py-3 text-slate-400 text-sm text-center">{row.professional}</td>
                  <td className="px-4 py-3 text-slate-400 text-sm text-center">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Organization Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-white text-xl mb-4">Create New Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Organization Name</label>
                <input
                  type="text"
                  placeholder="e.g., Acme Corporation"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Plan</label>
                <select className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Starter</option>
                  <option>Professional</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Admin Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <option>Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Create Organization
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
