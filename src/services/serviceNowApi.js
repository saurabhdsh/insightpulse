// Mock implementation of ServiceNow API service
export const createIncident = async (incident) => {
  // In a real implementation, this would create an incident in ServiceNow
  // For now, we'll return a mock success response
  return {
    success: true,
    incidentId: `INC${Date.now()}`,
    message: 'Incident created successfully'
  };
};

export const detectIncidents = async (responses) => {
  // In a real implementation, this would analyze responses for potential incidents
  // For now, we'll return mock incidents
  return [
    {
      id: 'I_1',
      title: 'Application Crash on Large File Export',
      description: 'Users reporting application crashes when exporting large PDF reports',
      priority: 'high',
      impact: 'Data loss and user productivity impact'
    },
    {
      id: 'I_2',
      title: 'Search Functionality Issues',
      description: 'Search results are not relevant to query terms',
      priority: 'medium',
      impact: 'Reduced user efficiency in finding information'
    },
    {
      id: 'I_3',
      title: 'Claims Processing Delay',
      description: 'Significant delays in claims processing for outpatient procedures reported by multiple providers.',
      priority: 'high',
      impact: 'Provider dissatisfaction and delayed reimbursements'
    },
    {
      id: 'I_4',
      title: 'Eligibility Verification Timeout',
      description: 'Eligibility verification is timing out during peak hours, affecting patient intake.',
      priority: 'medium',
      impact: 'Patient onboarding delays and increased support calls'
    },
    {
      id: 'I_5',
      title: 'Authorization Request Stuck',
      description: 'Prior authorization requests are getting stuck in pending status for over 48 hours.',
      priority: 'high',
      impact: 'Delayed care and increased provider frustration'
    },
    {
      id: 'I_6',
      title: 'Denial Code Mapping Error',
      description: 'Denial reason codes are not mapping correctly to documentation, causing confusion.',
      priority: 'low',
      impact: 'Manual intervention required for claims resolution'
    },
    {
      id: 'I_7',
      title: 'System Performance Degradation',
      description: 'System response times have degraded by 30% after the last update.',
      priority: 'medium',
      impact: 'Slower workflows and increased user complaints'
    },
    {
      id: 'I_8',
      title: 'Duplicate Claim Detection False Positives',
      description: 'Duplicate claim detection is flagging too many legitimate claims.',
      priority: 'low',
      impact: 'Increased manual review workload'
    }
  ];
}; 