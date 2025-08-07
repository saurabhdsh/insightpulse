import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import Trends from './components/Trends';
import Features from './components/Features';
import Incidents from './components/Incidents';
import Login from './components/Login';
import AIIdeation from './components/AIIdeation';
import VoCAnalyzer from './components/VoCAnalyzer';
import './App.css';

function RequireAuth({ children }) {
  const loggedIn = localStorage.getItem('insightpulse_logged_in') === 'true';
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/trends" element={<Trends />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/incidents" element={<Incidents />} />
                    <Route path="/ai-ideation" element={<AIIdeation trendData={[{ keyword: 'claims', sentiment: 'negative', frequency: 10 }, { keyword: 'portal', sentiment: 'neutral', frequency: 7 }]} />} />
                    <Route path="/voc-analyzer" element={<VoCAnalyzer />} />
                  </Routes>
                </main>
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
