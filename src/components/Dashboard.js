import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const features = [
    {
      title: 'Automated Feedback Collection',
      description: 'Real-time feedback streaming from Qualtrics with automated data processing',
      link: '/feedback',
      metrics: {
        responses: '2.5K+',
        automated: '100%'
      }
    },
    {
      title: 'Smart Trend Analysis',
      description: 'AI-powered sentiment analysis and trend detection for actionable insights',
      link: '/trends',
      metrics: {
        accuracy: '95%',
        patterns: '50+'
      }
    },
    {
      title: 'Feature Ideation',
      description: 'Data-driven feature suggestions prioritized by impact and feasibility',
      link: '/features',
      metrics: {
        ideas: '75+',
        implemented: '40%'
      }
    },
    {
      title: 'Incident Management',
      description: 'Automated issue detection and ServiceNow integration for quick resolution',
      link: '/incidents',
      metrics: {
        detected: '100+',
        resolved: '85%'
      }
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to InsightPulse</h1>
        <p className="subtitle">Your AI-powered feedback management solution</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <div className="stat-value">2,547</div>
          <div className="stat-trend positive">↑ 12% this month</div>
        </div>
        <div className="stat-card">
          <h3>Sentiment Score</h3>
          <div className="stat-value">4.2/5</div>
          <div className="stat-trend positive">↑ 0.3 vs last month</div>
        </div>
        <div className="stat-card">
          <h3>Response Time</h3>
          <div className="stat-value">2.5h</div>
          <div className="stat-trend negative">↓ 15min slower</div>
        </div>
        <div className="stat-card">
          <h3>Active Issues</h3>
          <div className="stat-value">7</div>
          <div className="stat-trend neutral">No change</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {features.map((feature) => (
          <Link to={feature.link} className="dashboard-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <div className="metrics-grid">
              {Object.entries(feature.metrics).map(([key, value]) => (
                <div className="metric" key={key}>
                  <div className="metric-value">{value}</div>
                  <div className="metric-label">{key}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/feedback" className="action-button primary">
            View Latest Feedback
          </Link>
          <Link to="/incidents" className="action-button warning">
            Check Active Issues
          </Link>
          <Link to="/features" className="action-button success">
            Review Feature Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 