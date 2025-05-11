// Mock implementation of feature ideas service
export const generateFeatureIdeas = async (responses) => {
  // In a real implementation, this would use AI to generate feature ideas
  // For now, we'll return mock feature ideas
  return [
    {
      id: 'F_1',
      title: 'Performance Optimization',
      description: 'Implement caching and lazy loading for large datasets to improve load times',
      priority: 'high',
      impact: 'Significant improvement in application performance and user experience'
    },
    {
      id: 'F_2',
      title: 'Custom Dashboard Layouts',
      description: 'Allow users to create and save custom dashboard layouts with drag-and-drop functionality',
      priority: 'medium',
      impact: 'Enhanced user productivity and personalization'
    },
    {
      id: 'F_3',
      title: 'Keyboard Shortcuts',
      description: 'Add comprehensive keyboard shortcuts for common actions',
      priority: 'low',
      impact: 'Improved efficiency for power users'
    }
  ];
}; 