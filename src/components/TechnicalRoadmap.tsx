import { 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  Zap, 
  GitBranch,
  Box,
  Cpu,
  Globe,
  CheckCircle2,
  Circle
} from 'lucide-react';

interface TechStackItem {
  category: string;
  icon: any;
  items: {
    name: string;
    purpose: string;
    status: 'implemented' | 'planned' | 'evaluating';
  }[];
}

const TECH_STACK: TechStackItem[] = [
  {
    category: 'Backend & APIs',
    icon: Code,
    items: [
      { name: 'Node.js + Express / FastAPI (Python)', purpose: 'REST API servers with high concurrency', status: 'implemented' },
      { name: 'GraphQL + Apollo', purpose: 'Flexible data queries, reduce over-fetching', status: 'implemented' },
      { name: 'gRPC', purpose: 'High-performance inter-service communication', status: 'planned' },
      { name: 'WebSocket (Socket.io)', purpose: 'Real-time bidirectional communication', status: 'implemented' },
      { name: 'Bull / Redis Queue', purpose: 'Background job processing, task queues', status: 'implemented' },
    ]
  },
  {
    category: 'Data Storage',
    icon: Database,
    items: [
      { name: 'PostgreSQL + TimescaleDB', purpose: 'Time-series data, relational data, hypertables', status: 'implemented' },
      { name: 'InfluxDB', purpose: 'High-write throughput time-series (100K+ points/sec)', status: 'implemented' },
      { name: 'MongoDB', purpose: 'Flexible schema for device metadata, configurations', status: 'implemented' },
      { name: 'Redis', purpose: 'Caching, session management, real-time leaderboards', status: 'implemented' },
      { name: 'Elasticsearch', purpose: 'Full-text search, log aggregation, analytics', status: 'implemented' },
      { name: 'S3 / MinIO', purpose: 'Object storage for files, images, exports', status: 'implemented' },
      { name: 'ClickHouse', purpose: 'OLAP queries, big data analytics at scale', status: 'evaluating' },
    ]
  },
  {
    category: 'Message Brokers & Streaming',
    icon: Zap,
    items: [
      { name: 'Apache Kafka', purpose: 'Event streaming, high-throughput data pipelines', status: 'implemented' },
      { name: 'Apache Flink', purpose: 'Stream processing, real-time analytics', status: 'implemented' },
      { name: 'MQTT (Mosquitto / HiveMQ)', purpose: 'Lightweight IoT device communication', status: 'implemented' },
      { name: 'RabbitMQ', purpose: 'Message queueing, task distribution', status: 'implemented' },
      { name: 'NATS', purpose: 'Edge computing, low-latency messaging', status: 'planned' },
    ]
  },
  {
    category: 'AI/ML & Analytics',
    icon: Box,
    items: [
      { name: 'TensorFlow / PyTorch', purpose: 'Deep learning models, neural networks', status: 'implemented' },
      { name: 'scikit-learn', purpose: 'Classical ML algorithms, preprocessing', status: 'implemented' },
      { name: 'MLflow', purpose: 'ML lifecycle management, model registry', status: 'implemented' },
      { name: 'Apache Spark', purpose: 'Big data processing, batch ML training', status: 'planned' },
      { name: 'Prophet / LSTM', purpose: 'Time-series forecasting', status: 'implemented' },
      { name: 'Isolation Forest / Autoencoders', purpose: 'Anomaly detection algorithms', status: 'implemented' },
      { name: 'ONNX Runtime', purpose: 'Cross-platform ML inference optimization', status: 'planned' },
    ]
  },
  {
    category: 'Edge Computing',
    icon: Cpu,
    items: [
      { name: 'Kubernetes (K3s)', purpose: 'Lightweight container orchestration at edge', status: 'implemented' },
      { name: 'Docker', purpose: 'Application containerization', status: 'implemented' },
      { name: 'EdgeX Foundry', purpose: 'Open-source edge computing framework', status: 'evaluating' },
      { name: 'TensorFlow Lite', purpose: 'On-device ML inference', status: 'implemented' },
      { name: 'Node-RED', purpose: 'Visual edge workflow automation', status: 'planned' },
    ]
  },
  {
    category: 'Cloud Infrastructure',
    icon: Cloud,
    items: [
      { name: 'Kubernetes (EKS / GKE / AKS)', purpose: 'Container orchestration, auto-scaling', status: 'implemented' },
      { name: 'Terraform', purpose: 'Infrastructure as code, multi-cloud deployment', status: 'implemented' },
      { name: 'Helm', purpose: 'Kubernetes package management', status: 'implemented' },
      { name: 'AWS / Azure / GCP Services', purpose: 'Cloud-native services (Lambda, S3, etc.)', status: 'implemented' },
      { name: 'Prometheus + Grafana', purpose: 'Metrics collection, system monitoring', status: 'implemented' },
      { name: 'ELK Stack (Elasticsearch, Logstash, Kibana)', purpose: 'Centralized logging and analysis', status: 'implemented' },
      { name: 'Jaeger / OpenTelemetry', purpose: 'Distributed tracing, APM', status: 'implemented' },
    ]
  },
  {
    category: 'Security & Auth',
    icon: Shield,
    items: [
      { name: 'OAuth 2.0 / OpenID Connect', purpose: 'Standard authentication protocol', status: 'implemented' },
      { name: 'JWT', purpose: 'Stateless token-based authentication', status: 'implemented' },
      { name: 'Keycloak', purpose: 'Identity and access management', status: 'implemented' },
      { name: 'HashiCorp Vault', purpose: 'Secrets management, encryption keys', status: 'implemented' },
      { name: 'Let\'s Encrypt', purpose: 'Automated SSL/TLS certificates', status: 'implemented' },
      { name: 'WAF (ModSecurity)', purpose: 'Web application firewall', status: 'implemented' },
      { name: 'OSSEC / Wazuh', purpose: 'Intrusion detection system', status: 'planned' },
    ]
  },
  {
    category: 'Integration & Protocols',
    icon: GitBranch,
    items: [
      { name: 'OPC-UA', purpose: 'Industrial automation standard protocol', status: 'implemented' },
      { name: 'Modbus TCP/RTU', purpose: 'Legacy industrial device communication', status: 'implemented' },
      { name: 'BACnet', purpose: 'Building automation protocol', status: 'implemented' },
      { name: 'CoAP', purpose: 'Constrained Application Protocol for IoT', status: 'implemented' },
      { name: 'Apache Camel', purpose: 'Enterprise integration patterns', status: 'planned' },
      { name: 'Mulesoft / Zapier', purpose: 'Third-party SaaS integrations', status: 'planned' },
    ]
  },
  {
    category: 'Frontend & Visualization',
    icon: Globe,
    items: [
      { name: 'React + TypeScript', purpose: 'Modern web application framework', status: 'implemented' },
      { name: 'Next.js', purpose: 'Server-side rendering, static generation', status: 'planned' },
      { name: 'Tailwind CSS', purpose: 'Utility-first styling framework', status: 'implemented' },
      { name: 'Recharts / D3.js', purpose: 'Data visualization libraries', status: 'implemented' },
      { name: 'Three.js / React Three Fiber', purpose: '3D visualization, digital twins', status: 'planned' },
      { name: 'React Native', purpose: 'Cross-platform mobile applications', status: 'planned' },
      { name: 'WebGL / Babylon.js', purpose: 'High-performance 3D rendering', status: 'evaluating' },
    ]
  },
];

