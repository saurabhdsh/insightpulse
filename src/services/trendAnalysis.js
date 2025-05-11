// Mock implementation of trend analysis service
export const analyzeTrends = async (responses) => {
  // In a real implementation, this would perform actual trend analysis
  // For now, we'll return mock analysis data
  return {
    sentimentDistribution: {
      positive: 40,
      negative: 30,
      neutral: 30
    },
    categoryDistribution: {
      performance: 25,
      ui: 20,
      feature: 15,
      bug: 20,
      other: 20
    },
    topKeywords: [
      { word: 'performance', count: 15 },
      { word: 'interface', count: 12 },
      { word: 'bug', count: 10 },
      { word: 'feature', count: 8 },
      { word: 'slow', count: 7 }
    ]
  };
}; 