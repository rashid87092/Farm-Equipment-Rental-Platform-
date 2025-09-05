import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Filter,
  Grid,
  List,
  Tractor,
  User,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BookingSystem = () => {
  const { searchResults, searchEquipment, createBooking, loading } = useBooking();
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    equipmentType: '',
    startDate: '',
    endDate: '',
    maxPrice: '',
    radius: '25'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: '',
    endDate: '',
    duration: '',
    area: '',
    pricingType: 'hourly',
    specialRequirements: ''
  });
  const [showBookingModal, setShowBookingModal] = useState(false);

  const equipmentTypes = [
    { id: 'tractor', name: 'Tractor', name_hi: 'ट्रैक्टर', icon: '🚜' },
    { id: 'harvester', name: 'Harvester', name_hi: 'हार्वेस्टर', icon: '🌾' },
    { id: 'plough', name: 'Plough', name_hi: 'हल', icon: '🔧' },
    { id: 'sprayer', name: 'Sprayer', name_hi: 'स्प्रेयर', icon: '💧' },
    { id: 'seeder', name: 'Seeder', name_hi: 'बीजक', icon: '🌱' },
  ];

  useEffect(() => {
    // Initial search to show all equipment
    handleSearch();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    await searchEquipment(searchFilters);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEquipment) return;

    const bookingData = {
      equipmentId: selectedEquipment.id,
      equipmentName: selectedEquipment.name,
      equipmentType: selectedEquipment.type,
      owner: selectedEquipment.owner,
      ...bookingDetails
    };

    const result = await createBooking(bookingData);
    if (result.success) {
      setShowBookingModal(false);
      setSelectedEquipment(null);
      setBookingDetails({
        startDate: '',
        endDate: '',
        duration: '',
        area: '',
        pricingType: 'hourly',
        specialRequirements: ''
      });
      // Show success message
      alert('Booking request submitted successfully!');
    }
  };

  const EquipmentCard = ({ equipment }) => (
    <motion.div
      className="card overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative">
        <img
          src="/api/placeholder/400/250"
          alt={equipment.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-sm font-medium">
          {equipmentTypes.find(t => t.id === equipment.type)?.icon} {equipment.type}
        </div>
        <div className="absolute top-4 right-4 flex items-center bg-white px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
          <span className="text-sm font-medium">{equipment.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{equipment.name}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{equipment.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <User className="w-4 h-4 mr-1" />
          <span className="text-sm">Owner: {equipment.owner}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Per Hour:</span>
            <p className="font-semibold text-primary-600">₹{equipment.pricePerHour}</p>
          </div>
          <div>
            <span className="text-gray-500">Per Acre:</span>
            <p className="font-semibold text-primary-600">₹{equipment.pricePerAcre}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {equipment.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
          
          <motion.button
            onClick={() => {
              setSelectedEquipment(equipment);
              setShowBookingModal(true);
            }}
            className="btn-primary px-6 py-2 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Find & Book Farm Equipment
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Discover available equipment near you and book instantly
          </motion.p>
        </div>

        {/* Search Filters */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Enter location..."
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Type
                </label>
                <select
                  value={searchFilters.equipmentType}
                  onChange={(e) => setSearchFilters({...searchFilters, equipmentType: e.target.value})}
                  className="input-field"
                >
                  <option value="">All Equipment</option>
                  {equipmentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={searchFilters.startDate}
                  onChange={(e) => setSearchFilters({...searchFilters, startDate: e.target.value})}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price/Hour (₹)
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={searchFilters.maxPrice}
                  onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
                  className="input-field"
                />
              </div>

              <div className="flex items-end">
                <motion.button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  <Search className="w-4 h-4" />
                  <span>{loading ? 'Searching...' : 'Search'}</span>
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Available Equipment ({searchResults.length})
            </h2>
            <p className="text-gray-600">
              {searchFilters.location && `Near ${searchFilters.location}`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white rounded-lg border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600 mt-4">Searching for equipment...</p>
          </div>
        ) : (
          <motion.div
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {searchResults.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </motion.div>
        )}

        {!loading && searchResults.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Tractor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Equipment Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search filters or location to find more options.
            </p>
            <button
              onClick={() => setSearchFilters({
                location: '',
                equipmentType: '',
                startDate: '',
                endDate: '',
                maxPrice: '',
                radius: '25'
              })}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedEquipment && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book Equipment</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <img
                      src="/api/placeholder/400/250"
                      alt={selectedEquipment.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedEquipment.name}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{selectedEquipment.location}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>Owner: {selectedEquipment.owner}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                        <span>{selectedEquipment.rating} ({selectedEquipment.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDetails.startDate}
                        onChange={(e) => setBookingDetails({...bookingDetails, startDate: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDetails.endDate}
                        onChange={(e) => setBookingDetails({...bookingDetails, endDate: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pricing Type
                      </label>
                      <select
                        value={bookingDetails.pricingType}
                        onChange={(e) => setBookingDetails({...bookingDetails, pricingType: e.target.value})}
                        className="input-field"
                      >
                        <option value="hourly">Hourly (₹{selectedEquipment.pricePerHour}/hr)</option>
                        <option value="area">Per Acre (₹{selectedEquipment.pricePerAcre}/acre)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {bookingDetails.pricingType === 'hourly' ? 'Duration (hours)' : 'Area (acres)'}
                      </label>
                      <input
                        type="number"
                        required
                        placeholder={bookingDetails.pricingType === 'hourly' ? '8' : '5'}
                        value={bookingDetails.pricingType === 'hourly' ? bookingDetails.duration : bookingDetails.area}
                        onChange={(e) => setBookingDetails({
                          ...bookingDetails,
                          [bookingDetails.pricingType === 'hourly' ? 'duration' : 'area']: e.target.value
                        })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      placeholder="Any special requirements or instructions..."
                      value={bookingDetails.specialRequirements}
                      onChange={(e) => setBookingDetails({...bookingDetails, specialRequirements: e.target.value})}
                      className="input-field h-24 resize-none"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between text-lg font-semibold">
                      <span>Estimated Total:</span>
                      <span className="text-primary-600">
                        ₹{bookingDetails.pricingType === 'hourly' 
                          ? (selectedEquipment.pricePerHour * (bookingDetails.duration || 0)).toLocaleString()
                          : (selectedEquipment.pricePerAcre * (bookingDetails.area || 0)).toLocaleString()
                        }
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Final amount may vary based on actual usage and additional services
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      className="flex-1 btn-primary"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                    >
                      {loading ? 'Booking...' : 'Confirm Booking'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingSystem;
