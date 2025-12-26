import { useState } from 'react';
import { CheckCircle, Circle, Clock, AlertTriangle, Target, Zap, Shield, Code, Globe, TrendingUp, Database, Cloud, Smartphone, GitBranch, Plug, Box, Activity, Brain, HelpCircle } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  category: string;
  status: 'implemented' | 'partial' | 'planned' | 'missing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  implementation?: string;
  businessValue: string;
}

const productionFeatures: Feature[] = [
  // ========== STANDARDIZED CONNECTIVITY ==========
  {
    id: 'opc-ua',
    name: 'OPC-UA Protocol Support',
    category: 'Connectivity',
    status: 'planned',
    priority: 'critical',
    description: 'Industry-standard protocol for industrial automation',
    businessValue: 'Connect to 90% of industrial equipment without custom drivers'
  },
  {
    id: 'modbus',
    name: 'Modbus TCP/RTU Protocol',
    category: 'Connectivity',
    status: 'planned',
    priority: 'critical',
    description: 'Legacy industrial protocol support',
    businessValue: 'Connect to legacy PLCs and industrial devices'
  },
  {
    id: 'bacnet',
    name: 'BACnet Protocol Support',
    category: 'Connectivity',
    status: 'planned',
    priority: 'high',
    description: 'Building automation and control networks',
    businessValue: 'Smart building and HVAC system integration'
  },
  {
    id: 'profinet',
    name: 'PROFINET Protocol',
    category: 'Connectivity',
    status: 'planned',
    priority: 'high',
    description: 'Siemens industrial Ethernet standard',
    businessValue: 'Connect to Siemens industrial equipment'
  },
  {
    id: 'protocol-converter',
    name: 'Protocol Converter Gateway',
    category: 'Connectivity',
    status: 'planned',
    priority: 'critical',
    description: 'Translate between different industrial protocols',
    businessValue: 'Unified data model across heterogeneous systems'
  },
  {
    id: 'driver-marketplace',
    name: 'Device Driver Marketplace',
    category: 'Connectivity',
    status: 'missing',
    priority: 'medium',
    description: 'Community-contributed device drivers',
    businessValue: 'Reduce time-to-connect for new device types'
  },

  // ========== EDGE COMPUTING ==========
  {
    id: 'edge-nodes',
    name: 'Edge Computing Nodes',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'critical',
    description: 'Deploy compute workloads at the edge',
    businessValue: 'Real-time processing with <10ms latency'
  },
  {
    id: 'edge-analytics',
    name: 'Edge Analytics Engine',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'critical',
    description: 'Run analytics locally without cloud roundtrip',
    businessValue: 'Reduce bandwidth costs by 80%, ensure uptime during connectivity loss'
  },
  {
    id: 'edge-ml',
    name: 'Edge ML Inference',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'high',
    description: 'Run trained ML models on edge devices',
    businessValue: 'Real-time anomaly detection without cloud dependency'
  },
  {
    id: 'store-forward',
    name: 'Store-and-Forward',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'critical',
    description: 'Buffer data locally during network outages',
    businessValue: 'Zero data loss guarantee during connectivity issues'
  },
  {
    id: 'edge-orchestration',
    name: 'Edge Orchestration',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'high',
    description: 'Manage and deploy containers to edge devices',
    businessValue: 'Deploy applications to 1000s of edge nodes simultaneously'
  },
  {
    id: 'bandwidth-optimization',
    name: 'Intelligent Bandwidth Management',
    category: 'Edge Computing',
    status: 'planned',
    priority: 'high',
    description: 'Adaptive data sampling and compression',
    businessValue: 'Reduce cloud data transfer costs by 70%'
  },

  // ========== ADVANCED ANALYTICS & AI/ML ==========
  {
    id: 'ml-training',
    name: 'Model Training Studio',
    category: 'AI/ML',
    status: 'planned',
    priority: 'high',
    description: 'Train custom ML models on historical data',
    businessValue: 'Custom predictive models without data science team'
  },
  {
    id: 'automl',
    name: 'AutoML Pipeline',
    category: 'AI/ML',
    status: 'planned',
    priority: 'medium',
    description: 'Automated model selection and hyperparameter tuning',
    businessValue: '10x faster model development'
  },
  {
    id: 'model-marketplace',
    name: 'Pre-built ML Model Library',
    category: 'AI/ML',
    status: 'planned',
    priority: 'high',
    description: 'Industry-specific pre-trained models',
    businessValue: 'Deploy predictive maintenance in hours, not months'
  },
  {
    id: 'explainable-ai',
    name: 'Explainable AI (XAI)',
    category: 'AI/ML',
    status: 'planned',
    priority: 'medium',
    description: 'Understand why models make predictions',
    businessValue: 'Build trust and meet regulatory requirements'
  },
  {
    id: 'ab-testing',
    name: 'Model A/B Testing',
    category: 'AI/ML',
    status: 'planned',
    priority: 'medium',
    description: 'Compare model versions in production',
    businessValue: 'Continuous model improvement'
  },
  {
    id: 'anomaly-detection',
    name: 'Unsupervised Anomaly Detection',
    category: 'AI/ML',
    status: 'partial',
    priority: 'critical',
    description: 'Detect unknown failure patterns',
    implementation: 'Basic anomaly detection in Digital Twins',
    businessValue: 'Catch issues before they cause downtime'
  },

  // ========== SECURITY & COMPLIANCE ==========
  {
    id: 'ldap-integration',
    name: 'LDAP/Active Directory Integration',
    category: 'Security',
    status: 'missing',
    priority: 'critical',
    description: 'Enterprise directory service integration',
    businessValue: 'Single sign-on with corporate credentials'
  },
  {
    id: 'sso',
    name: 'SSO (SAML, OAuth, OIDC)',
    category: 'Security',
    status: 'missing',
    priority: 'critical',
    description: 'Single sign-on with enterprise identity providers',
    businessValue: 'Seamless authentication with Okta, Azure AD, Google Workspace'
  },
  {
    id: 'audit-trails',
    name: 'Comprehensive Audit Logs',
    category: 'Security',
    status: 'partial',
    priority: 'critical',
    description: 'Track every user action and system event',
    implementation: 'Security audit log in Device Management',
    businessValue: 'Meet compliance requirements (SOC2, ISO27001)'
  },
  {
    id: 'encryption-rest',
    name: 'Data Encryption at Rest',
    category: 'Security',
    status: 'missing',
    priority: 'critical',
    description: 'AES-256 encryption for stored data',
    businessValue: 'Protect sensitive industrial data'
  },
  {
    id: 'encryption-transit',
    name: 'Data Encryption in Transit',
    category: 'Security',
    status: 'partial',
    priority: 'critical',
    description: 'TLS 1.3 for all network communication',
    implementation: 'MQTT over TLS in Device Management',
    businessValue: 'Prevent man-in-the-middle attacks'
  },
  {
    id: 'vulnerability-scanning',
    name: 'Security Vulnerability Scanning',
    category: 'Security',
    status: 'missing',
    priority: 'high',
    description: 'Automated CVE detection and remediation',
    businessValue: 'Proactive security posture management'
  },
  {
    id: 'compliance-reporting',
    name: 'Compliance Reporting (SOC2, GDPR, ISO27001)',
    category: 'Security',
    status: 'missing',
    priority: 'high',
    description: 'Automated compliance audit reports',
    businessValue: 'Reduce compliance audit time by 90%'
  },
  {
    id: 'data-masking',
    name: 'Data Masking & Anonymization',
    category: 'Security',
    status: 'missing',
    priority: 'medium',
    description: 'PII protection and data privacy',
    businessValue: 'GDPR/CCPA compliance'
  },

  // ========== LOW-CODE APPLICATION DEVELOPMENT ==========
  {
    id: 'low-code-builder',
    name: 'Low-Code App Builder',
    category: 'App Development',
    status: 'partial',
    priority: 'high',
    description: 'Drag-and-drop application development',
    implementation: 'Custom Dashboard builder available',
    businessValue: 'Build custom apps 10x faster'
  },
  {
    id: 'app-templates',
    name: 'Pre-built App Templates',
    category: 'App Development',
    status: 'missing',
    priority: 'high',
    description: 'Industry-specific application templates',
    businessValue: 'Deploy manufacturing dashboard in 1 hour'
  },
  {
    id: 'workflow-builder',
    name: 'Visual Workflow Automation',
    category: 'App Development',
    status: 'partial',
    priority: 'high',
    description: 'No-code business process automation',
    implementation: 'Visual Rule Builder available',
    businessValue: 'Automate processes without coding'
  },
  {
    id: 'custom-widgets',
    name: 'Custom Widget Creator',
    category: 'App Development',
    status: 'missing',
    priority: 'medium',
    description: 'Build reusable visualization components',
    businessValue: 'Extend platform with custom visualizations'
  },
  {
    id: 'api-designer',
    name: 'Visual API Designer',
    category: 'App Development',
    status: 'missing',
    priority: 'medium',
    description: 'Create custom REST/GraphQL APIs',
    businessValue: 'Expose data to third-party systems'
  },

  // ========== INTEROPERABILITY & INTEGRATION ==========
  {
    id: 'data-historian',
    name: 'Data Historian Integration (OSIsoft PI, Honeywell)',
    category: 'Integration',
    status: 'missing',
    priority: 'critical',
    description: 'Connect to industrial data historians',
    businessValue: 'Leverage existing time-series data investments'
  },
  {
    id: 'mes-erp',
    name: 'MES/ERP Connectors (SAP, Oracle)',
    category: 'Integration',
    status: 'missing',
    priority: 'critical',
    description: 'Bi-directional data flow with business systems',
    businessValue: 'Close the loop between IT and OT'
  },
  {
    id: 'plc-integration',
    name: 'PLC Direct Integration',
    category: 'Integration',
    status: 'planned',
    priority: 'critical',
    description: 'Native PLC connectivity (Rockwell, Siemens)',
    businessValue: 'Read/write PLC data without gateways'
  },
  {
    id: 'scada-integration',
    name: 'SCADA System Integration',
    category: 'Integration',
    status: 'planned',
    priority: 'high',
    description: 'Connect to Wonderware, Ignition, etc.',
    businessValue: 'Augment existing SCADA with cloud analytics'
  },
  {
    id: 'webhook-eventbus',
    name: 'Webhook & Event Bus',
    category: 'Integration',
    status: 'planned',
    priority: 'high',
    description: 'Real-time event streaming to external systems',
    businessValue: 'Trigger actions in third-party platforms'
  },
  {
    id: 'graphql-api',
    name: 'GraphQL API',
    category: 'Integration',
    status: 'missing',
    priority: 'medium',
    description: 'Flexible data querying API',
    businessValue: 'Efficient data retrieval for modern apps'
  },
  {
    id: 'rest-api',
    name: 'RESTful API',
    category: 'Integration',
    status: 'partial',
    priority: 'critical',
    description: 'Comprehensive REST API for all platform functions',
    implementation: 'Basic API endpoints available',
    businessValue: 'Programmatic access to all platform capabilities'
  },

  // ========== INFRASTRUCTURE & OPERATIONS ==========
  {
    id: 'high-availability',
    name: 'High Availability (99.99% SLA)',
    category: 'Infrastructure',
    status: 'missing',
    priority: 'critical',
    description: 'Active-active deployment with auto-failover',
    businessValue: 'Mission-critical uptime guarantee'
  },
  {
    id: 'multi-region',
    name: 'Multi-Region Deployment',
    category: 'Infrastructure',
    status: 'missing',
    priority: 'high',
    description: 'Deploy in multiple geographic regions',
    businessValue: 'Data sovereignty and low latency globally'
  },
  {
    id: 'backup-dr',
    name: 'Backup & Disaster Recovery',
    category: 'Infrastructure',
    status: 'missing',
    priority: 'critical',
    description: 'Automated backups with point-in-time recovery',
    businessValue: 'Recover from catastrophic failures'
  },
  {
    id: 'auto-scaling',
    name: 'Auto-Scaling',
    category: 'Infrastructure',
    status: 'missing',
    priority: 'high',
    description: 'Automatic capacity scaling based on load',
    businessValue: 'Handle traffic spikes without manual intervention'
  },
  {
    id: 'monitoring-observability',
    name: 'Platform Monitoring & Observability',
    category: 'Infrastructure',
    status: 'partial',
    priority: 'high',
    description: 'Comprehensive system health monitoring',
    implementation: 'System Monitoring component available',
    businessValue: 'Proactive issue detection'
  },
  {
    id: 'usage-analytics',
    name: 'Usage Analytics & Billing',
    category: 'Infrastructure',
    status: 'missing',
    priority: 'high',
    description: 'Track resource usage and generate invoices',
    businessValue: 'Consumption-based pricing models'
  },

  // ========== USER EXPERIENCE ==========
  {
    id: 'mobile-app',
    name: 'Native Mobile Apps (iOS/Android)',
    category: 'User Experience',
    status: 'planned',
    priority: 'high',
    description: 'Mobile-first access to platform',
    businessValue: 'Monitor operations from anywhere'
  },
  {
    id: 'mobile-responsive',
    name: 'Mobile-Responsive Web Design',
    category: 'User Experience',
    status: 'implemented',
    priority: 'critical',
    description: 'Fully responsive web interface',
    implementation: 'All components are mobile-responsive',
    businessValue: 'Access from any device'
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode / Custom Themes',
    category: 'User Experience',
    status: 'implemented',
    priority: 'low',
    description: 'Customizable UI themes',
    implementation: 'Dark theme implemented',
    businessValue: 'Reduce eye strain for 24/7 operations'
  },
  {
    id: 'i18n',
    name: 'Internationalization (i18n)',
    category: 'User Experience',
    status: 'missing',
    priority: 'high',
    description: 'Multi-language support',
    businessValue: 'Global deployment readiness'
  },
  {
    id: 'accessibility',
    name: 'WCAG 2.1 AA Accessibility',
    category: 'User Experience',
    status: 'missing',
    priority: 'medium',
    description: 'Screen reader and keyboard navigation support',
    businessValue: 'Compliance with accessibility regulations'
  },
  {
    id: 'context-help',
    name: 'Context-Sensitive Help',
    category: 'User Experience',
    status: 'missing',
    priority: 'medium',
    description: 'In-app tooltips and guided tours',
    businessValue: 'Reduce training time by 50%'
  },
  {
    id: 'geospatial',
    name: 'Geospatial Mapping',
    category: 'User Experience',
    status: 'missing',
    priority: 'medium',
    description: 'Map-based device visualization',
    businessValue: 'Visualize distributed assets geographically'
  },

  // ========== DATA MANAGEMENT ==========
  {
    id: 'data-governance',
    name: 'Data Governance & Lineage',
    category: 'Data Management',
    status: 'missing',
    priority: 'high',
    description: 'Track data origin, transformations, and usage',
    businessValue: 'Meet regulatory data traceability requirements'
  },
  {
    id: 'data-lake',
    name: 'Data Lake Integration',
    category: 'Data Management',
    status: 'missing',
    priority: 'high',
    description: 'Export data to S3, Azure Data Lake, BigQuery',
    businessValue: 'Long-term data retention and advanced analytics'
  },
  {
    id: 'time-series-optimization',
    name: 'Time-Series Data Optimization',
    category: 'Data Management',
    status: 'partial',
    priority: 'high',
    description: 'Compression and downsampling for long-term storage',
    implementation: 'TimescaleDB for time-series data',
    businessValue: 'Reduce storage costs by 90%'
  },
  {
    id: 'data-retention',
    name: 'Configurable Data Retention Policies',
    category: 'Data Management',
    status: 'missing',
    priority: 'high',
    description: 'Automatic data archival and deletion',
    businessValue: 'Compliance with data retention regulations'
  },

  // ========== COLLABORATION & SUPPORT ==========
  {
    id: 'onboarding',
    name: 'Interactive Onboarding Wizard',
    category: 'Support',
    status: 'missing',
    priority: 'high',
    description: 'Guided setup for new users',
    businessValue: 'Time-to-value in <1 hour'
  },
  {
    id: 'documentation',
    name: 'Comprehensive Documentation Portal',
    category: 'Support',
    status: 'missing',
    priority: 'high',
    description: 'API docs, tutorials, best practices',
    businessValue: 'Self-service support'
  },
  {
    id: 'training',
    name: 'Interactive Training Modules',
    category: 'Support',
    status: 'missing',
    priority: 'medium',
    description: 'Role-based training courses',
    businessValue: 'Reduce onboarding time'
  },
  {
    id: 'support-tickets',
    name: 'In-App Support Ticketing',
    category: 'Support',
    status: 'missing',
    priority: 'medium',
    description: 'Submit support requests from platform',
    businessValue: 'Faster issue resolution'
  },
  {
    id: 'collaboration',
    name: 'Team Collaboration (Comments, @mentions)',
    category: 'Support',
    status: 'missing',
    priority: 'medium',
    description: 'Collaborate on dashboards and alerts',
    businessValue: 'Cross-functional teamwork'
  },

  // ========== DEPLOYMENT & DEVOPS ==========
  {
    id: 'white-label',
    name: 'White-Labeling',
    category: 'Deployment',
    status: 'missing',
    priority: 'medium',
    description: 'Custom branding and domain',
    businessValue: 'Resell platform under own brand'
  },
  {
    id: 'sandbox',
    name: 'Sandbox/Staging Environments',
    category: 'Deployment',
    status: 'missing',
    priority: 'high',
    description: 'Test changes before production',
    businessValue: 'Risk-free experimentation'
  },
  {
    id: 'version-control',
    name: 'Configuration Version Control',
    category: 'Deployment',
    status: 'missing',
    priority: 'high',
    description: 'Track and rollback configuration changes',
    businessValue: 'Audit trail and quick recovery'
  },
  {
    id: 'cicd',
    name: 'CI/CD Pipeline',
    category: 'Deployment',
    status: 'missing',
    priority: 'medium',
    description: 'Automated testing and deployment',
    businessValue: 'Rapid feature delivery'
  },
  {
    id: 'export-import',
    name: 'Export/Import Configurations',
    category: 'Deployment',
    status: 'missing',
    priority: 'high',
    description: 'Migrate configurations between environments',
    businessValue: 'Accelerate multi-site deployments'
  },

  // ========== NOTIFICATIONS & ALERTING ==========
  {
    id: 'notification-channels',
    name: 'Multi-Channel Notifications (Slack, Teams, PagerDuty, SMS)',
    category: 'Alerting',
    status: 'partial',
    priority: 'high',
    description: 'Route alerts to preferred channels',
    implementation: 'Email/SMS in Rule Engine',
    businessValue: 'Ensure critical alerts are seen'
  },
  {
    id: 'alert-escalation',
    name: 'Alert Escalation Workflows',
    category: 'Alerting',
    status: 'missing',
    priority: 'high',
    description: 'Auto-escalate unacknowledged alerts',
    businessValue: 'Ensure critical issues get attention'
  },
  {
    id: 'on-call',
    name: 'On-Call Scheduling',
    category: 'Alerting',
    status: 'missing',
    priority: 'medium',
    description: 'Rotate alert responsibilities',
    businessValue: 'Distribute incident response workload'
  },

  // ========== VIDEO & AR/VR ==========
  {
    id: 'video-analytics',
    name: 'Video Analytics Integration',
    category: 'Advanced',
    status: 'planned',
    priority: 'medium',
    description: 'Computer vision for quality inspection',
    businessValue: 'Automated defect detection'
  },
  {
    id: 'ar-maintenance',
    name: 'AR-Guided Maintenance',
    category: 'Advanced',
    status: 'planned',
    priority: 'medium',
    description: 'Augmented reality maintenance instructions',
    businessValue: 'Reduce technician training time'
  },
];

