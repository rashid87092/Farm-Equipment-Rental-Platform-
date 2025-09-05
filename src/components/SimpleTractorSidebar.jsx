import React from 'react';
import { motion } from 'framer-motion';

// Alternative implementation as requested in the user prompt
export default function TractorSidebar() {
  return (
    <div className="tractor-section fixed right-0 top-0 h-full w-1/3 hidden lg:block z-40">
      <img
        src="/images/tractor-field.jpg"
        alt="Tractor ploughing field"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

// Enhanced responsive version with animations
export function EnhancedTractorSidebar() {
  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <motion.div 
        className="tractor-section fixed right-0 top-0 h-full w-1/3 z-40 hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/images/tractor-field.jpg"
            alt="Real tractor ploughing field - Professional farming equipment in action"
            className="h-full w-full object-cover filter brightness-110 contrast-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/30"></div>
          
          <motion.div
            className="absolute bottom-8 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-lg font-bold text-green-800 mb-2">🚜 Real Farming Action</h3>
            <p className="text-sm text-gray-700">
              Professional tractors working in authentic rice fields
            </p>
          </motion.div>

          <motion.div
            className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌾 Live
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Version */}
      <div className="lg:hidden">
        <motion.div 
          className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-xl mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <img
            src="/images/tractor-field.jpg"
            alt="Real tractor ploughing field"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="text-sm font-semibold">
              🌾 Authentic farming operations in rice fields
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
