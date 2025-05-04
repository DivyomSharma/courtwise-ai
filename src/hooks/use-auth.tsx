
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

export function useRequireAuth(redirectTo: string = '/auth') {
  const { isLoggedIn, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      // Save the current location so we can redirect back after login
      navigate(redirectTo, { state: { from: location } });
    }
  }, [isLoggedIn, loading, navigate, location, redirectTo]);

  return { isLoggedIn, loading };
}

export function useRequireAdmin(redirectTo: string = '/') {
  const { isLoggedIn, userRole, loading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate('/auth');
      } else if (userRole !== 'admin') {
        navigate(redirectTo);
      }
    }
  }, [isLoggedIn, userRole, loading, navigate, redirectTo]);

  return { isAdmin: userRole === 'admin', loading };
}

export function useRedirectIfAuthenticated(redirectTo: string = '/') {
  const { isLoggedIn, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      // Redirect to the intended destination or the default
      const from = location.state?.from?.pathname || redirectTo;
      navigate(from);
    }
  }, [isLoggedIn, loading, navigate, location, redirectTo]);

  return { isLoggedIn, loading };
}