const categories = [
  { id: 'all', name: 'All Features', icon: Target },
  { id: 'Connectivity', name: 'Connectivity', icon: Plug },
  { id: 'Edge Computing', name: 'Edge Computing', icon: Box },
  { id: 'AI/ML', name: 'AI/ML', icon: Brain },
  { id: 'Security', name: 'Security', icon: Shield },
  { id: 'App Development', name: 'App Development', icon: Code },
  { id: 'Integration', name: 'Integration', icon: Globe },
  { id: 'Infrastructure', name: 'Infrastructure', icon: Cloud },
  { id: 'User Experience', name: 'UX', icon: Smartphone },
  { id: 'Data Management', name: 'Data', icon: Database },
  { id: 'Support', name: 'Support', icon: HelpCircle },
  { id: 'Deployment', name: 'Deployment', icon: GitBranch },
  { id: 'Alerting', name: 'Alerting', icon: AlertTriangle },
  { id: 'Advanced', name: 'Advanced', icon: Zap },
];

export function ProductionReadiness() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);

  const filteredFeatures = productionFeatures.filter(feature => {
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || feature.priority === selectedPriority;
    const matchesStatus = !showOnlyMissing || (feature.status === 'missing' || feature.status === 'planned');
    return matchesCategory && matchesPriority && matchesStatus;
  });

  const stats = {
    total: productionFeatures.length,
    implemented: productionFeatures.filter(f => f.status === 'implemented').length,
    partial: productionFeatures.filter(f => f.status === 'partial').length,
    planned: productionFeatures.filter(f => f.status === 'planned').length,
    missing: productionFeatures.filter(f => f.status === 'missing').length,
  };

  const completionRate = Math.round(
    ((stats.implemented + stats.partial * 0.5) / stats.total) * 100
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'partial': return <Activity className="w-5 h-5 text-blue-400" />;
      case 'planned': return <Clock className="w-5 h-5 text-purple-400" />;
      case 'missing': return <Circle className="w-5 h-5 text-slate-500" />;
      default: return <Circle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-slate-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-white text-2xl">Production Readiness Assessment</h2>
        <p className="text-slate-400 text-sm mt-1">
          Comprehensive feature checklist for enterprise-grade IIoT platform
        </p>
      </div>

      {/* Completion Stats */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">Overall Completion</h3>
          <span className="text-2xl text-blue-400">{completionRate}%</span>
        </div>
        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total Features', value: stats.total, color: 'blue', icon: Target },
            { label: 'Implemented', value: stats.implemented, color: 'green', icon: CheckCircle },
            { label: 'Partial', value: stats.partial, color: 'blue', icon: Activity },
            { label: 'Planned', value: stats.planned, color: 'purple', icon: Clock },
            { label: 'Missing', value: stats.missing, color: 'slate', icon: Circle },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 text-${stat.color}-400`} />
                  <p className="text-slate-400 text-xs">{stat.label}</p>
                </div>
                <p className={`text-2xl text-${stat.color}-400`}>{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => setShowOnlyMissing(!showOnlyMissing)}
            className={`px-4 py-2 rounded-lg transition-all ${showOnlyMissing
              ? 'bg-orange-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
          >
            Show Gaps Only
          </button>
        </div>
      </div>

      {/* Feature List */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <p className="text-white">
            {filteredFeatures.length} features
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            {selectedPriority !== 'all' && ` (${selectedPriority} priority)`}
          </p>
        </div>
        <div className="divide-y divide-slate-700">
          {filteredFeatures.map((feature) => (
            <div key={feature.id} className="p-6 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getStatusIcon(feature.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white mb-1">{feature.name}</h4>
                      <p className="text-slate-400 text-sm mb-2">{feature.description}</p>
                      {feature.implementation && (
                        <p className="text-blue-400 text-xs mb-2">
                          ✓ {feature.implementation}
                        </p>
                      )}
                      <p className="text-green-400 text-sm">
                        💰 {feature.businessValue}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded text-xs ${feature.status === 'implemented' ? 'bg-green-500/20 text-green-400' :
                        feature.status === 'partial' ? 'bg-blue-500/20 text-blue-400' :
                          feature.status === 'planned' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-slate-500/20 text-slate-400'
                        }`}>
                        {feature.status === 'implemented' ? '✓ Implemented' :
                          feature.status === 'partial' ? '⚡ Partial' :
                            feature.status === 'planned' ? '📅 Planned' : '○ Missing'}
                      </span>
                      <span className={`px-3 py-1 rounded text-xs ${getPriorityColor(feature.priority)}`}>
                        {feature.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Missing Features */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Critical Missing Features
        </h3>
        <div className="space-y-2">
          {productionFeatures
            .filter(f => f.priority === 'critical' && (f.status === 'missing' || f.status === 'planned'))
            .map(feature => (
              <div key={feature.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div>
                  <p className="text-white text-sm">{feature.name}</p>
                  <p className="text-slate-400 text-xs">{feature.category}</p>
                </div>
                <span className="text-red-400 text-xs">{feature.status}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
        <h3 className="text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Next Steps to Production
        </h3>
        <div className="space-y-3">
          {[
            { phase: 'Phase 1 (Critical)', items: 'OPC-UA, Modbus, LDAP/SSO, High Availability, Data Historian', timeline: '3-4 months' },
            { phase: 'Phase 2 (High Priority)', items: 'Edge Computing, MES/ERP Integration, PLC Integration, Mobile App', timeline: '4-6 months' },
            { phase: 'Phase 3 (Enhancement)', items: 'ML Training Studio, AutoML, Advanced Security, Geospatial', timeline: '6-12 months' },
          ].map((phase, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start justify-between mb-2">
                <p className="text-white">{phase.phase}</p>
                <span className="text-slate-400 text-xs">{phase.timeline}</span>
              </div>
              <p className="text-slate-400 text-sm">{phase.items}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
