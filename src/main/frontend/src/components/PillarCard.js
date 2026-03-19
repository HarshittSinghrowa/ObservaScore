import React, { useState } from 'react';
import './PillarCard.css';

const PillarCard = ({ pillar, index, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  const checkedCount = pillar.criteria.filter(c => c.value).length;
  const totalCount = pillar.criteria.length;
  const pct = totalCount ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handleCheck = (cIndex, checked) => {
    const updated = { ...pillar };
    updated.criteria = updated.criteria.map((c, i) =>
      i === cIndex ? { ...c, value: checked } : c
    );
    onChange(index, updated);
  };

  return (
    <div className="pillar-card card">
      <div className="pillar-header" onClick={() => setExpanded(!expanded)}>
        <div className="pillar-title-row">
          <span className="pillar-icon">{pillar.icon}</span>
          <div>
            <h3 className="pillar-name">{pillar.name}</h3>
            <p className="pillar-desc">{pillar.description}</p>
          </div>
        </div>
        <div className="pillar-header-right">
          <div className="pillar-progress-info">
            <span className="pct-label" style={{ color: pillar.color }}>{pct}%</span>
            <span className="criteria-count">{checkedCount}/{totalCount}</span>
          </div>
          <div className="pillar-progress-bar">
            <div className="pillar-progress-fill" style={{ width: `${pct}%`, background: pillar.color }} />
          </div>
          <span className="weight-badge">Weight: {pillar.weight}%</span>
          <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="criteria-list">
          {pillar.criteria.map((criterion, cIndex) => (
            <label key={cIndex} className={`criterion-item ${criterion.value ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={criterion.value || false}
                onChange={(e) => handleCheck(cIndex, e.target.checked)}
              />
              <span className="criterion-check">✓</span>
              <span className="criterion-label">{criterion.label}</span>
              <span className="criterion-points">+{criterion.points}pts</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default PillarCard;
