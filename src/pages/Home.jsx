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
      title: 'Trusted Network',
      title_hi: 'भरोसेमंद नेटवर्क',
      description: 'Connect with verified equipment owners in your community.',
      description_hi: 'अपने समुदाय में सत्यापित उपकरण मालिकों से जुड़ें।'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      title_hi: '24/7 सहायता',
      description: 'Round-the-clock customer support in your local language.',
      description_hi: 'आपकी स्थानीय भाषा में चौबीसों घंटे ग्राहक सहायता।'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Farmers' },
    { number: '10K+', label: 'Equipment Listed' },
    { number: '25+', label: 'States Covered' },
    { number: '4.8★', label: 'User Rating' }
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      location: 'Punjab',
      comment: 'FarmRent saved me thousands of rupees. I can now access modern tractors without buying them.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      location: 'Haryana',
      comment: 'The platform is so easy to use. I found a harvester within 2 km of my farm in minutes.',
      rating: 5
    },
    {
      name: 'Suresh Patel',
      location: 'Gujarat',
      comment: 'As an equipment owner, I earn extra income by renting out my tractor when not in use.',
      rating: 5
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', { searchLocation, equipmentType });
  };

  useEffect(() => {
    // Initialize any location-based services
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('User location:', position.coords);
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Farm Landing Section */}
      <AnimatedFarmLanding />

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-br from-forest-50 to-wheat-50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-forest-900 mb-6">
              Why Choose <span className="text-gradient">FarmRent</span>?
            </h2>
            <p className="text-xl text-sage-700 max-w-3xl mx-auto">
              Experience the future of farm equipment rental with our comprehensive platform designed for modern farmers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-farming p-8 text-center group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="text-4xl mb-6 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-forest-900">{feature.title}</h3>
                <p className="text-sage-700 leading-relaxed">{feature.description}</p>
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
