import React, { useState, useEffect } from 'react';
import FeatureCard from './FeatureCard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';

// Mocked async feature idea generator with enhanced capabilities
async function generateFeatureIdeas(trendData) {
  // Simulate API call delay
  await new Promise(res => setTimeout(res, 1200));
  if (!trendData || trendData.length === 0) return [];
  
  // Return mock ideas based on trendData with enhanced metadata
  return [
    {
      title: 'Faster Claims Processing',
      description: 'Implement batch processing and AI validation to reduce claims approval time.',
      priority: 'high',
      feedbackCount: 23,
      impact: {
        metric: 'Processing Time',
        improvement: '40% reduction',
        confidence: 85
      },
      plan: [
        'Analyze current claims workflow and identify bottlenecks.',
        'Design batch processing logic and AI validation rules.',
        'Develop and test new processing engine.',
        'Deploy incrementally and monitor performance.'
      ],
      stakeholders: ['Claims Team', 'Provider Relations', 'IT Operations'],
      timeline: '8 weeks',
      dependencies: ['AI Model Training', 'System Integration'],
      successMetrics: ['Processing Time', 'Error Rate', 'Provider Satisfaction']
    },
    {
      title: 'Provider Portal Enhancements',
      description: 'Add real-time status updates and chat support for providers.',
      priority: 'medium',
      feedbackCount: 15,
      impact: {
        metric: 'Provider Satisfaction',
        improvement: '25% increase',
        confidence: 78
      },
      plan: [
        'Gather provider feedback on current portal.',
        'Design UI for real-time status and chat.',
        'Integrate chat and notification APIs.',
        'Pilot with select providers and iterate.'
      ],
      stakeholders: ['Provider Relations', 'UX Team', 'Customer Support'],
      timeline: '6 weeks',
      dependencies: ['Chat API Integration', 'UI/UX Design'],
      successMetrics: ['Portal Usage', 'Support Ticket Reduction', 'Provider Feedback']
    },
    {
      title: 'Mobile App Improvements',
      description: 'Optimize mobile experience and add push notifications for claim status.',
      priority: 'medium',
      feedbackCount: 12,
      impact: {
        metric: 'Mobile Engagement',
        improvement: '35% increase',
        confidence: 82
      },
      plan: [
        'Audit mobile app UX and performance.',
        'Implement responsive improvements.',
        'Add push notification support.',
        'Beta test with user group.'
      ],
      stakeholders: ['Mobile Team', 'UX Design', 'Provider Relations'],
      timeline: '4 weeks',
      dependencies: ['Push Notification Service', 'Mobile Analytics'],
      successMetrics: ['App Usage', 'Notification Engagement', 'User Retention']
    },
    {
      title: 'Automated Denial Explanations',
      description: 'Use AI to generate clear explanations for claim denials.',
      priority: 'low',
      feedbackCount: 8,
      impact: {
        metric: 'Appeal Rate',
        improvement: '30% reduction',
        confidence: 75
      },
      plan: [
        'Collect denial feedback and common reasons.',
        'Train AI model on denial data.',
        'Integrate AI explanations into denial workflow.',
        'Monitor accuracy and user satisfaction.'
      ],
      stakeholders: ['Claims Team', 'AI/ML Team', 'Provider Relations'],
      timeline: '10 weeks',
      dependencies: ['AI Model Training', 'Claims System Integration'],
      successMetrics: ['Appeal Rate', 'Provider Understanding', 'Resolution Time']
    },
    {
      title: 'Predictive Analytics Dashboard',
      description: 'Implement AI-powered analytics to predict claim outcomes and identify patterns.',
      priority: 'high',
      feedbackCount: 18,
      impact: {
        metric: 'Decision Accuracy',
        improvement: '45% increase',
        confidence: 88
      },
      plan: [
        'Develop predictive models using historical data.',
        'Create interactive dashboard interface.',
        'Implement real-time data processing.',
        'Train staff on new analytics tools.'
      ],
      stakeholders: ['Data Science Team', 'Claims Leadership', 'Business Intelligence'],
      timeline: '12 weeks',
      dependencies: ['Data Pipeline', 'ML Infrastructure'],
      successMetrics: ['Prediction Accuracy', 'User Adoption', 'Time to Decision']
    }
  ];
}

