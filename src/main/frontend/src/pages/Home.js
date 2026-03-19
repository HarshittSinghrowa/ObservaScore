import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const features = [
  { icon: '📋', title: 'Logging Assessment', desc: 'Evaluate log structure, centralization, retention and security practices.' },
  { icon: '📈', title: 'Metrics Coverage', desc: 'Measure system and business metrics, SLO tracking, and dashboard quality.' },
  { icon: '🔍', title: 'Distributed Tracing', desc: 'Assess end-to-end trace coverage across microservices and dependencies.' },
  { icon: '🔔', title: 'Alerting Readiness', desc: 'Review alert rules, routing, runbooks, and on-call integration.' },
  { icon: '🖥️', title: 'Dashboard Visibility', desc: 'Check real-time monitoring, anomaly detection and team accessibility.' },
  { icon: '📊', title: 'Trend Analytics', desc: 'Track observability improvement over time with historical scoring data.' },
];

const maturityLevels = [
  { level: 'Platinum', range: '90–100', color: '#a78bfa', emoji: '🏆', desc: 'World-class observability' },
  { level: 'Gold',     range: '75–89',  color: '#fbbf24', emoji: '🥇', desc: 'Strong observability practices' },
  { level: 'Silver',   range: '60–74',  color: '#cbd5e1', emoji: '🥈', desc: 'Adequate coverage with gaps' },
  { level: 'Bronze',   range: '0–59',   color: '#fb923c', emoji: '🥉', desc: 'Foundational — needs work' },
];

const Home = () => (
  <div className="home">
    {/* Hero */}
    <section className="hero">

      <h1 className="hero-title">
        Measure Your System's<br />
        <span className="hero-gradient">Observability Score</span>
      </h1>
      <p className="hero-subtitle">
        ObservaScore is a comprehensive MERN stack assessment tool that quantifies
        how well your system can be monitored, debugged, and understood — across
        logs, metrics, traces, alerts, and dashboards.
      </p>
      <div className="hero-actions">
        <Link to="/calculator" className="btn btn-primary btn-lg">
          🧮 Start Assessment
        </Link>
        <Link to="/dashboard" className="btn btn-secondary btn-lg">
          📊 View Dashboard
        </Link>
      </div>
      <div className="hero-stats">
        <div className="hero-stat"><span className="stat-number">5</span><span className="stat-label">Pillars</span></div>
        <div className="hero-stat"><span className="stat-number">26</span><span className="stat-label">Criteria</span></div>
        <div className="hero-stat"><span className="stat-number">4</span><span className="stat-label">Maturity Levels</span></div>
      </div>
    </section>

    {/* Features */}
    <section className="features-section">
      <h2 className="section-title">What We Assess</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card card">
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Maturity Levels */}
    <section className="maturity-section">
      <h2 className="section-title">Maturity Levels</h2>
      <div className="maturity-grid">
        {maturityLevels.map((m, i) => (
          <div key={i} className="maturity-card card">
            <span className="maturity-emoji">{m.emoji}</span>
            <h3 style={{ color: m.color }}>{m.level}</h3>
            <span className="maturity-range">{m.range} pts</span>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section card">
      <h2>Ready to evaluate your system?</h2>
      <p>Get a detailed observability score with actionable recommendations in under 5 minutes.</p>
      <Link to="/calculator" className="btn btn-primary btn-lg">🚀 Run Assessment Now</Link>
    </section>
  </div>
);

export default Home;
