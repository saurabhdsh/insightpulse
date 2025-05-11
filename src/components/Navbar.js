import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon,
  Feedback as FeedbackIcon,
  TrendingUp as TrendsIcon,
  Stars as FeaturesIcon,
  Warning as IncidentsIcon,
  AutoGraph as AnalyticsIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient"></div>
                  <div className="relative bg-gray-900 rounded-lg p-1">
                    <LightbulbIcon className="text-yellow-400 text-2xl" />
                  </div>
                </div>
                <div className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x bg-300% text-xl font-bold">
                    InsightPulse
                  </span>
                  <style jsx>{`
                    @keyframes gradient-x {
                      0% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                      100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-x {
                      animation: gradient-x 8s ease infinite;
                    }
                    .bg-300% {
                      background-size: 300% 300%;
                    }
                  `}</style>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink 
              to="/feedback" 
              className={({ isActive }) => 
                `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <FeedbackIcon className="text-lg" />
              <span>Feedback</span>
            </NavLink>
            <NavLink 
              to="/incidents" 
              className={({ isActive }) => 
                `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <IncidentsIcon className="text-lg" />
              <span>AI Incident Management</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 