import { useEffect, useRef, useState } from 'react';

interface NodeConfig {
  title: string;
  icon: string;
  color: string;
  gradient: string;
  in: string[];
  out: string[];
  fields: { label: string; type: string; options?: any[] }[];
}

interface Node {
  id: string;
  type: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

const SENSOR_REGISTRY = [
  { id: "S-101", label: "Boiler Pressure A", type: "pressure", deviceId: "D-001", unit: "PSI" },
  { id: "S-102", label: "Turbine RPM", type: "vibration", deviceId: "D-002", unit: "RPM" },
  { id: "S-103", label: "Line 4 Temp", type: "temperature", deviceId: "D-003", unit: "°C" },
  { id: "S-104", label: "Fuel Level", type: "level", deviceId: "D-004", unit: "%" },
  { id: "S-105", label: "Compressor Flow", type: "flow", deviceId: "D-001", unit: "L/min" },
  { id: "S-106", label: "Cooling Pressure", type: "pressure", deviceId: "D-002", unit: "PSI" },
  { id: "S-107", label: "Ambient Humidity", type: "humidity", deviceId: "D-003", unit: "%" },
  { id: "S-108", label: "Power Consumption", type: "power", deviceId: "D-002", unit: "kW" }
];

const DEVICE_REGISTRY = [
  { id: "D-001", name: "Boiler Unit A", status: "online" },
  { id: "D-002", name: "Turbine Generator", status: "online" },
  { id: "D-003", name: "Production Line 4", status: "online" },
  { id: "D-004", name: "Fuel Storage Tank 3", status: "maintenance" },
  { id: "D-005", name: "Cooling Tower B", status: "online" }
];

const CONFIGS: Record<string, NodeConfig> = {
  // ========== INPUT SOURCES ==========
  source_mqtt: { 
    title: "MQTT", 
    icon: "📡",
    color: "border-l-4 border-l-sky-500", 
    gradient: "from-sky-500/20 to-transparent",
    in: [], 
    out: ["Data"], 
    fields: [
      { label: "Device", type: "select", options: DEVICE_REGISTRY },
      { label: "Sensor", type: "select", options: SENSOR_REGISTRY },
      { label: "QoS", type: "select", options: [{id: "0", name: "At most once"}, {id: "1", name: "At least once"}, {id: "2", name: "Exactly once"}] }
    ] 
  },
  source_http: { 
    title: "HTTP Poller", 
    icon: "🌐",
    color: "border-l-4 border-l-cyan-500", 
    gradient: "from-cyan-500/20 to-transparent",
    in: [], 
    out: ["Data"], 
    fields: [
      { label: "Device", type: "select", options: DEVICE_REGISTRY },
      { label: "Endpoint", type: "text" },
      { label: "Interval (s)", type: "number" }
    ] 
  },
  source_websocket: { 
    title: "WebSocket", 
    icon: "⚡",
    color: "border-l-4 border-l-blue-500", 
    gradient: "from-blue-500/20 to-transparent",
    in: [], 
    out: ["Stream"], 
    fields: [
      { label: "URL", type: "text" },
      { label: "Auto Reconnect", type: "select", options: [{id: "yes", name: "Yes"}, {id: "no", name: "No"}] }
    ] 
  },
  source_coap: { 
    title: "CoAP", 
    icon: "📟",
    color: "border-l-4 border-l-indigo-500", 
    gradient: "from-indigo-500/20 to-transparent",
    in: [], 
    out: ["Data"], 
    fields: [
      { label: "Device", type: "select", options: DEVICE_REGISTRY },
      { label: "Resource Path", type: "text" }
    ] 
  },
  source_database: { 
    title: "DB Query", 
    icon: "🗄️",
    color: "border-l-4 border-l-violet-500", 
    gradient: "from-violet-500/20 to-transparent",
    in: [], 
    out: ["Rows"], 
    fields: [
      { label: "Query", type: "text" },
      { label: "Interval (s)", type: "number" }
    ] 
  },

  // ========== FILTERS ==========
  filter_threshold: { 
    title: "Threshold", 
    icon: "📊",
    color: "border-l-4 border-l-emerald-500", 
    gradient: "from-emerald-500/20 to-transparent",
    in: ["In"], 
    out: ["High", "Low", "Normal"], 
    fields: [
      { label: "Upper Limit", type: "number" },
      { label: "Lower Limit", type: "number" }
    ] 
  },
  filter_roc: { 
    title: "Rate Change", 
    icon: "📈",
    color: "border-l-4 border-l-teal-500", 
    gradient: "from-teal-500/20 to-transparent",
    in: ["In"], 
    out: ["Spike", "Drop"], 
    fields: [
      { label: "Max Δ/s", type: "number" },
      { label: "Window", type: "number" }
    ] 
  },
  filter_moving_avg: { 
    title: "Moving Avg", 
    icon: "〰️",
    color: "border-l-4 border-l-green-500", 
    gradient: "from-green-500/20 to-transparent",
    in: ["In"], 
    out: ["Smoothed"], 
    fields: [
      { label: "Window Size", type: "number" },
      { label: "Type", type: "select", options: [{id: "sma", name: "Simple"}, {id: "ema", name: "Exponential"}] }
    ] 
  },
  filter_outlier: { 
    title: "Outlier Detect", 
    icon: "🎯",
    color: "border-l-4 border-l-lime-500", 
    gradient: "from-lime-500/20 to-transparent",
    in: ["In"], 
    out: ["Outlier", "Normal"], 
    fields: [
      { label: "Std Dev", type: "number" },
      { label: "Method", type: "select", options: [{id: "zscore", name: "Z-Score"}, {id: "iqr", name: "IQR"}] }
    ] 
  },
  filter_debounce: { 
    title: "Debounce", 
    icon: "⏱️",
    color: "border-l-4 border-l-emerald-600", 
    gradient: "from-emerald-600/20 to-transparent",
    in: ["In"], 
    out: ["Out"], 
    fields: [
      { label: "Wait (ms)", type: "number" }
    ] 
  },
  filter_validate: { 
    title: "Validator", 
    icon: "✅",
    color: "border-l-4 border-l-green-600", 
    gradient: "from-green-600/20 to-transparent",
    in: ["In"], 
    out: ["Valid", "Invalid"], 
    fields: [
      { label: "Rule", type: "select", options: [{id: "range", name: "Range"}, {id: "regex", name: "Regex"}, {id: "type", name: "Data Type"}] }
    ] 
  },

  // ========== LOGIC & CEP ==========
  logic_consecutive: { 
    title: "Consecutive", 
    icon: "🔢",
    color: "border-l-4 border-l-amber-500", 
    gradient: "from-amber-500/20 to-transparent",
    in: ["In"], 
    out: ["Trigger"], 
    fields: [
      { label: "Count", type: "number" },
      { label: "Reset on False", type: "select", options: [{id: "yes", name: "Yes"}, {id: "no", name: "No"}] }
    ] 
  },
  logic_deadman: { 
    title: "Heartbeat", 
    icon: "💓",
    color: "border-l-4 border-l-rose-500", 
    gradient: "from-rose-500/20 to-transparent",
    in: ["Ping"], 
    out: ["Timeout", "Alive"], 
    fields: [
      { label: "Timeout (s)", type: "number" }
    ] 
  },
  logic_pattern: { 
    title: "Pattern Match", 
    icon: "🔍",
    color: "border-l-4 border-l-orange-500", 
    gradient: "from-orange-500/20 to-transparent",
    in: ["In"], 
    out: ["Match", "No Match"], 
    fields: [
      { label: "Pattern", type: "text" },
      { label: "Sequence Length", type: "number" }
    ] 
  },
  logic_time_window: { 
    title: "Time Window", 
    icon: "⏰",
    color: "border-l-4 border-l-yellow-500", 
    gradient: "from-yellow-500/20 to-transparent",
    in: ["In"], 
    out: ["Aggregate"], 
    fields: [
      { label: "Duration (s)", type: "number" },
      { label: "Operation", type: "select", options: [{id: "count", name: "Count"}, {id: "sum", name: "Sum"}, {id: "avg", name: "Average"}] }
    ] 
  },
  logic_correlation: { 
    title: "Correlator", 
    icon: "🔗",
    color: "border-l-4 border-l-amber-600", 
    gradient: "from-amber-600/20 to-transparent",
    in: ["A", "B"], 
    out: ["Match"], 
    fields: [
      { label: "Window (s)", type: "number" },
      { label: "Min Correlation", type: "number" }
    ] 
  },
  logic_state_machine: { 
    title: "State Machine", 
    icon: "🔄",
    color: "border-l-4 border-l-orange-600", 
    gradient: "from-orange-600/20 to-transparent",
    in: ["Event"], 
    out: ["State A", "State B"], 
    fields: [
      { label: "States", type: "text" },
      { label: "Initial", type: "text" }
    ] 
  },

  // ========== TRANSFORMATIONS ==========
  transform_unit: { 
    title: "Unit Convert", 
    icon: "⚖️",
    color: "border-l-4 border-l-purple-500", 
    gradient: "from-purple-500/20 to-transparent",
    in: ["In"], 
    out: ["Out"], 
    fields: [
      { label: "From", type: "select", options: [{id: "c", name: "Celsius"}, {id: "f", name: "Fahrenheit"}, {id: "k", name: "Kelvin"}] },
      { label: "To", type: "select", options: [{id: "c", name: "Celsius"}, {id: "f", name: "Fahrenheit"}, {id: "k", name: "Kelvin"}] }
    ] 
  },
  transform_math: { 
    title: "Math Op", 
    icon: "➗",
    color: "border-l-4 border-l-fuchsia-500", 
    gradient: "from-fuchsia-500/20 to-transparent",
    in: ["A", "B"], 
    out: ["Result"], 
    fields: [
      { label: "Operation", type: "select", options: [{id: "add", name: "Add"}, {id: "sub", name: "Subtract"}, {id: "mul", name: "Multiply"}, {id: "div", name: "Divide"}] }
    ] 
  },
  transform_aggregate: { 
    title: "Aggregator", 
    icon: "📦",
    color: "border-l-4 border-l-pink-500", 
    gradient: "from-pink-500/20 to-transparent",
    in: ["In"], 
    out: ["Out"], 
    fields: [
      { label: "Function", type: "select", options: [{id: "sum", name: "Sum"}, {id: "avg", name: "Average"}, {id: "min", name: "Min"}, {id: "max", name: "Max"}] },
      { label: "Batch Size", type: "number" }
    ] 
  },
  transform_json: { 
    title: "JSON Parser", 
    icon: "{ }",
    color: "border-l-4 border-l-violet-600", 
    gradient: "from-violet-600/20 to-transparent",
    in: ["In"], 
    out: ["Parsed"], 
    fields: [
      { label: "Path", type: "text" }
    ] 
  },
  transform_mapper: { 
    title: "Data Mapper", 
    icon: "🗺️",
    color: "border-l-4 border-l-purple-600", 
    gradient: "from-purple-600/20 to-transparent",
    in: ["In"], 
    out: ["Mapped"], 
    fields: [
      { label: "Mapping", type: "text" }
    ] 
  },

  // ========== AI/ML ==========
  ml_anomaly: { 
    title: "Anomaly AI", 
    icon: "🤖",
    color: "border-l-4 border-l-red-500", 
    gradient: "from-red-500/20 to-transparent",
    in: ["Data"], 
    out: ["Anomaly", "Normal"], 
    fields: [
      { label: "Model", type: "select", options: [{id: "isolation", name: "Isolation Forest"}, {id: "autoencoder", name: "Autoencoder"}] },
      { label: "Sensitivity", type: "number" }
    ] 
  },
  ml_predict: { 
    title: "Predictor", 
    icon: "🔮",
    color: "border-l-4 border-l-rose-600", 
    gradient: "from-rose-600/20 to-transparent",
    in: ["In"], 
    out: ["Prediction"], 
    fields: [
      { label: "Model ID", type: "text" },
      { label: "Horizon (min)", type: "number" }
    ] 
  },
  ml_cluster: { 
    title: "Clustering", 
    icon: "🎲",
    color: "border-l-4 border-l-red-600", 
    gradient: "from-red-600/20 to-transparent",
    in: ["Data"], 
    out: ["Cluster ID"], 
    fields: [
      { label: "Algorithm", type: "select", options: [{id: "kmeans", name: "K-Means"}, {id: "dbscan", name: "DBSCAN"}] },
      { label: "K", type: "number" }
    ] 
  },
  ml_classify: { 
    title: "Classifier", 
    icon: "🏷️",
    color: "border-l-4 border-l-pink-600", 
    gradient: "from-pink-600/20 to-transparent",
    in: ["Features"], 
    out: ["Class"], 
    fields: [
      { label: "Model", type: "select", options: [{id: "rf", name: "Random Forest"}, {id: "svm", name: "SVM"}, {id: "nn", name: "Neural Net"}] }
    ] 
  },

  // ========== ACTIONS ==========
  action_webhook: { 
    title: "Webhook", 
    icon: "🔌",
    color: "border-l-4 border-l-indigo-500", 
    gradient: "from-indigo-500/20 to-transparent",
    in: ["Trigger"], 
    out: ["ACK"], 
    fields: [
      { label: "URL", type: "text" },
      { label: "Method", type: "select", options: [{id: "post", name: "POST"}, {id: "put", name: "PUT"}] }
    ] 
  },
  action_ui: { 
    title: "Alert", 
    icon: "🔔",
    color: "border-l-4 border-l-red-500", 
    gradient: "from-red-500/20 to-transparent",
    in: ["Trigger"], 
    out: [], 
    fields: [
      { label: "Message", type: "text" },
      { label: "Priority", type: "select", options: [{id: "low", name: "Low"}, {id: "med", name: "Medium"}, {id: "high", name: "High"}] }
    ] 
  },
  action_email: { 
    title: "Email/SMS", 
    icon: "📧",
    color: "border-l-4 border-l-blue-600", 
    gradient: "from-blue-600/20 to-transparent",
    in: ["Trigger"], 
    out: ["Sent"], 
    fields: [
      { label: "Recipients", type: "text" },
      { label: "Template", type: "text" }
    ] 
  },
  action_slack: { 
    title: "Slack/Teams", 
    icon: "💬",
    color: "border-l-4 border-l-purple-600", 
    gradient: "from-purple-600/20 to-transparent",
    in: ["Trigger"], 
    out: ["Posted"], 
    fields: [
      { label: "Channel", type: "text" },
      { label: "Message", type: "text" }
    ] 
  },
  action_database: { 
    title: "DB Write", 
    icon: "💾",
    color: "border-l-4 border-l-indigo-600", 
    gradient: "from-indigo-600/20 to-transparent",
    in: ["Data"], 
    out: ["Written"], 
    fields: [
      { label: "Table", type: "text" },
      { label: "Batch Size", type: "number" }
    ] 
  },
  action_mqtt_pub: { 
    title: "MQTT Publish", 
    icon: "📤",
    color: "border-l-4 border-l-cyan-600", 
    gradient: "from-cyan-600/20 to-transparent",
    in: ["Data"], 
    out: ["Published"], 
    fields: [
      { label: "Topic", type: "text" },
      { label: "QoS", type: "select", options: [{id: "0", name: "0"}, {id: "1", name: "1"}, {id: "2", name: "2"}] }
    ] 
  },
  action_script: { 
    title: "Execute Script", 
    icon: "⚙️",
    color: "border-l-4 border-l-slate-500", 
    gradient: "from-slate-500/20 to-transparent",
    in: ["Trigger"], 
    out: ["Result"], 
    fields: [
      { label: "Script", type: "text" },
      { label: "Timeout (s)", type: "number" }
    ] 
  },

  // ========== ANALYTICS ==========
  analytics_stats: { 
    title: "Statistics", 
    icon: "📊",
    color: "border-l-4 border-l-blue-400", 
    gradient: "from-blue-400/20 to-transparent",
    in: ["Data"], 
    out: ["Stats"], 
    fields: [
      { label: "Window (s)", type: "number" },
      { label: "Metrics", type: "select", options: [{id: "all", name: "All"}, {id: "basic", name: "Basic"}] }
    ] 
  },
  analytics_timeseries: { 
    title: "Time Series", 
    icon: "📉",
    color: "border-l-4 border-l-cyan-400", 
    gradient: "from-cyan-400/20 to-transparent",
    in: ["Data"], 
    out: ["Series"], 
    fields: [
      { label: "Resolution", type: "select", options: [{id: "1s", name: "1 sec"}, {id: "1m", name: "1 min"}, {id: "1h", name: "1 hour"}] }
    ] 
  },
  analytics_histogram: { 
    title: "Histogram", 
    icon: "📊",
    color: "border-l-4 border-l-sky-400", 
    gradient: "from-sky-400/20 to-transparent",
    in: ["Data"], 
    out: ["Distribution"], 
    fields: [
      { label: "Bins", type: "number" }
    ] 
  },
  analytics_correlation: { 
    title: "Correlation", 
    icon: "🔬",
    color: "border-l-4 border-l-indigo-400", 
    gradient: "from-indigo-400/20 to-transparent",
    in: ["X", "Y"], 
    out: ["Coefficient"], 
    fields: [
      { label: "Method", type: "select", options: [{id: "pearson", name: "Pearson"}, {id: "spearman", name: "Spearman"}] }
    ] 
  }
};

export function VisualRuleBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activePort, setActivePort] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ruleName, setRuleName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial nodes on mount
    addNode('source_mqtt', 50, 200);
    addNode('logic_consecutive', 400, 200);
    addNode('action_webhook', 750, 200);
  }, []);

  const addNode = (type: string, x?: number, y?: number) => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type,
      x: x ?? 100,
      y: y ?? 150
    };
    setNodes(prev => [...prev, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setConnections(prev => prev.filter(c => !c.from.includes(id) && !c.to.includes(id)));
  };

  const handlePortClick = (portId: string, portType: string, nodeId: string) => {
    if (!activePort) {
      setActivePort(portId);
    } else {
      const activeEl = document.getElementById(activePort);
      if (!activeEl) return;
      
      const activeType = activeEl.dataset.type;
      const activeNode = activeEl.dataset.node;
      
      if (activeType !== portType && activeNode !== nodeId) {
        const from = activeType === 'out' ? activePort : portId;
        const to = activeType === 'in' ? activePort : portId;
        setConnections(prev => [...prev, { from, to }]);
      }
      setActivePort(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    setDraggingNode(nodeId);
    setOffset({ 
      x: e.clientX - node.x, 
      y: e.clientY - node.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNode) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      setNodes(prev => prev.map(n => 
        n.id === draggingNode ? { ...n, x, y } : n
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  const drawWires = () => {
    return connections.map((conn, idx) => {
      const fromEl = document.getElementById(conn.from);
      const toEl = document.getElementById(conn.to);
      
      if (!fromEl || !toEl || !workspaceRef.current) return null;
      
      const r1 = fromEl.getBoundingClientRect();
      const r2 = toEl.getBoundingClientRect();
      const workspaceRect = workspaceRef.current.getBoundingClientRect();
      
      const x1 = r1.left - workspaceRect.left + 6;
      const y1 = r1.top - workspaceRect.top + 6;
      const x2 = r2.left - workspaceRect.left + 6;
      const y2 = r2.top - workspaceRect.top + 6;
      
      const path = `M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`;
      
      return (
        <path
          key={idx}
          d={path}
          className="wire"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeDasharray="6"
        />
      );
    });
  };

  return (
    <>
      <style>{`
        :root { 
          --bg: #0b0f1a; 
          --card: #161b2b; 
          --accent: #38bdf8; 
          --border: #2d3548;
          --text-dim: #94a3b8;
        }

        .nav-item {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          cursor: pointer;
          position: relative;
          background: #1e293b;
          transition: all 0.2s;
        }
        .nav-item:hover { 
          background: var(--accent); 
          color: black; 
        }

        .sub-menu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 240px;
          max-height: 500px;
          overflow-y: auto;
          background: var(--card);
          border: 1px solid var(--border);
          display: none;
          padding: 10px 0;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
          border-radius: 0 0 8px 8px;
          z-index: 2000;
          margin-top: 4px;
        }
        .nav-item:hover .sub-menu { 
          display: block; 
        }

        /* Custom scrollbar for submenu */
        .sub-menu::-webkit-scrollbar {
          width: 6px;
        }
        .sub-menu::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 3px;
        }
        .sub-menu::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .sub-menu::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        .sub-item {
          padding: 10px 20px;
          font-size: 13px;
          color: var(--text-dim);
          transition: all 0.2s;
          cursor: pointer;
          white-space: nowrap;
        }
        .sub-item:hover { 
          background: #1e293b; 
          color: var(--accent); 
          border-left: 3px solid var(--accent); 
        }
        
        .menu-cat { 
          padding: 8px 20px; 
          font-size: 10px; 
          font-weight: 800; 
          color: #475569; 
          text-transform: uppercase; 
          letter-spacing: 1px;
        }

        .port { 
          width: 12px;
          height: 12px;
          background: #475569;
          border: 2px solid var(--card);
          border-radius: 4px; 
          position: absolute;
          cursor: crosshair;
          transition: all 0.2s;
          z-index: 20; 
        }
        .port:hover { 
          background: var(--accent); 
          transform: scale(1.4); 
        }
        .port.active { 
          background: #fbbf24; 
          box-shadow: 0 0 8px #fbbf24; 
        }
        .in-p { left: -7px; }
        .out-p { right: -7px; }

        .wire { 
          animation: dash 5s linear infinite; 
        }
        @keyframes dash { 
          to { stroke-dashoffset: -60; } 
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 200px)', overflow: 'hidden', background: '#0b0f1a', position: 'relative', borderRadius: '12px', border: '1px solid #2d3548' }}>
        {/* Top Toolbar */}
        <nav style={{
          width: '100%',
          height: '70px',
          background: '#161b2b',
          borderBottom: '1px solid #2d3548',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px'
        }}>
          <div style={{ fontSize: '24px', color: '#38bdf8', fontWeight: 900, marginRight: '12px' }}>𝚴</div>
          
          {/* Input Sources */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>📥</span>
            <div className="sub-menu">
              <div className="menu-cat">Input Sources</div>
              <div className="sub-item" onClick={() => addNode('source_mqtt')}>📡 MQTT Subscriber</div>
              <div className="sub-item" onClick={() => addNode('source_http')}>🌐 HTTP API Poller</div>
              <div className="sub-item" onClick={() => addNode('source_websocket')}>⚡ WebSocket Stream</div>
              <div className="sub-item" onClick={() => addNode('source_coap')}>📟 CoAP Endpoint</div>
              <div className="sub-item" onClick={() => addNode('source_database')}>🗄️ Database Query</div>
            </div>
          </div>

          {/* Filters */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>🔍</span>
            <div className="sub-menu">
              <div className="menu-cat">Stream Filters</div>
              <div className="sub-item" onClick={() => addNode('filter_threshold')}>📊 Threshold</div>
              <div className="sub-item" onClick={() => addNode('filter_roc')}>📈 Rate of Change</div>
              <div className="sub-item" onClick={() => addNode('filter_moving_avg')}>〰️ Moving Average</div>
              <div className="sub-item" onClick={() => addNode('filter_outlier')}>🎯 Outlier Detection</div>
              <div className="sub-item" onClick={() => addNode('filter_debounce')}>⏱️ Debounce</div>
              <div className="sub-item" onClick={() => addNode('filter_validate')}>✅ Data Validator</div>
            </div>
          </div>

          {/* Logic & CEP */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>🧠</span>
            <div className="sub-menu">
              <div className="menu-cat">Logic & CEP</div>
              <div className="sub-item" onClick={() => addNode('logic_consecutive')}>🔢 Consecutive Points</div>
              <div className="sub-item" onClick={() => addNode('logic_deadman')}>💓 Heartbeat Check</div>
              <div className="sub-item" onClick={() => addNode('logic_pattern')}>🔍 Pattern Matching</div>
              <div className="sub-item" onClick={() => addNode('logic_time_window')}>⏰ Time Window</div>
              <div className="sub-item" onClick={() => addNode('logic_correlation')}>🔗 Event Correlator</div>
              <div className="sub-item" onClick={() => addNode('logic_state_machine')}>🔄 State Machine</div>
            </div>
          </div>

          {/* Transformations */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>🔧</span>
            <div className="sub-menu">
              <div className="menu-cat">Transformations</div>
              <div className="sub-item" onClick={() => addNode('transform_unit')}>⚖️ Unit Converter</div>
              <div className="sub-item" onClick={() => addNode('transform_math')}>➗ Math Operations</div>
              <div className="sub-item" onClick={() => addNode('transform_aggregate')}>📦 Aggregator</div>
              <div className="sub-item" onClick={() => addNode('transform_json')}>{"{ }"} JSON Parser</div>
              <div className="sub-item" onClick={() => addNode('transform_mapper')}>🗺️ Data Mapper</div>
            </div>
          </div>

          {/* AI/ML */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>🤖</span>
            <div className="sub-menu">
              <div className="menu-cat">AI & Machine Learning</div>
              <div className="sub-item" onClick={() => addNode('ml_anomaly')}>🤖 Anomaly Detection</div>
              <div className="sub-item" onClick={() => addNode('ml_predict')}>🔮 Predictive Model</div>
              <div className="sub-item" onClick={() => addNode('ml_cluster')}>🎲 Clustering</div>
              <div className="sub-item" onClick={() => addNode('ml_classify')}>🏷️ Classifier</div>
            </div>
          </div>

          {/* Analytics */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>📊</span>
            <div className="sub-menu">
              <div className="menu-cat">Analytics</div>
              <div className="sub-item" onClick={() => addNode('analytics_stats')}>📊 Statistical Analysis</div>
              <div className="sub-item" onClick={() => addNode('analytics_timeseries')}>📉 Time Series</div>
              <div className="sub-item" onClick={() => addNode('analytics_histogram')}>📊 Histogram</div>
              <div className="sub-item" onClick={() => addNode('analytics_correlation')}>🔬 Correlation Matrix</div>
            </div>
          </div>

          {/* Actions */}
          <div className="nav-item">
            <span style={{ fontSize: '20px' }}>🚀</span>
            <div className="sub-menu">
              <div className="menu-cat">Actions</div>
              <div className="sub-item" onClick={() => addNode('action_webhook')}>🔌 Webhook</div>
              <div className="sub-item" onClick={() => addNode('action_ui')}>🔔 Dashboard Alert</div>
              <div className="sub-item" onClick={() => addNode('action_email')}>📧 Email/SMS</div>
              <div className="sub-item" onClick={() => addNode('action_slack')}>💬 Slack/Teams</div>
              <div className="sub-item" onClick={() => addNode('action_database')}>💾 Database Write</div>
              <div className="sub-item" onClick={() => addNode('action_mqtt_pub')}>📤 MQTT Publish</div>
              <div className="sub-item" onClick={() => addNode('action_script')}>⚙️ Execute Script</div>
            </div>
          </div>
        </nav>

        {/* Workspace */}
        <div 
          ref={workspaceRef}
          style={{
            width: '100%',
            height: 'calc(100% - 70px)',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'radial-gradient(#2d3548 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* SVG Layer for wires */}
          <svg 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            {drawWires()}
          </svg>

          {/* Nodes */}
          {nodes.map(node => {
            const cfg = CONFIGS[node.type];
            if (!cfg) return null;

            return (
              <div
                key={node.id}
                className={`node ${cfg.color}`}
                style={{
                  position: 'absolute',
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: '220px',
                  background: 'linear-gradient(135deg, #1a1f2e 0%, #161b2b 100%)',
                  border: '1px solid #2d3548',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  zIndex: draggingNode === node.id ? 1000 : 10,
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#38bdf8';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(56, 189, 248, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2d3548';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
                }}
              >
                {/* Node Header */}
                <div
                  className="node-header"
                  style={{
                    padding: '6px 10px',
                    background: `linear-gradient(135deg, ${cfg.gradient})`,
                    borderBottom: '1px solid #2d3548',
                    cursor: 'grab',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '8px 8px 0 0'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{cfg.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                      {cfg.title}
                    </span>
                  </div>
                  <button
                    onClick={() => removeNode(node.id)}
                    className="hover:text-red-400 text-slate-500 text-sm leading-none"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Node Body */}
                <div className="node-body" style={{ padding: '8px 10px' }}>
                  {cfg.fields.map((field, idx) => (
                    <div key={idx} style={{ marginBottom: idx < cfg.fields.length - 1 ? '6px' : 0 }}>
                      <label style={{
                        display: 'block',
                        fontSize: '8px',
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        marginBottom: '2px',
                        letterSpacing: '0.5px'
                      }}>
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select style={{
                          background: '#0b0f1a',
                          border: '1px solid #334155',
                          color: '#cbd5e1',
                          width: '100%',
                          padding: '4px 6px',
                          borderRadius: '4px',
                          fontSize: '10px'
                        }}>
                          {field.options?.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.name || opt.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          placeholder="Value..."
                          style={{
                            background: '#0b0f1a',
                            border: '1px solid #334155',
                            color: '#cbd5e1',
                            width: '100%',
                            padding: '4px 6px',
                            borderRadius: '4px',
                            fontSize: '10px'
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Input Ports */}
                {cfg.in.map((label, i) => (
                  <div key={`in-${i}`}>
                    <div
                      id={`${node.id}-in-${i}`}
                      className={`port in-p ${activePort === `${node.id}-in-${i}` ? 'active' : ''}`}
                      data-node={node.id}
                      data-type="in"
                      style={{ top: `${35 + i * 18}px` }}
                      onClick={() => handlePortClick(`${node.id}-in-${i}`, 'in', node.id)}
                    />
                    <span 
                      className="text-[8px] absolute left-3 text-slate-600"
                      style={{ top: `${34 + i * 18}px`, fontWeight: 600 }}
                    >
                      {label}
                    </span>
                  </div>
                ))}

                {/* Output Ports */}
                {cfg.out.map((label, i) => (
                  <div key={`out-${i}`}>
                    <div
                      id={`${node.id}-out-${i}`}
                      className={`port out-p ${activePort === `${node.id}-out-${i}` ? 'active' : ''}`}
                      data-node={node.id}
                      data-type="out"
                      style={{ top: `${35 + i * 18}px` }}
                      onClick={() => handlePortClick(`${node.id}-out-${i}`, 'out', node.id)}
                    />
                    <span 
                      className="text-[8px] absolute right-3 text-slate-600"
                      style={{ top: `${34 + i * 18}px`, fontWeight: 600 }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}