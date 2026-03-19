import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PillarCard from '../components/PillarCard';
import { calculateScore } from '../utils/api';
import { DEFAULT_PILLARS } from '../utils/pillarsConfig';
import './Calculator.css';

const Calculator = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [environment, setEnvironment] = useState('development');
  const [pillars, setPillars] = useState(
    DEFAULT_PILLARS.map(p => ({ ...p, criteria: p.criteria.map(c => ({ ...c, value: false })) }))
  );
  const [loading, setLoading] = useState(false);

  const handlePillarChange = (index, updated) => {
    const next = [...pillars];
    next[index] = updated;
    setPillars(next);
  };

  const getLiveScore = () => {
    let totalWeight = 0, weightedSum = 0;
    pillars.forEach(p => {
      const total = p.criteria.reduce((s, c) => s + c.points, 0);
      const earned = p.criteria.filter(c => c.value).reduce((s, c) => s + c.points, 0);
      const ps = total > 0 ? (earned / total) * 100 : 0;
      weightedSum += ps * p.weight;
      totalWeight += p.weight;
    });
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  const getScoreColor = (s) => {
    if (s >= 90) return '#a78bfa';
    if (s >= 75) return '#fbbf24';
    if (s >= 60) return '#3b82f6';
    if (s >= 40) return '#f97316';
    return '#ef4444';
  };

  const getMaturity = (s) => {
    if (s >= 90) return '🏆 Platinum';
    if (s >= 75) return '🥇 Gold';
    if (s >= 60) return '🥈 Silver';
    return '🥉 Bronze';
  };

  const handleReset = () => {
    setPillars(DEFAULT_PILLARS.map(p => ({
      ...p, criteria: p.criteria.map(c => ({ ...c, value: false }))
    })));
    setProjectName('');
    setEnvironment('development');
    toast.info('Assessment reset');
  };

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    setLoading(true);
    try {
      const payload = { projectName, environment, pillars };
      const res = await calculateScore(payload);
      toast.success('Score calculated successfully!');
      navigate(`/results/${res.data.data._id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to calculate score');
    } finally {
      setLoading(false);
    }
  };

  const liveScore = getLiveScore();

  return (
    <div className="calculator">
      <div className="calc-header">
        <h1>Observability Calculator</h1>
        <p>Fill in your project details and check all applicable criteria below.</p>
      </div>

      <div className="calc-layout">
        {/* Left: form + pillars */}
        <div className="calc-main">
          <div className="card project-info-card">
            <h2>Project Information</h2>
            <div className="project-form">
              <div className="form-group">
                <label>Project / Service Name *</label>
                <input
                  type="text"
                  placeholder="e.g. user-auth-service"
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Environment</label>
                <select value={environment} onChange={e => setEnvironment(e.target.value)}>
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pillars-section">
            <h2>Assessment Pillars</h2>
            {pillars.map((pillar, i) => (
              <PillarCard key={i} pillar={pillar} index={i} onChange={handlePillarChange} />
            ))}
          </div>
        </div>

        {/* Right: live score sticky sidebar */}
        <div className="calc-sidebar">
          <div className="sticky-panel card">
            <h3>Live Score Preview</h3>
            <div className="live-score-display">
              <span className="live-score-number" style={{ color: getScoreColor(liveScore) }}>
                {liveScore}
              </span>
              <span className="live-score-label">/ 100</span>
            </div>
            <div className="live-bar">
              <div className="live-bar-fill" style={{ width: `${liveScore}%`, background: getScoreColor(liveScore) }} />
            </div>
            <div className="live-maturity">{getMaturity(liveScore)}</div>

            <div className="pillar-mini-scores">
              {pillars.map((p, i) => {
                const total = p.criteria.reduce((s, c) => s + c.points, 0);
                const earned = p.criteria.filter(c => c.value).reduce((s, c) => s + c.points, 0);
                const pct = total > 0 ? Math.round((earned / total) * 100) : 0;
                return (
                  <div key={i} className="mini-score-row">
                    <span>{p.icon} {p.name}</span>
                    <div className="mini-bar">
                      <div className="mini-bar-fill" style={{ width: `${pct}%`, background: p.color }} />
                    </div>
                    <span style={{ color: p.color, fontSize: 12 }}>{pct}%</span>
                  </div>
                );
              })}
            </div>

            <div className="calc-actions">
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? '⏳ Calculating...' : '🚀 Calculate Score'}
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                🔄 Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
