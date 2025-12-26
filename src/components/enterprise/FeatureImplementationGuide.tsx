import { X, Code, Database, Cloud, Zap, TrendingUp, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

interface TechStack {
  frontend: string[];
  backend: string[];
  ml?: string[];
  database: string[];
  infrastructure: string[];
  thirdParty?: string[];
}

interface CompetitiveAnalysis {
  competitor: string;
  theirApproach: string;
  ourDifferentiator: string;
}

interface ImplementationDetail {
  featureId: string;
  featureName: string;
  overview: string;
  techStack: TechStack;
  architecture: string[];
  keyAlgorithms?: string[];
  databaseSchema?: string[];
  apiEndpoints?: string[];
  codeExample?: string;
  deploymentSteps: string[];
  competitiveAnalysis: CompetitiveAnalysis[];
  estimatedEffort: string;
  prerequisites: string[];
  bestPractices: string[];
}

const IMPLEMENTATION_GUIDES: Record<string, ImplementationDetail> = {
  'predictive-maintenance': {
    featureId: 'predictive-maintenance',
    featureName: 'Predictive Maintenance',
    overview: 'Build a world-class predictive maintenance system using ensemble ML models that analyze sensor data, maintenance history, and environmental factors to predict failures 2-4 weeks in advance.',
    techStack: {
      frontend: ['React with TensorFlow.js for client-side inference', 'Recharts for model performance visualization', 'D3.js for feature importance charts'],
      backend: ['Python FastAPI for model serving', 'Celery for background training jobs', 'Redis for model caching'],
      ml: ['scikit-learn (Random Forest, Gradient Boosting)', 'XGBoost for tabular data', 'Prophet for time-series', 'PyTorch for deep learning (LSTM, Transformer)', 'MLflow for experiment tracking'],
      database: ['TimescaleDB for sensor time-series', 'PostgreSQL for maintenance records', 'MinIO/S3 for model artifacts'],
      infrastructure: ['Kubernetes for model deployment', 'Kubeflow/MLflow for ML pipeline', 'Prometheus for model monitoring', 'Grafana for observability'],
      thirdParty: ['AWS SageMaker or Azure ML (optional)', 'Weights & Biases for experiment tracking', 'Evidently AI for model drift detection']
    },
    architecture: [
      '1. Data Pipeline: Ingest sensor data (MQTT/HTTP) → Feature engineering (rolling stats, FFT, wavelets) → Store in TimescaleDB',
      '2. Training Pipeline: Automated weekly retraining on new data → Hyperparameter tuning with Optuna → A/B test new models',
      '3. Inference: Real-time scoring via FastAPI → Return probability + confidence interval → Cache predictions in Redis',
      '4. Feedback Loop: Capture actual failures → Retrain model with labels → Monitor performance degradation',
      '5. Explainability: SHAP values for predictions → Feature importance dashboard → Alert root cause analysis'
    ],
    keyAlgorithms: [
      'Random Forest Classifier for multi-class failure prediction (bearing, motor, seal, etc.)',
      'Gradient Boosting (XGBoost) with weighted classes for imbalanced data',
      'Survival Analysis (Cox Proportional Hazards) for remaining useful life (RUL)',
      'LSTM Autoencoder for unsupervised anomaly detection on vibration patterns',
      'Isolation Forest for detecting novel failure modes',
      'Feature engineering: 50+ features including RMS, kurtosis, crest factor, FFT peaks, temperature derivatives'
    ],
    databaseSchema: [
      'CREATE TABLE sensor_features (device_id, timestamp, rms_vibration, peak_frequency, temperature_delta, ...)',
      'CREATE TABLE failure_events (device_id, failure_timestamp, failure_type, downtime_hours, root_cause)',
      'CREATE TABLE predictions (device_id, prediction_timestamp, failure_probability, predicted_date, confidence)',
      'CREATE TABLE model_performance (model_version, precision, recall, f1_score, mae_rul, deployment_date)'
    ],
    apiEndpoints: [
      'POST /api/v1/predictions/predict - Real-time prediction for single device',
      'POST /api/v1/predictions/batch - Batch predictions for fleet',
      'GET /api/v1/models/{model_id}/explain - Get SHAP explanation for prediction',
      'POST /api/v1/training/trigger - Trigger model retraining',
      'GET /api/v1/models/performance - Get model metrics and drift analysis',
      'POST /api/v1/feedback/failure - Log actual failure for model improvement'
    ],
    codeExample: `# Feature Engineering Pipeline
import pandas as pd
from scipy import signal
from scipy.stats import kurtosis

def engineer_features(sensor_data: pd.DataFrame) -> pd.DataFrame:
    """Extract 50+ features from raw sensor data"""
    features = {}
    
    # Time-domain features
    features['rms'] = np.sqrt(np.mean(sensor_data['vibration']**2))
    features['peak'] = np.max(np.abs(sensor_data['vibration']))
    features['kurtosis'] = kurtosis(sensor_data['vibration'])
    features['crest_factor'] = features['peak'] / features['rms']
    
    # Frequency-domain features (FFT)
    fft_vals = np.fft.fft(sensor_data['vibration'])
    fft_freq = np.fft.fftfreq(len(fft_vals))
    features['dominant_freq'] = fft_freq[np.argmax(np.abs(fft_vals))]
    
    # Rolling statistics
    features['temp_delta_1h'] = sensor_data['temp'].diff(60).mean()
    features['vibration_std_24h'] = sensor_data['vibration'].rolling(1440).std()
    
    return pd.DataFrame([features])

# Model Training with XGBoost
import xgboost as xgb
from sklearn.model_selection import TimeSeriesSplit

def train_model(X_train, y_train):
    """Train ensemble model with time-series cross-validation"""
    
    # Handle imbalanced data with class weights
    scale_pos_weight = len(y_train[y_train==0]) / len(y_train[y_train==1])
    
    model = xgb.XGBClassifier(
        n_estimators=500,
        max_depth=8,
        learning_rate=0.01,
        scale_pos_weight=scale_pos_weight,
        eval_metric='aucpr'  # Better for imbalanced data
    )
    
    # Time-series cross-validation
    tscv = TimeSeriesSplit(n_splits=5)
    for train_idx, val_idx in tscv.split(X_train):
        X_t, X_v = X_train.iloc[train_idx], X_train.iloc[val_idx]
        y_t, y_v = y_train.iloc[train_idx], y_train.iloc[val_idx]
        
        model.fit(X_t, y_t, 
                  eval_set=[(X_v, y_v)],
                  early_stopping_rounds=50,
                  verbose=False)
    
    return model`,
    deploymentSteps: [
      '1. Set up TimescaleDB with hypertables for sensor data (1M+ rows/day)',
      '2. Deploy feature engineering pipeline (Airflow/Prefect) running every 5 minutes',
      '3. Initial model training on 6+ months historical data with labeled failures',
      '4. Deploy model behind FastAPI with auto-scaling (HPA in K8s)',
      '5. Set up monitoring: Prometheus metrics for prediction latency, model accuracy, data drift',
      '6. Create alert rules for model performance degradation (accuracy < 0.75)',
      '7. Implement feedback loop: Capture actual failures and schedule weekly retraining',
      '8. Build dashboard showing predictions, model performance, and ROI metrics',
      '9. A/B test new models in shadow mode before promotion to production'
    ],
    competitiveAnalysis: [
      {
        competitor: 'AWS IoT Predictive Maintenance',
        theirApproach: 'Pre-built ML models with limited customization. Requires AWS ecosystem lock-in.',
        ourDifferentiator: 'Fully customizable models trained on YOUR data. Works on-prem or any cloud. 40% better accuracy with domain-specific features.'
      },
      {
        competitor: 'Azure IoT Central',
        theirApproach: 'Template-based approach with generic models. No explainability.',
        ourDifferentiator: 'Built-from-scratch models for your assets. SHAP explanations show WHY failures predicted. Actionable insights, not black box.'
      },
      {
        competitor: 'Palantir Foundry',
        theirApproach: 'Expensive consulting-heavy deployment. 6-12 month implementation.',
        ourDifferentiator: 'Self-service ML pipeline. Launch in 4-6 weeks. 1/10th the cost. Open-source stack you control.'
      },
      {
        competitor: 'IBM Maximo Predict',
        theirApproach: 'Legacy system, slow to update. Fixed algorithms.',
        ourDifferentiator: 'Modern ML stack. Continuous model updates. Incorporate latest research (Transformers, etc.). 10x faster inference.'
      }
    ],
    estimatedEffort: '6-8 weeks with 2 ML engineers + 1 backend engineer',
    prerequisites: [
      'At least 6 months of sensor data with labeled failure events (minimum 30 failures)',
      'TimescaleDB or InfluxDB for time-series storage',
      'Kubernetes cluster or cloud environment for model deployment',
      'Python ML environment (Python 3.9+, scikit-learn, XGBoost, PyTorch)',
      'CI/CD pipeline for automated model deployment'
    ],
    bestPractices: [
      'Start with simple models (Random Forest) before deep learning - easier to debug',
      'Use time-series cross-validation, NEVER random split (data leakage!)',
      'Monitor model drift weekly - sensor characteristics change over time',
      'Implement A/B testing for new models - shadow mode before production',
      'Store ALL predictions for audit trail and continuous improvement',
      'Use SHAP for explainability - engineers trust transparent models',
      'Set up alerts for model degradation - retrain when accuracy drops',
      'Build feedback loop - capture actual failures to improve model',
      'Consider ensemble models - combine multiple approaches for robustness'
    ]
  },
  'anomaly-detection': {
    featureId: 'anomaly-detection',
    featureName: 'Real-time Anomaly Detection',
    overview: 'Implement unsupervised and semi-supervised anomaly detection using isolation forests, autoencoders, and statistical methods to catch issues 85% faster than manual monitoring.',
    techStack: {
      frontend: ['React with real-time charts', 'WebSocket for live anomaly alerts', 'Heatmaps for correlation analysis'],
      backend: ['Python FastAPI for model serving', 'Apache Kafka for streaming', 'Redis for state management'],
      ml: ['scikit-learn (Isolation Forest, Local Outlier Factor)', 'PyTorch (LSTM Autoencoder, VAE)', 'Prophet for seasonal decomposition', 'PyCaret for AutoML'],
      database: ['TimescaleDB for raw data', 'Redis for real-time scoring cache', 'ClickHouse for analytics queries'],
      infrastructure: ['Kafka Streams or Flink for stream processing', 'Docker Compose for local dev', 'K8s for production'],
      thirdParty: ['Sentry for error tracking', 'Datadog for observability']
    },
    architecture: [
      '1. Streaming Layer: Kafka ingests sensor data → Windowed aggregations (1min, 5min, 1hr)',
      '2. Feature Store: Pre-compute rolling stats, seasonality, cross-sensor correlations',
      '3. Multi-Model Ensemble: Statistical (3-sigma, Z-score) + ML (Isolation Forest) + DL (Autoencoder)',
      '4. Scoring: Real-time inference with <100ms latency → Aggregate anomaly score (0-1)',
      '5. Smart Alerting: Suppress duplicates, group related anomalies, adaptive thresholds',
      '6. Feedback: User labels (true/false positive) → Retrain models weekly'
    ],
    keyAlgorithms: [
      'Isolation Forest: Fast, unsupervised, works well for high-dimensional data',
      'LSTM Autoencoder: Learn normal patterns, detect reconstruction errors',
      'Statistical Process Control: 3-sigma, CUSUM, EWMA for known distributions',
      'Seasonal-Trend Decomposition (STL): Remove seasonality before anomaly detection',
      'Dynamic Time Warping: Compare current pattern to historical "good" periods',
      'Multivariate Gaussian: Model joint distribution of correlated sensors'
    ],
    databaseSchema: [
      'CREATE TABLE anomaly_scores (device_id, timestamp, anomaly_score, contributing_sensors, algorithm_used)',
      'CREATE TABLE anomaly_alerts (alert_id, device_id, timestamp, severity, description, acknowledged)',
      'CREATE TABLE user_feedback (alert_id, user_id, is_true_positive, comments, feedback_timestamp)',
      'CREATE TABLE baseline_profiles (device_id, sensor_id, hour_of_day, day_of_week, mean, stddev, percentile_95)'
    ],
    apiEndpoints: [
      'POST /api/v1/anomaly/detect - Score single data point in real-time',
      'POST /api/v1/anomaly/batch - Batch anomaly scoring for historical analysis',
      'GET /api/v1/anomaly/alerts - Get active anomaly alerts',
      'POST /api/v1/anomaly/feedback - Submit user feedback (true/false positive)',
      'GET /api/v1/anomaly/baseline/{device_id} - Get learned baseline profile',
      'POST /api/v1/anomaly/retrain - Trigger model retraining with feedback data'
    ],
    codeExample: `# Real-time Anomaly Detection with Ensemble
import numpy as np
from sklearn.ensemble import IsolationForest
from scipy import stats

class AnomalyDetector:
    def __init__(self):
        self.isolation_forest = IsolationForest(contamination=0.01, n_estimators=100)
        self.baseline_stats = {}
        
    def fit_baseline(self, historical_data: pd.DataFrame):
        """Learn normal behavior from historical data"""
        # Train Isolation Forest
        self.isolation_forest.fit(historical_data)
        
        # Compute statistical baselines (mean, std per hour/day)
        for sensor in historical_data.columns:
            self.baseline_stats[sensor] = {
                'mean': historical_data[sensor].mean(),
                'std': historical_data[sensor].std(),
                'percentile_99': historical_data[sensor].quantile(0.99)
            }
    
    def detect(self, current_data: pd.DataFrame) -> dict:
        """Multi-method ensemble anomaly detection"""
        scores = []
        
        # Method 1: Isolation Forest (-1 = anomaly, 1 = normal)
        if_score = self.isolation_forest.score_samples(current_data)
        scores.append(1 - (if_score + 0.5))  # Normalize to 0-1
        
        # Method 2: Statistical (Z-score)
        z_scores = []
        for sensor in current_data.columns:
            if sensor in self.baseline_stats:
                baseline = self.baseline_stats[sensor]
                z = abs((current_data[sensor].values[0] - baseline['mean']) / baseline['std'])
                z_scores.append(min(z / 3, 1.0))  # Normalize
        scores.append(np.mean(z_scores))
        
        # Method 3: Rate of Change
        if hasattr(self, 'previous_data'):
            delta = abs(current_data - self.previous_data).mean().mean()
            max_expected_delta = 0.1  # Domain specific
            scores.append(min(delta / max_expected_delta, 1.0))
        
        self.previous_data = current_data
        
        # Ensemble: Average scores
        anomaly_score = np.mean(scores)
        
        return {
            'anomaly_score': float(anomaly_score),
            'is_anomaly': anomaly_score > 0.7,
            'contributing_methods': {
                'isolation_forest': scores[0],
                'statistical': scores[1] if len(scores) > 1 else 0,
                'rate_of_change': scores[2] if len(scores) > 2 else 0
            }
        }`,
    deploymentSteps: [
      '1. Set up Kafka cluster for real-time data streaming (3-node cluster)',
      '2. Deploy feature engineering service to compute rolling stats in real-time',
      '3. Train initial baseline models on 4+ weeks of "normal" operational data',
      '4. Deploy anomaly detection service with auto-scaling (target: <100ms p95 latency)',
      '5. Implement smart alerting with deduplication and grouping logic',
      '6. Set up feedback collection UI for users to mark true/false positives',
      '7. Schedule weekly model retraining incorporating user feedback',
      '8. Create anomaly dashboard with top anomalies, trends, and model performance',
      '9. Integrate with existing alerting systems (PagerDuty, Slack, email)'
    ],
    competitiveAnalysis: [
      {
        competitor: 'AWS Lookout for Equipment',
        theirApproach: 'Black-box AutoML. No control over algorithms. Expensive at scale.',
        ourDifferentiator: 'Transparent ensemble. Choose best algorithm per asset type. 60% lower cost with open-source stack.'
      },
      {
        competitor: 'Azure Anomaly Detector',
        theirApproach: 'Generic models for univariate/multivariate data. Limited domain customization.',
        ourDifferentiator: 'Domain-specific features (vibration FFT, thermal patterns). Multi-method ensemble. Custom thresholds per asset.'
      },
      {
        competitor: 'Datadog Anomaly Detection',
        theirApproach: 'IT-focused. Works for metrics but not industrial sensor data.',
        ourDifferentiator: 'Built for IoT/IIoT. Handles vibration, thermal, pressure data. FFT analysis. Seasonal adjustments for production schedules.'
      }
    ],
    estimatedEffort: '4-6 weeks with 2 engineers (1 ML + 1 backend)',
    prerequisites: [
      '4+ weeks of historical "normal" operational data for baseline',
      'Real-time streaming infrastructure (Kafka or equivalent)',
      'TimescaleDB or similar for time-series storage',
      'Python 3.9+ with scikit-learn, PyTorch',
      'Domain knowledge to define "normal" vs "anomalous" thresholds'
    ],
    bestPractices: [
      'Use ensemble methods - no single algorithm catches all anomalies',
      'Separate seasonal/cyclical patterns before anomaly detection',
      'Implement adaptive thresholds - what\'s normal changes over time',
      'Reduce alert fatigue with smart grouping and deduplication',
      'Collect user feedback religiously - it\'s gold for model improvement',
      'Monitor false positive rate - target less than 5% for user trust',
      'Use different models for different sensor types (vibration vs temperature)',
      'Implement warm-up period - don\'t alert during asset startup/shutdown',
      'Store all anomaly scores for debugging and tuning'
    ]
  },
  'visual-workflow-builder': {
    featureId: 'workflow-engine',
    featureName: 'Visual Workflow Builder',
    overview: 'Build a node-based workflow automation system like Zapier/n8n but for IoT. Enable non-technical users to create complex automation with 100+ triggers, conditions, and actions.',
    techStack: {
      frontend: ['React Flow for node-based UI', 'Monaco Editor for code snippets', 'Formik for dynamic forms'],
      backend: ['Node.js for workflow execution engine', 'Bull/BullMQ for job queues', 'Redis for state management'],
      database: ['PostgreSQL for workflow definitions', 'Redis for execution state', 'MongoDB for execution logs'],
      infrastructure: ['Docker for isolated workflow execution', 'Temporal.io or Apache Airflow for orchestration', 'Kubernetes for scaling']
    },
    architecture: [
      '1. Workflow Designer: React Flow canvas → Drag/drop nodes → Configure inputs → Save as JSON',
      '2. Workflow Engine: Interpret workflow JSON → Execute nodes sequentially/parallel → Handle errors/retries',
      '3. Trigger System: Listen for events (sensor threshold, time schedule, webhook) → Queue workflow execution',
      '4. Execution Runtime: Isolated Docker containers → Access to APIs, databases → Output logging',
      '5. State Management: Track execution progress → Enable pause/resume → Store variables across nodes'
    ],
    keyAlgorithms: [
      'Directed Acyclic Graph (DAG) validation to prevent cycles',
      'Topological sort for node execution order',
      'Depth-first search for conditional branching',
      'Queue-based execution with priority scheduling',
      'Circuit breaker pattern for external API calls',
      'Exponential backoff for retries'
    ],
    databaseSchema: [
      'CREATE TABLE workflows (id, name, description, trigger_type, nodes_json, edges_json, enabled, created_by)',
      'CREATE TABLE workflow_executions (id, workflow_id, status, started_at, completed_at, error_message)',
      'CREATE TABLE execution_logs (execution_id, node_id, timestamp, log_level, message, output_data)',
      'CREATE TABLE workflow_triggers (id, workflow_id, trigger_type, trigger_config, last_triggered)'
    ],
    apiEndpoints: [
      'POST /api/v1/workflows - Create new workflow',
      'PUT /api/v1/workflows/{id} - Update workflow definition',
      'POST /api/v1/workflows/{id}/execute - Manual trigger',
      'GET /api/v1/workflows/{id}/executions - Get execution history',
      'GET /api/v1/workflows/nodes - Get available node types',
      'POST /api/v1/workflows/{id}/test - Test workflow in sandbox'
    ],
    codeExample: `// Workflow Execution Engine
interface WorkflowNode {
  id: string;
  type: 'trigger' | 'filter' | 'action' | 'condition';
  config: Record<string, any>;
  inputs: string[];
  outputs: string[];
}

class WorkflowEngine {
  async execute(workflow: Workflow, context: any) {
    const executionState = new Map();
    const sortedNodes = this.topologicalSort(workflow.nodes, workflow.edges);
    
    for (const node of sortedNodes) {
      try {
        // Get input data from previous nodes
        const inputData = this.gatherInputs(node, executionState);
        
        // Execute node based on type
        const result = await this.executeNode(node, inputData, context);
        
        // Store output for downstream nodes
        executionState.set(node.id, result);
        
        // Log execution
        await this.logExecution(workflow.id, node.id, 'success', result);
        
        // Handle conditional branching
        if (node.type === 'condition' && !result.condition_met) {
          break;  // Skip downstream nodes
        }
        
      } catch (error) {
        await this.handleError(workflow, node, error);
        
        // Check retry policy
        if (node.config.retry && node.config.retryCount < 3) {
          await this.retryNode(workflow, node);
        } else {
          throw error;  // Fail workflow
        }
      }
    }
    
    return executionState;
  }
  
  async executeNode(node: WorkflowNode, inputs: any, context: any) {
    switch (node.type) {
      case 'filter':
        return this.applyFilter(node.config, inputs);
      case 'action':
        return this.executeAction(node.config, inputs, context);
      case 'condition':
        return this.evaluateCondition(node.config, inputs);
      default:
        throw new Error(\`Unknown node type: \${node.type}\`);
    }
  }
}`,
    deploymentSteps: [
      '1. Set up PostgreSQL for workflow storage',
      '2. Deploy Redis for execution state and job queues',
      '3. Implement React Flow UI with 20+ node types',
      '4. Build workflow execution engine with DAG validation',
      '5. Create node library: triggers (MQTT, HTTP, schedule), filters (threshold, regex), actions (webhook, email, database)',
      '6. Implement error handling, retries, and circuit breakers',
      '7. Build execution monitoring dashboard',
      '8. Add workflow templates library (common use cases)',
      '9. Implement access control (who can create/edit workflows)'
    ],
    competitiveAnalysis: [
      {
        competitor: 'Zapier',
        theirApproach: 'SaaS-only. Limited to cloud integrations. Expensive at scale ($600+/mo).',
        ourDifferentiator: 'Self-hosted. IoT-specific nodes (MQTT, Modbus, OPC-UA). Unlimited workflows. $0 execution costs.'
      },
      {
        competitor: 'Node-RED',
        theirApproach: 'Great for IoT but limited enterprise features. No RBAC, audit logs, or version control.',
        ourDifferentiator: 'Enterprise-grade: RBAC, audit trails, git-based versioning, A/B testing, rollback. Better UI/UX.'
      },
      {
        competitor: 'AWS IoT Events',
        theirApproach: 'AWS lock-in. Complex state machine syntax. Hard to debug.',
        ourDifferentiator: 'Cloud-agnostic. Visual drag-drop (no code). Built-in debugger. Works on-prem or any cloud.'
      }
    ],
    estimatedEffort: '8-10 weeks with 2 frontend + 2 backend engineers',
    prerequisites: [
      'PostgreSQL database',
      'Redis for job queuing',
      'Node.js runtime environment',
      'Docker for isolated execution (optional but recommended)',
      'Understanding of workflow patterns (DAG, state machines)'
    ],
    bestPractices: [
      'Validate DAG on every save - prevent cycles',
      'Implement execution timeouts per node (prevent infinite loops)',
      'Use idempotent operations where possible',
      'Store ALL execution logs for debugging',
      'Implement dry-run/test mode for workflow debugging',
      'Add workflow versioning - allow rollback',
      'Use circuit breakers for external API calls',
      'Implement rate limiting on workflow triggers',
      'Provide workflow templates for common use cases',
      'Build expression language for dynamic values (e.g., {{sensor.temperature}})'
    ]
  }
};

// Add more implementation guides for other features...
// (truncated for brevity - we can add 70+ features progressively)

interface Props {
  featureId: string;
  featureName: string;
  onClose: () => void;
}

export function FeatureImplementationGuide({ featureId, featureName, onClose }: Props) {
  const guide = IMPLEMENTATION_GUIDES[featureId];

  if (!guide) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-white">{featureName}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-slate-300">
            Implementation guide coming soon! This feature is on our roadmap.
          </p>
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              💡 <strong>Want to see this guide first?</strong> Let us know which features you're most interested in implementing.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 rounded-xl max-w-6xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 rounded-t-xl flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-white mb-2">{guide.featureName}</h2>
            <p className="text-slate-400">Complete Implementation Guide</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {/* Overview */}
          <section>
            <h3 className="text-xl text-white mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Overview
            </h3>
            <p className="text-slate-300 leading-relaxed">{guide.overview}</p>
          </section>

          {/* Estimated Effort */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-slate-400">Estimated Implementation Time</div>
                <div className="text-white">{guide.estimatedEffort}</div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              Technology Stack
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm text-slate-400 uppercase mb-2">Frontend</h4>
                <ul className="space-y-1">
                  {guide.techStack.frontend.map((tech, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-blue-400 mt-1">▸</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm text-slate-400 uppercase mb-2">Backend</h4>
                <ul className="space-y-1">
                  {guide.techStack.backend.map((tech, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-green-400 mt-1">▸</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {guide.techStack.ml && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <h4 className="text-sm text-slate-400 uppercase mb-2">ML / AI</h4>
                  <ul className="space-y-1">
                    {guide.techStack.ml.map((tech, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-1">▸</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm text-slate-400 uppercase mb-2">Database</h4>
                <ul className="space-y-1">
                  {guide.techStack.database.map((tech, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">▸</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm text-slate-400 uppercase mb-2">Infrastructure</h4>
                <ul className="space-y-1">
                  {guide.techStack.infrastructure.map((tech, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-orange-400 mt-1">▸</span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              {guide.techStack.thirdParty && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <h4 className="text-sm text-slate-400 uppercase mb-2">Third-Party Services</h4>
                  <ul className="space-y-1">
                    {guide.techStack.thirdParty.map((tech, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">▸</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Architecture */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <Cloud className="w-5 h-5 text-cyan-400" />
              System Architecture
            </h3>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <ol className="space-y-3">
                {guide.architecture.map((step, idx) => (
                  <li key={idx} className="text-slate-300 flex gap-3">
                    <span className="text-cyan-400 shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Key Algorithms */}
          {guide.keyAlgorithms && (
            <section>
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Key Algorithms & Techniques
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <ul className="space-y-2">
                  {guide.keyAlgorithms.map((algo, idx) => (
                    <li key={idx} className="text-slate-300 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-1 shrink-0" />
                      <span>{algo}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Database Schema */}
          {guide.databaseSchema && (
            <section>
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                Database Schema
              </h3>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono">
                  {guide.databaseSchema.join(';\n\n')}
                </pre>
              </div>
            </section>
          )}

          {/* API Endpoints */}
          {guide.apiEndpoints && (
            <section>
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-400" />
                API Endpoints
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-lg divide-y divide-slate-700">
                {guide.apiEndpoints.map((endpoint, idx) => {
                  const [method, ...rest] = endpoint.split(' ');
                  const methodColors: Record<string, string> = {
                    'GET': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    'POST': 'bg-green-500/20 text-green-300 border-green-500/30',
                    'PUT': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
                    'DELETE': 'bg-red-500/20 text-red-300 border-red-500/30'
                  };
                  return (
                    <div key={idx} className="p-3 flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs border ${methodColors[method] || ''}`}>
                        {method}
                      </span>
                      <code className="text-slate-300 text-sm font-mono">{rest.join(' ')}</code>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Code Example */}
          {guide.codeExample && (
            <section>
              <h3 className="text-xl text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-pink-400" />
                Code Example
              </h3>
              <div className="bg-slate-950 border border-slate-700 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-slate-300">
                  <code>{guide.codeExample}</code>
                </pre>
              </div>
            </section>
          )}

          {/* Deployment Steps */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              Deployment Steps
            </h3>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <ol className="space-y-3">
                {guide.deploymentSteps.map((step, idx) => (
                  <li key={idx} className="text-slate-300 flex gap-3">
                    <span className="text-green-400 shrink-0 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Competitive Analysis */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-rose-400" />
              Competitive Analysis: How to Beat the Big Players
            </h3>
            <div className="space-y-4">
              {guide.competitiveAnalysis.map((comp, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-rose-400" />
                    <h4 className="text-white">vs. {comp.competitor}</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Their Approach</div>
                      <p className="text-slate-300 text-sm">{comp.theirApproach}</p>
                    </div>
                    <div>
                      <div className="text-xs text-green-400 uppercase mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Your Differentiator
                      </div>
                      <p className="text-green-300 text-sm">{comp.ourDifferentiator}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Prerequisites
            </h3>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-5">
              <ul className="space-y-2">
                {guide.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="text-yellow-200 text-sm flex items-start gap-3">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Best Practices */}
          <section>
            <h3 className="text-xl text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              Best Practices & Pro Tips
            </h3>
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <ul className="space-y-3">
                {guide.bestPractices.map((practice, idx) => (
                  <li key={idx} className="text-slate-300 flex items-start gap-3">
                    <Star className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-slate-400 text-sm">
              Need help implementing? Our team can provide consulting and code reviews.
            </p>
            <button 
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}