import React from 'react';

export default function FeatureCard({ title, description, priority, feedbackCount }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-500 flex flex-col gap-3 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${priorityColors[priority] || 'bg-gray-100 text-gray-700'}`}>{priority} priority</span>
        <span className="text-xs text-gray-500">{feedbackCount} feedbacks</span>
      </div>
      <div className="text-lg font-bold text-gray-800 mb-1">{title}</div>
      <div className="text-gray-600 text-sm">{description}</div>
    </div>
  );
} 