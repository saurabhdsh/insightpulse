import React, { useState, useEffect } from 'react';
import { 
  EmojiEmotions, 
  TrendingUp, 
  Psychology, 
  Analytics,
  Close,
  NotificationsActive,
  Star,
  StarBorder,
  BugReport,
  ReportProblem,
  Info,
  ErrorOutline,
  AutoAwesome,
  Dashboard
} from '@mui/icons-material';
import { Select, MenuItem, FormControl, InputLabel, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HistoryIcon from '@mui/icons-material/History';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import GroupIcon from '@mui/icons-material/Group';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReplayIcon from '@mui/icons-material/Replay';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Add a list of realistic customer names
const customerNames = [
  { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@mayoclinic.org', company: 'Mayo Clinic', role: 'Cardiologist' },
  { name: 'Michael Chen', email: 'mchen@clevelandclinic.org', company: 'Cleveland Clinic', role: 'Billing Manager' },
  { name: 'Emily Rodriguez', email: 'emily.r@kpmg.com', company: 'KPMG Healthcare', role: 'Healthcare Consultant' },
  { name: 'Dr. James Wilson', email: 'jwilson@stanfordhealth.org', company: 'Stanford Health', role: 'Orthopedic Surgeon' },
  { name: 'Lisa Thompson', email: 'lthompson@kaiserpermanente.org', company: 'Kaiser Permanente', role: 'Claims Administrator' },
  { name: 'Robert Martinez', email: 'rmartinez@johnshopkins.org', company: 'Johns Hopkins Medicine', role: 'Revenue Cycle Director' },
  { name: 'Dr. Amanda Lee', email: 'alee@massgeneral.org', company: 'Massachusetts General Hospital', role: 'Neurologist' },
  { name: 'David Brown', email: 'dbrown@mdanderson.org', company: 'MD Anderson Cancer Center', role: 'Patient Financial Services Manager' }
];

// Add a list of realistic feedback messages
const feedbackMessages = [
  'Claims processing system is taking longer than usual to approve routine procedures.',
  'The new ICD-10 code validation feature is causing delays in claims processing.',
  'Provider portal is not syncing properly with our claims database.',
  'Prior authorization requests are getting stuck in pending status.',
  'Claims denial reason codes are not properly mapping to our documentation system.',
  'The system is not properly handling bundled claims for outpatient procedures.',
  'Eligibility verification is taking too long during peak hours.',
  'Claims adjudication rules need updating for new Medicare guidelines.',
  'Duplicate claim detection is flagging too many false positives.',
  'The system needs better integration with our provider network database.'
];

// Dummy data for simulation
const dummyFeedback = [
  {
    id: 1,
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@techcorp.com',
      company: 'Tech Corp',
      role: 'Product Manager'
    },
    sentiment: 'positive',
    category: 'feature',
    message: 'The new dashboard interface is much more intuitive and helps us track metrics better.',
    timestamp: new Date().toISOString(),
    aiTags: ['UI Improvement', 'User Experience', 'Dashboard'],
    priority: 'high'
  },
  {
    id: 2,
    customer: {
      name: 'Michael Chen',
      email: 'mchen@innovate.com',
      company: 'Innovate Inc',
      role: 'Software Engineer'
    },
    sentiment: 'negative',
    category: 'bug',
    message: 'Experiencing performance issues with the latest update. System becomes unresponsive.',
    timestamp: new Date().toISOString(),
    aiTags: ['Performance', 'Critical Issue', 'System Stability'],
    priority: 'high'
  },
  {
    id: 3,
    customer: {
      name: 'Emily Rodriguez',
      email: 'emily.r@globaltech.com',
      company: 'Global Tech',
      role: 'UX Designer'
    },
    sentiment: 'neutral',
    category: 'improvement',
    message: 'The mobile experience could use some optimization for better responsiveness.',
    timestamp: new Date().toISOString(),
    aiTags: ['Mobile', 'Responsiveness', 'Optimization'],
    priority: 'medium'
  }
];

// Helper to get a random date in the last 2 weeks
function getRandomDateInLast2Weeks() {
  const now = new Date();
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 13); // 14 days including today
  const randomTime = twoWeeksAgo.getTime() + Math.random() * (now.getTime() - twoWeeksAgo.getTime());
  return new Date(randomTime);
}

// Helper to randomly flag some feedbacks as 'incidentRaised'
function flagIncidents(feedbacks) {
  return feedbacks.map(fb => ({
    ...fb,
    incidentRaised: Math.random() < 0.25 // 25% chance
  }));
}

