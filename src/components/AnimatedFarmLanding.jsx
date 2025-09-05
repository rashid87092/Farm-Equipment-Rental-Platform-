import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tractor, MapPin, Phone, Mail } from 'lucide-react';

const AnimatedFarmLanding = () => {
  const [ploughMarks, setPloughMarks] = useState([]);

  useEffect(() => {
    // Generate plough marks as tractor moves
    const interval = setInterval(() => {
      const newMark = {
        id: Date.now(),
        left: Math.random() * 80 + 10, // Random position from 10% to 90%
      };
      
      setPloughMarks(prev => [...prev, newMark]);
      
      // Clean up old marks
      setTimeout(() => {
        setPloughMarks(prev => prev.filter(mark => mark.id !== newMark.id));
      }, 12000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-green-200"></div>
      
      {/* Sun */}
      <motion.div 
        className="absolute top-12 right-12 w-20 h-20 bg-yellow-400 rounded-full shadow-2xl"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="absolute inset-2 bg-yellow-300 rounded-full opacity-70"></div>
      </motion.div>

      {/* Clouds */}
      <motion.div 
        className="absolute top-16 w-24 h-10 bg-white rounded-full opacity-80"
        animate={{ x: [-100, window.innerWidth + 100] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-3 left-3 w-12 h-8 bg-white rounded-full"></div>
        <div className="absolute -top-2 right-4 w-14 h-9 bg-white rounded-full"></div>
      </motion.div>

      <motion.div 
        className="absolute top-24 w-20 h-8 bg-white rounded-full opacity-70"
        animate={{ x: [-80, window.innerWidth + 80] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
      >
        <div className="absolute -top-2 left-2 w-10 h-6 bg-white rounded-full"></div>
        <div className="absolute -top-1 right-3 w-12 h-7 bg-white rounded-full"></div>
      </motion.div>

      <motion.div 
        className="absolute top-20 w-28 h-12 bg-white rounded-full opacity-85"
        animate={{ x: [-120, window.innerWidth + 120] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 10 }}
      >
        <div className="absolute -top-4 left-4 w-14 h-10 bg-white rounded-full"></div>
        <div className="absolute -top-3 right-5 w-16 h-11 bg-white rounded-full"></div>
      </motion.div>

      {/* Birds */}
      <motion.div 
        className="absolute top-16 text-2xl text-gray-700"
        animate={{ 
          x: [-50, window.innerWidth + 50],
          y: [0, -10, 5, -5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        🐦
      </motion.div>

      <motion.div 
        className="absolute top-28 text-lg text-gray-600"
        animate={{ 
          x: [-30, window.innerWidth + 30],
          y: [-10, 5, -15, 10, -5]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "linear",
          delay: 3
        }}
      >
        🐦
      </motion.div>

      <motion.div 
        className="absolute top-20 text-xl text-gray-800"
        animate={{ 
          x: [-40, window.innerWidth + 40],
          y: [5, -8, 12, -3, 7]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          delay: 6
        }}
      >
        🐦
      </motion.div>

      {/* Farm Field */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-green-500 to-green-400">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-green-600 via-transparent to-green-600"></div>
        
        {/* Field texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 60%, rgba(22, 163, 74, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 90%, rgba(21, 128, 61, 0.1) 0%, transparent 50%)
            `
          }}
        ></div>
      </div>

      {/* Trees in Background */}
      <div className="absolute bottom-0 right-8 z-10">
        {[1, 2, 3].map((tree, index) => (
          <motion.div 
            key={tree}
            className="inline-block mx-2"
            animate={{ 
              rotate: [0, 1, -1, 0],
              x: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 1
            }}
          >
            <div className="w-2 h-12 bg-amber-800 mx-auto"></div>
            <div className="w-8 h-8 bg-green-600 rounded-full -mt-3 mx-auto shadow-md"></div>
          </motion.div>
        ))}
      </div>

      {/* Plough Marks */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 z-5">
        {ploughMarks.map((mark) => (
          <motion.div
            key={mark.id}
            className="absolute bottom-1/3 h-1 bg-amber-800 rounded-sm"
            style={{ left: `${mark.left}%` }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: ["0px", "60px", "60px", "0px"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 12, ease: "linear" }}
          />
        ))}
      </div>

      {/* Animated Tractor */}
      <motion.div 
        className="absolute bottom-1/3 z-20"
        animate={{ x: [-150, window.innerWidth + 50] }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 2
        }}
      >
        <div className="relative w-16 h-10">
          {/* Tractor Body */}
          <div className="w-10 h-7 bg-red-600 rounded-lg relative">
            {/* Cabin */}
            <div className="absolute -top-3 left-1 w-5 h-4 bg-red-700 rounded-t-lg"></div>
            {/* Window */}
            <div className="absolute -top-2 left-1.5 w-4 h-2 bg-blue-200 rounded-sm opacity-80"></div>
            {/* Exhaust */}
            <div className="absolute -top-1 right-0 w-1 h-3 bg-gray-800 rounded-sm"></div>
          </div>
          
          {/* Front Wheel */}
          <motion.div 
            className="absolute bottom-0 right-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0.5 border border-gray-400 rounded-full"></div>
          </motion.div>
          
          {/* Back Wheel */}
          <motion.div 
            className="absolute -bottom-1 -left-1 w-5 h-5 bg-gray-800 rounded-full border border-gray-600"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0.5 border border-gray-400 rounded-full"></div>
          </motion.div>

          {/* Plough attachment */}
          <div className="absolute -left-3 bottom-0 w-3 h-2 bg-gray-600 transform rotate-12"></div>
          <div className="absolute -left-4 bottom-0 w-2 h-1 bg-amber-700"></div>
        </div>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-30 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center justify-center mb-6"
            >
              <Tractor className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
                FarmRent
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-xl lg:text-2xl text-gray-700 mb-8"
            >
              Modern Farm Equipment Rental Platform
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Experience the future of farming with our state-of-the-art equipment rental service. 
              Watch our tractors work the fields in real-time while you browse our extensive fleet 
              of modern agricultural machinery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Equipment
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Renting
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                <span>Nationwide Coverage</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600 mr-2" />
                <span>Smart Booking</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute bottom-4 left-0 right-0 z-30 text-center"
      >
        <p className="text-white/80 text-sm bg-black/20 backdrop-blur-sm rounded-full py-2 px-4 inline-block">
          🚜 Watch the tractor continuously plough the field above
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedFarmLanding;
