import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Tractor, 
  Search, 
  Bell, 
  User,
  MapPin,
  Languages
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', label_hi: 'होम' },
    { path: '/main', label: 'Main Demo', label_hi: 'मुख्य डेमो' },
    { path: '/equipment', label: 'Equipment', label_hi: 'उपकरण' },
    { path: '/booking', label: 'Book Now', label_hi: 'बुक करें' },
    { path: '/dashboard', label: 'Dashboard', label_hi: 'डैशबोर्ड' },
    { path: '/profile', label: 'Profile', label_hi: 'प्रोफाइल' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-wheat-50/95 backdrop-blur-md shadow-lg border-b border-sage-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <Tractor className="w-8 h-8 text-forest-700" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-wheat-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-forest-700 to-earth-600 bg-clip-text text-transparent">
                {language === 'en' ? 'FarmRent' : 'फार्मरेंट'}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-forest-700'
                    : 'text-sage-700 hover:text-forest-600'
                }`}
              >
                {language === 'en' ? item.label : item.label_hi}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-600"
                    layoutId="underline"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Search, Language, Notifications, and Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              onClick={toggleSearch}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Toggle Language"
            >
              <Languages className="w-5 h-5" />
              <span className="ml-1 text-xs font-semibold">{language.toUpperCase()}</span>
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </motion.button>

            {/* Profile */}
            <Link to="/profile">
              <motion.div
                className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="w-5 h-5 text-primary-600" />
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 py-4"
            >
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={language === 'en' ? "Search equipment, location..." : "उपकरण, स्थान खोजें..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                    autoFocus
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {language === 'en' ? 'Search' : 'खोजें'}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  }`}
                >
                  {language === 'en' ? item.label : item.label_hi}
                </Link>
              ))}
              
              {/* Mobile-only items */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={toggleSearch}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Search className="w-5 h-5" />
                  <span>{language === 'en' ? 'Search' : 'खोजें'}</span>
                </button>
                
                <button
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Languages className="w-5 h-5" />
                  <span>{language === 'en' ? `Language: ${language.toUpperCase()}` : `भाषा: ${language.toUpperCase()}`}</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
