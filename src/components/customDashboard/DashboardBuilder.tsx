import { useState } from 'react';
import { ArrowLeft, Save, Plus, Settings, Eye, Grid3x3, Trash2 } from 'lucide-react';
import type { CustomDashboard, Widget } from '../CustomDashboards';
import { EnhancedWidgetSelector } from './EnhancedWidgetSelector';
import { LiveWidgetRenderer } from './LiveWidgetRenderer';

interface Props {
  dashboard: CustomDashboard;
  organizationId: string;
  userRole: 'admin' | 'operator' | 'developer' | 'viewer';
  onBack: () => void;
}

export function DashboardBuilder({ dashboard, organizationId, userRole, onBack }: Props) {
  const [currentDashboard, setCurrentDashboard] = useState(dashboard);
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const canEdit = userRole === 'admin' || userRole === 'operator' || userRole === 'developer';

  const handleAddWidget = (widget: Widget) => {
    // Find next available position in grid
    const existingWidgets = currentDashboard.widgets;
    let x = 0;
    let y = 0;
    
    // Simple grid positioning logic
    if (existingWidgets.length > 0) {
      const lastWidget = existingWidgets[existingWidgets.length - 1];
      x = (lastWidget.position.x + lastWidget.position.w) % 12;
      y = lastWidget.position.y + (lastWidget.position.x + lastWidget.position.w >= 12 ? lastWidget.position.h : 0);
    }

    const newWidget = {
      ...widget,
      position: { x, y, w: 4, h: 2 }
    };

    setCurrentDashboard({
      ...currentDashboard,
      widgets: [...currentDashboard.widgets, newWidget],
      lastModified: new Date().toISOString(),
    });
    setShowWidgetSelector(false);
  };

  const handleRemoveWidget = (widgetId: string) => {
    setCurrentDashboard({
      ...currentDashboard,
      widgets: currentDashboard.widgets.filter(w => w.id !== widgetId),
      lastModified: new Date().toISOString(),
    });
  };

  const handleUpdateWidget = (updatedWidget: Widget) => {
    setCurrentDashboard({
      ...currentDashboard,
      widgets: currentDashboard.widgets.map(w => 
        w.id === updatedWidget.id ? updatedWidget : w
      ),
      lastModified: new Date().toISOString(),
    });
    setEditingWidget(null);
  };

  const handleSaveDashboard = () => {
    // In real app, save to backend
    console.log('Saving dashboard:', currentDashboard);
    alert('Dashboard saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <input
              type="text"
              value={currentDashboard.name}
              onChange={(e) => setCurrentDashboard({ ...currentDashboard, name: e.target.value })}
              className="text-white text-2xl bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              disabled={!canEdit}
            />
            <input
              type="text"
              value={currentDashboard.description}
              onChange={(e) => setCurrentDashboard({ ...currentDashboard, description: e.target.value })}
              className="text-slate-400 text-sm bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 mt-1 w-full"
              placeholder="Add description..."
              disabled={!canEdit}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              previewMode
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          {canEdit && (
            <>
              <button
                onClick={() => setShowWidgetSelector(true)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                disabled={previewMode}
              >
                <Plus className="w-4 h-4" />
                Add Widget
              </button>
              <button
                onClick={handleSaveDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            </>
          )}
        </div>
      </div>

      {/* Dashboard Settings Bar */}
      {!previewMode && canEdit && (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 text-sm">Layout:</span>
              <select
                value={currentDashboard.layout}
                onChange={(e) => setCurrentDashboard({ ...currentDashboard, layout: e.target.value as any })}
                className="px-3 py-1 bg-slate-900 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="grid">Grid</option>
                <option value="freeform">Freeform</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-300 text-sm">Visibility:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentDashboard.isPublic}
                  onChange={(e) => setCurrentDashboard({ ...currentDashboard, isPublic: e.target.checked })}
                  className="rounded"
                />
                <span className="text-slate-300 text-sm">Public Dashboard</span>
              </label>
            </div>

            <div className="ml-auto text-slate-400 text-sm">
              {currentDashboard.widgets.length} widget{currentDashboard.widgets.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      {/* Widgets Grid */}
      {currentDashboard.widgets.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
          <Grid3x3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-white text-lg mb-2">No widgets yet</h3>
          <p className="text-slate-400 mb-6">Start building your dashboard by adding widgets</p>
          {canEdit && !previewMode && (
            <button
              onClick={() => setShowWidgetSelector(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Your First Widget
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {currentDashboard.widgets.map((widget) => (
            <div
              key={widget.id}
              className={`col-span-${widget.position.w} bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all`}
              style={{
                gridColumn: `span ${widget.position.w}`,
              }}
            >
              {/* Widget Header */}
              {!previewMode && (
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700 bg-slate-900/30">
                  <h4 className="text-white text-sm">{widget.title}</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingWidget(widget)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                    </button>
                    {canEdit && (
                      <button
                        onClick={() => handleRemoveWidget(widget.id)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Widget Content */}
              <div className="p-4">
                <LiveWidgetRenderer widget={widget} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Widget Selector Modal */}
      {showWidgetSelector && (
        <EnhancedWidgetSelector
          organizationId={organizationId}
          userRole={userRole}
          onSelect={handleAddWidget}
          onClose={() => setShowWidgetSelector(false)}
        />
      )}

      {/* Widget Editor Modal */}
      {editingWidget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-white text-xl mb-4">Edit Widget</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Widget Title</label>
                <input
                  type="text"
                  value={editingWidget.title}
                  onChange={(e) => setEditingWidget({ ...editingWidget, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Width (columns)</label>
                  <select
                    value={editingWidget.position.w}
                    onChange={(e) => setEditingWidget({
                      ...editingWidget,
                      position: { ...editingWidget.position, w: parseInt(e.target.value) }
                    })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[3, 4, 6, 8, 12].map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 text-sm block mb-2">Time Range</label>
                  <select
                    value={editingWidget.config.timeRange || '24h'}
                    onChange={(e) => setEditingWidget({
                      ...editingWidget,
                      config: { ...editingWidget.config, timeRange: e.target.value as any }
                    })}
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1h">Last Hour</option>
                    <option value="6h">Last 6 Hours</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                </div>
              </div>

              {editingWidget.type === 'gauge' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Min Value</label>
                    <input
                      type="number"
                      value={editingWidget.config.min || 0}
                      onChange={(e) => setEditingWidget({
                        ...editingWidget,
                        config: { ...editingWidget.config, min: parseFloat(e.target.value) }
                      })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 text-sm block mb-2">Max Value</label>
                    <input
                      type="number"
                      value={editingWidget.config.max || 100}
                      onChange={(e) => setEditingWidget({
                        ...editingWidget,
                        config: { ...editingWidget.config, max: parseFloat(e.target.value) }
                      })}
                      className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setEditingWidget(null)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateWidget(editingWidget)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}