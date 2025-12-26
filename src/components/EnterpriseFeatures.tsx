import { useState } from 'react';
import {
  Brain,
  Shield,
  Workflow,
  TrendingUp,
  Users,
  FileText,
  Zap,
  Globe,
  BarChart3,
  GitBranch,
  Clock,
  Code,
  Smartphone,
  Sparkles,
  Cpu,
  Target,
  CheckCircle2,
  Star
} from 'lucide-react';
import { FeatureImplementationGuide } from './enterprise/FeatureImplementationGuide';

interface FeatureCategory {
  id: string;
  name: string;
  icon: any;
  description: string;
  features: Feature[];
  tier: 'free' | 'pro' | 'enterprise';
}

interface Feature {
  id: string;
  name: string;
  description: string;
  status: 'available' | 'coming-soon' | 'beta';
  businessValue: string;
}

const ENTERPRISE_FEATURES: FeatureCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: Brain,
    description: 'Advanced analytics and predictive capabilities',
    tier: 'enterprise',
    features: [
      {
        id: 'predictive-maintenance',
        name: 'Predictive Maintenance',
        description: 'ML models predict equipment failures 2-4 weeks in advance using historical patterns, vibration analysis, and thermal signatures',
        status: 'available',
        businessValue: 'Reduce unplanned downtime by 70%, save $100K-$500K annually per asset'
      },
      {
        id: 'anomaly-detection',
        name: 'Real-time Anomaly Detection',
        description: 'Auto-detect unusual patterns using isolation forests, autoencoders, and statistical process control with self-learning baselines',
        status: 'available',
        businessValue: 'Catch issues 85% faster, prevent cascading failures'
      },
      {
        id: 'optimization',
        name: 'Process Optimization Engine',
        description: 'AI recommends optimal operating parameters to maximize efficiency, reduce energy consumption, and improve yield',
        status: 'beta',
        businessValue: '10-25% energy savings, 15% throughput increase'
      },
      {
        id: 'forecasting',
        name: 'Demand Forecasting',
        description: 'Time-series forecasting for production planning, inventory management, and resource allocation using LSTM/Prophet models',
        status: 'available',
        businessValue: 'Reduce inventory costs by 20-30%, improve planning accuracy'
      },
      {
        id: 'root-cause',
        name: 'Root Cause Analysis AI',
        description: 'Automatically identifies failure root causes by analyzing sensor correlations, event sequences, and historical incidents',
        status: 'available',
        businessValue: 'Reduce MTTR by 60%, eliminate repeat failures'
      },
      {
        id: 'quality-prediction',
        name: 'Quality Prediction',
        description: 'Predict product quality issues before they occur based on process parameters, environmental conditions, and material properties',
        status: 'beta',
        businessValue: 'Reduce defect rates by 40%, lower scrap costs'
      }
    ]
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    icon: TrendingUp,
    description: 'Deep insights and business intelligence',
    tier: 'pro',
    features: [
      {
        id: 'oee-calculation',
        name: 'OEE (Overall Equipment Effectiveness)',
        description: 'Real-time OEE calculation with availability, performance, and quality metrics. Automated downtime categorization',
        status: 'available',
        businessValue: 'Industry standard metric, benchmark against 85% world-class'
      },
      {
        id: 'energy-analytics',
        name: 'Energy Analytics & Carbon Tracking',
        description: 'Detailed energy consumption analysis, cost allocation, carbon footprint calculation, and ESG reporting',
        status: 'available',
        businessValue: 'Meet sustainability goals, reduce energy costs 15-30%'
      },
      {
        id: 'comparative-analysis',
        name: 'Cross-Asset Comparison',
        description: 'Compare performance across similar assets, identify best practices, and standardize operations',
        status: 'available',
        businessValue: 'Replicate best performance across fleet'
      },
      {
        id: 'trend-analysis',
        name: 'Statistical Process Control (SPC)',
        description: 'Control charts, capability analysis (Cp, Cpk), and trend detection with automatic alert generation',
        status: 'available',
        businessValue: 'Maintain process within specifications, reduce variability'
      },
      {
        id: 'shift-analysis',
        name: 'Shift & Operator Analytics',
        description: 'Performance comparison across shifts, operators, and teams with productivity leaderboards',
        status: 'available',
        businessValue: 'Identify training needs, reward top performers'
      }
    ]
  },
  {
    id: 'collaboration',
    name: 'Team Collaboration',
    icon: Users,
    description: 'Enterprise collaboration and knowledge sharing',
    tier: 'pro',
    features: [
      {
        id: 'annotations',
        name: 'Event Annotations',
        description: 'Tag anomalies, add context to incidents, attach photos/documents, and build institutional knowledge',
        status: 'available',
        businessValue: 'Faster incident resolution, knowledge retention'
      },
      {
        id: 'workorders',
        name: 'Work Order Integration',
        description: 'Bi-directional sync with CMMS (SAP, Maximo, Fiix). Auto-create work orders from alerts',
        status: 'available',
        businessValue: 'Seamless maintenance workflow, no duplicate entry'
      },
      {
        id: 'chat',
        name: 'Real-time Team Chat',
        description: 'Contextual chat channels per asset/incident. @mentions, file sharing, and video calls',
        status: 'beta',
        businessValue: 'Faster issue resolution, remote expert support'
      },
      {
        id: 'playbooks',
        name: 'Digital Playbooks',
        description: 'Step-by-step troubleshooting guides triggered by specific conditions. Interactive checklists and SOPs',
        status: 'available',
        businessValue: 'Standardize response, reduce human error'
      },
      {
        id: 'handoff',
        name: 'Shift Handoff Reports',
        description: 'Automated shift summaries with key events, ongoing issues, and action items',
        status: 'available',
        businessValue: 'Improve continuity, nothing falls through cracks'
      }
    ]
  },
  {
    id: 'automation',
    name: 'Advanced Automation',
    icon: Workflow,
    description: 'Intelligent workflows and orchestration',
    tier: 'enterprise',
    features: [
      {
        id: 'workflow-engine',
        name: 'Visual Workflow Builder',
        description: 'No-code workflow automation with 100+ triggers, conditions, and actions. Complex logic with loops and branches',
        status: 'available',
        businessValue: 'Automate repetitive tasks, ensure consistent processes'
      },
      {
        id: 'closed-loop',
        name: 'Closed-Loop Control',
        description: 'Automatically adjust setpoints, start/stop equipment, and optimize operations based on conditions',
        status: 'available',
        businessValue: 'Lights-out operation, 24/7 optimization'
      },
      {
        id: 'escalation',
        name: 'Smart Escalation Policies',
        description: 'Time-based escalation, on-call schedules, acknowledgment tracking, and escalation hierarchies',
        status: 'available',
        businessValue: 'Ensure critical alerts get addressed'
      },
      {
        id: 'auto-remediation',
        name: 'Auto-Remediation Scripts',
        description: 'Execute scripts, API calls, or commands in response to conditions. Restart services, clear caches, reboot devices',
        status: 'available',
        businessValue: 'Self-healing systems, reduce manual intervention'
      },
      {
        id: 'scheduling',
        name: 'Advanced Scheduling',
        description: 'Production scheduling optimization considering constraints, priorities, and resource availability',
        status: 'beta',
        businessValue: 'Maximize throughput, minimize changeover time'
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Enterprise Integrations',
    icon: GitBranch,
    description: 'Connect with existing enterprise systems',
    tier: 'pro',
    features: [
      {
        id: 'erp-integration',
        name: 'ERP Integration',
        description: 'Bi-directional sync with SAP, Oracle, Microsoft Dynamics. Share production data, inventory, and costs',
        status: 'available',
        businessValue: 'Single source of truth, eliminate data silos'
      },
      {
        id: 'mes-integration',
        name: 'MES/SCADA Integration',
        description: 'Connect to Ignition, Wonderware, FactoryTalk. Unified OT/IT platform',
        status: 'available',
        businessValue: 'Leverage existing investments, add analytics layer'
      },
      {
        id: 'bi-tools',
        name: 'BI Tool Connectors',
        description: 'Native connectors for Tableau, Power BI, Looker, and Grafana with live data feeds',
        status: 'available',
        businessValue: 'Use preferred reporting tools'
      },
      {
        id: 'auth-sso',
        name: 'Enterprise SSO/LDAP',
        description: 'SAML 2.0, OAuth 2.0, Active Directory, Okta, Azure AD integration with auto-provisioning',
        status: 'available',
        businessValue: 'Centralized identity management, compliance'
      },
      {
        id: 'webhooks',
        name: 'Webhooks & APIs',
        description: 'RESTful APIs, GraphQL, WebSocket streams, and webhooks for custom integrations',
        status: 'available',
        businessValue: 'Integrate with any system, build custom apps'
      }
    ]
  },
  {
    id: 'edge-computing',
    name: 'Edge Computing',
    icon: Cpu,
    description: 'Distributed intelligence at the edge',
    tier: 'enterprise',
    features: [
      {
        id: 'edge-analytics',
        name: 'Edge Analytics',
        description: 'Run ML models locally on edge devices. Process data at source with <10ms latency',
        status: 'available',
        businessValue: 'Real-time decisions, reduced bandwidth costs 90%'
      },
      {
        id: 'offline-mode',
        name: 'Offline Operation',
        description: 'Full functionality during connectivity loss. Auto-sync when connection restored',
        status: 'available',
        businessValue: 'Reliable operation in remote locations'
      },
      {
        id: 'edge-deployment',
        name: 'OTA Updates & Management',
        description: 'Over-the-air firmware updates, configuration management, and remote troubleshooting',
        status: 'available',
        businessValue: 'Manage 1000s of devices without site visits'
      },
      {
        id: 'data-filtering',
        name: 'Intelligent Data Filtering',
        description: 'Only send relevant data to cloud. Local aggregation, compression, and filtering',
        status: 'available',
        businessValue: 'Reduce cloud costs by 80%, faster insights'
      }
    ]
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    icon: Shield,
    description: 'Enterprise-grade security',
    tier: 'enterprise',
    features: [
      {
        id: 'encryption',
        name: 'End-to-End Encryption',
        description: 'TLS 1.3 in transit, AES-256 at rest. Hardware security modules (HSM) for key management',
        status: 'available',
        businessValue: 'Protect sensitive industrial data'
      },
      {
        id: 'compliance',
        name: 'Compliance Certifications',
        description: 'SOC 2 Type II, ISO 27001, GDPR, HIPAA, TISAX. Regular audits and attestations',
        status: 'available',
        businessValue: 'Meet regulatory requirements'
      },
      {
        id: 'audit-logs',
        name: 'Comprehensive Audit Logs',
        description: 'Immutable audit trail of all actions. Who, what, when, where with tamper-proof logging',
        status: 'available',
        businessValue: 'Forensics, compliance, accountability'
      },
      {
        id: 'rbac',
        name: 'Granular RBAC',
        description: 'Row-level security, column-level encryption, device-level permissions, and time-based access',
        status: 'available',
        businessValue: 'Principle of least privilege'
      },
      {
        id: 'data-residency',
        name: 'Data Residency',
        description: 'Choose data storage region (US, EU, APAC). On-premises deployment option',
        status: 'available',
        businessValue: 'Meet local data sovereignty laws'
      },
      {
        id: 'penetration',
        name: 'Security Testing',
        description: 'Regular penetration testing, vulnerability scanning, and bug bounty program',
        status: 'available',
        businessValue: 'Proactive security posture'
      }
    ]
  },
  {
    id: 'visualization',
    name: 'Advanced Visualization',
    icon: BarChart3,
    description: 'Rich, interactive data visualization',
    tier: 'pro',
    features: [
      {
        id: '3d-twins',
        name: '3D Digital Twins',
        description: 'Import CAD models, create 3D plant layouts with live sensor overlay. VR/AR support',
        status: 'beta',
        businessValue: 'Intuitive visualization, immersive troubleshooting'
      },
      {
        id: 'heatmaps',
        name: 'Spatial Heatmaps',
        description: 'Visualize temperature, pressure, or any metric across facility floor plan',
        status: 'available',
        businessValue: 'Identify hotspots, optimize layouts'
      },
      {
        id: 'sankey',
        name: 'Flow Diagrams (Sankey)',
        description: 'Visualize material flow, energy flow, and process flows with interactive Sankey diagrams',
        status: 'available',
        businessValue: 'Understand system dependencies'
      },
      {
        id: 'network-graph',
        name: 'Network Topology Visualization',
        description: 'Interactive network graphs showing device relationships, data flows, and dependencies',
        status: 'available',
        businessValue: 'Understand complex systems at a glance'
      },
      {
        id: 'video-overlay',
        name: 'Video + Sensor Overlay',
        description: 'Sync video feeds with sensor data. Scrub through time to correlate visual and data events',
        status: 'available',
        businessValue: 'Visual confirmation of automated detections'
      }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile Applications',
    icon: Smartphone,
    description: 'Native iOS and Android apps',
    tier: 'pro',
    features: [
      {
        id: 'mobile-dashboard',
        name: 'Mobile Dashboards',
        description: 'Full-featured mobile app with offline support, push notifications, and responsive design',
        status: 'available',
        businessValue: 'Monitor from anywhere, immediate alerts'
      },
      {
        id: 'ar-maintenance',
        name: 'AR Maintenance Guides',
        description: 'Augmented reality overlays showing repair instructions, part identification, and sensor readings',
        status: 'beta',
        businessValue: 'Faster repairs, reduce training time'
      },
      {
        id: 'mobile-data-collection',
        name: 'Mobile Data Collection',
        description: 'Collect manual readings, take photos, scan barcodes/QR codes, and log observations',
        status: 'available',
        businessValue: 'Digitize manual processes'
      }
    ]
  },
  {
    id: 'reporting',
    name: 'Reporting & Documentation',
    icon: FileText,
    description: 'Automated reporting and compliance',
    tier: 'pro',
    features: [
      {
        id: 'auto-reports',
        name: 'Scheduled Report Generation',
        description: 'Auto-generate PDF/Excel reports daily, weekly, monthly. Email distribution to stakeholders',
        status: 'available',
        businessValue: 'Save hours of manual reporting'
      },
      {
        id: 'compliance-reports',
        name: 'Regulatory Compliance Reports',
        description: 'Pre-built templates for FDA, EPA, ISO, and industry-specific regulations',
        status: 'available',
        businessValue: 'Pass audits, avoid fines'
      },
      {
        id: 'executive-summary',
        name: 'Executive Dashboards',
        description: 'C-suite focused KPIs with drill-down capability. Mobile-optimized for executives',
        status: 'available',
        businessValue: 'Data-driven decision making at top level'
      },
      {
        id: 'data-export',
        name: 'Bulk Data Export',
        description: 'Export raw data in CSV, Parquet, JSON. API for programmatic access to historical data',
        status: 'available',
        businessValue: 'No vendor lock-in, use data anywhere'
      }
    ]
  },
  {
    id: 'cost-optimization',
    name: 'Cost Optimization',
    icon: Target,
    description: 'Reduce operational costs',
    tier: 'enterprise',
    features: [
      {
        id: 'cost-allocation',
        name: 'Cost Allocation Engine',
        description: 'Allocate energy, maintenance, and overhead costs to specific products, lines, or departments',
        status: 'available',
        businessValue: 'Understand true product costs'
      },
      {
        id: 'waste-reduction',
        name: 'Waste Reduction Analytics',
        description: 'Track scrap, rework, and waste. Identify root causes and calculate savings from improvements',
        status: 'available',
        businessValue: 'Typical 20-40% waste reduction'
      },
      {
        id: 'resource-optimization',
        name: 'Resource Optimization',
        description: 'Optimize labor allocation, equipment utilization, and inventory levels using AI',
        status: 'beta',
        businessValue: '15-25% improvement in resource efficiency'
      }
    ]
  },
  {
    id: 'developer',
    name: 'Developer Platform',
    icon: Code,
    description: 'Build custom solutions',
    tier: 'pro',
    features: [
      {
        id: 'sdk',
        name: 'SDKs & Client Libraries',
        description: 'Python, JavaScript, Java, C# SDKs with full API coverage and code examples',
        status: 'available',
        businessValue: 'Rapid custom development'
      },
      {
        id: 'custom-widgets',
        name: 'Custom Widget Framework',
        description: 'Build proprietary visualizations using React components. Private widget marketplace',
        status: 'available',
        businessValue: 'Extend platform for unique needs'
      },
      {
        id: 'jupyter',
        name: 'Embedded Jupyter Notebooks',
        description: 'Run Python notebooks directly in platform. Access to all sensor data for ad-hoc analysis',
        status: 'beta',
        businessValue: 'Data scientists work where data lives'
      },
      {
        id: 'plugin-system',
        name: 'Plugin Architecture',
        description: 'Build and deploy custom plugins for data sources, transformations, and destinations',
        status: 'available',
        businessValue: 'Integrate proprietary systems'
      }
    ]
  },
  {
    id: 'white-label',
    name: 'White-Label & Multi-Tenancy',
    icon: Globe,
    description: 'Resell and customize',
    tier: 'enterprise',
    features: [
      {
        id: 'branding',
        name: 'Custom Branding',
        description: 'Replace logo, colors, domain, and email templates. Fully white-labeled experience',
        status: 'available',
        businessValue: 'Resell under your brand'
      },
      {
        id: 'tenant-isolation',
        name: 'Complete Tenant Isolation',
        description: 'Data, users, and configurations completely isolated. Optional shared resources',
        status: 'available',
        businessValue: 'Serve multiple customers securely'
      },
      {
        id: 'marketplace',
        name: 'Template Marketplace',
        description: 'Industry-specific templates for automotive, pharma, food & beverage, oil & gas, etc.',
        status: 'available',
        businessValue: 'Fast deployment, best practices included'
      }
    ]
  }
];

export function EnterpriseFeatures() {
  const [selectedCategory, setSelectedCategory] = useState(ENTERPRISE_FEATURES[0].id);
  const [selectedFeature, setSelectedFeature] = useState<{ id: string; name: string } | null>(null);

  const activeCategory = ENTERPRISE_FEATURES.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-blue-900/30 border border-slate-700 rounded-xl p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <h2 className="text-white text-2xl">Enterprise Features Roadmap</h2>
            </div>
            <p className="text-slate-300 mb-4">
              Advanced capabilities that make this platform competitive with industry leaders
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-slate-300">
                  <span className="text-white">{ENTERPRISE_FEATURES.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'available').length, 0)}</span> Features Available
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">
                  <span className="text-white">{ENTERPRISE_FEATURES.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'beta').length, 0)}</span> In Beta
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-300">
                  <span className="text-white">{ENTERPRISE_FEATURES.reduce((acc, cat) => acc + cat.features.filter(f => f.status === 'coming-soon').length, 0)}</span> Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {ENTERPRISE_FEATURES.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border transition-all text-left ${isActive
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
            >
              <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <div className={`text-sm mb-1 ${isActive ? 'text-white' : 'text-white'}`}>
                {category.name}
              </div>
              <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                {category.features.length} features
              </div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 rounded ${category.tier === 'enterprise' ? 'bg-purple-500/20 text-purple-300' :
                    category.tier === 'pro' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                  }`}>
                  {category.tier.toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feature Details */}
      {activeCategory && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          {/* Category Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = activeCategory.icon;
                  return <Icon className="w-6 h-6 text-white" />;
                })()}
              </div>
              <div className="flex-1">
                <h3 className="text-white text-xl mb-1">{activeCategory.name}</h3>
                <p className="text-slate-400">{activeCategory.description}</p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="p-6">
            <div className="space-y-4">
              {activeCategory.features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setSelectedFeature({ id: feature.id, name: feature.name })}
                  className="w-full p-5 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500 hover:bg-slate-900/70 transition-all cursor-pointer text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white">{feature.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs ${feature.status === 'available' ? 'bg-green-500/20 text-green-400' :
                            feature.status === 'beta' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-slate-500/20 text-slate-400'
                          }`}>
                          {feature.status === 'available' ? 'Available' :
                            feature.status === 'beta' ? 'Beta' : 'Coming Soon'}
                        </span>
                        <span className="text-xs text-blue-400 ml-auto flex items-center gap-1">
                          <Code className="w-3 h-3" />
                          View Implementation
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{feature.description}</p>
                      <div className="flex items-start gap-2 p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-lg">
                        <Target className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-emerald-400 text-xs mb-1">Business Value</div>
                          <p className="text-slate-300 text-sm">{feature.businessValue}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Value Proposition Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white">ROI Focused</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Average 300-500% ROI in first year. Typical payback period: 6-9 months through reduced downtime, energy savings, and improved OEE.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-white">Fast Deployment</h3>
          </div>
          <p className="text-slate-300 text-sm">
            Production-ready in 2-4 weeks. Industry templates, pre-built integrations, and expert implementation support.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-700/50 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-white">Enterprise Security</h3>
          </div>
          <p className="text-slate-300 text-sm">
            SOC 2, ISO 27001, GDPR compliant. Used by Fortune 500 companies in regulated industries including pharma and aerospace.
          </p>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          Competitive Advantages vs. Palantir, AWS IoT, Azure IoT
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">50-70% Lower Cost</div>
              <div className="text-slate-400 text-sm">Transparent pricing, no data egress fees, unlimited users</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">Industry-Specific AI Models</div>
              <div className="text-slate-400 text-sm">Pre-trained for manufacturing, not generic cloud AI</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">True Edge Computing</div>
              <div className="text-slate-400 text-sm">Works offline, local ML inference, not cloud-dependent</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">No-Code Platform</div>
              <div className="text-slate-400 text-sm">Operators build solutions, not just IT teams</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">Faster Implementation</div>
              <div className="text-slate-400 text-sm">Weeks vs months. Industry templates included</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-white text-sm mb-1">OT/IT Convergence</div>
              <div className="text-slate-400 text-sm">Built for industrial protocols (OPC-UA, Modbus, etc.)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedFeature && (
        <FeatureImplementationGuide
          featureId={selectedFeature.id}
          featureName={selectedFeature.name}
          onClose={() => setSelectedFeature(null)}
        />
      )}
    </div>
  );
}