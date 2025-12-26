import { useState } from 'react';
import { Plus, Search, LayoutGrid, User, Globe, Edit, Trash2, Copy, Eye } from 'lucide-react';
import type { CustomDashboard } from '../CustomDashboards';

const mockDashboards: CustomDashboard[] = [
  {
    id: 'dash-001',
    name: 'Production Floor Overview',
    description: 'Real-time monitoring of all production floor sensors',
    createdBy: 'John Smith',
    createdAt: '2024-01-10',
    lastModified: '2024-01-20',
    widgets: [],
    layout: 'grid',
    isPublic: true,
  },
  {
    id: 'dash-002',
    name: 'Temperature Monitoring',
    description: 'All temperature sensors across facilities',
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15',
    lastModified: '2024-01-22',
    widgets: [],
    layout: 'grid',
    isPublic: false,
  },
  {
    id: 'dash-003',
    name: 'Building A - HVAC System',
    description: 'HVAC performance and environmental controls',
    createdBy: 'Mike Davis',
    createdAt: '2024-01-18',
    lastModified: '2024-01-23',
    widgets: [],
    layout: 'grid',
    isPublic: true,
  },
];

interface Props {
  organizationId: string;
  userRole: 'admin' | 'operator' | 'developer' | 'viewer';
  onCreateDashboard: () => void;
  onEditDashboard: (dashboard: CustomDashboard) => void;
}

export function DashboardList({ organizationId, userRole, onCreateDashboard, onEditDashboard }: Props) {
  const [dashboards] = useState(mockDashboards);
  const [searchTerm, setSearchTerm] = useState('');

  const canCreate = userRole === 'admin' || userRole === 'operator' || userRole === 'developer';
  const canEdit = userRole === 'admin' || userRole === 'operator';

  const filteredDashboards = dashboards.filter(dash =>
    dash.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dash.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl">Custom Dashboards</h2>
          <p className="text-slate-400 text-sm mt-1">Create personalized dashboards with device-specific widgets</p>
        </div>
        {canCreate && (
          <button
            onClick={onCreateDashboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Dashboard
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Total Dashboards</p>
          <p className="text-white text-3xl mt-1">{dashboards.length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">My Dashboards</p>
          <p className="text-blue-400 text-3xl mt-1">{dashboards.filter(d => d.createdBy === 'John Smith').length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Public Dashboards</p>
          <p className="text-green-400 text-3xl mt-1">{dashboards.filter(d => d.isPublic).length}</p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <p className="text-slate-400 text-sm">Private Dashboards</p>
          <p className="text-purple-400 text-3xl mt-1">{dashboards.filter(d => !d.isPublic).length}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search dashboards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all group"
          >
            {/* Preview Area */}
            <div className="h-32 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <LayoutGrid className="w-12 h-12 text-slate-600" />
              </div>
              {dashboard.isPublic && (
                <div className="absolute top-3 right-3">
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs flex items-center gap-1 border border-green-500/30">
                    <Globe className="w-3 h-3" />
                    Public
                  </div>
                </div>
              )}
              {!dashboard.isPublic && (
                <div className="absolute top-3 right-3">
                  <div className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs flex items-center gap-1 border border-purple-500/30">
                    <User className="w-3 h-3" />
                    Private
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-white mb-2">{dashboard.name}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{dashboard.description}</p>

              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">{dashboard.createdBy.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-400 text-xs">Created by</p>
                  <p className="text-white text-sm truncate">{dashboard.createdBy}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="text-slate-300">{dashboard.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Modified:</span>
                  <span className="text-slate-300">{dashboard.lastModified}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onEditDashboard(dashboard)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                {canEdit && (
                  <button className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                )}
                <button className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
                {canEdit && (
                  <button className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDashboards.length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
          <LayoutGrid className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No dashboards found</p>
          {canCreate && (
            <button
              onClick={onCreateDashboard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create Your First Dashboard
            </button>
          )}
        </div>
      )}
    </div>
  );
}
