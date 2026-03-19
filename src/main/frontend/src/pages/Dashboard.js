import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { getStats, getHistory } from '../utils/api';
import './Dashboard.css';

const COLORS = ['#a78bfa', '#fbbf24', '#3b82f6', '#f97316', '#ef4444'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getHistory({ limit: 20, sort: 'createdAt' })])
      .then(([statsRes, historyRes]) => {
        setStats(statsRes.data.data);
        setRecent(historyRes.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-state"><div className="spinner" /><p>Loading dashboard...</p></div>;

  const gradeData = stats?.gradeDistribution?.map(g => ({ name: g._id, value: g.count })) || [];
  const maturityData = stats?.maturityDistribution?.map(m => ({ name: m._id, value: m.count })) || [];
  const trendData = recent.map(s => ({
    name: s.projectName.slice(0, 12),
    score: s.overallScore,
    date: new Date(s.createdAt).toLocaleDateString()
  }));

  const summary = stats?.summary || {};

  const statCards = [
    { label: 'Total Assessments', value: summary.totalAssessments || 0, icon: '📋', color: '#3b82f6' },
    { label: 'Average Score', value: summary.avgScore ? Math.round(summary.avgScore) : 0, icon: '📊', color: '#10b981' },
    { label: 'Highest Score', value: summary.maxScore || 0, icon: '🏆', color: '#a78bfa' },
    { label: 'Lowest Score', value: summary.minScore || 0, icon: '📉', color: '#f97316' },
  ];

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h1>Observability Dashboard</h1>
          <p>Analytics across all observability assessments</p>
        </div>
        <Link to="/calculator" className="btn btn-primary">🧮 New Assessment</Link>
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
            <div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="chart-card card">
          <h3>Score Trend</h3>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }} />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : <p className="no-data">No data yet</p>}
        </div>

        <div className="chart-card card">
          <h3>Grade Distribution</h3>
          {gradeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {gradeData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <p className="no-data">No data yet</p>}
        </div>

        <div className="chart-card card">
          <h3>Maturity Levels</h3>
          {maturityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={maturityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {maturityData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <p className="no-data">No data yet</p>}
        </div>
      </div>

      {/* Recent Assessments */}
      {recent.length > 0 && (
        <div className="recent-section card">
          <div className="recent-header">
            <h3>Recent Assessments</h3>
            <Link to="/history" className="btn btn-secondary btn-sm">View All →</Link>
          </div>
          <div className="recent-list">
            {recent.slice(0, 5).map(s => (
              <Link to={`/results/${s._id}`} key={s._id} className="recent-item">
                <span className="ri-name">{s.projectName}</span>
                <span className={`env-chip env-${s.environment}`}>{s.environment}</span>
                <div className="ri-bar">
                  <div className="ri-fill" style={{ width: `${s.overallScore}%` }} />
                </div>
                <span className="ri-score">{s.overallScore}</span>
                <span className={`grade-${s.grade}`} style={{ fontWeight: 700, fontSize: 14 }}>{s.grade}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
