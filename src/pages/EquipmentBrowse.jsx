import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApiService from '../services/api';

const EquipmentCard = ({ equipment }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Equipment Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={equipment.image || '/images/tractor-field.jpg'}
          alt={equipment.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.src = '/images/tractor-field.jpg';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            equipment.available 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {equipment.available ? '✅ Available' : '❌ Not Available'}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {equipment.category}
          </span>
        </div>
      </div>

      {/* Equipment Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{equipment.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{equipment.description}</p>
        
        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          {equipment.specifications && Object.entries(equipment.specifications).slice(0, 4).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-green-600">₹{equipment.pricePerDay?.toLocaleString()}</span>
              <span className="text-gray-500 text-sm">/day</span>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>₹{equipment.pricePerWeek?.toLocaleString()}/week</div>
              <div>₹{equipment.pricePerMonth?.toLocaleString()}/month</div>
            </div>
          </div>
        </div>

        {/* Location and Rating */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">📍</span>
            {equipment.location}
          </div>
          <div className="flex items-center text-sm">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-medium">{equipment.rating}</span>
            <span className="text-gray-500 ml-1">({equipment.reviews} reviews)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/equipment/${equipment.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            View Details
          </Link>
          <Link
            to={`/booking/${equipment.id}`}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors duration-200 text-center ${
              equipment.available
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => !equipment.available && e.preventDefault()}
          >
            {equipment.available ? 'Book Now' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const EquipmentBrowse = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    available: '',
    priceRange: ''
  });

  useEffect(() => {
    fetchEquipment();
  }, [filters]);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getEquipment(filters);
      setEquipment(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch equipment');
      console.error('Error fetching equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg">Loading equipment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Equipment</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEquipment}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🚜 Farm Equipment Rental
              </h1>
              <p className="text-gray-600">
                Find the perfect equipment for your farming needs
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {equipment.length} Equipment Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🔍 Filter Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                <option value="Tractor">Tractor</option>
                <option value="Harvester">Harvester</option>
                <option value="Cultivator">Cultivator</option>
                <option value="Seeder">Seeder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                placeholder="Enter city or state"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={filters.available}
                onChange={(e) => handleFilterChange('available', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Equipment</option>
                <option value="true">Available Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (per day)</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Any Price</option>
                <option value="0-1000">₹0 - ₹1,000</option>
                <option value="1000-3000">₹1,000 - ₹3,000</option>
                <option value="3000-5000">₹3,000 - ₹5,000</option>
                <option value="5000-10000">₹5,000+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="container mx-auto px-4 pb-12">
        {equipment.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚜</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Equipment Found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EquipmentCard equipment={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentBrowse;
