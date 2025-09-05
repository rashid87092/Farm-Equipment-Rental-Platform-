import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Tractor, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      title_hi: 'कंपनी',
      links: [
        { name: 'About Us', name_hi: 'हमारे बारे में', href: '/about' },
        { name: 'How it Works', name_hi: 'यह कैसे काम करता है', href: '/how-it-works' },
        { name: 'Careers', name_hi: 'करियर', href: '/careers' },
        { name: 'Press', name_hi: 'प्रेस', href: '/press' }
      ]
    },
    services: {
      title: 'Services',
      title_hi: 'सेवाएं',
      links: [
        { name: 'Book Equipment', name_hi: 'उपकरण बुक करें', href: '/booking' },
        { name: 'List Equipment', name_hi: 'उपकरण सूचीबद्ध करें', href: '/equipment' },
        { name: 'Pricing', name_hi: 'मूल्य निर्धारण', href: '/pricing' },
        { name: 'Insurance', name_hi: 'बीमा', href: '/insurance' }
      ]
    },
    support: {
      title: 'Support',
      title_hi: 'सहायता',
      links: [
        { name: 'Help Center', name_hi: 'सहायता केंद्र', href: '/help' },
        { name: 'Safety', name_hi: 'सुरक्षा', href: '/safety' },
        { name: 'Contact Us', name_hi: 'संपर्क करें', href: '/contact' },
        { name: 'FAQ', name_hi: 'सामान्य प्रश्न', href: '/faq' }
      ]
    },
    legal: {
      title: 'Legal',
      title_hi: 'कानूनी',
      links: [
        { name: 'Privacy Policy', name_hi: 'गोपनीयता नीति', href: '/privacy' },
        { name: 'Terms of Service', name_hi: 'सेवा की शर्तें', href: '/terms' },
        { name: 'Cookie Policy', name_hi: 'कुकी नीति', href: '/cookies' },
        { name: 'Refund Policy', name_hi: 'रिफंड नीति', href: '/refund' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
  ];

  const contactInfo = [
    { icon: Phone, text: '+91 1800-FARMRENT', href: 'tel:+911800327673' },
    { icon: Mail, text: 'support@farmrent.com', href: 'mailto:support@farmrent.com' },
    { icon: MapPin, text: 'Delhi, India', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <Tractor className="w-8 h-8 text-primary-400" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-earth-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-earth-400 bg-clip-text text-transparent">
                FarmRent
              </span>
            </motion.div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting farmers with equipment owners across India. 
              Making farming equipment accessible, affordable, and available when you need it.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <motion.a
                  key={text}
                  href={href}
                  className="flex items-center space-x-3 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{text}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get the latest updates on equipment availability, farming tips, and seasonal offers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
              />
              <motion.button
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Media & Features */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Secure Payments</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Verified Equipment</span>
              </span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ name, icon: Icon, href, color }) => (
                <motion.a
                  key={name}
                  href={href}
                  className={`text-gray-400 ${color} transition-colors duration-200`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <span>&copy; {currentYear} FarmRent. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>for Indian farmers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
