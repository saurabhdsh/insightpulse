import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Feedback from './components/Feedback';
import Trends from './components/Trends';
import Features from './components/Features';
import Incidents from './components/Incidents';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/features" element={<Features />} />
            <Route path="/incidents" element={<Incidents />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
