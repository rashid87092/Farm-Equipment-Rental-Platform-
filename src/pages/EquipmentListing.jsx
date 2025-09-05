import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Tractor,
  Camera,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import ApiService from '../services/api';

const EquipmentListing = () => {
  const [activeTab, setActiveTab] = useState('my-equipment');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [equipmentForm, setEquipmentForm] = useState({
    name: '',
    type: 'tractor',
    description: '',
    specifications: {
      horsepower: '',
      fuelType: 'diesel',
      transmission: 'manual',
      features: []
    },
    pricing: {
      pricePerHour: '',
      pricePerAcre: '',
      minimumHours: '4'
    },
    availability: {
      availableDays: [],
      startTime: '06:00',
      endTime: '18:00'
    },
    location: '',
    images: []
  });

  const [myEquipment] = useState([
    {
      id: 1,
      name: 'John Deere 5045D Tractor',
      type: 'tractor',
      status: 'active',
      totalBookings: 24,
      rating: 4.8,
      reviews: 15,
      pricePerHour: 800,
      lastBooked: '2 days ago',
      nextBooking: 'Jan 15, 2024',
      images: ['/api/placeholder/400/300']
    },
    {
      id: 2,
      name: 'Mahindra Harvester',
      type: 'harvester',
      status: 'maintenance',
      totalBookings: 18,
      rating: 4.6,
      reviews: 12,
      pricePerHour: 1500,
      lastBooked: '1 week ago',
      nextBooking: 'Available',
      images: ['/api/placeholder/400/300']
    }
  ]);

  const equipmentTypes = [
    { id: 'tractor', name: 'Tractor', icon: '🚜' },
    { id: 'harvester', name: 'Harvester', icon: '🌾' },
    { id: 'plough', name: 'Plough', icon: '🔧' },
    { id: 'sprayer', name: 'Sprayer', icon: '💧' },
    { id: 'seeder', name: 'Seeder', icon: '🌱' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Equipment form submitted:', equipmentForm);
    setShowAddModal(false);
    setEditingEquipment(null);
    // Reset form
    setEquipmentForm({
      name: '',
      type: 'tractor',
      description: '',
      specifications: {
        horsepower: '',
        fuelType: 'diesel',
        transmission: 'manual',
        features: []
      },
      pricing: {
        pricePerHour: '',
        pricePerAcre: '',
        minimumHours: '4'
      },
      availability: {
        availableDays: [],
        startTime: '06:00',
        endTime: '18:00'
      },
      location: '',
      images: []
    });
  };

  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
    setEquipmentForm({
      name: equipment.name,
      type: equipment.type,
      // ... populate other fields
    });
    setShowAddModal(true);
  };

  const EquipmentCard = ({ equipment }) => (
    <motion.div
      className="card overflow-hidden"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <img
          src={equipment.images[0]}
          alt={equipment.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            equipment.status === 'active' ? 'bg-green-100 text-green-800' :
            equipment.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center bg-white px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{equipment.rating}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{equipment.name}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Total Bookings:</span>
            <p className="font-semibold">{equipment.totalBookings}</p>
          </div>
          <div>
            <span className="text-gray-500">Price/Hour:</span>
            <p className="font-semibold text-primary-600">₹{equipment.pricePerHour}</p>
          </div>
          <div>
            <span className="text-gray-500">Last Booked:</span>
            <p className="font-semibold">{equipment.lastBooked}</p>
          </div>
          <div>
            <span className="text-gray-500">Next Booking:</span>
            <p className="font-semibold">{equipment.nextBooking}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEdit(equipment)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="View">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Delete">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {equipment.reviews} reviews
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Equipment Management
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Manage your equipment listings and bookings
            </motion.p>
          </div>
          
          <motion.button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Equipment</span>
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'my-equipment', label: 'My Equipment' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
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

        {/* Content */}
        {activeTab === 'my-equipment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEquipment.map((equipment) => (
                <EquipmentCard key={equipment.id} equipment={equipment} />
              ))}
            </div>

            {myEquipment.length === 0 && (
              <div className="text-center py-12">
                <Tractor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Equipment Listed</h3>
                <p className="text-gray-600 mb-6">Start earning by listing your farm equipment</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-primary"
                >
                  Add Your First Equipment
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Add/Edit Equipment Modal */}
        {showAddModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingEquipment(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Equipment Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., John Deere 5045D Tractor"
                          value={equipmentForm.name}
                          onChange={(e) => setEquipmentForm({...equipmentForm, name: e.target.value})}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Equipment Type *
                        </label>
                        <select
                          required
                          value={equipmentForm.type}
                          onChange={(e) => setEquipmentForm({...equipmentForm, type: e.target.value})}
                          className="input-field"
                        >
                          {equipmentTypes.map(type => (
                            <option key={type.id} value={type.id}>
                              {type.icon} {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        required
                        placeholder="Describe your equipment, its condition, and any special features..."
                        value={equipmentForm.description}
                        onChange={(e) => setEquipmentForm({...equipmentForm, description: e.target.value})}
                        className="input-field h-24 resize-none"
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Horsepower
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 45 HP"
                          value={equipmentForm.specifications.horsepower}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            specifications: { ...equipmentForm.specifications, horsepower: e.target.value }
                          })}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fuel Type
                        </label>
                        <select
                          value={equipmentForm.specifications.fuelType}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            specifications: { ...equipmentForm.specifications, fuelType: e.target.value }
                          })}
                          className="input-field"
                        >
                          <option value="diesel">Diesel</option>
                          <option value="petrol">Petrol</option>
                          <option value="electric">Electric</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transmission
                        </label>
                        <select
                          value={equipmentForm.specifications.transmission}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            specifications: { ...equipmentForm.specifications, transmission: e.target.value }
                          })}
                          className="input-field"
                        >
                          <option value="manual">Manual</option>
                          <option value="automatic">Automatic</option>
                          <option value="cvt">CVT</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price per Hour (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="800"
                          value={equipmentForm.pricing.pricePerHour}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            pricing: { ...equipmentForm.pricing, pricePerHour: e.target.value }
                          })}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price per Acre (₹) *
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="1500"
                          value={equipmentForm.pricing.pricePerAcre}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            pricing: { ...equipmentForm.pricing, pricePerAcre: e.target.value }
                          })}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Minimum Hours
                        </label>
                        <input
                          type="number"
                          placeholder="4"
                          value={equipmentForm.pricing.minimumHours}
                          onChange={(e) => setEquipmentForm({
                            ...equipmentForm,
                            pricing: { ...equipmentForm.pricing, minimumHours: e.target.value }
                          })}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your location (Village, District, State)"
                        value={equipmentForm.location}
                        onChange={(e) => setEquipmentForm({...equipmentForm, location: e.target.value})}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Photos
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload photos of your equipment</p>
                      <p className="text-sm text-gray-500">Recommended: Multiple angles, clear photos</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        id="equipment-photos"
                      />
                      <label
                        htmlFor="equipment-photos"
                        className="inline-block mt-4 px-4 py-2 bg-primary-100 text-primary-600 rounded-lg cursor-pointer hover:bg-primary-200 transition-colors"
                      >
                        Choose Photos
                      </label>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingEquipment(null);
                      }}
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
                      <span>{editingEquipment ? 'Update Equipment' : 'Add Equipment'}</span>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EquipmentListing;