// Mocked async function for trend analysis
async function analyzeTrends(trendData) {
  await new Promise(res => setTimeout(res, 800));
  return {
    topTrends: [
      { name: 'Claims Processing Speed', growth: 35, sentiment: 'negative' },
      { name: 'Provider Portal Usability', growth: 28, sentiment: 'neutral' },
      { name: 'Mobile App Performance', growth: 22, sentiment: 'positive' }
    ],
    emergingIssues: [
      { name: 'Prior Authorization Delays', frequency: 15, urgency: 'high' },
      { name: 'Documentation Requirements', frequency: 12, urgency: 'medium' },
      { name: 'Integration Issues', frequency: 10, urgency: 'medium' }
    ],
    impactAreas: [
      { area: 'Provider Satisfaction', impact: 'high', confidence: 85 },
      { area: 'Claims Processing', impact: 'high', confidence: 82 },
      { area: 'System Performance', impact: 'medium', confidence: 78 }
    ]
  };
}

export default function AIIdeation({ trendData = [{ keyword: 'claims', sentiment: 'negative', frequency: 10 }] }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [promptSubmitted, setPromptSubmitted] = useState(false);
  const [trends, setTrends] = useState(null);
  const [activeTab, setActiveTab] = useState('ideas'); // 'ideas' | 'trends' | 'impact'

  const fetchIdeas = async () => {
    setLoading(true);
    setError('');
    try {
      const [ideasRes, trendsRes] = await Promise.all([
        generateFeatureIdeas(trendData),
        analyzeTrends(trendData)
      ]);
      setIdeas(ideasRes);
      setTrends(trendsRes);
    } catch (e) {
      setError('Failed to generate feature ideas.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIdeas();
    // eslint-disable-next-line
  }, [JSON.stringify(trendData)]);

  const handleCardClick = (idea) => {
    setSelectedIdea(idea);
    setUserPrompt('');
    setPromptSubmitted(false);
  };

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    setPromptSubmitted(true);
  };

  const renderTrendsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUpIcon className="text-blue-500" /> Top Trends
        </h3>
        <div className="space-y-4">
          {trends?.topTrends.map((trend, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">{trend.name}</div>
                <div className="text-sm text-gray-500">Growth: {trend.growth}%</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                trend.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                trend.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {trend.sentiment}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <InsightsIcon className="text-purple-500" /> Emerging Issues
        </h3>
        <div className="space-y-4">
          {trends?.emergingIssues.map((issue, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">{issue.name}</div>
                <div className="text-sm text-gray-500">Frequency: {issue.frequency}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                issue.urgency === 'high' ? 'bg-red-100 text-red-700' :
                issue.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {issue.urgency} urgency
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImpactTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TimelineIcon className="text-indigo-500" /> Impact Analysis
        </h3>
        <div className="space-y-4">
          {trends?.impactAreas.map((area, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-gray-800">{area.area}</div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  area.impact === 'high' ? 'bg-red-100 text-red-700' :
                  area.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {area.impact} impact
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${area.confidence}%` }}
                  />
                </div>
                <span>{area.confidence}% confidence</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <AutoAwesomeIcon className="text-indigo-500 text-3xl" />
          <h1 className="text-2xl font-bold text-gray-800">AI Ideation</h1>
          <button
            className="ml-4 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center gap-1 hover:bg-indigo-200 transition"
            onClick={fetchIdeas}
            disabled={loading}
          >
            <ReplayIcon fontSize="small" /> Regenerate
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'ideas'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('ideas')}
          >
            <LightbulbIcon className="inline-block mr-2" />
            Feature Ideas
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'trends'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('trends')}
          >
            <TrendingUpIcon className="inline-block mr-2" />
            Trends
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'impact'
                ? 'bg-indigo-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('impact')}
          >
            <TimelineIcon className="inline-block mr-2" />
            Impact Analysis
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[200px] text-lg text-gray-500 animate-pulse">
            Generating insights...
          </div>
        )}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        {!loading && !error && (
          <>
            {activeTab === 'ideas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ideas.map((idea, idx) => (
                  <div key={idx} onClick={() => handleCardClick(idea)} className="cursor-pointer">
                    <FeatureCard {...idea} />
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'trends' && renderTrendsTab()}
            {activeTab === 'impact' && renderImpactTab()}
          </>
        )}
      </div>

      {/* Modal for detailed plan */}
      {selectedIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/95 rounded-3xl shadow-2xl max-w-2xl w-full p-0 animate-scale-up relative overflow-hidden max-h-[80vh] overflow-y-auto">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" onClick={() => setSelectedIdea(null)}>
              <CloseIcon />
            </button>
            <div className="flex flex-col items-center gap-2 p-8">
              <div className="mb-2">
                <LightbulbIcon className="text-yellow-400 text-4xl drop-shadow" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">{selectedIdea.title}</h2>
              <div className="text-gray-600 text-center mb-2">{selectedIdea.description}</div>
              
              {/* Impact Metrics */}
              <div className="w-full bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 mb-4">
                <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <InsightsIcon className="text-green-500" /> Impact Metrics
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Metric</div>
                    <div className="font-semibold text-gray-800">{selectedIdea.impact.metric}</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Improvement</div>
                    <div className="font-semibold text-gray-800">{selectedIdea.impact.improvement}</div>
                  </div>
                </div>
              </div>

              {/* Development Plan */}
              <div className="w-full bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-4 mb-4">
                <div className="font-semibold text-indigo-700 mb-2 flex items-center gap-2">
                  <AutoAwesomeIcon className="text-indigo-400" /> Development Plan
                </div>
                <ol className="list-decimal ml-6 text-gray-700 text-sm space-y-1">
                  {selectedIdea.plan.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              {/* Additional Details */}
              <div className="w-full grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <GroupIcon className="text-blue-500" /> Stakeholders
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedIdea.stakeholders.map((stakeholder, idx) => (
                      <li key={idx}>• {stakeholder}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <TimelineIcon className="text-purple-500" /> Timeline & Dependencies
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="mb-2">
                      <span className="font-medium">Timeline:</span> {selectedIdea.timeline}
                    </div>
                    <div>
                      <span className="font-medium">Dependencies:</span>
                      <ul className="mt-1 space-y-1">
                        {selectedIdea.dependencies.map((dep, idx) => (
                          <li key={idx}>• {dep}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="w-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 mb-4">
                <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <TrendingUpIcon className="text-blue-500" /> Success Metrics
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedIdea.successMetrics.map((metric, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white/50 rounded-full text-sm text-gray-700">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* User Input Form */}
              <form className="w-full mt-2" onSubmit={handlePromptSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Want to add or suggest something?
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    type="text"
                    placeholder="Type your suggestion or prompt..."
                    value={userPrompt}
                    onChange={e => setUserPrompt(e.target.value)}
                    disabled={promptSubmitted}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow hover:from-indigo-600 hover:to-purple-600 transition"
                    disabled={promptSubmitted || !userPrompt.trim()}
                  >
                    {promptSubmitted ? 'Submitted' : 'Send'}
                  </button>
                </div>
                {promptSubmitted && (
                  <div className="text-green-600 text-xs mt-2">Thank you for your suggestion!</div>
                )}
              </form>
            </div>
          </div>
          <style jsx>{`
            @keyframes scale-up {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-scale-up {
              animation: scale-up 0.5s cubic-bezier(0.68,-0.55,0.27,1.55);
            }
          `}</style>
        </div>
      )}
    </div>
  );
} 