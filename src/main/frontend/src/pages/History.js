import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getHistory, deleteScore } from '../utils/api';
import './History.css';

const History = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [envFilter, setEnvFilter] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const res = await getHistory({ page, limit: 10, environment: envFilter || undefined });
      setScores(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      toast.error('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, envFilter]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete assessment for "${name}"?`)) return;
    try {
      await deleteScore(id);
      toast.success('Assessment deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  const getScoreColor = (s) => {
    if (s >= 90) return '#a78bfa';
    if (s >= 75) return '#fbbf24';
    if (s >= 60) return '#3b82f6';
    return '#ef4444';
  };

  return (
    <div className="history">
      <div className="history-header">
        <div>
          <h1>Assessment History</h1>
          <p>All past observability assessments</p>
        </div>
        <Link to="/calculator" className="btn btn-primary">🧮 New Assessment</Link>
      </div>

      <div className="history-filters card">
        <label>Filter by Environment</label>
        <select value={envFilter} onChange={e => { setEnvFilter(e.target.value); setPage(1); }} style={{ width: 200 }}>
          <option value="">All Environments</option>
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </select>
      </div>

      {loading ? (
        <div className="loading-state"><div className="spinner" /><p>Loading...</p></div>
      ) : scores.length === 0 ? (
        <div className="empty-state card">
          <p>🔍 No assessments found.</p>
          <Link to="/calculator" className="btn btn-primary">Run First Assessment</Link>
        </div>
      ) : (
        <>
          <div className="history-table card">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Environment</th>
                  <th>Score</th>
                  <th>Grade</th>
                  <th>Maturity</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scores.map(s => (
                  <tr key={s._id}>
                    <td className="td-name">{s.projectName}</td>
                    <td>
                      <span className={`env-chip env-${s.environment}`}>{s.environment}</span>
                    </td>
                    <td>
                      <span className="score-pill" style={{ color: getScoreColor(s.overallScore) }}>
                        {s.overallScore}
                      </span>
                    </td>
                    <td><span className={`grade-${s.grade}`} style={{ fontWeight: 700 }}>{s.grade}</span></td>
                    <td><span className="maturity-chip">{s.maturityLevel}</span></td>
                    <td className="td-date">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="td-actions">
                      <Link to={`/results/${s._id}`} className="btn btn-secondary btn-sm">View</Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s._id, s.projectName)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button className="btn btn-secondary" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
              <span>Page {pagination.page} of {pagination.pages} · {pagination.total} total</span>
              <button className="btn btn-secondary" disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}>Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;
