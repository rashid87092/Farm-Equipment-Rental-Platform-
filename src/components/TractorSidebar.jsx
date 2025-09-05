import React from 'react';
import { motion } from 'framer-motion';

const TractorSidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        className="tractor-section fixed right-0 top-0 h-full w-1/3 z-40 hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main tractor image */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/tractor-field.jpg"
            alt="Real tractor ploughing field - Professional farming equipment in action"
            className="h-full w-full object-cover filter brightness-110 contrast-105"
            loading="lazy"
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/30"></div>
          
          {/* Floating info card */}
          <motion.div
            className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-lg font-bold text-green-800 mb-2">🚜 Real Farming Action</h3>
            <p className="text-sm text-gray-700">
              Experience authentic farming with professional-grade tractors working in real paddy fields.
            </p>
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center text-xs text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Live Equipment
              </div>
              <div className="text-xs text-gray-600">📍 Rice Field, India</div>
            </div>
          </motion.div>

          {/* Animated indicators */}
          <motion.div
            className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌾 Active Farming
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Version - Shows below main content */}
      <motion.div 
        className="lg:hidden mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold text-green-800 mb-4 text-center">
            🚜 Real Farming in Action
          </h3>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
            <img
              src="/images/tractor-field.jpg"
              alt="Real tractor ploughing field - Professional farming equipment in action"
              className="h-full w-full object-cover filter brightness-110 contrast-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm font-semibold">
                🌾 Professional farming equipment working in authentic rice fields
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TractorSidebar;
