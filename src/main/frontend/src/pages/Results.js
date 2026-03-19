import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import ScoreGauge from '../components/ScoreGauge';
import { getScore } from '../utils/api';
import { MATURITY_LEVELS } from '../utils/pillarsConfig';
import './Results.css';

// Minimal recharts polyfill — use Chart.js version if recharts not available
const RadarChartSection = ({ pillars }) => {
  const data = pillars.map(p => ({ subject: p.name, score: p.score, fullMark: 100 }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
        <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const Results = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getScore(id)
      .then(res => setResult(res.data.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Loading results...</p></div>;
  if (error) return <div className="error-state card"><p>❌ {error}</p><Link to="/calculator" className="btn btn-primary">Try Again</Link></div>;
  if (!result) return null;

  const maturity = MATURITY_LEVELS[result.maturityLevel] || MATURITY_LEVELS.Bronze;
  const createdAt = new Date(result.createdAt).toLocaleString();

  return (
    <div className="results">
      <div className="results-header">
        <div>
          <h1>Assessment Results</h1>
          <p className="results-meta">
            <span className="env-tag">{result.environment}</span>
            {result.projectName} · {createdAt}
          </p>
        </div>
        <div className="results-actions">
          <Link to="/calculator" className="btn btn-secondary">🧮 New Assessment</Link>
          <Link to="/history" className="btn btn-secondary">📜 History</Link>
        </div>
      </div>

      {/* Score Overview */}
      <div className="score-overview">
        <div className="score-main card">
          <ScoreGauge score={result.overallScore} size={200} />
          <div className="score-info">
            <h2>{result.projectName}</h2>
            <div className="grade-display">
              Grade: <span className={`grade-${result.grade}`}>{result.grade}</span>
            </div>
            <div className="maturity-display" style={{ color: maturity.color }}>
              {maturity.emoji} {result.maturityLevel} Maturity
            </div>
          </div>
        </div>

        <div className="radar-card card">
          <h3>Pillar Coverage</h3>
          <RadarChartSection pillars={result.pillars} />
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="pillar-breakdown">
        <h2>Pillar Breakdown</h2>
        <div className="pillar-grid">
          {result.pillars.map((p, i) => (
            <div key={i} className="pillar-result-card card">
              <div className="pr-header">
                <span className="pr-name">{p.name}</span>
                <span className="pr-score" style={{ color: p.score >= 75 ? '#10b981' : p.score >= 50 ? '#f59e0b' : '#ef4444' }}>
                  {p.score}%
                </span>
              </div>
              <div className="pr-bar">
                <div className="pr-bar-fill" style={{
                  width: `${p.score}%`,
                  background: p.score >= 75 ? '#10b981' : p.score >= 50 ? '#f59e0b' : '#ef4444'
                }} />
              </div>
              <div className="pr-criteria">
                {p.criteria.map((c, ci) => (
                  <div key={ci} className={`pc-item ${c.value ? 'pass' : 'fail'}`}>
                    {c.value ? '✅' : '❌'} {c.label}
                  </div>
                ))}
              </div>
              <div className="pr-weight">Weight: {p.weight}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations?.length > 0 && (
        <div className="recommendations card">
          <h2>💡 Recommendations</h2>
          <ul>
            {result.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Results;
