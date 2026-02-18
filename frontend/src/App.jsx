import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Navbar from './components/Navbar';
import ProfessionalFooter from './components/ProfessionalFooter';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import JudgePage from './pages/JudgePage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';

function AppContent() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  const isJudgePage = location.pathname === '/judge';
  const isProblemPage = location.pathname.startsWith('/problem');
  const isProfilePage = location.pathname === '/profile';
  
  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isAuthPage, navigate]);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'
    }`}>
      {!isJudgePage && !isProblemPage && !isAuthPage && !isProfilePage && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/" 
          element={
            <div className="pt-20">
              <LandingPage />
              <ProfessionalFooter />
            </div>
          } 
        />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <div className="pt-20">
                <ProblemsPage />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/problems" 
          element={
            <ProtectedRoute>
              <div className="pt-20">
                <ProblemsPage />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/problem/:problemId" 
          element={
            <ProtectedRoute>
              <ProblemDetailPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/judge" 
          element={
            <ProtectedRoute>
              <JudgePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;