import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { DeviceManagement } from './components/DeviceManagement';
import { DigitalTwins } from './components/DigitalTwins';
import { RuleEngine } from './components/RuleEngine';
import { Notifications } from './components/Notifications';
import { Architecture } from './components/Architecture';
import { Monitoring } from './components/Monitoring';
import { Settings } from './components/Settings';
import { Organizations } from './components/Organizations';
import { OrganizationSelector } from './components/OrganizationSelector';
import { CustomDashboards } from './components/CustomDashboards';
import { Sidebar } from './components/Sidebar';
import { PlatformOverview } from './components/PlatformOverview';
import { ProductionReadiness } from './components/ProductionReadiness';
import { Network } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState({
    id: 'org-001',
    name: 'Acme Manufacturing',
    plan: 'enterprise'
  });
  const [currentUser] = useState({
    id: 'U001',
    name: 'John Smith',
    email: 'john@acme.com',
    role: 'admin' as const, // Can be: 'admin' | 'operator' | 'developer' | 'viewer'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard organizationId={selectedOrg.id} />;
      case 'custom-dashboards':
        return <CustomDashboards organizationId={selectedOrg.id} userRole={currentUser.role} />;
      case 'devices':
        return <DeviceManagement organizationId={selectedOrg.id} />;
      case 'twins':
        return <DigitalTwins organizationId={selectedOrg.id} />;
      case 'rules':
        return <RuleEngine organizationId={selectedOrg.id} />;
      case 'notifications':
        return <Notifications organizationId={selectedOrg.id} />;
      case 'architecture':
        return <Architecture />;
      case 'monitoring':
        return <Monitoring />;
      case 'organizations':
        return <Organizations onSelectOrganization={setSelectedOrg} />;
      case 'enterprise-features':
        return <PlatformOverview />;
      case 'pricing':
        return <PlatformOverview />;
      case 'production-readiness':
        return <ProductionReadiness />;
      case 'settings':
        return <Settings organizationId={selectedOrg.id} />;
      default:
        return <Dashboard organizationId={selectedOrg.id} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        userRole={currentUser.role}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="bg-slate-900/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Network className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white">IoT Platform</h1>
                  <p className="text-slate-400 text-sm">Multi-Tenant Device Management & Analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <OrganizationSelector 
                  selectedOrg={selectedOrg} 
                  onSelectOrg={setSelectedOrg}
                />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-300">System Online</span>
                </div>
                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                  <span className="text-sm text-white">AD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}