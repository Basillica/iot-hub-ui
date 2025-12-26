import { useState } from 'react';
import { DashboardList } from './customDashboard/DashboardList';
import { DashboardBuilder } from './customDashboard/DashboardBuilder';

export interface CustomDashboard {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
  widgets: Widget[];
  layout: 'grid' | 'freeform';
  isPublic: boolean;
}

export interface Widget {
  id: string;
  type: 'line-chart' | 'gauge' | 'value-card' | 'bar-chart' | 'area-chart' | 'table' | 'status-indicator';
  title: string;
  deviceId: string;
  deviceName: string;
  sensorType: string;
  position: { x: number; y: number; w: number; h: number };
  config: {
    refreshInterval?: number;
    showLegend?: boolean;
    min?: number;
    max?: number;
    unit?: string;
    threshold?: { warning: number; critical: number };
    timeRange?: '1h' | '6h' | '24h' | '7d' | '30d';
  };
}

interface Props {
  organizationId: string;
  userRole: 'admin' | 'operator' | 'developer' | 'viewer';
}

export function CustomDashboards({ organizationId, userRole }: Props) {
  const [view, setView] = useState<'list' | 'builder'>('list');
  const [selectedDashboard, setSelectedDashboard] = useState<CustomDashboard | null>(null);

  const handleCreateDashboard = () => {
    const newDashboard: CustomDashboard = {
      id: `dashboard-${Date.now()}`,
      name: 'New Dashboard',
      description: '',
      createdBy: 'John Smith',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      widgets: [],
      layout: 'grid',
      isPublic: false,
    };
    setSelectedDashboard(newDashboard);
    setView('builder');
  };

  const handleEditDashboard = (dashboard: CustomDashboard) => {
    setSelectedDashboard(dashboard);
    setView('builder');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedDashboard(null);
  };

  return (
    <div>
      {view === 'list' ? (
        <DashboardList
          organizationId={organizationId}
          userRole={userRole}
          onCreateDashboard={handleCreateDashboard}
          onEditDashboard={handleEditDashboard}
        />
      ) : (
        <DashboardBuilder
          dashboard={selectedDashboard!}
          organizationId={organizationId}
          userRole={userRole}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}
