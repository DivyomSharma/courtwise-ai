
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'free' | 'subscriber' | 'admin';
}

interface UserContextType {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: 'free' | 'subscriber' | 'admin';
  userName: string;  // Added userName property
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role: 'free' | 'subscriber' | 'admin') => Promise<void>;
  logout: () => Promise<void>;
  remainingCases: number;
  decrementRemainingCases: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  user: null,
  session: null,
  profile: null,
  userRole: 'free',
  userName: 'Guest User', // Default value for userName
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  remainingCases: 0,
  decrementRemainingCases: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'free' | 'subscriber' | 'admin'>('free');
  const [userName, setUserName] = useState<string>('Guest User'); // Initialize userName state
  const [remainingCases, setRemainingCases] = useState(1);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Initialize user session
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoggedIn(!!currentSession);

        // Fetch user profile on auth state change
        if (currentSession?.user) {
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserRole('free');
          setRemainingCases(1);
          setUserName('Guest User'); // Reset userName when logged out
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoggedIn(!!currentSession);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
        return;
      }
      
      if (data) {
        setProfile(data as UserProfile);
        setUserRole(data.role as 'free' | 'subscriber' | 'admin');
        
        // Set userName based on profile data
        setUserName(data.full_name || data.username || 'User');
        
        // Set remaining cases based on role
        if (data.role === 'free') {
          fetchDailyUsage(userId);
        } else {
          setRemainingCases(Infinity);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setLoading(false);
    }
  };
  
  // Get daily usage for free users
  const fetchDailyUsage = async (userId: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('user_usage')
        .select('cases_viewed')
        .eq('user_id', userId)
        .eq('usage_date', today)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching usage:', error);
        return;
      }
      
      if (data) {
        // Free users get 1 case per day
        setRemainingCases(Math.max(0, 1 - data.cases_viewed));
      } else {
        // No usage record for today yet
        setRemainingCases(1);
      }
    } catch (error) {
      console.error('Usage fetch error:', error);
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Welcome back",
        description: "You have successfully logged in",
      });
      
      // Auth state change will handle session update
    } catch (error: any) {
      toast({
        title: "Login error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const signup = async (email: string, password: string, fullName: string, role: 'free' | 'subscriber' | 'admin') => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Account created",
        description: "Welcome to Courtwise AI",
      });
      
      // Auth state change will handle session update
    } catch (error: any) {
      toast({
        title: "Signup error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      // Auth state change will handle session cleanup
    } catch (error: any) {
      toast({
        title: "Logout error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    }
  };
  
  const decrementRemainingCases = async () => {
    if (!user || userRole !== 'free' || remainingCases <= 0) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Check if there's an existing usage record for today
      const { data: existingData } = await supabase
        .from('user_usage')
        .select('id, cases_viewed')
        .eq('user_id', user.id)
        .eq('usage_date', today)
        .maybeSingle();
      
      if (existingData) {
        // Update existing record
        await supabase
          .from('user_usage')
          .update({ cases_viewed: existingData.cases_viewed + 1 })
          .eq('id', existingData.id);
      } else {
        // Insert new record
        await supabase
          .from('user_usage')
          .insert({ user_id: user.id, usage_date: today, cases_viewed: 1 });
      }
      
      // Update local state
      setRemainingCases(prevCount => Math.max(0, prevCount - 1));
    } catch (error) {
      console.error('Error updating usage:', error);
    }
  };
  
  const value = {
    isLoggedIn,
    user,
    session,
    profile,
    userRole,
    userName, // Expose userName in the context
    login,
    signup,
    logout,
    remainingCases,
    decrementRemainingCases,
    loading
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
