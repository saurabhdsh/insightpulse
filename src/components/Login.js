import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGO = (
  <svg width="56" height="56" viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="192" height="192" rx="48" fill="url(#paint0_linear)"/>
    <g filter="url(#glow)">
      <ellipse cx="96" cy="90" rx="44" ry="48" fill="#fffde7"/>
      <ellipse cx="96" cy="90" rx="36" ry="40" fill="#fff9c4"/>
      <ellipse cx="96" cy="90" rx="28" ry="32" fill="#ffe082"/>
    </g>
    <rect x="80" y="130" width="32" height="18" rx="8" fill="#ffd54f"/>
    <rect x="88" y="148" width="16" height="12" rx="6" fill="#ffb300"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#f472b6"/>
      </linearGradient>
      <filter id="glow" x="32" y="30" width="128" height="120" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="8" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'saurabh' && password === 'admin123') {
      localStorage.setItem('insightpulse_logged_in', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center animate-fade-in">
        <div className="mb-6">{LOGO}</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">InsightPulse</h1>
        <p className="text-gray-500 mb-8 text-center">Sign in to your account</p>
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
          <input
            className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className="rounded-lg border border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
          >
            Login
          </button>
        </form>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.68,-0.55,0.27,1.55);
        }
      `}</style>
    </div>
  );
} 