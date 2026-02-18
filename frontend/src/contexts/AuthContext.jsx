import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [solvedProblems, setSolvedProblems] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser).solvedProblems || [] : [];
  });

  const updateUserData = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === userData.email);
    if (userIndex !== -1) {
      users[userIndex] = userData;
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const signup = (userData) => {
    const { name, email, password, confirmPassword } = userData;
    
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (existingUsers.find(user => user.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = { 
      name, 
      email, 
      password, 
      solvedProblems: [],
      memberSince: new Date().toISOString(),
      totalSubmissions: 0
    };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    return true;
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    if (!foundUser.solvedProblems) foundUser.solvedProblems = [];
    if (!foundUser.memberSince) foundUser.memberSince = new Date().toISOString();
    if (!foundUser.totalSubmissions) foundUser.totalSubmissions = 0;

    const userData = { 
      name: foundUser.name, 
      email: foundUser.email,
      solvedProblems: foundUser.solvedProblems,
      memberSince: foundUser.memberSince,
      totalSubmissions: foundUser.totalSubmissions
    };
    
    setUser(userData);
    setSolvedProblems(foundUser.solvedProblems);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    updateUserData(foundUser);
    return true;
  };

  const addSolvedProblem = (problemId) => {
    if (!user || solvedProblems.includes(problemId)) return;
    
    const newSolved = [...solvedProblems, problemId];
    const updatedUser = { 
      ...user, 
      solvedProblems: newSolved,
      totalSubmissions: (user.totalSubmissions || 0) + 1
    };
    
    setSolvedProblems(newSolved);
    setUser(updatedUser);
    updateUserData(updatedUser);
  };

  const isSolved = (problemId) => {
    return solvedProblems.includes(problemId);
  };

  const deleteAccount = () => {
    if (!user) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.email !== user.email);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    
    setUser(null);
    setSolvedProblems([]);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === user.email);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    if (users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setSolvedProblems([]);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    signup,
    deleteAccount,
    changePassword,
    solvedProblems,
    solvedCount: solvedProblems.length,
    addSolvedProblem,
    isSolved
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};