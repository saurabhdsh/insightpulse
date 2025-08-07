import React, { useState, useEffect } from 'react';
import { fetchQualtricsResponses } from '../services/qualtricsApi';
import { analyzeTrends } from '../services/trendAnalysis';

function Trends() {
  const [trends, setTrends] = useState({
    sentimentDistribution: {},
    categoryDistribution: {},
    topKeywords: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const responses = await fetchQualtricsResponses();
        const analysis = await analyzeTrends(responses);
        setTrends(analysis || {
          sentimentDistribution: {},
          categoryDistribution: {},
          topKeywords: []
        });
        setLoading(false);
      } catch (error) {
        console.error('Error loading trends:', error);
        setLoading(false);
      }
    };

    loadTrends();
    const interval = setInterval(loadTrends, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Loading trends...</div>;
  }

  return (
    <div className="trends-container">
      <h1>Feedback Trends</h1>
      <div className="trends-grid">
        <div className="trend-card">
          <h2>Sentiment Distribution</h2>
          <div className="chart-container">
            {Object.entries(trends?.sentimentDistribution || {}).map(([sentiment, value]) => (
              <div key={sentiment} className="chart-bar">
                <div className="bar-label">{sentiment}</div>
                <div className="bar" style={{ width: `${value}%` }}>{value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trend-card">
          <h2>Category Distribution</h2>
          <div className="chart-container">
            {Object.entries(trends?.categoryDistribution || {}).map(([category, value]) => (
              <div key={category} className="chart-bar">
                <div className="bar-label">{category}</div>
                <div className="bar" style={{ width: `${value}%` }}>{value}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="trend-card">
          <h2>Top Keywords</h2>
          <div className="keywords-list">
            {(trends?.topKeywords || []).map(({ word, count }) => (
              <div key={word} className="keyword-item">
                <span className="keyword">{word}</span>
                <span className="count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends; 