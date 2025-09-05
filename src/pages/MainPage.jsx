import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left colorful section */}
      <motion.div 
        className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-white p-10 relative overflow-hidden"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating circles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${50 + i * 20}px`,
                height: `${50 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Animated farm icons */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-4xl opacity-20"
              style={{
                left: `${20 + i * 15}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 1.2,
              }}
            >
              {i % 3 === 0 && '🌾'}
              {i % 3 === 1 && '🚜'}
              {i % 3 === 2 && '🌱'}
            </motion.div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-2xl">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block text-white drop-shadow-lg">Welcome to</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent text-6xl md:text-7xl lg:text-8xl font-extrabold drop-shadow-2xl">
              Farm Rentals
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl max-w-lg mx-auto text-center mb-8 text-blue-100 leading-relaxed font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            🌾 Rent modern farming equipment easily. Affordable, reliable, and accessible for every farmer.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <Link to="/equipment">
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-white to-gray-100 text-gray-800 rounded-2xl shadow-2xl hover:shadow-3xl font-bold text-lg flex items-center space-x-2 border-2 border-white/20"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  background: "linear-gradient(to right, #fbbf24, #f59e0b)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>🚜 Get Started</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>

            <Link to="/booking">
              <motion.button 
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-2xl hover:shadow-3xl font-bold text-lg flex items-center space-x-2 border-2 border-white/30"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  background: "linear-gradient(to right, #ef4444, #dc2626)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span>🌾 Book Now</span>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚡
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { number: '50K+', label: 'Happy Farmers', icon: '👨‍🌾' },
              { number: '10K+', label: 'Equipment', icon: '🚜' },
              { number: '25+', label: 'States', icon: '📍' },
              { number: '4.8★', label: 'Rating', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255,255,255,0.3)",
                  y: -5
                }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.2)', 
                    '0 0 30px rgba(255,255,255,0.4)', 
                    '0 0 20px rgba(255,255,255,0.2)'
                  ]
                }}
                transition={{ 
                  boxShadow: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                  hover: { duration: 0.2 }
                }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <motion.div
                  className="text-xl md:text-2xl font-bold mb-1 text-yellow-300"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator for mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm mb-2">Swipe up for more</span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right tractor video section - Hidden on mobile */}
      <motion.div 
        className="w-1/3 hidden md:block relative overflow-hidden"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        {/* Video with animated fallback */}
        <div className="relative h-full w-full">
          {/* Actual video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="h-full w-full object-cover relative z-10"
            style={{ filter: 'brightness(1.1) contrast(1.1) saturate(1.2)' }}
            onError={(e) => {
              console.log('Video failed, showing animated fallback');
              e.target.style.display = 'none';
            }}
          >
            <source src="/tractor-video.mp4" type="video/mp4" />
          </video>

          {/* Animated background fallback */}
          <div className="absolute inset-0 h-full w-full overflow-hidden">
            {/* Base farm image */}
            <div 
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(/images/tractor-field.jpg)',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.2)'
              }}
            />
            
            {/* Animated overlay to simulate movement */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"
              animate={{
                x: [-100, 800],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating dust particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300/60 rounded-full blur-sm"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${60 + (i % 3) * 10}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        {/* Video overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none">
          <motion.div
            className="absolute bottom-6 left-6 right-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                🎥 <span className="ml-2">Live Farming Action</span>
              </h3>
              <p className="text-sm text-gray-200">
                Watch professional tractors in action on real farms
              </p>
              <motion.div
                className="mt-2 flex items-center text-green-400 text-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                LIVE
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Video loading fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
          <motion.div
            className="text-white text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="text-4xl mb-4">🚜</div>
            <p>Loading farming video...</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
