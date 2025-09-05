import React from 'react';
import { motion } from 'framer-motion';
import { Tractor, Wheat, Sprout } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-earth-50 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-24 h-24 mx-auto mb-4 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Tractor className="w-24 h-24 text-primary-600" />
            </motion.div>
            
            {/* Animated dots around tractor */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-earth-500 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, delay: i * 0.2 },
                  }}
                  initial={{
                    rotate: i * 45,
                    x: 40,
                    y: -1,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-earth-600 bg-clip-text text-transparent"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          FarmRent
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-xl text-gray-600 mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Connecting Farmers with Equipment Owners
        </motion.p>

        {/* Feature Icons */}
        <motion.div
          className="flex justify-center space-x-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[
            { icon: Tractor, label: 'Equipment', delay: 0 },
            { icon: Wheat, label: 'Farming', delay: 0.2 },
            { icon: Sprout, label: 'Growth', delay: 0.4 },
          ].map(({ icon: Icon, label, delay }) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 + delay, duration: 0.6 }}
            >
              <motion.div
                className="w-12 h-12 mx-auto mb-2 text-primary-600"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: delay 
                }}
              >
                <Icon className="w-12 h-12" />
              </motion.div>
              <span className="text-sm text-gray-500 font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-earth-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Preparing your farming experience...
          </motion.span>
        </motion.div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-300 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [-10, 10, -10],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
          
          {/* Animated tractor path */}
          <motion.div
            className="absolute bottom-10 left-0 w-full h-8 opacity-20"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Tractor className="w-8 h-8 text-earth-600" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
