import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Visibility as ViewIcon,
  PlayArrow as PlayIcon,
  Assignment as AssignmentIcon,
  PriorityHigh as PriorityIcon,
  CheckCircle as ResolvedIcon,
  CheckCircle as CheckCircle,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Computer as ComputerIcon,
  Language as LanguageIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Link as LinkIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  Analytics as AnalyticsIcon,
  AutoAwesome as AIIcon,
  VolumeUp as VolumeUpIcon,
  Fullscreen as FullscreenIcon
} from '@mui/icons-material';

function VoCAnalyzer() {
  const [vocData, setVocData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priorityFlag: 'all',
    vocStatus: 'all',
    category: 'all',
    assignedTo: 'all'
  });
  const [sortBy, setSortBy] = useState('startTime');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedTableRow, setExpandedTableRow] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [watchModalOpen, setWatchModalOpen] = useState(false);
  const [selectedWatchData, setSelectedWatchData] = useState(null);
  const [sessionRecordingModalOpen, setSessionRecordingModalOpen] = useState(false);
  const [selectedSessionData, setSelectedSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  // Mock data for demonstration
  const mockVocData = [
    {
      _id: 'voc_001',
      startTime: '2024-01-15T10:30:00Z',
      category: 'Technical Issue',
      subCategory: 'Login Problems',
      assignedTo: 'Tech Support Team',
      purposeOfVisit: 'Account Access',
      stepsToReplicate: '1. Navigate to login page\n2. Enter credentials\n3. Click login button\n4. Error occurs after 2-3 seconds',
      Clipboard: 'User attempted login 3 times',
      dogSessionId: 'session_abc123',
      rVisitor: 'John Doe',
      urlReferrer: 'https://google.com',
      responsibility: 'Frontend Team',
      reason: 'Session timeout configuration',
      errors: 'ERR_SESSION_EXPIRED',
      priorityFlag: 'high',
      glassboxSessionId: 'gb_session_xyz789',
      contactInformation: 'john.doe@email.com',
      problem: 'User unable to login after session timeout',
      comment: 'Customer frustrated with repeated login attempts',
      findings: 'Session timeout set to 15 minutes, too aggressive for user workflow',
      nextsteps: '1. Extend session timeout to 30 minutes\n2. Implement remember me functionality\n3. Add session renewal option',
      vocStatus: 'in_progress',
      satisfaction: 2,
      memberId: 'MEM_001',
      dogApplicationId: 'app_health_001',
      recommendWebsite: 3,
      browser: 'Chrome',
      browserVersion: '120.0.6099.109',
      ip: '192.168.1.100',
      lineOfBusiness: 'Health Insurance',
      productType: 'Individual Plan',
      selectedPlan: 'Premium Plus',
      OS: 'Windows 11',
      sessionCamLink: 'https://glassbox.com/session/xyz789',
      trackerId: 'track_001',
      agentStatus: 'processing',
      agentActions: [
        { agent: 'AI Agent Alpha', action: 'Identified login issue', timestamp: '2024-01-15T10:35:00Z', status: 'completed' },
        { agent: 'AI Agent Beta', action: 'Generated replication steps', timestamp: '2024-01-15T10:40:00Z', status: 'completed' },
        { agent: 'AI Agent Gamma', action: 'Assigned to Tech Support', timestamp: '2024-01-15T10:45:00Z', status: 'processing' }
      ]
    },
    {
      _id: 'voc_002',
      startTime: '2024-01-15T09:15:00Z',
      category: 'User Experience',
      subCategory: 'Navigation',
      assignedTo: 'UX Team',
      purposeOfVisit: 'Claims Submission',
      stepsToReplicate: '1. Go to claims section\n2. Click submit claim\n3. Form validation fails\n4. User loses progress',
      Clipboard: 'User spent 45 minutes on form',
      dogSessionId: 'session_def456',
      rVisitor: 'Sarah Smith',
      urlReferrer: 'https://facebook.com',
      responsibility: 'UX/UI Team',
      reason: 'Form validation too strict',
      errors: 'ERR_VALIDATION_FAILED',
      priorityFlag: 'medium',
      glassboxSessionId: 'gb_session_abc456',
      contactInformation: 'sarah.smith@email.com',
      problem: 'Claims form validation prevents submission',
      comment: 'Customer lost 45 minutes of work due to form reset',
      findings: 'Form validation triggers on every field change, causing user frustration',
      nextsteps: '1. Implement auto-save functionality\n2. Reduce validation frequency\n3. Add progress indicator',
      vocStatus: 'resolved',
      satisfaction: 4,
      memberId: 'MEM_002',
      dogApplicationId: 'app_claims_001',
      recommendWebsite: 4,
      browser: 'Safari',
      browserVersion: '17.1.2',
      ip: '192.168.1.101',
      lineOfBusiness: 'Auto Insurance',
      productType: 'Family Plan',
      selectedPlan: 'Standard',
      OS: 'macOS 14.1',
      sessionCamLink: 'https://glassbox.com/session/abc456',
      trackerId: 'track_002',
      agentStatus: 'completed',
      agentActions: [
        { agent: 'AI Agent Delta', action: 'Analyzed form interaction patterns', timestamp: '2024-01-15T09:20:00Z', status: 'completed' },
        { agent: 'AI Agent Epsilon', action: 'Identified UX pain points', timestamp: '2024-01-15T09:25:00Z', status: 'completed' },
        { agent: 'AI Agent Zeta', action: 'Created improvement recommendations', timestamp: '2024-01-15T09:30:00Z', status: 'completed' }
      ]
    },
    {
      _id: 'voc_003',
      startTime: '2024-01-15T08:45:00Z',
      category: 'Payment Issue',
      subCategory: 'Transaction Failed',
      assignedTo: 'Payment Team',
      purposeOfVisit: 'Premium Payment',
      stepsToReplicate: '1. Navigate to payment page\n2. Enter card details\n3. Submit payment\n4. Error: "Payment declined"',
      Clipboard: 'Payment declined 3 times',
      dogSessionId: 'session_ghi789',
      rVisitor: 'Mike Johnson',
      urlReferrer: 'https://bing.com',
      responsibility: 'Payment Processing Team',
      reason: 'Card validation service timeout',
      errors: 'ERR_PAYMENT_DECLINED',
      priorityFlag: 'high',
      glassboxSessionId: 'gb_session_def789',
      contactInformation: 'mike.johnson@email.com',
      problem: 'Legitimate payments being declined',
      comment: 'Customer has sufficient funds, payment should process',
      findings: 'Payment gateway experiencing intermittent timeouts',
      nextsteps: '1. Investigate payment gateway health\n2. Implement retry mechanism\n3. Add fallback payment methods',
      vocStatus: 'pending',
      satisfaction: 1,
      memberId: 'MEM_003',
      dogApplicationId: 'app_payment_001',
      recommendWebsite: 1,
      browser: 'Firefox',
      browserVersion: '121.0',
      ip: '192.168.1.102',
      lineOfBusiness: 'Life Insurance',
      productType: 'Term Life',
      selectedPlan: '20-Year Term',
      OS: 'Ubuntu 22.04',
      sessionCamLink: 'https://glassbox.com/session/def789',
      trackerId: 'track_003',
      agentStatus: 'pending',
      agentActions: [
        { agent: 'AI Agent Theta', action: 'Detected payment pattern anomaly', timestamp: '2024-01-15T08:50:00Z', status: 'completed' },
        { agent: 'AI Agent Iota', action: 'Analyzed transaction logs', timestamp: '2024-01-15T08:55:00Z', status: 'completed' },
        { agent: 'AI Agent Kappa', action: 'Escalated to Payment Team', timestamp: '2024-01-15T09:00:00Z', status: 'pending' }
      ]
    },
    {
      _id: 'voc_004',
      startTime: '2024-01-15T11:20:00Z',
      category: 'Medicare Benefits',
      subCategory: 'Eligibility Questions',
      assignedTo: 'Medicare Specialist Team',
      purposeOfVisit: 'Benefits Inquiry',
      stepsToReplicate: '1. Navigate to Medicare section\n2. Search for eligibility criteria\n3. User confused about age requirements',
      Clipboard: 'User searched "Medicare age 50" multiple times',
      dogSessionId: 'session_jkl012',
      rVisitor: 'Margaret Wilson',
      urlReferrer: 'https://aarp.org',
      responsibility: 'Medicare Benefits Team',
      reason: 'Complex eligibility criteria not clearly explained',
      errors: 'ERR_ELIGIBILITY_CONFUSION',
      priorityFlag: 'medium',
      glassboxSessionId: 'gb_session_ghi012',
      contactInformation: 'margaret.wilson@email.com',
      problem: 'Customer confused about Medicare eligibility for sons over 50',
      comment: 'I have 2 sons over the age of 50 in bad health. Is there other reasons they could file for Medicare benefits. I have seen the 2 diseases under 50 that u can file for but I want to no if there rother reasons that would b included.',
      findings: 'Customer needs clarification on Medicare eligibility criteria for adult children with health conditions',
      nextsteps: '1. Provide comprehensive Medicare eligibility guide\n2. Schedule consultation with Medicare specialist\n3. Create educational content about special circumstances',
      vocStatus: 'in_progress',
      satisfaction: 3,
      memberId: 'MEM_004',
      dogApplicationId: 'app_medicare_001',
      recommendWebsite: 4,
      browser: 'Chrome',
      browserVersion: '120.0.6099.109',
      ip: '192.168.1.103',
      lineOfBusiness: 'Medicare',
      productType: 'Medicare Advantage',
      selectedPlan: 'Plan C',
      OS: 'Windows 10',
      sessionCamLink: 'https://glassbox.com/session/ghi012',
      trackerId: 'track_004',
      agentStatus: 'processing',
      agentActions: [
        { agent: 'AI Agent Lambda', action: 'Identified Medicare eligibility question', timestamp: '2024-01-15T11:25:00Z', status: 'completed' },
        { agent: 'AI Agent Mu', action: 'Analyzed eligibility criteria', timestamp: '2024-01-15T11:30:00Z', status: 'processing' },
        { agent: 'AI Agent Nu', action: 'Preparing response with specialist', timestamp: '2024-01-15T11:35:00Z', status: 'pending' }
      ]
    },
    {
      _id: 'voc_005',
      startTime: '2024-01-15T12:05:00Z',
      category: 'Claims Processing',
      subCategory: 'Document Upload',
      assignedTo: 'Claims Processing Team',
      purposeOfVisit: 'Submit Claim',
      stepsToReplicate: '1. Navigate to claims section\n2. Select claim type\n3. Upload documents\n4. System shows "Upload failed"',
      Clipboard: 'User attempted upload 5 times with different files',
      dogSessionId: 'session_mno345',
      rVisitor: 'Robert Chen',
      urlReferrer: 'https://google.com',
      responsibility: 'Claims Processing Team',
      reason: 'File size limit exceeded',
      errors: 'ERR_FILE_TOO_LARGE',
      priorityFlag: 'high',
      glassboxSessionId: 'gb_session_jkl345',
      contactInformation: 'robert.chen@email.com',
      problem: 'Unable to upload claim documents due to file size restrictions',
      comment: 'I\'ve been trying to upload my medical bills for the past hour but it keeps saying the files are too large. I\'ve compressed them as much as possible but still getting errors. This is very frustrating.',
      findings: 'File upload system has restrictive size limits that prevent legitimate claim submissions',
      nextsteps: '1. Increase file size limits\n2. Implement better compression options\n3. Add file optimization guidance',
      vocStatus: 'pending',
      satisfaction: 1,
      memberId: 'MEM_005',
      dogApplicationId: 'app_claims_002',
      recommendWebsite: 2,
      browser: 'Edge',
      browserVersion: '120.0.2210.91',
      ip: '192.168.1.104',
      lineOfBusiness: 'Health Insurance',
      productType: 'Family Plan',
      selectedPlan: 'Gold Plus',
      OS: 'Windows 11',
      sessionCamLink: 'https://glassbox.com/session/jkl345',
      trackerId: 'track_005',
      agentStatus: 'processing',
      agentActions: [
        { agent: 'AI Agent Xi', action: 'Detected file upload issue', timestamp: '2024-01-15T12:10:00Z', status: 'completed' },
        { agent: 'AI Agent Omicron', action: 'Analyzed file size patterns', timestamp: '2024-01-15T12:15:00Z', status: 'processing' },
        { agent: 'AI Agent Pi', action: 'Escalating to technical team', timestamp: '2024-01-15T12:20:00Z', status: 'pending' }
      ]
    },
    {
      _id: 'voc_006',
      startTime: '2024-01-15T13:15:00Z',
      category: 'Policy Management',
      subCategory: 'Coverage Changes',
      assignedTo: 'Policy Management Team',
      purposeOfVisit: 'Update Coverage',
      stepsToReplicate: '1. Navigate to policy management\n2. Select coverage options\n3. Submit changes\n4. Confirmation page shows error',
      Clipboard: 'User spent 30 minutes on coverage selection',
      dogSessionId: 'session_pqr678',
      rVisitor: 'Jennifer Davis',
      urlReferrer: 'https://facebook.com',
      responsibility: 'Policy Management Team',
      reason: 'System validation error during coverage update',
      errors: 'ERR_COVERAGE_UPDATE_FAILED',
      priorityFlag: 'medium',
      glassboxSessionId: 'gb_session_mno678',
      contactInformation: 'jennifer.davis@email.com',
      problem: 'Unable to update policy coverage due to system error',
      comment: 'I was trying to add dental coverage to my policy but the system keeps giving me an error. I\'ve tried multiple times and even called support but they couldn\'t help either.',
      findings: 'Coverage update system experiencing intermittent validation errors',
      nextsteps: '1. Investigate coverage update system\n2. Implement manual override process\n3. Add better error messaging',
      vocStatus: 'in_progress',
      satisfaction: 2,
      memberId: 'MEM_006',
      dogApplicationId: 'app_policy_001',
      recommendWebsite: 3,
      browser: 'Safari',
      browserVersion: '17.1.2',
      ip: '192.168.1.105',
      lineOfBusiness: 'Dental Insurance',
      productType: 'Individual Plan',
      selectedPlan: 'Basic Dental',
      OS: 'macOS 14.1',
      sessionCamLink: 'https://glassbox.com/session/mno678',
      trackerId: 'track_006',
      agentStatus: 'completed',
      agentActions: [
        { agent: 'AI Agent Rho', action: 'Identified coverage update issue', timestamp: '2024-01-15T13:20:00Z', status: 'completed' },
        { agent: 'AI Agent Sigma', action: 'Analyzed system logs', timestamp: '2024-01-15T13:25:00Z', status: 'completed' },
        { agent: 'AI Agent Tau', action: 'Created manual override ticket', timestamp: '2024-01-15T13:30:00Z', status: 'completed' }
      ]
    },
    {
      _id: 'voc_007',
      startTime: '2024-01-15T14:30:00Z',
      category: 'Premium Billing',
      subCategory: 'Payment Processing',
      assignedTo: 'Billing Team',
      purposeOfVisit: 'Payment Issue',
      stepsToReplicate: '1. Navigate to billing section\n2. Select payment method\n3. Enter payment details\n4. Receive confirmation but no charge',
      Clipboard: 'Payment shows as processed but no charge appears',
      dogSessionId: 'session_stu901',
      rVisitor: 'David Martinez',
      urlReferrer: 'https://bing.com',
      responsibility: 'Billing Processing Team',
      reason: 'Payment gateway synchronization issue',
      errors: 'ERR_PAYMENT_SYNC_FAILED',
      priorityFlag: 'high',
      glassboxSessionId: 'gb_session_pqr901',
      contactInformation: 'david.martinez@email.com',
      problem: 'Payment processed but not charged to account',
      comment: 'I made a payment yesterday and got a confirmation email, but the charge never appeared on my credit card. I\'m worried about late fees if the payment didn\'t actually go through.',
      findings: 'Payment gateway experiencing synchronization delays with financial institutions',
      nextsteps: '1. Verify payment status with gateway\n2. Implement payment verification system\n3. Add real-time payment status updates',
      vocStatus: 'pending',
      satisfaction: 1,
      memberId: 'MEM_007',
      dogApplicationId: 'app_billing_001',
      recommendWebsite: 2,
      browser: 'Chrome',
      browserVersion: '120.0.6099.109',
      ip: '192.168.1.106',
      lineOfBusiness: 'Auto Insurance',
      productType: 'Family Plan',
      selectedPlan: 'Comprehensive',
      OS: 'Windows 11',
      sessionCamLink: 'https://glassbox.com/session/pqr901',
      trackerId: 'track_007',
      agentStatus: 'processing',
      agentActions: [
        { agent: 'AI Agent Upsilon', action: 'Detected payment sync issue', timestamp: '2024-01-15T14:35:00Z', status: 'completed' },
        { agent: 'AI Agent Phi', action: 'Contacting payment gateway', timestamp: '2024-01-15T14:40:00Z', status: 'processing' },
        { agent: 'AI Agent Chi', action: 'Verifying payment status', timestamp: '2024-01-15T14:45:00Z', status: 'pending' }
      ]
    },
    {
      _id: 'voc_008',
      startTime: '2024-01-15T15:45:00Z',
      category: 'Customer Service',
      subCategory: 'Contact Information',
      assignedTo: 'Customer Service Team',
      purposeOfVisit: 'Update Contact Info',
      stepsToReplicate: '1. Navigate to profile settings\n2. Update email address\n3. Save changes\n4. Confirmation email not received',
      Clipboard: 'User updated email but no confirmation received',
      dogSessionId: 'session_vwx234',
      rVisitor: 'Lisa Thompson',
      urlReferrer: 'https://google.com',
      responsibility: 'Customer Service Team',
      reason: 'Email verification system down',
      errors: 'ERR_EMAIL_VERIFICATION_FAILED',
      priorityFlag: 'low',
      glassboxSessionId: 'gb_session_stu234',
      contactInformation: 'lisa.thompson@email.com',
      problem: 'Unable to verify email address change',
      comment: 'I updated my email address in my profile but I never received the verification email. I checked my spam folder too. How do I know if the change was actually saved?',
      findings: 'Email verification system experiencing delivery delays',
      nextsteps: '1. Check email delivery system\n2. Implement alternative verification methods\n3. Add manual verification option',
      vocStatus: 'resolved',
      satisfaction: 4,
      memberId: 'MEM_008',
      dogApplicationId: 'app_profile_001',
      recommendWebsite: 4,
      browser: 'Firefox',
      browserVersion: '121.0',
      ip: '192.168.1.107',
      lineOfBusiness: 'Life Insurance',
      productType: 'Term Life',
      selectedPlan: '15-Year Term',
      OS: 'Ubuntu 22.04',
      sessionCamLink: 'https://glassbox.com/session/stu234',
      trackerId: 'track_008',
      agentStatus: 'completed',
      agentActions: [
        { agent: 'AI Agent Psi', action: 'Identified email verification issue', timestamp: '2024-01-15T15:50:00Z', status: 'completed' },
        { agent: 'AI Agent Omega', action: 'Verified email change manually', timestamp: '2024-01-15T15:55:00Z', status: 'completed' },
        { agent: 'AI Agent Alpha2', action: 'Sent confirmation email', timestamp: '2024-01-15T16:00:00Z', status: 'completed' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setVocData(mockVocData);
      setFilteredData(mockVocData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [vocData, searchTerm, selectedFilters, sortBy, sortOrder]);

  const filterAndSortData = () => {
    let filtered = vocData.filter(item => {
      const matchesSearch = 
        item.problem?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.rVisitor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item._id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPriority = selectedFilters.priorityFlag === 'all' || item.priorityFlag === selectedFilters.priorityFlag;
      const matchesStatus = selectedFilters.vocStatus === 'all' || item.vocStatus === selectedFilters.vocStatus;
      const matchesCategory = selectedFilters.category === 'all' || item.category === selectedFilters.category;
      const matchesAssigned = selectedFilters.assignedTo === 'all' || item.assignedTo === selectedFilters.assignedTo;

      return matchesSearch && matchesPriority && matchesStatus && matchesCategory && matchesAssigned;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'startTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredData(filtered);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'escalated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSatisfactionColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleCardExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleTableRowExpand = (rowId) => {
    setExpandedTableRow(expandedTableRow === rowId ? null : rowId);
  };

  const handleWatchEye = (item) => {
    setSelectedWatchData(item);
    setWatchModalOpen(true);
  };

  const handleViewSessionRecording = (item) => {
    setSelectedSessionData(item);
    setSessionRecordingModalOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return <ResolvedIcon className="text-green-500" />;
      case 'in_progress': return <ScheduleIcon className="text-blue-500" />;
      case 'pending': return <ScheduleIcon className="text-yellow-500" />;
      case 'escalated': return <ErrorIcon className="text-red-500" />;
      default: return <ScheduleIcon className="text-gray-500" />;
    }
  };

  const getAgentStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'text-green-500';
      case 'completed': return 'text-blue-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getAgentStatusIcon = (status) => {
    switch (status) {
      case 'processing': return <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>;
      case 'completed': return <CheckCircle className="text-blue-500" />;
      case 'pending': return <ScheduleIcon className="text-yellow-500" />;
      default: return <ScheduleIcon className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="voc-analyzer">
      {/* Header */}
      <div className="voc-header">
        <div className="voc-header-content">
          <div className="voc-title-section">
            <h1 className="voc-title">
              <AIIcon className="voc-title-icon" />
              Voice of Customer Analyzer
            </h1>
            <p className="voc-subtitle">
              AI-powered feedback analysis and agent-driven resolution tracking
            </p>
          </div>
          <div className="voc-stats">
            <div className="stat-item">
              <span className="stat-number">{filteredData.length}</span>
              <span className="stat-label">Active Cases</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredData.filter(item => item.vocStatus === 'resolved').length}
              </span>
              <span className="stat-label">Resolved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {filteredData.filter(item => item.priorityFlag === 'high').length}
              </span>
              <span className="stat-label">High Priority</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="voc-controls">
        <div className="search-section">
          <div className="search-box">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search cases, problems, or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Priority</label>
            <select
              value={selectedFilters.priorityFlag}
              onChange={(e) => setSelectedFilters({...selectedFilters, priorityFlag: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              value={selectedFilters.vocStatus}
              onChange={(e) => setSelectedFilters({...selectedFilters, vocStatus: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select
              value={selectedFilters.category}
              onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="User Experience">User Experience</option>
              <option value="Payment Issue">Payment Issue</option>
              <option value="Medicare Benefits">Medicare Benefits</option>
              <option value="Claims Processing">Claims Processing</option>
              <option value="Policy Management">Policy Management</option>
              <option value="Premium Billing">Premium Billing</option>
              <option value="Customer Service">Customer Service</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="startTime">Time</option>
              <option value="priorityFlag">Priority</option>
              <option value="satisfaction">Satisfaction</option>
              <option value="category">Category</option>
            </select>
          </div>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-button"
          >
            <SortIcon className="sort-icon" />
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>

          <div className="view-toggle">
            <button
              onClick={() => setViewMode('cards')}
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
            >
              <ViewIcon />
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            >
              <FilterIcon />
              Table
            </button>
          </div>
        </div>
      </div>

            {/* Legends */}
      <div className="voc-legends">
        <div className="legend-section">
          <h3 className="legend-title">Agent Status</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-500 border-t-transparent"></div>
              <span>Processing</span>
            </div>
            <div className="legend-item">
              <CheckCircle className="text-blue-500" />
              <span>Completed</span>
            </div>
            <div className="legend-item">
              <ScheduleIcon className="text-yellow-500" />
              <span>Pending</span>
            </div>
          </div>
        </div>
        <div className="legend-section">
          <h3 className="legend-title">Priority</h3>
          <div className="legend-items">
            <div className="legend-item">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>High</span>
            </div>
            <div className="legend-item">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium</span>
            </div>
            <div className="legend-item">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
        <div className="legend-section">
          <h3 className="legend-title">Status</h3>
          <div className="legend-items">
            <div className="legend-item">
              <ResolvedIcon className="text-green-500" />
              <span>Resolved</span>
            </div>
            <div className="legend-item">
              <ScheduleIcon className="text-blue-500" />
              <span>In Progress</span>
            </div>
            <div className="legend-item">
              <ScheduleIcon className="text-yellow-500" />
              <span>Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* VoC Cards Grid */}
      {viewMode === 'cards' ? (
        <div className="voc-grid">
          {filteredData.map((item) => (
            <div key={item._id} className="voc-card">
              {/* Card Header */}
              <div className="voc-card-header">
                <div className="voc-card-id">
                  <span className="voc-id">{item._id}</span>
                  <span className={`priority-badge ${getPriorityColor(item.priorityFlag)}`}>
                    {item.priorityFlag.toUpperCase()}
                  </span>
                  <div className="agent-status-indicator">
                    {getAgentStatusIcon(item.agentStatus)}
                  </div>
                </div>
                <div className="voc-card-actions">
                  <button
                    onClick={() => handleCardExpand(item._id)}
                    className="expand-button"
                  >
                    {expandedCard === item._id ? <CollapseIcon /> : <ExpandIcon />}
                  </button>
                  <button
                    onClick={() => handleCardSelect(item)}
                    className="view-button"
                  >
                    <ViewIcon />
                  </button>
                </div>
              </div>

              {/* Card Content */}
              <div className="voc-card-content">
                <div className="voc-problem">
                  <h3 className="problem-title">Problem</h3>
                  <p className="problem-text">{truncateText(item.problem, 150)}</p>
                </div>

                <div className="voc-meta">
                  <div className="meta-row">
                    <PersonIcon className="meta-icon" />
                    <span className="meta-label">Customer:</span>
                    <span className="meta-value">{item.rVisitor}</span>
                  </div>
                  <div className="meta-row">
                    <BusinessIcon className="meta-icon" />
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{item.category}</span>
                  </div>
                  <div className="meta-row">
                    <AssignmentIcon className="meta-icon" />
                    <span className="meta-label">Assigned:</span>
                    <span className="meta-value">{item.assignedTo}</span>
                  </div>
                  <div className="meta-row">
                    <StarIcon className="meta-icon" />
                    <span className="meta-label">Satisfaction:</span>
                    <span className={`meta-value ${getSatisfactionColor(item.satisfaction)}`}>
                      {item.satisfaction}/5
                    </span>
                  </div>
                </div>

                <div className="voc-status">
                  <div className="status-indicator">
                    {getStatusIcon(item.vocStatus)}
                    <span className="status-text">{item.vocStatus.replace('_', ' ')}</span>
                  </div>
                  <span className="timestamp">{formatDate(item.startTime)}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCard === item._id && (
                <div className="voc-card-expanded">
                  <div className="expanded-section">
                    <h4 className="section-title">Customer Comment</h4>
                    <div className="customer-comment">
                      <p className="comment-text">{item.comment}</p>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4 className="section-title">Agent Analysis</h4>
                    <div className="analysis-content">
                      <div className="analysis-item">
                        <strong>Findings:</strong>
                        <p>{item.findings}</p>
                      </div>
                      <div className="analysis-item">
                        <strong>Next Steps:</strong>
                        <p>{item.nextsteps}</p>
                      </div>
                      <div className="analysis-item">
                        <strong>Steps to Replicate:</strong>
                        <pre className="replication-steps">{item.stepsToReplicate}</pre>
                      </div>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4 className="section-title">Technical Details</h4>
                    <div className="tech-details">
                      <div className="tech-row">
                        <ComputerIcon className="tech-icon" />
                        <span>Browser: {item.browser} {item.browserVersion}</span>
                      </div>
                      <div className="tech-row">
                        <ComputerIcon className="tech-icon" />
                        <span>OS: {item.OS}</span>
                      </div>
                      <div className="tech-row">
                        <LocationIcon className="tech-icon" />
                        <span>IP: {item.ip}</span>
                      </div>
                      <div className="tech-row">
                        <LinkIcon className="tech-icon" />
                        <span>Session: {item.glassboxSessionId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4 className="section-title">Agent Actions</h4>
                    <div className="agent-actions">
                      {item.agentActions.map((action, index) => (
                        <div key={index} className="agent-action">
                          <div className="agent-info">
                            <AIIcon className="agent-icon" />
                            <span className="agent-name">{action.agent}</span>
                            {getAgentStatusIcon(action.status)}
                          </div>
                          <div className="action-details">
                            <span className="action-text">{action.action}</span>
                            <span className="action-time">{formatDate(action.timestamp)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="expanded-section">
                    <h4 className="section-title">Customer Information</h4>
                    <div className="customer-details">
                      <div className="detail-row">
                        <PhoneIcon className="detail-icon" />
                        <span>Contact: {item.contactInformation}</span>
                      </div>
                      <div className="detail-row">
                        <BusinessIcon className="detail-icon" />
                        <span>Business: {item.lineOfBusiness}</span>
                      </div>
                      <div className="detail-row">
                        <StarIcon className="detail-icon" />
                        <span>Recommend: {item.recommendWebsite}/5</span>
                      </div>
                      <div className="detail-row">
                        <TrendingIcon className="detail-icon" />
                        <span>Product: {item.productType} - {item.selectedPlan}</span>
                      </div>
                    </div>
                  </div>

                  <div className="expanded-actions">
                    <button className="action-btn primary">
                      <PlayIcon />
                      View Session Recording
                    </button>
                    <button className="action-btn secondary">
                      <AssignmentIcon />
                      Update Status
                    </button>
                    <button className="action-btn secondary">
                      <ShareIcon />
                      Share Case
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="voc-table-container">
          <table className="voc-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>ID</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Problem</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Agent Status</th>
                <th>Assigned To</th>
                <th>Satisfaction</th>
                <th>Actions</th>
              </tr>
            </thead>
                          <tbody>
                {filteredData.map((item) => [
                  <tr key={item._id} className="voc-table-row">
                    <td className="time-cell">
                      <span className="time-text">{formatDate(item.startTime)}</span>
                    </td>
                    <td className="voc-id-cell">
                      <span className="voc-id">{item._id}</span>
                    </td>
                    <td className="customer-cell">
                      <div className="customer-info">
                        <PersonIcon className="customer-icon" />
                        <span>{item.rVisitor}</span>
                      </div>
                    </td>
                    <td className="category-cell">
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td className="problem-cell">
                      <div className="problem-info">
                        <p className="problem-text">{truncateText(item.problem, 80)}</p>
                        <p className="comment-preview">{truncateText(item.comment, 60)}</p>
                      </div>
                    </td>
                    <td className="priority-cell">
                      <span className={`priority-badge ${getPriorityColor(item.priorityFlag)}`}>
                        {item.priorityFlag.toUpperCase()}
                      </span>
                    </td>
                    <td className="status-cell">
                      <div className="status-info">
                        {getStatusIcon(item.vocStatus)}
                        <span>{item.vocStatus.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="agent-status-cell">
                      <div className="agent-status-info">
                        {getAgentStatusIcon(item.agentStatus)}
                        <span className={getAgentStatusColor(item.agentStatus)}>
                          {item.agentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="assigned-cell">
                      <span>{item.assignedTo}</span>
                    </td>
                    <td className="satisfaction-cell">
                      <div className="satisfaction-info">
                        <StarIcon className="star-icon" />
                        <span className={getSatisfactionColor(item.satisfaction)}>
                          {item.satisfaction}/5
                        </span>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="table-actions">
                        <button
                          onClick={() => handleTableRowExpand(item._id)}
                          className="table-action-btn"
                          title="Expand Details"
                        >
                          {expandedTableRow === item._id ? <CollapseIcon /> : <ExpandIcon />}
                        </button>
                        <button
                          onClick={() => handleWatchEye(item)}
                          className="table-action-btn"
                          title="Watch Session"
                        >
                          <ViewIcon />
                        </button>
                      </div>
                    </td>
                  </tr>,
                  expandedTableRow === item._id && (
                    <tr key={`${item._id}-expanded`} className="expanded-table-row">
                      <td colSpan="11" className="expanded-table-content">
                        <div className="expanded-table-details">
                          <div className="expanded-section">
                            <h4 className="section-title">Customer Comment</h4>
                            <div className="customer-comment">
                              <p className="comment-text">{item.comment}</p>
                            </div>
                          </div>

                          <div className="expanded-section">
                            <h4 className="section-title">Agent Analysis</h4>
                            <div className="analysis-content">
                              <div className="analysis-item">
                                <strong>Findings:</strong>
                                <p>{item.findings}</p>
                              </div>
                              <div className="analysis-item">
                                <strong>Next Steps:</strong>
                                <p>{item.nextsteps}</p>
                              </div>
                              <div className="analysis-item">
                                <strong>Steps to Replicate:</strong>
                                <pre className="replication-steps">{item.stepsToReplicate}</pre>
                              </div>
                            </div>
                          </div>

                          <div className="expanded-section">
                            <h4 className="section-title">Technical Details</h4>
                            <div className="tech-details">
                              <div className="tech-row">
                                <ComputerIcon className="tech-icon" />
                                <span>Browser: {item.browser} {item.browserVersion}</span>
                              </div>
                              <div className="tech-row">
                                <ComputerIcon className="tech-icon" />
                                <span>OS: {item.OS}</span>
                              </div>
                              <div className="tech-row">
                                <LocationIcon className="tech-icon" />
                                <span>IP: {item.ip}</span>
                              </div>
                              <div className="tech-row">
                                <LinkIcon className="tech-icon" />
                                <span>Session: {item.glassboxSessionId}</span>
                              </div>
                            </div>
                          </div>

                          <div className="expanded-section">
                            <h4 className="section-title">Agent Actions</h4>
                            <div className="agent-actions">
                              {item.agentActions.map((action, index) => (
                                <div key={index} className="agent-action">
                                  <div className="agent-info">
                                    <AIIcon className="agent-icon" />
                                    <span className="agent-name">{action.agent}</span>
                                    {getAgentStatusIcon(action.status)}
                                  </div>
                                  <div className="action-details">
                                    <span className="action-text">{action.action}</span>
                                    <span className="action-time">{formatDate(action.timestamp)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="expanded-section">
                            <h4 className="section-title">Customer Information</h4>
                            <div className="customer-details">
                              <div className="detail-row">
                                <PhoneIcon className="detail-icon" />
                                <span>Contact: {item.contactInformation}</span>
                              </div>
                              <div className="detail-row">
                                <BusinessIcon className="detail-icon" />
                                <span>Business: {item.lineOfBusiness}</span>
                              </div>
                              <div className="detail-row">
                                <StarIcon className="detail-icon" />
                                <span>Recommend: {item.recommendWebsite}/5</span>
                              </div>
                              <div className="detail-row">
                                <TrendingIcon className="detail-icon" />
                                <span>Product: {item.productType} - {item.selectedPlan}</span>
                              </div>
                            </div>
                          </div>

                          <div className="expanded-actions">
                            <button 
                              className="action-btn primary"
                              onClick={() => handleViewSessionRecording(item)}
                            >
                              <PlayIcon />
                              View Session Recording
                            </button>
                            <button className="action-btn secondary">
                              <AssignmentIcon />
                              Update Status
                            </button>
                            <button className="action-btn secondary">
                              <ShareIcon />
                              Share Case
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                ])}
              </tbody>
          </table>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="voc-empty">
          <AnalyticsIcon className="empty-icon" />
          <h3>No cases found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Watch Eye Modal */}
      {watchModalOpen && selectedWatchData && (
        <div className="watch-modal-overlay" onClick={() => setWatchModalOpen(false)}>
          <div className="watch-modal" onClick={(e) => e.stopPropagation()}>
            <div className="watch-modal-header">
              <h2>Session Watch - {selectedWatchData.rVisitor}</h2>
              <button 
                className="close-watch-modal"
                onClick={() => setWatchModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="watch-modal-content">
              <div className="session-info">
                <div className="session-header">
                  <div className="session-meta">
                    <span className="session-id">Session: {selectedWatchData.glassboxSessionId}</span>
                    <span className="session-time">{formatDate(selectedWatchData.startTime)}</span>
                  </div>
                  <div className="session-status">
                    <span className={`status-badge ${selectedWatchData.vocStatus}`}>
                      {selectedWatchData.vocStatus.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="session-timeline">
                  <h3>Session Timeline</h3>
                  <div className="timeline-events">
                    <div className="timeline-event">
                      <div className="event-time">00:00</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Page Load</strong>
                        <p>User landed on homepage</p>
                      </div>
                    </div>
                    <div className="timeline-event">
                      <div className="event-time">00:15</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Navigation</strong>
                        <p>Clicked on "Claims" section</p>
                      </div>
                    </div>
                    <div className="timeline-event">
                      <div className="event-time">00:45</div>
                      <div className="event-dot error"></div>
                      <div className="event-content">
                        <strong>Error Occurred</strong>
                        <p>Form validation failed - {selectedWatchData.errors}</p>
                      </div>
                    </div>
                    <div className="timeline-event">
                      <div className="event-time">01:20</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>User Frustration</strong>
                        <p>Multiple attempts to submit form</p>
                      </div>
                    </div>
                    <div className="timeline-event">
                      <div className="event-time">02:15</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Session End</strong>
                        <p>User left the page</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="user-behavior">
                  <h3>User Behavior Analysis</h3>
                  <div className="behavior-metrics">
                    <div className="metric">
                      <span className="metric-label">Time on Page</span>
                      <span className="metric-value">2m 15s</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Clicks</span>
                      <span className="metric-value">23</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Form Attempts</span>
                      <span className="metric-value">5</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Error Rate</span>
                      <span className="metric-value error">80%</span>
                    </div>
                  </div>
                </div>

                <div className="technical-details">
                  <h3>Technical Details</h3>
                  <div className="tech-grid">
                    <div className="tech-item">
                      <strong>Browser:</strong> {selectedWatchData.browser} {selectedWatchData.browserVersion}
                    </div>
                    <div className="tech-item">
                      <strong>OS:</strong> {selectedWatchData.OS}
                    </div>
                    <div className="tech-item">
                      <strong>IP:</strong> {selectedWatchData.ip}
                    </div>
                    <div className="tech-item">
                      <strong>Referrer:</strong> {selectedWatchData.urlReferrer}
                    </div>
                  </div>
                </div>

                <div className="ai-insights">
                  <h3>AI Agent Insights</h3>
                  <div className="insights-content">
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Pattern Detected:</strong> User exhibited frustration patterns with repeated form submissions
                      </div>
                    </div>
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Issue Identified:</strong> Form validation errors preventing successful submission
                      </div>
                    </div>
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Recommendation:</strong> Implement better error messaging and form validation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Recording Modal */}
      {sessionRecordingModalOpen && selectedSessionData && (
        <div className="session-modal-overlay" onClick={() => setSessionRecordingModalOpen(false)}>
          <div className="session-modal" onClick={(e) => e.stopPropagation()}>
            <div className="session-modal-header">
              <h2>Session Recording - {selectedSessionData.rVisitor}</h2>
              <button 
                className="close-session-modal"
                onClick={() => setSessionRecordingModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="session-modal-content">
              <div className="recording-player">
                <div className="video-container">
                  <div className="mock-video-player">
                    <div className="video-header">
                      <div className="video-controls">
                        <button className="control-btn play-btn">
                          <PlayIcon />
                        </button>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{width: '35%'}}></div>
                        </div>
                        <span className="time-display">01:23 / 03:45</span>
                        <button className="control-btn">
                          <VolumeUpIcon />
                        </button>
                        <button className="control-btn">
                          <FullscreenIcon />
                        </button>
                      </div>
                    </div>
                    <div className="video-screen">
                      <div className="mock-browser-window">
                        <div className="browser-header">
                          <div className="browser-tabs">
                            <div className="tab active">InsightPulse Portal</div>
                            <div className="tab">Claims Dashboard</div>
                          </div>
                          <div className="browser-controls">
                            <div className="control-dot red"></div>
                            <div className="control-dot yellow"></div>
                            <div className="control-dot green"></div>
                          </div>
                        </div>
                        <div className="browser-content">
                          <div className="page-header">
                            <h1>Claims Management</h1>
                            <div className="user-info">
                              <PersonIcon />
                              <span>{selectedSessionData.rVisitor}</span>
                            </div>
                          </div>
                          <div className="page-content">
                            <div className="form-section">
                              <h3>Submit New Claim</h3>
                              <div className="form-fields">
                                <div className="field-group">
                                  <label>Claim Type</label>
                                  <select className="form-select">
                                    <option>Medical</option>
                                    <option>Dental</option>
                                    <option>Vision</option>
                                  </select>
                                </div>
                                <div className="field-group">
                                  <label>Provider Name</label>
                                  <input type="text" className="form-input" placeholder="Enter provider name" />
                                </div>
                                <div className="field-group">
                                  <label>Service Date</label>
                                  <input type="date" className="form-input" />
                                </div>
                                <div className="field-group">
                                  <label>Amount</label>
                                  <input type="number" className="form-input" placeholder="$0.00" />
                                </div>
                              </div>
                              <div className="form-actions">
                                <button className="btn-primary">Submit Claim</button>
                                <button className="btn-secondary">Save Draft</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recording-info">
                <div className="info-section">
                  <h3>Session Details</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Session ID:</strong> {selectedSessionData.glassboxSessionId}
                    </div>
                    <div className="info-item">
                      <strong>Duration:</strong> 3m 45s
                    </div>
                    <div className="info-item">
                      <strong>Browser:</strong> {selectedSessionData.browser} {selectedSessionData.browserVersion}
                    </div>
                    <div className="info-item">
                      <strong>IP Address:</strong> {selectedSessionData.ip}
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>User Interactions</h3>
                  <div className="interaction-timeline">
                    <div className="interaction-event">
                      <div className="event-time">00:15</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Page Load</strong>
                        <p>User landed on claims page</p>
                      </div>
                    </div>
                    <div className="interaction-event">
                      <div className="event-time">00:32</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Form Interaction</strong>
                        <p>Started filling claim form</p>
                      </div>
                    </div>
                    <div className="interaction-event">
                      <div className="event-time">01:15</div>
                      <div className="event-dot error"></div>
                      <div className="event-content">
                        <strong>Error Occurred</strong>
                        <p>Form validation failed - {selectedSessionData.errors}</p>
                      </div>
                    </div>
                    <div className="interaction-event">
                      <div className="event-time">01:45</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Multiple Attempts</strong>
                        <p>User tried submitting 3 times</p>
                      </div>
                    </div>
                    <div className="interaction-event">
                      <div className="event-time">02:30</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Page Navigation</strong>
                        <p>Clicked on help section</p>
                      </div>
                    </div>
                    <div className="interaction-event">
                      <div className="event-time">03:45</div>
                      <div className="event-dot"></div>
                      <div className="event-content">
                        <strong>Session End</strong>
                        <p>User left the page</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>AI Analysis</h3>
                  <div className="ai-insights">
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Frustration Detected:</strong> User spent 45 seconds on form validation errors
                      </div>
                    </div>
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Pattern Identified:</strong> Multiple form submission attempts indicate unclear error messaging
                      </div>
                    </div>
                    <div className="insight-item">
                      <AIIcon className="insight-icon" />
                      <div className="insight-text">
                        <strong>Recommendation:</strong> Improve form validation feedback and error descriptions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VoCAnalyzer;
