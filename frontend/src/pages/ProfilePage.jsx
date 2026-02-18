import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedBackground from '../components/AnimatedBackground';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  CheckCircleIcon,
  TrashIcon,
  KeyIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user, logout, deleteAccount, changePassword, solvedProblems, solvedCount } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const { getProblems } = await import('../api');
      const data = await getProblems();
      setProblems(data);
    } catch (error) {
      console.error('Failed to fetch problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalProblems = problems.length;
  const successRate = user?.totalSubmissions > 0 ? Math.round((solvedCount / user.totalSubmissions) * 100) : 0;

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }

    try {
      changePassword(passwordData.currentPassword, passwordData.newPassword);
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      alert('Password changed successfully!');
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen p-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className={`mb-8 flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50' 
              : 'bg-white/70 border-gray-200/50 text-gray-900 hover:bg-white/90'
          }`}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </motion.button>

        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl backdrop-blur-xl border mb-8 ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}
          >
            <div className="flex items-center space-x-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg`}>
                  {getInitials(user?.name)}
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0"
                  whileHover={{ opacity: 0.3, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              
              <div>
                <motion.h1
                  className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {user?.name}
                </motion.h1>
                <motion.p
                  className={`text-lg mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {user?.email}
                </motion.p>
                <motion.p
                  className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Member since {formatDate(user?.memberSince)}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Problems Solved', value: solvedCount, color: 'from-emerald-500 to-green-600' },
              { label: 'Total Submissions', value: user?.totalSubmissions || 0, color: 'from-blue-500 to-indigo-600' },
              { label: 'Success Rate', value: `${successRate}%`, color: 'from-purple-500 to-pink-600' },
              { label: 'Last Active', value: 'Today', color: 'from-orange-500 to-red-600' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-xl backdrop-blur-xl border ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border-slate-700/50' 
                    : 'bg-white/70 border-gray-200/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solved Problems Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`p-8 rounded-2xl backdrop-blur-xl border mb-8 ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border-slate-700/50' 
                : 'bg-white/70 border-gray-200/50'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Solved Problems ({solvedCount}/{totalProblems})
            </h2>
            
            {/* Progress Bar */}
            <div className={`w-full h-3 rounded-full mb-6 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${(solvedCount / totalProblems) * 100}%` }}
                transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
              />
            </div>

            {/* Solved Problems List */}
            <div className="max-h-60 overflow-y-auto space-y-2">
              {solvedProblems.length > 0 ? (
                solvedProblems.map((problemId, index) => (
                  <motion.div
                    key={problemId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50/70'
                    }`}
                  >
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    <span className={`capitalize ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {problemId.replace(/-/g, ' ')}
                    </span>
                  </motion.div>
                ))
              ) : (
                <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  No problems solved yet. Start coding!
                </div>
              )}
            </div>
          </motion.div>

          {/* Account Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <motion.button
              onClick={() => setShowPasswordModal(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-all duration-300"
            >
              <KeyIcon className="w-5 h-5" />
              <span>Change Password</span>
            </motion.button>

            <motion.button
              onClick={logout}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(107, 114, 128, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center space-x-2 p-4 rounded-xl font-medium transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>

            <motion.button
              onClick={() => setShowDeleteModal(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 p-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium transition-all duration-300"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Delete Account</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`p-8 rounded-2xl backdrop-blur-xl border max-w-md w-full ${
              theme === 'dark' 
                ? 'bg-slate-800/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <KeyIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Change Password
              </h3>
            </div>
            
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className={`w-full p-3 rounded-xl border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className={`w-full p-3 rounded-xl border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className={`w-full p-3 rounded-xl border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  required
                />
              </div>
              
              {passwordError && (
                <div className="text-red-500 text-sm text-center">
                  {passwordError}
                </div>
              )}
              
              <div className="flex space-x-4 pt-4">
                <motion.button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-all duration-300"
                >
                  Change Password
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`p-8 rounded-2xl backdrop-blur-xl border max-w-md w-full ${
              theme === 'dark' 
                ? 'bg-slate-800/90 border-slate-700/50' 
                : 'bg-white/90 border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <TrashIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Delete Account
              </h3>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-slate-700 text-white hover:bg-slate-600' 
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDeleteAccount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium transition-all duration-300"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;