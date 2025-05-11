import React, { useState, useEffect } from 'react';
import { fetchQualtricsResponses } from '../services/qualtricsApi';
import { detectIncidents, createIncident } from '../services/serviceNowApi';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';
import TimelineIcon from '@mui/icons-material/Timeline';
import InsightsIcon from '@mui/icons-material/Insights';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestoreIcon from '@mui/icons-material/Restore';

const priorityColors = {
  high: 'bg-red-100 text-red-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
};
const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
const routingMap = {
  high: 'Claims Ops',
  medium: 'IT Support',
  low: 'Customer Service',
};

// Dummy AI root cause and timeline generator for demo
function getRootCause(incident) {
  if (incident.priority === 'high') return 'Recent system update caused workflow disruption.';
  if (incident.priority === 'medium') return 'Intermittent network latency detected.';
  return 'User error or configuration issue.';
}
function getTimeline(incident) {
  return [
    { time: '2 days ago', event: 'First feedback reported' },
    { time: '1 day ago', event: 'AI detected incident pattern' },
    { time: 'Today', event: 'Incident prioritized and routed' },
  ];
}
function getAIInsights(incident) {
  return [
    'Similar incidents increased by 20% this week.',
    'Most reports from Mayo Clinic and Cleveland Clinic.',
    'Potential impact: Claims processing delays for 100+ users.'
  ];
}

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingId, setCreatingId] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [routingFilter, setRoutingFilter] = useState('all');

  // Dummy metrics data
  const metrics = [
    {
      title: 'Reduction in Lead Time',
      value: '38%',
      description: 'Faster from feedback to insight',
      icon: <AccessTimeIcon className="text-blue-500 text-3xl" />, 
      trend: 'down',
      trendValue: '12%'
    },
    {
      title: 'Deployment Frequency',
      value: '5x/mo',
      description: 'More frequent feature releases',
      icon: <TrendingUpIcon className="text-green-500 text-3xl" />, 
      trend: 'up',
      trendValue: '25%'
    },
    {
      title: 'Change Failure Rate',
      value: '3%',
      description: 'Fewer failed changes',
      icon: <TrendingDownIcon className="text-red-500 text-3xl" />, 
      trend: 'down',
      trendValue: '8%'
    },
    {
      title: 'Time to Restore Service',
      value: '1.2h',
      description: 'Faster incident resolution',
      icon: <RestoreIcon className="text-purple-500 text-3xl" />, 
      trend: 'down',
      trendValue: '18%'
    }
  ];

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const responses = await fetchQualtricsResponses();
        const detected = await detectIncidents(responses);
        setIncidents(detected.map(inc => ({ ...inc, created: false, incidentId: null })));
        setLoading(false);
      } catch (error) {
        console.error('Error loading incidents:', error);
        setLoading(false);
      }
    };
    loadIncidents();
    const interval = setInterval(loadIncidents, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateIncident = async (incident) => {
    setCreatingId(incident.id);
    try {
      const result = await createIncident(incident);
      if (result.success) {
        setIncidents(prev =>
          prev.map(inc =>
            inc.id === incident.id
              ? { ...inc, created: true, incidentId: result.incidentId }
              : inc
          )
        );
      }
    } catch (error) {
      console.error('Error creating incident:', error);
    }
    setCreatingId(null);
  };

  // Filtered incidents
  const filteredIncidents = incidents.filter(inc =>
    (priorityFilter === 'all' || inc.priority === priorityFilter) &&
    (routingFilter === 'all' || routingMap[inc.priority] === routingFilter)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <CircularProgress color="primary" />
        <span className="ml-4 text-lg text-gray-500 animate-pulse">Detecting incidents with AI…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* Metrics for Success */}
        <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-indigo-500 animate-fade-in">
              <div className="mb-2">{m.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{m.value}</div>
              <div className="text-gray-600 text-sm mb-2 text-center">{m.title}</div>
              <div className="text-xs text-gray-400 mb-2 text-center">{m.description}</div>
              <div className={`flex items-center gap-1 text-xs font-semibold ${m.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}> 
                {m.trend === 'up' ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {m.trendValue} {m.trend === 'up' ? 'increase' : 'decrease'}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <AutoAwesomeIcon className="text-indigo-500 text-3xl" />
              AI Incident Management
            </h1>
            <p className="text-gray-600 max-w-xl">
              Automated detection, prioritization, and routing of incidents from customer feedback using AI. Incidents are prioritized and routed to the appropriate teams for rapid resolution.
            </p>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center bg-white/80 rounded-xl shadow px-4 py-3">
            <FilterListIcon className="text-indigo-400" />
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400">
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={routingFilter} onChange={e => setRoutingFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400">
              <option value="all">All Teams</option>
              <option value="Claims Ops">Claims Ops</option>
              <option value="IT Support">IT Support</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIncidents.map(incident => (
            <div key={incident.id} className="relative bg-white rounded-2xl shadow-xl p-6 border-t-4 border-indigo-500 group hover:shadow-2xl transition-all duration-300 animate-fade-in">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold flex items-center gap-1 animate-pulse">
                  <AutoAwesomeIcon fontSize="small" className="text-indigo-400" /> Detected by AI
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <ReportProblemIcon className="text-red-400 text-2xl" />
                <h2 className="text-lg font-bold text-gray-800 flex-1 truncate">{incident.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${priorityColors[incident.priority] || 'bg-gray-100 text-gray-700'}`}>{priorityLabels[incident.priority] || incident.priority}</span>
              </div>
              <p className="text-gray-700 mb-4 line-clamp-3 min-h-[48px]">{incident.description}</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 font-semibold">Impact:</span>
                <span className="text-sm text-gray-700">{incident.impact}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-gray-500 font-semibold">Routed to:</span>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">{routingMap[incident.priority] || 'General'}</span>
              </div>
              {/* AI Root Cause */}
              <div className="mb-2 flex items-center gap-2">
                <InsightsIcon className="text-purple-400" fontSize="small" />
                <span className="text-xs text-gray-500 font-semibold">AI Root Cause:</span>
                <span className="text-xs text-gray-700 italic">{getRootCause(incident)}</span>
              </div>
              {/* AI Timeline */}
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <TimelineIcon className="text-blue-400" fontSize="small" />
                  <span className="text-xs text-gray-500 font-semibold">Incident Timeline:</span>
                </div>
                <ol className="ml-6 border-l-2 border-indigo-200">
                  {getTimeline(incident).map((step, idx) => (
                    <li key={idx} className="mb-1 flex items-start gap-2">
                      <span className="w-2 h-2 mt-1 rounded-full bg-indigo-400 inline-block"></span>
                      <span className="text-xs text-gray-700">{step.time} — {step.event}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* AI Insights */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <AutoAwesomeIcon className="text-yellow-400" fontSize="small" />
                  <span className="text-xs text-gray-500 font-semibold">AI Insights:</span>
                </div>
                <ul className="ml-6 list-disc text-xs text-gray-700">
                  {getAIInsights(incident).map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </div>
              {/* ServiceNow Actions */}
              {!incident.created ? (
                <button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition flex items-center justify-center gap-2"
                  onClick={() => handleCreateIncident(incident)}
                  disabled={creatingId === incident.id}
                >
                  {creatingId === incident.id ? <CircularProgress size={20} color="inherit" /> : <CheckCircleIcon className="text-green-300" />}
                  {creatingId === incident.id ? 'Creating in ServiceNow…' : 'Create in ServiceNow'}
                </button>
              ) : (
                <div className="w-full py-3 rounded-lg bg-green-100 text-green-700 font-bold text-center flex items-center justify-center gap-2 animate-fade-in">
                  <CheckCircleIcon className="text-green-500" /> Created in ServiceNow (ID: {incident.incidentId})
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.68,-0.55,0.27,1.55);
        }
      `}</style>
    </div>
  );
}

export default Incidents; 