export function TechnicalRoadmap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-6">
        <h2 className="text-white text-2xl mb-2">Technical Stack & Implementation Roadmap</h2>
        <p className="text-slate-400">
          Enterprise-grade technologies powering a world-class IoT platform
        </p>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Implemented</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">Planned</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-yellow-400" />
            <span className="text-slate-300">Evaluating</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Categories */}
      <div className="space-y-6">
        {TECH_STACK.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.category} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              {/* Category Header */}
              <div className="p-4 bg-slate-900/50 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white text-lg">{category.category}</h3>
                </div>
              </div>

              {/* Items */}
              <div className="p-4">
                <div className="grid gap-3">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start justify-between p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-white">{item.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            item.status === 'implemented' ? 'bg-green-500/20 text-green-400' :
                            item.status === 'planned' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.status === 'implemented' ? 'Implemented' :
                             item.status === 'planned' ? 'Planned' : 'Evaluating'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{item.purpose}</p>
                      </div>
                      {item.status === 'implemented' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 ml-4" />
                      ) : (
                        <Circle className={`w-5 h-5 flex-shrink-0 ml-4 ${
                          item.status === 'planned' ? 'text-blue-400' : 'text-yellow-400'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Architecture Highlights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Scalability Architecture</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Horizontal Scaling:</span> Auto-scale pods based on CPU, memory, or custom metrics. Support for 100K+ concurrent devices
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Microservices:</span> Independent services for ingestion, analytics, alerts. Deploy and scale independently
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Database Sharding:</span> Partition data by organization or time. Query only relevant shards
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">CDN & Edge Caching:</span> Serve static assets from edge. Reduce latency by 80%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl p-6">
          <h3 className="text-white text-xl mb-4">Reliability & Performance</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Multi-Region:</span> Deploy across multiple AWS regions. Automatic failover in &lt;30 seconds
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Database Replication:</span> Primary-replica setup with automatic failover. Point-in-time recovery
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Circuit Breakers:</span> Prevent cascade failures. Graceful degradation of non-critical features
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <span className="text-white">Performance:</span> API response &lt;100ms p95. Data ingestion: 1M+ events/second
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Practices */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Development & Operations Best Practices</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="text-blue-400 mb-2">DevOps & CI/CD</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div>• GitHub Actions / GitLab CI</div>
              <div>• Automated testing (unit, integration, e2e)</div>
              <div>• Blue-green deployments</div>
              <div>• Canary releases</div>
              <div>• Rollback in &lt;60 seconds</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-green-400 mb-2">Quality & Testing</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div>• 85%+ code coverage target</div>
              <div>• Performance testing (k6, JMeter)</div>
              <div>• Security scanning (Snyk, OWASP)</div>
              <div>• Chaos engineering (Chaos Monkey)</div>
              <div>• A/B testing framework</div>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-purple-400 mb-2">Monitoring & Observability</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <div>• Real-time dashboards (Grafana)</div>
              <div>• Distributed tracing</div>
              <div>• Error tracking (Sentry)</div>
              <div>• SLO/SLI monitoring</div>
              <div>• On-call rotation & runbooks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}