import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';

const AuthInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userJson = localStorage.getItem('user');

    if (accessToken && userJson) {
      try {
        const user = JSON.parse(userJson);
        dispatch(setCredentials({ user, token: accessToken }));
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
        // Clear invalid data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  // This component doesn't render any UI, it just runs the effect
  return null;
};

export default AuthInitializer; 