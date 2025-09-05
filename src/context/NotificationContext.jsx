import React, { createContext, useContext, useReducer, useEffect } from 'react';

const NotificationContext = createContext();

const initialState = {
  notifications: [],
  unreadCount: 0,
  isConnected: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0,
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
        unreadCount: state.unreadCount - (
          state.notifications.find(n => n.id === action.payload && !n.read) ? 1 : 0
        ),
      };
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };
    case 'LOAD_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload,
        unreadCount: action.payload.filter(n => !n.read).length,
      };
    default:
      return state;
  }
};

const notificationTypes = {
  BOOKING_CONFIRMED: {
    icon: '✅',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  BOOKING_CANCELLED: {
    icon: '❌',
    color: 'text-red-600',
    bg: 'bg-red-100',
  },
  BOOKING_REQUEST: {
    icon: '📝',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
  PAYMENT_RECEIVED: {
    icon: '💰',
    color: 'text-green-600',
    bg: 'bg-green-100',
  },
  EQUIPMENT_REMINDER: {
    icon: '🚜',
    color: 'text-orange-600',
    bg: 'bg-orange-100',
  },
  WEATHER_ALERT: {
    icon: '🌦️',
    color: 'text-yellow-600',
    bg: 'bg-yellow-100',
  },
  SYSTEM: {
    icon: '🔔',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
  },
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  useEffect(() => {
    // Load existing notifications from localStorage
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        const notifications = JSON.parse(savedNotifications);
        dispatch({ type: 'LOAD_NOTIFICATIONS', payload: notifications });
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    }

    // Simulate real-time connection (in real app, this would be WebSocket/Socket.io)
    simulateRealTimeConnection();
  }, []);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem('notifications', JSON.stringify(state.notifications));
  }, [state.notifications]);

  const simulateRealTimeConnection = () => {
    dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
    
    // Simulate incoming notifications
    const mockNotifications = [
      {
        type: 'BOOKING_CONFIRMED',
        title: 'Booking Confirmed',
        message: 'Your booking for John Deere Tractor has been confirmed for Jan 15, 2024',
        timestamp: new Date().toISOString(),
      },
      {
        type: 'WEATHER_ALERT',
        title: 'Weather Alert',
        message: 'Heavy rain expected in your area. Consider rescheduling outdoor activities.',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
    ];

    // Add mock notifications after a delay
    setTimeout(() => {
      mockNotifications.forEach((notification, index) => {
        setTimeout(() => {
          addNotification(notification);
        }, index * 5000);
      });
    }, 3000);
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      ...notification,
      read: false,
      timestamp: notification.timestamp || new Date().toISOString(),
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

    // Show browser notification if supported and permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/farm-icon.svg',
      });
    }
  };

  const markAsRead = (notificationId) => {
    dispatch({ type: 'MARK_AS_READ', payload: notificationId });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: notificationId });
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  // Helper function to send booking-related notifications
  const sendBookingNotification = (type, bookingData) => {
    const notifications = {
      confirmed: {
        type: 'BOOKING_CONFIRMED',
        title: 'Booking Confirmed! 🎉',
        message: `Your booking for ${bookingData.equipmentName} has been confirmed for ${bookingData.date}`,
      },
      cancelled: {
        type: 'BOOKING_CANCELLED',
        title: 'Booking Cancelled',
        message: `Your booking for ${bookingData.equipmentName} has been cancelled`,
      },
      request: {
        type: 'BOOKING_REQUEST',
        title: 'New Booking Request',
        message: `You have a new booking request for ${bookingData.equipmentName}`,
      },
      payment: {
        type: 'PAYMENT_RECEIVED',
        title: 'Payment Received',
        message: `Payment of ₹${bookingData.amount} has been received for your equipment`,
      },
    };

    const notification = notifications[type];
    if (notification) {
      addNotification(notification);
    }
  };

  // Helper function to send weather alerts
  const sendWeatherAlert = (weatherData) => {
    addNotification({
      type: 'WEATHER_ALERT',
      title: 'Weather Alert',
      message: weatherData.message,
    });
  };

  const value = {
    ...state,
    notificationTypes,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    requestNotificationPermission,
    sendBookingNotification,
    sendWeatherAlert,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
