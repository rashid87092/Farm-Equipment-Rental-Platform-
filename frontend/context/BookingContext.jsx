import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext();

const initialState = {
  bookings: [],
  currentBooking: null,
  availableEquipment: [],
  searchResults: [],
  loading: false,
  error: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false };
    case 'SET_AVAILABLE_EQUIPMENT':
      return { ...state, availableEquipment: action.payload };
    case 'CREATE_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        currentBooking: action.payload,
        loading: false,
      };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id ? action.payload : booking
        ),
      };
    case 'SET_CURRENT_BOOKING':
      return { ...state, currentBooking: action.payload };
    case 'LOAD_USER_BOOKINGS':
      return { ...state, bookings: action.payload, loading: false };
    default:
      return state;
  }
};

// Comprehensive equipment data with detailed descriptions
const mockEquipment = [
  {
    id: 1,
    name: 'John Deere 5055E Tractor',
    type: 'tractor',
    category: 'Tractor',
    owner: 'Rajesh Kumar',
    location: 'Ludhiana, Punjab',
    coordinates: [30.9010, 75.8573],
    pricePerHour: 800,
    pricePerDay: 2500,
    pricePerAcre: 1500,
    rating: 4.8,
    reviews: 24,
    availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
    specifications: {
      horsepower: '55 HP',
      engine: '3-cylinder diesel',
      transmission: '9F/3R',
      fuelCapacity: '120 liters',
      weight: '2800 kg'
    },
    features: ['4WD capability', 'Power steering', 'Comfortable cabin', 'PTO (Power Take-Off)', 'Hydraulic lift'],
    images: ['/images/john_deere.jpg'],
    description: 'Powerful 55 HP tractor perfect for medium-scale farming operations. Features 4WD capability and comfortable cabin with excellent fuel efficiency.',
    available: true
  },
  // (remaining mock items truncated in this copy)
];

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const searchEquipment = async (filters) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let results = mockEquipment;
      
      if (filters.location) {
        results = results.filter(eq => 
          eq.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
      
      if (filters.equipmentType) {
        results = results.filter(eq => eq.type === filters.equipmentType);
      }
      
      if (filters.maxPrice) {
        results = results.filter(eq => eq.pricePerHour <= filters.maxPrice);
      }

      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
      return { success: true, results };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const createBooking = async (bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newBooking = {
        id: Date.now(),
        ...bookingData,
        status: 'pending',
        bookingDate: new Date().toISOString(),
        totalAmount: calculateTotalAmount(bookingData),
      };

      dispatch({ type: 'CREATE_BOOKING', payload: newBooking });
      return { success: true, booking: newBooking };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const updatedBooking = state.bookings.find(b => b.id === bookingId);
      if (updatedBooking) {
        updatedBooking.status = status;
        dispatch({ type: 'UPDATE_BOOKING', payload: updatedBooking });
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loadUserBookings = async (userId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call to load user bookings
      const mockBookings = [
        {
          id: 1,
          equipmentName: 'John Deere 5045D Tractor',
          equipmentType: 'tractor',
          owner: 'Rajesh Kumar',
          startDate: '2024-01-15',
          endDate: '2024-01-16',
          duration: 8,
          area: 5,
          totalAmount: 6000,
          status: 'confirmed',
          bookingDate: '2024-01-10T10:30:00Z',
        }
      ];
      
      dispatch({ type: 'LOAD_USER_BOOKINGS', payload: mockBookings });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const calculateTotalAmount = (bookingData) => {
    const equipment = mockEquipment.find(eq => eq.id === bookingData.equipmentId);
    if (!equipment) return 0;
    
    if (bookingData.pricingType === 'hourly') {
      return equipment.pricePerHour * bookingData.duration;
    } else {
      return equipment.pricePerAcre * bookingData.area;
    }
  };

  const value = {
    ...state,
    searchEquipment,
    createBooking,
    updateBookingStatus,
    loadUserBookings,
    calculateTotalAmount,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