function Feedback() {
  const [activeView, setActiveView] = useState('latest');
  const [feedbacks, setFeedbacks] = useState(dummyFeedback);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [source, setSource] = useState('Qualtrics');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [servicenowModal, setServiceNowModal] = useState({ open: false, feedback: null });
  const [snStep, setSnStep] = useState(1); // 1: Connecting, 2: Review, 3: SN Fields, 4: Created
  const [snDesc, setSnDesc] = useState('');
  const [snTicket, setSnTicket] = useState('');
  const [snLoading, setSnLoading] = useState(false);
  const [snIncidentType, setSnIncidentType] = useState('Incident');
  const [snAssignmentGroup, setSnAssignmentGroup] = useState('IT Support');
  const [snUrgency, setSnUrgency] = useState('Medium');
  const [aiModal, setAiModal] = useState({ open: false, feedback: null });
  const [aiSmartSeed, setAiSmartSeed] = useState(Date.now());
  const [quickActionModal, setQuickActionModal] = useState({ open: false, type: '', success: false });
  const [stats, setStats] = useState({
    analyzed: 0,
    received: 0,
    aiInsights: 0
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        analyzed: prev.analyzed + Math.floor(Math.random() * 3),
        received: prev.received + Math.floor(Math.random() * 2),
        aiInsights: prev.aiInsights + Math.floor(Math.random() * 2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate real-time feedback updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random customer
      const customer = customerNames[Math.floor(Math.random() * customerNames.length)];
      // Pick a random feedback message
      const message = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
      const newFeedback = {
        id: Date.now(),
        customer,
        sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
        category: ['feature', 'bug', 'improvement'][Math.floor(Math.random() * 3)],
        message,
        timestamp: getRandomDateInLast2Weeks().toISOString(),
        aiTags: ['Claims Processing', 'System Performance', 'Provider Integration', 'Authorization', 'Denial Management', 'Eligibility', 'Compliance', 'Workflow', 'Documentation'],
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        incidentRaised: Math.random() < 0.25 // 25% chance
      };
      setFeedbacks(prev => [newFeedback, ...prev]);
      setNotification(newFeedback);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'negative': return '😞';
      case 'neutral': return '😐';
      default: return '😐';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // --- Date Filtering ---
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(now.getDate() - 13);
  const twoWeeksAgoStr = twoWeeksAgo.toISOString().slice(0, 10);

  const todaysFeedbacks = feedbacks.filter(f => f.timestamp.slice(0, 10) === todayStr);
  const last2WeeksFeedbacks = feedbacks.filter(f => f.timestamp.slice(0, 10) !== todayStr && f.timestamp.slice(0, 10) >= twoWeeksAgoStr);

  // --- AI Prioritized Calculations (last 2 weeks only) ---
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const prioritizedFeedbacks = [...last2WeeksFeedbacks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const categoryCounts = last2WeeksFeedbacks.reduce((acc, f) => {
    acc[f.category] = (acc[f.category] || 0) + 1;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'feature';
  const tagCounts = last2WeeksFeedbacks.flatMap(f => f.aiTags).reduce((acc, tag) => {
    acc[tag] = acc[tag] || 0;
    acc[tag]++;
    return acc;
  }, {});
  const topTags = Object.entries(tagCounts)
    .filter(([tag]) => ['Claims Processing', 'System Performance', 'Provider Integration', 'Authorization', 'Denial Management', 'Eligibility', 'Compliance', 'Workflow', 'Documentation'].includes(tag))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // --- AI Description for Top Category ---
  const topCategoryFeedbacks = last2WeeksFeedbacks.filter(f => f.category === topCategory);
  const topTagList = topTags.map(([tag]) => tag).join(', ');
  const sampleComplaint = topCategoryFeedbacks[0]?.message || '';
  const aiDescription = topCategoryFeedbacks.length
    ? `Most feedbacks in the last 2 weeks are about ${topCategory} (${topTagList}). Example: "${sampleComplaint}"`
    : 'AI is analyzing feedback trends.';

  // --- Top Reporting Customer ---
  const customerIssueCounts = last2WeeksFeedbacks.reduce((acc, f) => {
    const key = f.customer.email;
    acc[key] = acc[key] || { ...f.customer, count: 0, categories: {}, tags: {} };
    acc[key].count++;
    acc[key].categories[f.category] = (acc[key].categories[f.category] || 0) + 1;
    f.aiTags.forEach(tag => {
      acc[key].tags[tag] = (acc[key].tags[tag] || 0) + 1;
    });
    return acc;
  }, {});
  const topCustomer = Object.values(customerIssueCounts).sort((a, b) => b.count - a.count)[0];
  const topCustomerCategory = topCustomer ? Object.entries(topCustomer.categories).sort((a, b) => b[1] - a[1])[0][0] : '';
  const topCustomerTag = topCustomer ? Object.entries(topCustomer.tags).sort((a, b) => b[1] - a[1])[0][0] : '';

  // 4. Category color mapping
  const categoryColors = {
    bug: 'bg-red-100 text-red-700',
    feature: 'bg-blue-100 text-blue-700',
    improvement: 'bg-green-100 text-green-700',
    default: 'bg-gray-100 text-gray-700',
  };
  const categoryIcons = {
    bug: <BugReport className="text-red-500" />,
    feature: <TrendingUp className="text-blue-500" />,
    improvement: <ReportProblem className="text-green-500" />,
    default: <Info className="text-gray-500" />,
  };

  // --- AI Highlights Data ---
  // Top Complaint Themes with descriptions
  const tagDescriptions = {
    'Claims Processing': 'Issues related to the speed and accuracy of claims processing.',
    'System Performance': 'Technical performance issues affecting claims workflow.',
    'Provider Integration': 'Problems with provider portal and data synchronization.',
    'Authorization': 'Issues with prior authorization and pre-certification processes.',
    'Denial Management': 'Problems with claims denial handling and appeals process.',
    'Eligibility': 'Issues with member eligibility verification and validation.',
    'Compliance': 'Concerns about regulatory compliance and documentation.',
    'Workflow': 'Issues affecting claims processing workflow efficiency.',
    'Documentation': 'Problems with claims documentation and record keeping.'
  };

  // Recent Comments with Incidents Raised
  const incidentsRaised = last2WeeksFeedbacks.filter(f => f.incidentRaised);
  // Feedbacks Needing ServiceNow Incident
  const needsIncident = last2WeeksFeedbacks.filter(f => f.priority === 'high' && !f.incidentRaised);

  // --- AI Trend Analysis Data ---
  // 1. Incident-wise Feedback chart data
  const incidentChartData = Object.entries(categoryCounts).map(([cat, count]) => ({ name: cat.charAt(0).toUpperCase() + cat.slice(1), value: count }));
  const incidentColors = ['#6366f1', '#f59e42', '#10b981', '#ef4444', '#a21caf'];

  // 2. Last two weeks positive/negative trend chart data
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().slice(0, 10);
  });
  const trendChartData = days.map(date => {
    const pos = feedbacks.filter(f => f.timestamp.slice(0, 10) === date && f.sentiment === 'positive').length;
    const neg = feedbacks.filter(f => f.timestamp.slice(0, 10) === date && f.sentiment === 'negative').length;
    return { date, Positive: pos, Negative: neg };
  });

  // 3. Feedbacks needing urgent attention
  const urgentFeedbacks = last2WeeksFeedbacks.filter(f => f.priority === 'high' && !f.incidentRaised);

  // --- AI Smart Recommendations Data (regenerate on seed change) ---
  const aiSmartData = React.useMemo(() => {
    // 1. Top 3 AI Action Recommendations
    const actions = [
      'Prioritize fixing mobile performance bugs for key customers.',
      'Launch a UI improvement sprint focused on dashboard usability.',
      'Increase support team coverage on weekends to reduce response times.'
    ];
    // 2. Emerging Issues (new or rising tags)
    const tagCounts = feedbacks.flatMap(f => f.aiTags).reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
    const emerging = Object.entries(tagCounts).filter(([tag, count]) => count >= 2 && !['Test','Simulation','Demo'].includes(tag)).map(([tag]) => tag);
    // 3. At-Risk Segments (companies/roles with rising negative sentiment)
    const atRisk = feedbacks.filter(f => f.sentiment === 'negative').reduce((acc, f) => {
      const key = f.customer.company + '|' + f.customer.role;
      acc[key] = acc[key] || { company: f.customer.company, role: f.customer.role, count: 0 };
      acc[key].count++;
      return acc;
    }, {});
    const atRiskArr = Object.values(atRisk).filter(seg => seg.count >= 2);
    // 4. Predicted Impact
    const predImpact = actions.length > 0 ? 'If no action is taken, customer satisfaction may drop by 10% next month.' : 'No major impact predicted.';
    return { actions, emerging, atRiskArr, predImpact };
  }, [aiSmartSeed, feedbacks]);

  // ServiceNow Modal Handlers
  const openServiceNowModal = (feedback) => {
    setServiceNowModal({ open: true, feedback });
    setSnStep(1);
    setSnDesc(feedback.message || 'No feedback message provided.');
    setSnTicket('');
    setSnLoading(true);
    setSnIncidentType('Incident');
    setSnAssignmentGroup('IT Support');
    setSnUrgency('Medium');
    setTimeout(() => {
      setSnLoading(false);
      setSnStep(2);
    }, 1200);
  };
  const closeServiceNowModal = () => setServiceNowModal({ open: false, feedback: null });
  const handleReviewSubmit = () => setSnStep(3);
  const handleSNFieldsSubmit = () => {
    setSnLoading(true);
    setTimeout(() => {
      setSnLoading(false);
      setSnStep(4);
      setSnTicket('INC' + Math.floor(100000 + Math.random() * 900000));
    }, 1400);
  };

  // AI Utility Modal Handlers
  const openAiModal = (feedback) => setAiModal({ open: true, feedback });
  const closeAiModal = () => setAiModal({ open: false, feedback: null });

  // AI Utility Content Generators
  function getRootCause(feedback) {
    if (!feedback) return '';
    if (feedback.category === 'bug') return 'Likely caused by a recent code change or unhandled edge case.';
    if (feedback.category === 'feature') return 'Feature request indicates a gap in current functionality.';
    if (feedback.category === 'improvement') return 'Users are seeking better usability or performance.';
    return 'AI is analyzing the root cause.';
  }
  function getRecommendedActions(feedback) {
    if (!feedback) return [];
    const actions = [];
    if (feedback.priority === 'high') actions.push('Escalate to engineering team immediately.');
    if (feedback.category === 'bug') actions.push('Check recent deployments and error logs.');
    if (feedback.category === 'feature') actions.push('Add to product roadmap for review.');
    if (feedback.category === 'improvement') actions.push('Schedule a UX review session.');
    actions.push('Acknowledge receipt to the customer.');
    return actions;
  }
  function getBusinessImpact(feedback) {
    if (!feedback) return '';
    if (feedback.priority === 'high') return 'Potential to impact key business operations or customer satisfaction.';
    if (feedback.category === 'bug') return 'May cause workflow disruptions for users.';
    if (feedback.category === 'feature') return 'Opportunity to improve product competitiveness.';
    return 'Moderate impact expected.';
  }
  function getSimilarFeedbacks(feedback) {
    if (!feedback) return [];
    // Find up to 3 similar feedbacks by category or tag
    return last2WeeksFeedbacks.filter(f =>
      f.id !== feedback.id &&
      (f.category === feedback.category || f.aiTags.some(tag => feedback.aiTags.includes(tag)))
    ).slice(0, 3);
  }

  // AI Smart Recommendations - More Info
  const aiActionRationales = [
    'Claims processing delays have increased by 30% this week, affecting provider satisfaction.',
    'Provider portal integration issues are causing increased call volume to support.',
    'Prior authorization bottlenecks are leading to longer processing times.'
  ];
  const aiEmergingSummaries = tag => `Spike in "${tag}" feedbacks over the last 3 days.`;
  const aiAtRiskReason = seg => `${seg.count} negative feedbacks in the last 2 weeks.`;
  const aiConfidence = 'AI Confidence: 87% (based on recent feedback trends)';

  // Quick Action Modal Handlers
  const openQuickActionModal = type => setQuickActionModal({ open: true, type, success: false });
  const closeQuickActionModal = () => setQuickActionModal({ open: false, type: '', success: false });
  const submitQuickAction = () => setQuickActionModal(modal => ({ ...modal, success: true }));

  // Sentiment distribution data for last 2 weeks
  const sentimentCounts = last2WeeksFeedbacks.reduce((acc, f) => {
    acc[f.sentiment] = (acc[f.sentiment] || 0) + 1;
    return acc;
  }, {});
  const sentimentPieData = [
    { name: 'Positive', value: sentimentCounts['positive'] || 0, color: '#10b981' },
    { name: 'Negative', value: sentimentCounts['negative'] || 0, color: '#ef4444' },
    { name: 'Neutral', value: sentimentCounts['neutral'] || 0, color: '#64748b' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg">
        <div className="flex items-center h-full overflow-hidden">
          <div className="flex items-center space-x-8 animate-ticker">
            <div className="flex items-center space-x-2 text-blue-100">
              <SpeedIcon className="text-lg" />
              <span className="text-sm font-medium">Feedback Analyzed:</span>
              <span className="text-white font-bold">{stats.analyzed.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-100">
              <TrendingUpIcon className="text-lg" />
              <span className="text-sm font-medium">New Feedback:</span>
              <span className="text-white font-bold">{stats.received.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-100">
              <AutoAwesomeIcon className="text-lg" />
              <span className="text-sm font-medium">AI Insights Generated:</span>
              <span className="text-white font-bold">{stats.aiInsights.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <SpeedIcon className="text-lg" />
              <span className="text-sm font-medium">Feedback Analyzed:</span>
              <span className="text-white font-bold">{stats.analyzed.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-100">
              <TrendingUpIcon className="text-lg" />
              <span className="text-sm font-medium">New Feedback:</span>
              <span className="text-white font-bold">{stats.received.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-100">
              <AutoAwesomeIcon className="text-lg" />
              <span className="text-sm font-medium">AI Insights Generated:</span>
              <span className="text-white font-bold">{stats.aiInsights.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-ticker {
            animation: ticker 20s linear infinite;
          }
          .animate-ticker:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-center md:justify-center gap-4">
          {/* Source Dropdown */}
          <FormControl variant="outlined" size="small" sx={{ minWidth: 180, background: 'white', borderRadius: 2, boxShadow: 1 }}>
            <InputLabel id="source-label">Source</InputLabel>
            <Select
              labelId="source-label"
              value={source}
              label="Source"
              onChange={e => setSource(e.target.value)}
            >
              <MenuItem value="Qualtrics">Qualtrics</MenuItem>
              <MenuItem value="SurveyMonkey">SurveyMonkey</MenuItem>
              <MenuItem value="Google Forms">Google Forms</MenuItem>
              <MenuItem value="Typeform">Typeform</MenuItem>
              <MenuItem value="Custom Upload">Custom Upload</MenuItem>
            </Select>
          </FormControl>
          {/* Date Range Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1, p: 1, minWidth: 240, display: 'flex', gap: 1 }}>
              <DatePicker
                label="From"
                value={startDate}
                onChange={setStartDate}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="To"
                value={endDate}
                onChange={setEndDate}
                slotProps={{ textField: { size: 'small' } }}
              />
            </Box>
          </LocalizationProvider>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button
            className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${activeView === 'latest' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setActiveView('latest')}
          >
            <div className={`p-3 rounded-full ${activeView === 'latest' ? 'bg-blue-400/30' : 'bg-blue-100'}`}>
              <EmojiEmotions className="text-4xl" />
            </div>
            <span className="text-lg font-semibold">Latest Feedbacks</span>
          </button>

          <button
            className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${activeView === 'prioritized' ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setActiveView('prioritized')}
          >
            <div className={`p-3 rounded-full ${activeView === 'prioritized' ? 'bg-purple-400/30' : 'bg-purple-100'}`}>
              <TrendingUp className="text-4xl" />
            </div>
            <span className="text-lg font-semibold">AI Prioritized</span>
          </button>

          <button
            className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${activeView === 'analysis' ? 'bg-green-600 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setActiveView('analysis')}
          >
            <div className={`p-3 rounded-full ${activeView === 'analysis' ? 'bg-green-400/30' : 'bg-green-100'}`}>
              <Psychology className="text-4xl" />
            </div>
            <span className="text-lg font-semibold">AI Trend Analysis</span>
          </button>

          <button
            className={`p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center space-y-3 transition-all duration-300 hover:scale-105 hover:shadow-xl
              ${activeView === 'trends' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => setActiveView('trends')}
          >
            <div className={`p-3 rounded-full ${activeView === 'trends' ? 'bg-indigo-400/30' : 'bg-indigo-100'}`}>
              <Analytics className="text-4xl" />
            </div>
            <span className="text-lg font-semibold">AI Smart Recommendations</span>
          </button>
        </div>

        {/* Feedback Info Summary (only for Latest Feedback and AI Prioritized tabs) */}
        {(activeView === 'latest' || activeView === 'prioritized') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-blue-500">
              <span className="text-3xl font-bold text-blue-600">{feedbacks.length}</span>
              <span className="text-gray-600 mt-1">Total Feedbacks</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-green-500">
              <span className="text-3xl font-bold text-green-600">{todaysFeedbacks.length}</span>
              <span className="text-gray-600 mt-1">Today's Feedbacks</span>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border-t-4 border-red-500">
              <span className="text-3xl font-bold text-red-600">{last2WeeksFeedbacks.length}</span>
              <span className="text-gray-600 mt-1">Last 2 Weeks</span>
            </div>
          </div>
        )}

        {/* Latest Feedback Tab */}
        {activeView === 'latest' && (
          <div className="space-y-10 animate-fade-in">
            {/* Today's Feedback */}
            <div>
              <div className="text-xl font-bold text-gray-800 mb-4">Today's Feedback</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todaysFeedbacks.length === 0 ? (
                  <div className="text-gray-500 col-span-full">No feedback for today yet.</div>
                ) : (
                  todaysFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{feedback.customer.name}</h3>
                          <p className="text-sm text-gray-500">{feedback.customer.company}</p>
                          <p className="text-xs text-gray-400">{feedback.customer.role}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getSentimentColor(feedback.sentiment)}`}>
                          {getSentimentEmoji(feedback.sentiment)} {feedback.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed">{feedback.message}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {feedback.aiTags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{new Date(feedback.timestamp).toLocaleString()}</span>
                        <span className={`px-3 py-1 rounded-full font-medium ${getPriorityColor(feedback.priority)}`}>
                          {feedback.priority} priority
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Last 2 Weeks Feedback */}
            <div>
              <div className="text-xl font-bold text-gray-800 mb-4">Last 2 Weeks</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {last2WeeksFeedbacks.length === 0 ? (
                  <div className="text-gray-500 col-span-full">No feedback in the last 2 weeks.</div>
                ) : (
                  last2WeeksFeedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{feedback.customer.name}</h3>
                          <p className="text-sm text-gray-500">{feedback.customer.company}</p>
                          <p className="text-xs text-gray-400">{feedback.customer.role}</p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getSentimentColor(feedback.sentiment)}`}>
                          {getSentimentEmoji(feedback.sentiment)} {feedback.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-6 leading-relaxed">{feedback.message}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {feedback.aiTags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{new Date(feedback.timestamp).toLocaleString()}</span>
                        <span className={`px-3 py-1 rounded-full ${getPriorityColor(feedback.priority)}`}>
                          {feedback.priority} priority
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* AI Prioritized Tab */}
        {activeView === 'prioritized' && (
          <div className="space-y-10 animate-fade-in">
            {/* AI Focus Card */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 rounded-full p-4">
                  {categoryIcons[topCategory] || categoryIcons.default}
                </div>
                <div>
                  <div className="text-white text-lg font-semibold mb-1">AI recommends focusing on:</div>
                  <div className="text-2xl font-bold text-white capitalize">{topCategory}</div>
                  <div className="text-white/90 text-sm mt-2 italic">{aiDescription}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-white/80 text-sm mb-1">Total Feedbacks Prioritized</div>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  <span className="text-white font-semibold text-lg">{last2WeeksFeedbacks.length}</span>
                </div>
              </div>
            </div>
            {/* Top Reporting Customer Card */}
            {topCustomer && (
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-200 rounded-full p-4">
                    <Info className="text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-indigo-800 text-lg font-semibold mb-1">Most Active Reporter</div>
                    <div className="text-xl font-bold text-indigo-900">{topCustomer.name}</div>
                    <div className="text-indigo-700 text-sm">{topCustomer.company} • {topCustomer.role}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-indigo-700 text-sm mb-1">Reported Issues</div>
                  <div className="flex items-center gap-2">
                    <ReportProblem className="text-red-400" />
                    <span className="text-indigo-900 font-semibold text-lg">{topCustomer.count}</span>
                  </div>
                  <div className="text-indigo-700 text-sm mt-2">Most reported: <span className="font-bold capitalize">{topCustomerCategory}</span> <span className="ml-2 px-2 py-0.5 bg-indigo-200 text-indigo-800 rounded-full text-xs font-semibold">{topCustomerTag}</span></div>
                </div>
              </div>
            )}
            {/* Horizontal Bar Chart for Issues */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Most Reported Issues</div>
              <div className="space-y-4">
                {Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                  <div key={cat} className="flex items-center gap-4">
                    <div className={`w-32 capitalize font-medium text-sm px-3 py-1 rounded-full ${categoryColors[cat] || categoryColors.default}`}>{cat}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                      <div className={`h-4 rounded-full ${cat === topCategory ? 'bg-indigo-500' : 'bg-gray-300'}`} style={{ width: `${(count / last2WeeksFeedbacks.length) * 100}%`, transition: 'width 0.5s' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700 font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* AI Highlights */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><ErrorOutline className="text-purple-500" /> AI Highlights</div>
              {/* Top Complaint Themes */}
              <div className="mb-6">
                <div className="font-semibold text-indigo-700 mb-2">Top Complaint Themes</div>
                <div className="flex flex-wrap gap-4">
                  {topTags.map(([tag, count]) => (
                    <div key={tag} className="flex flex-col items-start gap-1 px-4 py-2 rounded-xl bg-white shadow text-indigo-700 font-semibold text-sm border border-indigo-100 min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-indigo-400" fontSize="small" />
                        <span>{tag}</span>
                        <span className="bg-indigo-50 text-indigo-500 rounded-full px-2 py-0.5 ml-2 text-xs font-bold">{count}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{tagDescriptions[tag] || 'No description available.'}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Recent Comments with Incidents Raised */}
              <div className="mb-6">
                <div className="font-semibold text-indigo-700 mb-2">Recent Comments with Incidents Raised</div>
                <div className="flex flex-wrap gap-4">
                  {incidentsRaised.length === 0 ? (
                    <div className="text-gray-500">No incidents raised in the last 2 weeks.</div>
                  ) : (
                    incidentsRaised.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow px-4 py-3 border border-green-200 min-w-[220px] flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                          <ReportProblem className="text-green-500" fontSize="small" />
                          <span className="text-xs font-bold text-green-700">Incident Raised</span>
                        </div>
                        <div className="text-gray-700 text-sm mb-1">"{f.message}"</div>
                        <div className="text-xs text-gray-500">{f.customer.name} • {f.customer.company}</div>
                        <div className="text-xs text-gray-400">{new Date(f.timestamp).toLocaleString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Feedbacks Needing ServiceNow Incident */}
              <div>
                <div className="font-semibold text-indigo-700 mb-2">Feedbacks Needing ServiceNow Incident</div>
                <div className="flex flex-wrap gap-4">
                  {needsIncident.length === 0 ? (
                    <div className="text-gray-500">No high priority feedbacks need incident creation.</div>
                  ) : (
                    needsIncident.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow px-4 py-3 border border-red-200 min-w-[220px] flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                          <ErrorOutline className="text-red-500" fontSize="small" />
                          <span className="text-xs font-bold text-red-700">Needs Incident</span>
                        </div>
                        <div className="text-gray-700 text-sm mb-1">"{f.message}"</div>
                        <div className="text-xs text-gray-500">{f.customer.name} • {f.customer.company}</div>
                        <div className="text-xs text-gray-400">{new Date(f.timestamp).toLocaleString()}</div>
                        <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition" onClick={() => openServiceNowModal(f)}>
                          Raise as ServiceNow Incident
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Prioritized Feedback List */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Star className="text-yellow-400" /> Prioritized Feedback</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prioritizedFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-gradient-to-br from-white to-indigo-50 rounded-xl shadow p-5 hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-bold text-gray-800">{feedback.customer.name}</div>
                        <div className="text-xs text-gray-500">{feedback.customer.company} • {feedback.customer.role}</div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(feedback.sentiment)}`}>{getSentimentEmoji(feedback.sentiment)} {feedback.sentiment}</span>
                    </div>
                    <div className="text-gray-700 text-sm mb-2">{feedback.message}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {feedback.aiTags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">{tag}</span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{new Date(feedback.timestamp).toLocaleString()}</span>
                      <span className={`px-2 py-0.5 rounded-full ${getPriorityColor(feedback.priority)}`}>{feedback.priority} priority</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* ServiceNow Modal */}
            {servicenowModal.open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/90 rounded-2xl shadow-2xl p-0 max-w-lg w-full animate-scale-up relative overflow-hidden">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" onClick={closeServiceNowModal}><CloseIcon /></button>
                  {/* Step 1: Connecting */}
                  {snStep === 1 && (
                    <div className="flex flex-col items-center justify-center p-10">
                      <CloudSyncIcon className="text-indigo-500 animate-spin mb-4" style={{ fontSize: 48 }} />
                      <div className="text-xl font-bold text-indigo-700 mb-2">Connecting to ServiceNow…</div>
                      <div className="text-gray-500">Please wait while we establish a secure connection.</div>
                    </div>
                  )}
                  {/* Step 2: Review & Edit */}
                  {snStep === 2 && (
                    <div className="flex flex-col gap-6 p-8">
                      <div className="flex items-center gap-3">
                        <AssignmentLateIcon className="text-red-500" />
                        <span className="text-lg font-bold text-gray-800">Raise ServiceNow Incident</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                        <div className="text-sm text-gray-600">Customer: <span className="font-semibold text-gray-800">{servicenowModal.feedback.customer.name}</span></div>
                        <div className="text-sm text-gray-600">Company: <span className="font-semibold text-gray-800">{servicenowModal.feedback.customer.company}</span></div>
                        <div className="text-sm text-gray-600">Category: <span className="font-semibold text-gray-800 capitalize">{servicenowModal.feedback.category}</span></div>
                        <div className="text-sm text-gray-600">Priority: <span className="font-semibold text-gray-800 capitalize">{servicenowModal.feedback.priority}</span></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">AI Generated Description (please change if you need)</label>
                        <textarea
                          className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                          rows={4}
                          value={snDesc}
                          onChange={e => setSnDesc(e.target.value)}
                        />
                      </div>
                      <button
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
                        onClick={handleReviewSubmit}
                        disabled={snLoading}
                      >
                        Next: ServiceNow Fields
                      </button>
                    </div>
                  )}
                  {/* Step 3: ServiceNow Fields */}
                  {snStep === 3 && (
                    <div className="flex flex-col gap-6 p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <AssignmentLateIcon className="text-red-500" />
                        <span className="text-lg font-bold text-gray-800">ServiceNow Fields</span>
                      </div>
                      <FormControl fullWidth className="mb-3">
                        <InputLabel id="incident-type-label">Incident Type</InputLabel>
                        <Select
                          labelId="incident-type-label"
                          value={snIncidentType}
                          label="Incident Type"
                          onChange={e => setSnIncidentType(e.target.value)}
                        >
                          <MenuItem value="Incident">Incident</MenuItem>
                          <MenuItem value="Request">Request</MenuItem>
                          <MenuItem value="Problem">Problem</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth className="mb-3">
                        <InputLabel id="assignment-group-label">Assignment Group</InputLabel>
                        <Select
                          labelId="assignment-group-label"
                          value={snAssignmentGroup}
                          label="Assignment Group"
                          onChange={e => setSnAssignmentGroup(e.target.value)}
                        >
                          <MenuItem value="IT Support">IT Support</MenuItem>
                          <MenuItem value="Customer Service">Customer Service</MenuItem>
                          <MenuItem value="Development">Development</MenuItem>
                          <MenuItem value="Security">Security</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth className="mb-3">
                        <InputLabel id="urgency-label">Urgency</InputLabel>
                        <Select
                          labelId="urgency-label"
                          value={snUrgency}
                          label="Urgency"
                          onChange={e => setSnUrgency(e.target.value)}
                        >
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                      <button
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
                        onClick={handleSNFieldsSubmit}
                        disabled={snLoading}
                      >
                        {snLoading ? 'Submitting…' : 'Submit to ServiceNow'}
                      </button>
                    </div>
                  )}
                  {/* Step 4: Created */}
                  {snStep === 4 && (
                    <div className="flex flex-col items-center justify-center p-10">
                      <CheckCircleIcon className="text-green-500 mb-4 animate-pulse" style={{ fontSize: 56 }} />
                      <div className="text-2xl font-bold text-green-700 mb-2">Incident Created!</div>
                      <div className="text-gray-700 mb-4">ServiceNow Ticket <span className="font-mono text-indigo-700">{snTicket}</span> has been created successfully.</div>
                      <a
                        href={`https://servicenow.com/incident/${snTicket}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition mb-2"
                      >
                        View in ServiceNow
                      </a>
                      <button
                        className="text-indigo-600 hover:underline mt-2"
                        onClick={closeServiceNowModal}
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Trend Analysis Tab */}
        {activeView === 'analysis' && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <AutoAwesomeIcon className="text-indigo-500 text-3xl" />
              <span className="text-2xl font-bold text-indigo-700">AI Trend Analysis</span>
            </div>
            {/* 0. Sentiment Distribution Pie Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Sentiment Distribution (Last 2 Weeks)</div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={sentimentPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {sentimentPieData.map((entry, idx) => (
                      <Cell key={`cell-sentiment-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* 1. Incident-wise Feedback chart data */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Incident-wise Feedback</div>
              <div className="space-y-4">
                {incidentChartData.map(({ name, value }) => (
                  <div key={name} className="flex items-center gap-4">
                    <div className={`w-32 capitalize font-medium text-sm px-3 py-1 rounded-full ${categoryColors[name] || categoryColors.default}`}>{name}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                      <div className={`h-4 rounded-full ${name === topCategory ? 'bg-indigo-500' : 'bg-gray-300'}`} style={{ width: `${(value / last2WeeksFeedbacks.length) * 100}%`, transition: 'width 0.5s' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 2. Last two weeks positive/negative trend chart data (Recharts) */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Positive/Negative Trend</div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Positive" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Negative" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* 3. Feedbacks needing urgent attention */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><TrendingUp className="text-indigo-500" /> Feedbacks Needing Urgent Attention</div>
              <div className="space-y-4">
                {urgentFeedbacks.map((f) => (
                  <div key={f.id} className="flex items-center gap-4">
                    <div className={`w-32 capitalize font-medium text-sm px-3 py-1 rounded-full ${categoryColors[f.category] || categoryColors.default}`}>{f.category}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                      <div className={`h-4 rounded-full ${f.category === topCategory ? 'bg-indigo-500' : 'bg-gray-300'}`} style={{ width: '100%', transition: 'width 0.5s' }}></div>
                    </div>
                    <span className="ml-2 text-gray-700 font-semibold">{f.message.substring(0, 50)}...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Smart Recommendations Tab */}
        {activeView === 'trends' && (
          <div className="space-y-10 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <AutoAwesomeIcon className="text-indigo-500 text-3xl" />
              <span className="text-2xl font-bold text-indigo-700">AI Smart Recommendations</span>
              <button
                className="ml-4 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center gap-1 hover:bg-indigo-200 transition"
                onClick={() => setAiSmartSeed(Date.now())}
              >
                <ReplayIcon fontSize="small" /> Regenerate AI Suggestions
              </button>
            </div>
            {/* 1. Top 3 AI Action Recommendations */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TaskAltIcon className="text-green-500" />
                <span className="text-lg font-bold text-gray-800">Top 3 AI Action Recommendations</span>
              </div>
              <ul className="list-decimal ml-8 text-gray-700 space-y-4">
                {aiSmartData.actions.map((action, idx) => (
                  <li key={idx}>
                    <div className="font-semibold">{action}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <InfoOutlinedIcon fontSize="small" /> {aiActionRationales[idx]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* 2. Emerging Issues */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <WarningAmberIcon className="text-yellow-500" />
                <span className="text-lg font-bold text-gray-800">Emerging Issues</span>
              </div>
              {aiSmartData.emerging.length === 0 ? (
                <div className="text-gray-500">No new or rising issues detected.</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {aiSmartData.emerging.map((tag, idx) => (
                    <div key={idx} className="flex flex-col items-start px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold border border-yellow-200 min-w-[120px]">
                      <span>{tag}</span>
                      <span className="text-xs text-yellow-700 mt-1">{aiEmergingSummaries(tag)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 3. At-Risk Segments */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <GroupIcon className="text-red-400" />
                <span className="text-lg font-bold text-gray-800">Customer Segments at Risk</span>
              </div>
              {aiSmartData.atRiskArr.length === 0 ? (
                <div className="text-gray-500">No at-risk segments detected.</div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {aiSmartData.atRiskArr.map((seg, idx) => (
                    <div key={idx} className="flex flex-col items-start px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold border border-red-200 min-w-[120px]">
                      <span>{seg.company} • {seg.role}</span>
                      <span className="text-xs text-red-700 mt-1">{aiAtRiskReason(seg)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* 4. Predicted Impact */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex items-center gap-4">
              <TrendingDownIcon className="text-purple-500 text-3xl" />
              <div>
                <div className="text-lg font-bold text-gray-800 mb-1">Predicted Impact</div>
                <div className="text-gray-700">{aiSmartData.predImpact}</div>
                <div className="text-xs text-purple-700 mt-1">{aiConfidence}</div>
              </div>
            </div>
            {/* 5. Quick Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => openQuickActionModal('task')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow hover:from-green-500 hover:to-green-700 transition">
                <TaskAltIcon /> Create Task
              </button>
              <button onClick={() => openQuickActionModal('survey')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow hover:from-blue-500 hover:to-blue-700 transition">
                <SendIcon /> Send Survey
              </button>
              <button onClick={() => openQuickActionModal('escalate')} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 text-white font-bold shadow hover:from-purple-500 hover:to-purple-700 transition">
                <ArrowUpwardIcon /> Escalate to Product Team
              </button>
            </div>
            {/* Quick Action Modal Prototypes */}
            {quickActionModal.open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white/95 rounded-2xl shadow-2xl max-w-md w-full p-0 animate-scale-up relative overflow-hidden">
                  <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10" onClick={closeQuickActionModal}><CloseIcon /></button>
                  {!quickActionModal.success ? (
                    <div className="flex flex-col gap-6 p-8">
                      {/* Modal content by type */}
                      {quickActionModal.type === 'task' && (
                        <>
                          <div className="flex items-center gap-2 mb-2"><TaskAltIcon className="text-green-500" /><span className="text-lg font-bold text-gray-800">Create Task</span></div>
                          <input className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none transition" placeholder="Task Title" />
                          <textarea className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none transition" rows={3} placeholder="Task Notes" />
                          <input type="date" className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none transition" />
                          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 text-white font-bold text-lg shadow hover:from-green-600 hover:to-green-800 transition" onClick={submitQuickAction}>Submit Task</button>
                        </>
                      )}
                      {quickActionModal.type === 'survey' && (
                        <>
                          <div className="flex items-center gap-2 mb-2"><SendIcon className="text-blue-500" /><span className="text-lg font-bold text-gray-800">Send Survey</span></div>
                          <select className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition">
                            <option>Customer Satisfaction Survey</option>
                            <option>Feature Feedback Survey</option>
                            <option>Bug Report Follow-up</option>
                          </select>
                          <textarea className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition" rows={3} placeholder="Custom Message" />
                          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition" onClick={submitQuickAction}>Send Survey</button>
                        </>
                      )}
                      {quickActionModal.type === 'escalate' && (
                        <>
                          <div className="flex items-center gap-2 mb-2"><ArrowUpwardIcon className="text-purple-500" /><span className="text-lg font-bold text-gray-800">Escalate to Product Team</span></div>
                          <select className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition">
                            <option>Critical Bug</option>
                            <option>Major Feature Request</option>
                            <option>Customer Escalation</option>
                          </select>
                          <textarea className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition" rows={3} placeholder="Add Context" />
                          <input className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition" placeholder="Product Team Contact (optional)" />
                          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-lg shadow hover:from-purple-600 hover:to-purple-800 transition" onClick={submitQuickAction}>Escalate</button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10">
                      <CheckCircleOutlineIcon className="text-green-500 mb-4 animate-pulse" style={{ fontSize: 56 }} />
                      <div className="text-2xl font-bold text-green-700 mb-2">Action Completed!</div>
                      <div className="text-gray-700 mb-4">Your action has been successfully submitted.</div>
                      <button className="text-indigo-600 hover:underline mt-2" onClick={closeQuickActionModal}>Close</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className="fixed bottom-8 left-8 z-50">
            <div className="animate-bounce-in bg-white/95 border-2 border-transparent bg-clip-padding rounded-xl shadow-2xl max-w-xs min-w-[260px] px-4 py-3 flex items-center gap-3 relative overflow-hidden group"
                 style={{ borderImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6) 1' }}>
              <div className="absolute inset-0 pointer-events-none rounded-xl border-2 border-transparent group-hover:border-blue-400 transition-all duration-300" style={{ borderImage: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6) 1' }}></div>
              <div className="p-2 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-full flex items-center justify-center shadow">
                <NotificationsActive className="text-blue-500 text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 truncate">New Feedback</div>
                <div className="text-xs text-gray-600 truncate">{notification.customer.name}</div>
                <div className="text-xs text-gray-500 truncate">{notification.message.substring(0, 40)}...</div>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="ml-2 text-gray-300 hover:text-gray-500 transition-colors text-lg"
                aria-label="Close notification"
              >
                <Close fontSize="small" />
              </button>
              <button
                onClick={() => {
                  setSelectedFeedback(notification);
                  setShowModal(true);
                  setNotification(null);
                }}
                className="ml-2 px-2 py-1 rounded-lg bg-gradient-to-r from-blue-400 to-pink-400 text-white text-xs font-semibold shadow hover:from-blue-500 hover:to-pink-500 transition"
              >
                View
              </button>
            </div>
            <style jsx>{`
              @keyframes bounce-in {
                0% { transform: scale(0.7) translateY(60px); opacity: 0; }
                60% { transform: scale(1.05) translateY(-8px); opacity: 1; }
                80% { transform: scale(0.98) translateY(2px); }
                100% { transform: scale(1) translateY(0); }
              }
              .animate-bounce-in {
                animation: bounce-in 0.7s cubic-bezier(0.68,-0.55,0.27,1.55);
              }
            `}</style>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedFeedback && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-scale-up">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedFeedback.customer.name}</h2>
                  <p className="text-gray-600">{selectedFeedback.customer.email}</p>
                  <p className="text-sm text-gray-500">{selectedFeedback.customer.company} • {selectedFeedback.customer.role}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Close />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getSentimentColor(selectedFeedback.sentiment)}`}>
                    {getSentimentEmoji(selectedFeedback.sentiment)} {selectedFeedback.sentiment}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPriorityColor(selectedFeedback.priority)}`}>
                    {selectedFeedback.priority} priority
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{selectedFeedback.message}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedFeedback.aiTags.map((tag, index) => (
                    <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-gray-500 border-t pt-4">
                  Received: {new Date(selectedFeedback.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback; 