
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  userName: string;
  userRole: 'free' | 'subscriber' | 'admin';
  login: (name: string, role: 'free' | 'subscriber' | 'admin') => void;
  logout: () => void;
  remainingCases: number;
  decrementRemainingCases: () => void;
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  userName: '',
  userRole: 'free',
  login: () => {},
  logout: () => {},
  remainingCases: 0,
  decrementRemainingCases: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'free' | 'subscriber' | 'admin'>('free');
  const [remainingCases, setRemainingCases] = useState(1); // Default for free users
  
  useEffect(() => {
    // Check local storage on component mount
    const loggedIn = localStorage.getItem('userIsLoggedIn') === 'true';
    const storedName = localStorage.getItem('userName') || '';
    const storedRole = localStorage.getItem('userRole') as 'free' | 'subscriber' | 'admin' || 'free';
    
    setIsLoggedIn(loggedIn);
    setUserName(storedName);
    setUserRole(storedRole);
    
    // Set remaining cases based on role
    setRemainingCases(storedRole === 'free' ? 1 : Infinity);
  }, []);
  
  const login = (name: string, role: 'free' | 'subscriber' | 'admin') => {
    localStorage.setItem('userIsLoggedIn', 'true');
    localStorage.setItem('userName', name);
    localStorage.setItem('userRole', role);
    
    setIsLoggedIn(true);
    setUserName(name);
    setUserRole(role);
    setRemainingCases(role === 'free' ? 1 : Infinity);
  };
  
  const logout = () => {
    localStorage.removeItem('userIsLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('free');
    setRemainingCases(1);
  };
  
  const decrementRemainingCases = () => {
    if (userRole === 'free' && remainingCases > 0) {
      setRemainingCases(prevCount => prevCount - 1);
    }
  };
  
  const value = {
    isLoggedIn,
    userName,
    userRole,
    login,
    logout,
    remainingCases,
    decrementRemainingCases,
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
