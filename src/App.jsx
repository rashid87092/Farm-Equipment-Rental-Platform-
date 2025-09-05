import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import MainPage from './pages/MainPage';
import Dashboard from './pages/Dashboard';
import BookingSystem from './pages/BookingSystem';
import EquipmentListing from './pages/EquipmentListing';
import EquipmentBrowse from './pages/EquipmentBrowse';
import Profile from './pages/Profile';
import LoadingScreen from './components/ui/LoadingScreen';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-gradient-to-br from-primary-50 to-earth-50">
              <Header />
              <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen pt-16"
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/booking" element={<BookingSystem />} />
                  <Route path="/equipment" element={<EquipmentListing />} />
                  <Route path="/browse" element={<EquipmentBrowse />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </motion.main>
              <Footer />
            </div>
          </NotificationProvider>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
