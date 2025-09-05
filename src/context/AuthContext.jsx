import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  userType: null, // 'farmer' or 'owner'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        userType: null,
        isAuthenticated: false,
        loading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing auth token/session
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: user.profile, userType: user.type }
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials, userType) => {
    dispatch({ type: 'LOADING' });
    try {
      // Simulate API call
      const mockUser = {
        id: Date.now(),
        name: credentials.name || 'John Farmer',
        email: credentials.email,
        phone: credentials.phone || '+91 9876543210',
        location: credentials.location || 'Punjab, India',
        avatar: null,
        joinedDate: new Date().toISOString(),
        rating: userType === 'owner' ? 4.8 : null,
        totalBookings: userType === 'farmer' ? 12 : null,
        equipmentListed: userType === 'owner' ? 5 : null,
      };

      // Store in localStorage (in real app, this would be handled by backend)
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userData', JSON.stringify({ 
        profile: mockUser, 
        type: userType 
      }));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: mockUser, userType }
      });

      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...state.user, ...profileData };
    localStorage.setItem('userData', JSON.stringify({
      profile: updatedUser,
      type: state.userType
    }));
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const value = {
    ...state,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
