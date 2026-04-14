import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const UserDropdown = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  if (!user) return null;

  return (
    <motion.button
      onClick={handleProfileClick}
      className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
      whileTap={{ scale: 0.95 }}
    >
      {user.name.charAt(0).toUpperCase()}
    </motion.button>
  );
};

export default UserDropdown;