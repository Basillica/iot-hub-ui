import { RefreshCw, Share2, Download, Maximize2 } from 'lucide-react';
import type { CustomDashboard } from '../CustomDashboards';
import { LiveWidgetRenderer } from './LiveWidgetRenderer';

interface Props {
  dashboard: CustomDashboard;
}

export function DashboardViewer({ dashboard }: Props) {
  const handleRefresh = () => {
    // Force refresh all widgets - in real app, this would trigger data refetch
    window.location.reload();
  };

  const handleShare = () => {
    alert('Share functionality would copy dashboard link to clipboard');
  };

  const handleExport = () => {
    alert('Export functionality would download dashboard as PDF');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-white text-2xl">{dashboard.name}</h2>
          {dashboard.description && (
            <p className="text-slate-400 text-sm mt-1">{dashboard.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors"
            title="Refresh all widgets"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors"
            title="Share dashboard"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors"
            title="Export dashboard"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg transition-colors"
            title="Fullscreen mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dashboard Info */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400">Created by:</span>
              <span className="text-white ml-2">{dashboard.createdBy}</span>
            </div>
            <div>
              <span className="text-slate-400">Last updated:</span>
              <span className="text-white ml-2">{dashboard.lastModified}</span>
            </div>
            <div>
              <span className="text-slate-400">Widgets:</span>
              <span className="text-white ml-2">{dashboard.widgets.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live Data Stream</span>
          </div>
        </div>
      </div>

      {/* Widgets Grid */}
      {dashboard.widgets.length === 0 ? (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
          <p className="text-slate-400">This dashboard has no widgets</p>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {dashboard.widgets.map((widget) => (
            <div
              key={widget.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-all"
              style={{
                gridColumn: `span ${widget.position.w}`,
              }}
            >
              {/* Widget Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                <div>
                  <h4 className="text-white">{widget.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{widget.deviceName}</p>
                </div>
              </div>

              {/* Widget Content */}
              <div className="p-4">
                <LiveWidgetRenderer widget={widget} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
