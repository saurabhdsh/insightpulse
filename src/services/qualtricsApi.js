// Mock implementation of Qualtrics API service
export const fetchQualtricsResponses = async () => {
  // In a real implementation, this would make an API call to Qualtrics
  // For now, we'll return mock data
  return [
    {
      id: 'R_1',
      timestamp: '2024-03-20T10:00:00Z',
      feedback: 'The application is very slow when loading large datasets. It takes more than 30 seconds to load a 1000-row table.',
      sentiment: 'negative',
      category: 'performance'
    },
    // Add more mock responses as needed
  ];
};

export const streamQualtricsResponses = (callback) => {
  // Simulate real-time streaming of responses
  setInterval(() => {
    const mockResponse = {
      id: `R_${Date.now()}`,
      timestamp: new Date().toISOString(),
      feedback: 'New feedback received',
      sentiment: 'positive',
      category: 'feature'
    };
    callback(mockResponse);
  }, 5000); // Stream every 5 seconds
}; 