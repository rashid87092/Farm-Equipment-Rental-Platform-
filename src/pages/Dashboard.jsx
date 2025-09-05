import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  MapPin,
  TrendingUp,
  Clock,
  Star,
  Tractor,
  User,
  Bell,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useNotifications } from '../context/NotificationContext';

const Dashboard = () => {
  const { user, userType } = useAuth();
  const { bookings, loadUserBookings } = useBooking();
  const { notifications, unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    if (user) {
      loadUserBookings(user.id);
    }
  }, [user]);

  const stats = userType === 'farmer' ? {
    totalBookings: 12,
    activeBookings: 2,
    totalSpent: 45000,
    savedAmount: 8500
  } : {
    totalListings: 5,
    activeBookings: 3,
    totalEarned: 125000,
    rating: 4.8
  };

  const recentActivity = [
    {
      id: 1,
      type: 'booking',
      title: 'Tractor booking confirmed',
      description: 'John Deere 5045D for Jan 15-16',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '₹6,000 for harvester rental',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'review',
      title: 'New review received',
      description: '5 stars from Rajesh Kumar',
      time: '2 days ago',
      status: 'info'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', label_hi: 'अवलोकन' },
    { id: 'bookings', label: 'Bookings', label_hi: 'बुकिंग' },
    { id: 'equipment', label: 'Equipment', label_hi: 'उपकरण' },
    { id: 'payments', label: 'Payments', label_hi: 'भुगतान' },
    { id: 'reviews', label: 'Reviews', label_hi: 'समीक्षा' }
  ];

  const StatCard = ({ icon: Icon, title, value, change, color = 'primary' }) => (
    <motion.div
      className="card p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${
          color === 'primary' ? 'bg-primary-100' : 
          color === 'earth' ? 'bg-earth-100' : 'bg-blue-100'
        } flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${
            color === 'primary' ? 'text-primary-600' :
            color === 'earth' ? 'text-earth-600' : 'text-blue-600'
          }`} />
        </div>
      </div>
    </motion.div>
  );

  const ActivityItem = ({ activity }) => (
    <motion.div
      className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        activity.status === 'success' ? 'bg-green-100' :
        activity.status === 'info' ? 'bg-blue-100' : 'bg-yellow-100'
      }`}>
        {activity.type === 'booking' && <Calendar className="w-5 h-5 text-green-600" />}
        {activity.type === 'payment' && <TrendingUp className="w-5 h-5 text-green-600" />}
        {activity.type === 'review' && <Star className="w-5 h-5 text-blue-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-sm text-gray-500">{activity.description}</p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </motion.div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600">You need to login to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                {userType === 'farmer' 
                  ? 'Manage your equipment bookings and farming activities'
                  : 'Track your equipment listings and bookings'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <motion.button
                className="relative p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </motion.button>
              
              <motion.button
                className="btn-primary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span>
                  {userType === 'farmer' ? 'Book Equipment' : 'Add Equipment'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userType === 'farmer' ? (
            <>
              <StatCard 
                icon={Calendar} 
                title="Total Bookings" 
                value={stats.totalBookings} 
                change="+2 this month"
              />
              <StatCard 
                icon={Clock} 
                title="Active Bookings" 
                value={stats.activeBookings} 
                color="earth"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Total Spent" 
                value={`₹${stats.totalSpent.toLocaleString()}`} 
                change="+12% vs last month"
                color="blue"
              />
              <StatCard 
                icon={Star} 
                title="Money Saved" 
                value={`₹${stats.savedAmount.toLocaleString()}`} 
                change="vs market rates"
                color="primary"
              />
            </>
          ) : (
            <>
              <StatCard 
                icon={Tractor} 
                title="Equipment Listed" 
                value={stats.totalListings} 
              />
              <StatCard 
                icon={Calendar} 
                title="Active Bookings" 
                value={stats.activeBookings} 
                color="earth"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Total Earned" 
                value={`₹${stats.totalEarned.toLocaleString()}`} 
                change="+18% this month"
                color="blue"
              />
              <StatCard 
                icon={Star} 
                title="Average Rating" 
                value={stats.rating} 
                change="from 45 reviews"
                color="primary"
              />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View all
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                              <Tractor className="w-6 h-6 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{booking.equipmentName}</p>
                              <p className="text-sm text-gray-500">
                                {booking.startDate} • ₹{booking.totalAmount}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'bookings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                      <div className="flex items-center space-x-2">
                        <select
                          value={dateFilter}
                          onChange={(e) => setDateFilter(e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="all">All time</option>
                          <option value="week">This week</option>
                          <option value="month">This month</option>
                          <option value="year">This year</option>
                        </select>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Filter className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Equipment</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium text-gray-900">{booking.equipmentName}</p>
                                  <p className="text-gray-500">{booking.equipmentType}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-gray-600">
                                {booking.startDate}
                              </td>
                              <td className="py-3 px-4 text-gray-900 font-medium">
                                ₹{booking.totalAmount}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  <button className="p-1 text-gray-400 hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-green-600">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-1 text-gray-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-2">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium">Book New Equipment</span>
                  </div>
                </motion.button>
                
                <motion.button
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium">Download Reports</span>
                  </div>
                </motion.button>
                
                <motion.button
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-medium">Leave a Review</span>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
