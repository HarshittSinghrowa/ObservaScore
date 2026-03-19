export const DEFAULT_PILLARS = [
  {
    name: 'Logging',
    weight: 25,
    icon: '📋',
    color: '#3b82f6',
    description: 'Measures quality and structure of application logs',
    criteria: [
      { label: 'Structured JSON logging enabled', points: 20 },
      { label: 'Log levels configured (DEBUG/INFO/WARN/ERROR)', points: 15 },
      { label: 'Centralised log aggregation (ELK/Loki)', points: 20 },
      { label: 'Log retention policy defined (≥ 30 days)', points: 15 },
      { label: 'Sensitive data redaction implemented', points: 15 },
      { label: 'Correlation IDs present in logs', points: 15 },
    ]
  },
  {
    name: 'Metrics',
    weight: 25,
    icon: '📈',
    color: '#10b981',
    description: 'Measures availability and quality of system metrics',
    criteria: [
      { label: 'Application metrics exposed (Prometheus/StatsD)', points: 20 },
      { label: 'Infrastructure metrics collected (CPU/Mem/Disk)', points: 20 },
      { label: 'Custom business metrics defined', points: 15 },
      { label: 'Dashboards created (Grafana/Datadog)', points: 20 },
      { label: 'SLO/SLA metrics tracked', points: 15 },
      { label: 'Historical metrics retained (≥ 90 days)', points: 10 },
    ]
  },
  {
    name: 'Tracing',
    weight: 20,
    icon: '🔍',
    color: '#8b5cf6',
    description: 'Evaluates distributed tracing coverage',
    criteria: [
      { label: 'Distributed tracing implemented (Jaeger/Zipkin)', points: 25 },
      { label: 'All services instrumented with traces', points: 25 },
      { label: 'Trace sampling configured appropriately', points: 20 },
      { label: 'Trace-to-log correlation enabled', points: 15 },
      { label: 'Slow trace alerts configured', points: 15 },
    ]
  },
  {
    name: 'Alerting',
    weight: 15,
    icon: '🔔',
    color: '#f59e0b',
    description: 'Assesses alerting and incident response readiness',
    criteria: [
      { label: 'Critical alerts configured and tested', points: 25 },
      { label: 'Alert routing to on-call team (PagerDuty/Slack)', points: 20 },
      { label: 'Alert deduplication and throttling enabled', points: 20 },
      { label: 'Runbooks linked to alerts', points: 20 },
      { label: 'Alert fatigue review process in place', points: 15 },
    ]
  },
  {
    name: 'Dashboards',
    weight: 15,
    icon: '🖥️',
    color: '#06b6d4',
    description: 'Evaluates visibility and monitoring coverage',
    criteria: [
      { label: 'Service health dashboard exists', points: 25 },
      { label: 'Business KPI dashboard available', points: 20 },
      { label: 'Real-time anomaly detection configured', points: 20 },
      { label: 'Dashboard access shared across teams', points: 20 },
      { label: 'Mobile/on-call access to dashboards', points: 15 },
    ]
  }
];

export const MATURITY_LEVELS = {
  Platinum: { min: 90, color: '#a78bfa', emoji: '🏆' },
  Gold:     { min: 75, color: '#fbbf24', emoji: '🥇' },
  Silver:   { min: 60, color: '#cbd5e1', emoji: '🥈' },
  Bronze:   { min: 0,  color: '#fb923c', emoji: '🥉' },
};
