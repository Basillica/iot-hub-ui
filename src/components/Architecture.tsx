import { Database, Cloud, Cpu, Zap, Bell, Lock, GitBranch, Server, Layers } from 'lucide-react';

export function Architecture() {
  const components = [
    {
      layer: 'Device Layer',
      icon: Cpu,
      color: 'blue',
      items: [
        { name: 'IoT Devices', description: 'Temperature, humidity, pressure sensors, actuators' },
        { name: 'Communication Protocols', description: 'MQTT, CoAP, HTTP' },
        { name: 'Device Registry', description: 'etcd - distributed key-value store' },
      ],
    },
    {
      layer: 'Security Layer',
      icon: Lock,
      color: 'purple',
      items: [
        { name: 'Authentication', description: 'OAuth 2.0 / JWT tokens' },
        { name: 'Authorization', description: 'RBAC - Role-Based Access Control' },
        { name: 'TLS/SSL', description: 'End-to-end encryption' },
      ],
    },
    {
      layer: 'Ingestion Layer',
      icon: Server,
      color: 'green',
      items: [
        { name: 'MQTT Broker', description: 'EMQX - High-performance message broker' },
        { name: 'Data Ingestion Service', description: 'Go/Rust service for data routing' },
        { name: 'Message Queue', description: 'Apache Kafka for stream buffering' },
      ],
    },
    {
      layer: 'Processing Layer',
      icon: Zap,
      color: 'orange',
      items: [
        { name: 'Stream Processing', description: 'Apache Flink with event-time processing' },
        { name: 'Rule Engine', description: 'Stateful threshold violation detection' },
        { name: 'State Backend', description: 'Redis Cluster for distributed state' },
      ],
    },
    {
      layer: 'Storage Layer',
      icon: Database,
      color: 'pink',
      items: [
        { name: 'Time-Series DB', description: 'TimescaleDB for device data' },
        { name: 'Document Store', description: 'MongoDB for device metadata' },
        { name: 'Cache Layer', description: 'Redis for digital twin state' },
      ],
    },
    {
      layer: 'Application Layer',
      icon: Layers,
      color: 'cyan',
      items: [
        { name: 'Digital Twin Service', description: 'Virtual device state management' },
        { name: 'Notification Service', description: 'Multi-channel alert delivery' },
        { name: 'API Gateway', description: 'REST/GraphQL interface' },
      ],
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600',
    cyan: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl">System Architecture</h2>
        <p className="text-slate-400 text-sm mt-1">Modular IoT architecture designed for Kubernetes deployment</p>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
        <h3 className="text-white mb-6 text-center">Layered Architecture Overview</h3>
        <div className="space-y-6">
          {components.map((component, index) => {
            const Icon = component.icon;
            return (
              <div key={index}>
                {/* Layer Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[component.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white text-lg">{component.layer}</h4>
                </div>

                {/* Layer Components */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-16">
                  {component.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
                    >
                      <h5 className="text-white text-sm mb-1">{item.name}</h5>
                      <p className="text-slate-400 text-xs">{item.description}</p>
                    </div>
                  ))}
                </div>

                {/* Connector */}
                {index < components.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Data Flow Pipeline</h3>
        <div className="flex flex-col md:flex-row items-center gap-4">
          {[
            { label: 'Device', desc: 'Sensor reading', icon: Cpu },
            { label: 'MQTT', desc: 'Message pub/sub', icon: Server },
            { label: 'Kafka', desc: 'Stream buffer', icon: GitBranch },
            { label: 'Flink', desc: 'Processing', icon: Zap },
            { label: 'Storage', desc: 'Persistence', icon: Database },
            { label: 'Alert', desc: 'Notification', icon: Bell },
          ].map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                    <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-white text-sm">{step.label}</p>
                    <p className="text-slate-400 text-xs mt-1">{step.desc}</p>
                  </div>
                </div>
                {index < 5 && (
                  <div className="hidden md:block text-slate-600 text-2xl">→</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Kubernetes Deployment */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Kubernetes Deployment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-slate-300 mb-3">Microservices</h4>
            <div className="space-y-2">
              {[
                'Device Registry Service',
                'Authentication Service',
                'Data Ingestion Service',
                'Stream Processing Service',
                'Digital Twin Service',
                'Rule Engine Service',
                'Notification Service',
              ].map((service, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-400 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {service}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-slate-300 mb-3">Infrastructure</h4>
            <div className="space-y-3">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <p className="text-white text-sm mb-1">Container Orchestration</p>
                <p className="text-slate-400 text-xs">Kubernetes 1.28+ with Helm charts</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <p className="text-white text-sm mb-1">Service Mesh</p>
                <p className="text-slate-400 text-xs">Istio for traffic management</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <p className="text-white text-sm mb-1">Auto-scaling</p>
                <p className="text-slate-400 text-xs">HPA based on CPU/memory and custom metrics</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
                <p className="text-white text-sm mb-1">Load Balancing</p>
                <p className="text-slate-400 text-xs">Nginx Ingress Controller</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-white mb-4">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { category: 'Message Broker', tech: 'EMQX' },
            { category: 'Stream Processing', tech: 'Apache Flink' },
            { category: 'Message Queue', tech: 'Apache Kafka' },
            { category: 'Time-Series DB', tech: 'TimescaleDB' },
            { category: 'State Storage', tech: 'Redis Cluster' },
            { category: 'Service Registry', tech: 'etcd' },
            { category: 'Monitoring', tech: 'Prometheus' },
            { category: 'Visualization', tech: 'Grafana' },
            { category: 'Logging', tech: 'ELK Stack' },
            { category: 'Container', tech: 'Docker' },
            { category: 'Orchestration', tech: 'Kubernetes' },
            { category: 'Auth', tech: 'OAuth 2.0 / JWT' },
          ].map((item, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1">{item.category}</p>
              <p className="text-white text-sm">{item.tech}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Key Features</h3>
          <div className="space-y-2">
            {[
              'Automatic device discovery and registration',
              'Secure authentication with OAuth 2.0 / JWT',
              'Role-based access control (RBAC)',
              'Real-time data ingestion via MQTT/CoAP',
              'Event-time processing for out-of-order data',
              'Watermarking for late-arriving events',
              'Digital twin state synchronization',
              'Stateful rule engine with sliding windows',
              'Multi-channel notification system',
              'Horizontal auto-scaling',
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                <p className="text-slate-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-white mb-4">Scalability & Reliability</h3>
          <div className="space-y-3">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
              <p className="text-white text-sm mb-1">Horizontal Scaling</p>
              <p className="text-slate-400 text-xs">All services designed as stateless microservices for easy scaling</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
              <p className="text-white text-sm mb-1">Fault Tolerance</p>
              <p className="text-slate-400 text-xs">Distributed state backends and message replay capabilities</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
              <p className="text-white text-sm mb-1">High Availability</p>
              <p className="text-slate-400 text-xs">Multi-replica deployments with health checks and auto-recovery</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
              <p className="text-white text-sm mb-1">Load Balancing</p>
              <p className="text-slate-400 text-xs">Intelligent traffic distribution across service instances</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
