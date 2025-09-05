import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  TrendingUp,
  Tractor,
  Wrench,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Globe
} from 'lucide-react';
import AnimatedFarmLanding from '../components/AnimatedFarmLanding';

const Home = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  const equipmentTypes = [
    { id: 'tractor', name: 'Tractor', name_hi: 'ट्रैक्टर', icon: '🚜' },
    { id: 'harvester', name: 'Harvester', name_hi: 'हार्वेस्टर', icon: '🌾' },
    { id: 'plough', name: 'Plough', name_hi: 'हल', icon: '🔧' },
    { id: 'sprayer', name: 'Sprayer', name_hi: 'स्प्रेयर', icon: '💧' },
    { id: 'seeder', name: 'Seeder', name_hi: 'बीजक', icon: '🌱' },
  ];

  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      title_hi: 'आसान खोज',
      description: 'Find equipment near you with our smart location-based search.',
      description_hi: 'हमारी स्मार्ट लोकेशन-आधारित खोज के साथ अपने पास उपकरण खोजें।'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      title_hi: 'सुरक्षित भुगतान',
      description: 'Safe and transparent pricing with multiple payment options.',
      description_hi: 'कई भुगतान विकल्पों के साथ सुरक्षित और पारदर्शी मूल्य निर्धारण।'
    },
    {
      icon: Users,
      title: 'Verified Owners',
      title_hi: 'सत्यापित मालिक',
      description: 'All equipment owners are verified for your peace of mind.',
      description_hi: 'आपके मन की शांति के लिए सभी उपकरण मालिक सत्यापित हैं।'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      title_hi: '24/7 सहायता',
      description: 'Round-the-clock customer support for all your queries.',
      description_hi: 'आपकी सभी समस्याओं के लिए 24 घंटे ग्राहक सहायता।'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Farmers', label_hi: 'खुश किसान' },
    { number: '5,000+', label: 'Equipment Owners', label_hi: 'उपकरण मालिक' },
    { number: '50,000+', label: 'Successful Bookings', label_hi: 'सफल बुकिंग' },
    { number: '95%', label: 'Success Rate', label_hi: 'सफलता दर' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Punjab',
      rating: 5,
      comment: 'FarmRent helped me find a harvester during peak season. Saved my crop and time!',
      comment_hi: 'फार्मरेंट ने मुझे फसल के मौसम में हार्वेस्टर खोजने में मदद की। मेरी फसल और समय बचाया!'
    },
    {
      name: 'Sunita Devi',
      location: 'Haryana',
      rating: 5,
      comment: 'Easy to use platform. Found a tractor for ploughing within minutes.',
      comment_hi: 'उपयोग में आसान प्लेटफॉर्म। मिनटों में हल चलाने के लिए ट्रैक्टर मिल गया।'
    },
    {
      name: 'Mohan Singh',
      location: 'Uttar Pradesh',
      rating: 5,
      comment: 'Great service! Transparent pricing and reliable equipment owners.',
      comment_hi: 'बेहतरीन सेवा! पारदर्शी मूल्य निर्धारण और विश्वसनीय उपकरण मालिक।'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to booking page with search parameters
    console.log('Searching:', { location: searchLocation, equipment: equipmentType });
  };

  return (
    <div className="min-h-screen">
      {/* Animated Farm Landing Section */}
      <AnimatedFarmLanding />

      {/* Additional Content Sections */}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-wheat-300/40 rounded-full opacity-50 blur-lg"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Floating Farm Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            >
              {i % 4 === 0 && <span className="text-4xl">🌾</span>}
              {i % 4 === 1 && <span className="text-3xl">🚜</span>}
              {i % 4 === 2 && <span className="text-3xl">🌱</span>}
              {i % 4 === 3 && <span className="text-3xl">🔧</span>}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-soil-900">Connect.</span>
              <span className="block text-gradient-farm text-6xl sm:text-7xl lg:text-8xl">
                Book.
              </span>
              <span className="block text-forest-900">Farm.</span>
            </h1>
            
            <motion.p
              className="text-lg sm:text-xl text-soil-700 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              🌾 The largest platform connecting farmers with equipment owners across India. 
              Find tractors, harvesters, and farming equipment in your area with transparent pricing.
            </motion.p>

            {/* Search Form */}
            <motion.div
              className="max-w-4xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <form onSubmit={handleSearch} className="card-farming p-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-farm">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-soil-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="🏘️ Enter your village/location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="input-field-modern pl-12 text-lg"
                  />
                </div>
                
                <div className="relative">
                  <Tractor className="absolute left-4 top-1/2 transform -translate-y-1/2 text-soil-500 w-5 h-5" />
                  <select
                    value={equipmentType}
                    onChange={(e) => setEquipmentType(e.target.value)}
                    className="input-field-modern pl-12 text-lg appearance-none bg-gradient-to-r from-white to-earth-50/30"
                  >
                    <option value="">🚜 Select Equipment</option>
                    {equipmentTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <motion.button
                  type="submit"
                  className="btn-primary text-lg flex items-center justify-center space-x-3 py-4 shadow-farm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="w-5 h-5" />
                  <span>🔍 Find Equipment</span>
                </motion.button>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link to="/booking">
                <motion.button
                  className="btn-primary text-xl px-10 py-5 flex items-center space-x-3 shadow-farm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🌾 Book Equipment</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.button>
              </Link>
              
              <Link to="/equipment">
                <motion.button
                  className="btn-secondary text-xl px-10 py-5 flex items-center space-x-3 shadow-earth"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>🚜 List Your Equipment</span>
                  <Tractor className="w-6 h-6" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-600 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-br from-forest-50 to-wheat-50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient-farm">FarmRent</span>? 🌾
            </h2>
            <p className="text-xl text-soil-700 max-w-3xl mx-auto">
              We make farm equipment rental simple, secure, and accessible for everyone in the farming community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-farming p-8 text-center group hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-primary-100 to-forest-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-primary-200 group-hover:to-forest-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <feature.icon className="w-10 h-10 text-primary-600" />
                </motion.div>
                <h3 className="text-xl font-semibold text-soil-900 mb-4">{feature.title}</h3>
                <p className="text-soil-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-forest-600 to-earth-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="farm-pattern h-full w-full"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <motion.div
                  className="text-4xl lg:text-6xl font-bold mb-2 text-wheat-200"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-wheat-50 to-sage-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-sage-200 opacity-20">
          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-forest-900 mb-6">
              What Our <span className="text-gradient">Farmers Say</span>
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Real stories from real farmers who have transformed their farming with FarmRent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sage-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-wheat-400 fill-current" />
                  ))}
                </div>
                <p className="text-sage-800 mb-6 italic text-lg">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-earth-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-forest-900">{testimonial.name}</div>
                    <div className="text-sm text-sage-600">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-forest-800 via-primary-700 to-earth-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="farm-pattern h-full w-full"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of farmers who are already using FarmRent to access the equipment they need, when they need it.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/booking">
                <motion.button
                  className="bg-wheat-100 text-forest-900 font-semibold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-200 text-lg flex items-center space-x-2 border border-wheat-200"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Booking</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/equipment">
                <motion.button
                  className="border-2 border-wheat-200 text-wheat-100 font-semibold py-4 px-8 rounded-xl hover:bg-wheat-100 hover:text-forest-900 transition-all duration-200 text-lg flex items-center space-x-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>List Equipment</span>
                  <Tractor className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
