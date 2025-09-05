import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Edit,
  Camera,
  Save,
  Lock,
  Bell,
  Globe,
  Tractor,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, userType, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      push: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', label_hi: 'प्रोफाइल', icon: User },
    { id: 'security', label: 'Security', label_hi: 'सुरक्षा', icon: Lock },
    { id: 'notifications', label: 'Notifications', label_hi: 'सूचनाएं', icon: Bell },
    { id: 'preferences', label: 'Preferences', label_hi: 'प्राथमिकताएं', icon: Globe },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Verified User',
      description: 'Profile verified with documents',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      earned: true
    },
    {
      id: 2,
      title: 'Top Renter',
      description: '50+ successful bookings',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      earned: userType === 'farmer'
    },
    {
      id: 3,
      title: 'Reliable Owner',
      description: '4.8+ average rating',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      earned: userType === 'owner'
    }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(profileData);
    setIsEditing(false);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => (
    <motion.div
      className="card p-6 text-center"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`w-12 h-12 rounded-full ${
        color === 'primary' ? 'bg-primary-100' :
        color === 'green' ? 'bg-green-100' :
        color === 'blue' ? 'bg-blue-100' : 'bg-yellow-100'
      } flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 ${
          color === 'primary' ? 'text-primary-600' :
          color === 'green' ? 'text-green-600' :
          color === 'blue' ? 'text-blue-600' : 'text-yellow-600'
        }`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </motion.div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600">You need to login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-primary-600 to-earth-600 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Profile Picture */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <motion.button
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        userType === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {userType === 'farmer' ? '🌾 Farmer' : '🚜 Equipment Owner'}
                      </span>
                      {user.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{user.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit className="w-4 h-4" />
                    <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {userType === 'farmer' ? (
            <>
              <StatCard
                icon={Tractor}
                title="Equipment Booked"
                value={user.totalBookings || 12}
                subtitle="This year"
              />
              <StatCard
                icon={TrendingUp}
                title="Money Saved"
                value="₹8,500"
                subtitle="vs market rates"
                color="green"
              />
              <StatCard
                icon={Star}
                title="Average Rating"
                value="4.6"
                subtitle="from owners"
                color="blue"
              />
              <StatCard
                icon={Calendar}
                title="Active Bookings"
                value="2"
                subtitle="This month"
                color="yellow"
              />
            </>
          ) : (
            <>
              <StatCard
                icon={Tractor}
                title="Equipment Listed"
                value={user.equipmentListed || 5}
                subtitle="Active listings"
              />
              <StatCard
                icon={TrendingUp}
                title="Total Earned"
                value="₹125K"
                subtitle="This year"
                color="green"
              />
              <StatCard
                icon={Star}
                title="Average Rating"
                value={user.rating || 4.8}
                subtitle="from farmers"
                color="blue"
              />
              <StatCard
                icon={Calendar}
                title="Bookings This Month"
                value="18"
                subtitle="Active bookings"
                color="yellow"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {isEditing ? (
                      <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                              className="input-field"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={profileData.location}
                              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                              className="input-field"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Bio
                          </label>
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            className="input-field h-24 resize-none"
                            placeholder="Tell others about yourself..."
                          />
                        </div>

                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <motion.button
                            type="submit"
                            className="flex-1 btn-primary flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                          </motion.button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">Email</h3>
                            <p className="text-gray-900">{user.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-1">Phone</h3>
                            <p className="text-gray-900">{user.phone}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-1">Bio</h3>
                          <p className="text-gray-900">
                            {user.bio || 'No bio added yet. Click edit to add your bio.'}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      {[
                        { key: 'email', label: 'Email Notifications', icon: Mail },
                        { key: 'sms', label: 'SMS Notifications', icon: Phone },
                        { key: 'push', label: 'Push Notifications', icon: Bell }
                      ].map(({ key, label, icon: Icon }) => (
                        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-900">{label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={profileData.notifications[key]}
                              onChange={(e) => setProfileData({
                                ...profileData,
                                notifications: { ...profileData.notifications, [key]: e.target.checked }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? achievement.bgColor : 'bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <achievement.icon className={`w-6 h-6 ${
                      achievement.earned ? achievement.color : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <p className={`font-medium ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">New Bookings</span>
                  <span className="font-semibold text-primary-600">+5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profile Views</span>
                  <span className="font-semibold text-primary-600">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
