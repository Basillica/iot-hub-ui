import { useState } from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Box, 
  Zap, 
  Bell, 
  Network, 
  Activity,
  Settings as SettingsIcon,
  Building2,
  PanelsTopLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Database,
  Server,
  Workflow,
  Sparkles,
  DollarSign,
  Target
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
  children?: MenuItem[];
}

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  userRole: 'admin' | 'operator' | 'developer' | 'viewer';
}

export function Sidebar({ activeTab, onTabChange, collapsed, onToggleCollapse, userRole }: Props) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['analytics', 'management']);

  const menuItems: MenuItem[] = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      children: [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'custom-dashboards', label: 'Custom Dashboards', icon: PanelsTopLeft },
        { id: 'monitoring', label: 'System Monitoring', icon: Activity },
      ],
    },
    {
      id: 'management',
      label: 'Management',
      icon: Server,
      children: [
        { id: 'devices', label: 'Devices', icon: Cpu },
        { id: 'twins', label: 'Digital Twins', icon: Box },
        { id: 'rules', label: 'Rule Engine', icon: Zap },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: Workflow,
      children: [
        { id: 'notifications', label: 'Alerts', icon: Bell, badge: 3 },
        { id: 'architecture', label: 'Architecture', icon: Network },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Database,
      children: [
        { id: 'organizations', label: 'Organizations', icon: Building2 },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
      ],
    },
    {
      id: 'platform',
      label: 'Platform',
      icon: Sparkles,
      children: [
        { id: 'enterprise-features', label: 'Features & Roadmap', icon: Sparkles },
        { id: 'pricing', label: 'Pricing & Plans', icon: DollarSign },
        { id: 'production-readiness', label: 'Production Readiness', icon: Target },
      ],
    },
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-700 transition-all duration-300 z-50 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">IoT Platform</span>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-2">
            {menuItems.map((group) => {
              const GroupIcon = group.icon;
              const isExpanded = isGroupExpanded(group.id);

              return (
                <div key={group.id}>
                  {/* Group Header */}
                  <button
                    onClick={() => !collapsed && toggleGroup(group.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      collapsed ? 'justify-center' : 'justify-between'
                    } hover:bg-slate-800 group`}
                    title={collapsed ? group.label : ''}
                  >
                    <div className="flex items-center gap-3">
                      <GroupIcon className="w-5 h-5 text-slate-400 group-hover:text-slate-300" />
                      {!collapsed && (
                        <span className="text-slate-400 text-sm group-hover:text-slate-300">
                          {group.label}
                        </span>
                      )}
                    </div>
                    {!collapsed && group.children && (
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    )}
                  </button>

                  {/* Group Items */}
                  {group.children && (isExpanded || collapsed) && (
                    <div className={`space-y-1 ${collapsed ? 'mt-1' : 'mt-1 ml-2'}`}>
                      {group.children.map((item) => {
                        const ItemIcon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                              collapsed ? 'justify-center' : ''
                            } ${
                              isActive
                                ? 'bg-blue-600 text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                            title={collapsed ? item.label : ''}
                          >
                            <ItemIcon className="w-4 h-4 flex-shrink-0" />
                            {!collapsed && (
                              <>
                                <span className="text-sm flex-1 text-left">{item.label}</span>
                                {item.badge && (
                                  <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                                    {item.badge}
                                  </span>
                                )}
                              </>
                            )}
                            {collapsed && item.badge && (
                              <div className="absolute right-1 top-1 w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="border-t border-slate-700 p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 bg-slate-800/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">AD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">John Smith</p>
                <p className="text-slate-400 text-xs capitalize">{userRole}</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">AD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}