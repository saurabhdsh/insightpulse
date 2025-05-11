import React, { useState, useEffect } from 'react';
import { fetchQualtricsResponses } from '../services/qualtricsApi';
import { generateFeatureIdeas } from '../services/featureIdeas';

function Features() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatures = async () => {
      try {
        const responses = await fetchQualtricsResponses();
        const ideas = await generateFeatureIdeas(responses);
        setFeatures(ideas);
        setLoading(false);
      } catch (error) {
        console.error('Error loading features:', error);
        setLoading(false);
      }
    };

    loadFeatures();
    const interval = setInterval(loadFeatures, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#33b5e5';
    }
  };

  if (loading) {
    return <div className="loading">Loading features...</div>;
  }

  return (
    <div className="features-container">
      <h1>Feature Ideas</h1>
      <div className="features-grid">
        {features.map(feature => (
          <div key={feature.id} className="feature-card">
            <div className="feature-header">
              <h2>{feature.title}</h2>
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(feature.priority) }}
              >
                {feature.priority}
              </span>
            </div>
            <p className="feature-description">{feature.description}</p>
            <div className="feature-impact">
              <strong>Impact:</strong> {feature.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features; 