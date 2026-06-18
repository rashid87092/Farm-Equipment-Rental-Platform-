const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

// Sample data for seeding
const seedData = async () => {
  try {
    const dataDir = path.join(__dirname, '../data');
    
    // Create data directory if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true });

    // Sample Users Data
    const users = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gmail.com',
        password: await bcrypt.hash('password123', 10),
        userType: 'owner',
        phone: '+91-9876543210',
        location: 'Ludhiana, Punjab',
        coordinates: [30.9010, 75.8573],
        verified: true,
        createdAt: new Date().toISOString(),
        profile: {
          avatar: '/images/avatars/rajesh.jpg',
          bio: 'Experienced farmer with 20+ years in agriculture',
          rating: 4.8,
          totalRentals: 156
        }
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        password: await bcrypt.hash('password123', 10),
        userType: 'renter',
        phone: '+91-9876543211',
        location: 'Karnal, Haryana',
        coordinates: [29.6857, 76.9905],
        verified: true,
        createdAt: new Date().toISOString(),
        profile: {
          avatar: '/images/avatars/priya.jpg',
          bio: 'Small scale farmer looking for modern equipment',
          rating: 4.6,
          totalRentals: 23
        }
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.patel@gmail.com',
        password: await bcrypt.hash('password123', 10),
        userType: 'owner',
        phone: '+91-9876543212',
        location: 'Ahmedabad, Gujarat',
        coordinates: [23.0225, 72.5714],
        verified: true,
        createdAt: new Date().toISOString(),
        profile: {
          avatar: '/images/avatars/amit.jpg',
          bio: 'Modern farming equipment owner and agricultural consultant',
          rating: 4.9,
          totalRentals: 89
        }
      }
    ];

    // Sample Equipment Data (Enhanced)
    const equipment = [
      {
        id: 1,
        name: 'John Deere 5055E Tractor',
        type: 'tractor',
        category: 'Tractor',
        ownerId: 1,
        owner: 'Rajesh Kumar',
        location: 'Ludhiana, Punjab',
        coordinates: [30.9010, 75.8573],
        pricePerHour: 800,
        pricePerDay: 2500,
        pricePerAcre: 1500,
        rating: 4.8,
        reviews: 24,
        availability: ['2024-01-15', '2024-01-16', '2024-01-17'],
        specifications: {
          horsepower: '55 HP',
          engine: '3-cylinder diesel',
          transmission: '9F/3R',
          fuelCapacity: '120 liters',
          weight: '2800 kg'
        },
        features: ['4WD capability', 'Power steering', 'Comfortable cabin', 'PTO (Power Take-Off)', 'Hydraulic lift'],
        images: ['/images/john_deere.jpg'],
        description: 'Powerful 55 HP tractor perfect for medium-scale farming operations. Features 4WD capability and comfortable cabin with excellent fuel efficiency.',
        available: true,
        condition: 'excellent',
        yearOfManufacture: 2020,
        maintenanceRecords: [
          {
            date: '2024-01-01',
            type: 'Regular Service',
            cost: 5000,
            description: 'Oil change, filter replacement, general inspection'
          }
        ],
        insurance: {
          provider: 'Agricultural Insurance Co.',
          policyNumber: 'AGR-2024-001',
          expiryDate: '2024-12-31'
        }
      },
      {
        id: 2,
        name: 'Mahindra 575 DI Tractor',
        type: 'tractor',
        category: 'Tractor',
        ownerId: 1,
        owner: 'Rajesh Kumar',
        location: 'Ludhiana, Punjab',
        coordinates: [30.9010, 75.8573],
        pricePerHour: 750,
        pricePerDay: 2200,
        pricePerAcre: 1400,
        rating: 4.6,
        reviews: 18,
        availability: ['2024-01-15', '2024-01-18', '2024-01-19'],
        specifications: {
          horsepower: '47 HP',
          engine: '3-cylinder diesel',
          transmission: 'Manual',
          fuelCapacity: '65 liters',
          weight: '2100 kg'
        },
        features: ['High fuel efficiency', 'Advanced hydraulics', 'Comfortable seating', 'Multi-speed PTO', 'Heavy-duty build'],
        images: ['/images/mahindra_tractor.jpg'],
        description: 'Reliable 47HP tractor with excellent fuel efficiency and robust build quality. Perfect for heavy-duty farming and agricultural work.',
        available: true,
        condition: 'good',
        yearOfManufacture: 2019,
        maintenanceRecords: [],
        insurance: {
          provider: 'Agricultural Insurance Co.',
          policyNumber: 'AGR-2024-002',
          expiryDate: '2024-12-31'
        }
      },
      {
        id: 3,
        name: 'Heavy Duty Wheat Thresher',
        type: 'thresher',
        category: 'Thresher',
        ownerId: 2,
        owner: 'Harpreet Singh',
        location: 'Amritsar, Punjab',
        coordinates: [31.6340, 74.8723],
        pricePerHour: 600,
        pricePerDay: 1800,
        pricePerAcre: 800,
        rating: 4.7,
        reviews: 22,
        availability: ['2024-01-16', '2024-01-18', '2024-01-20'],
        specifications: {
          capacity: '2-3 tons/hour',
          powerRequirement: '25-35 HP',
          cleaningSystem: 'Multi-stage cleaning',
          grainLoss: 'Less than 1%',
          weight: '800 kg'
        },
        features: ['High grain separation efficiency', 'Low grain damage', 'Adjustable cleaning system', 'Durable construction', 'Easy maintenance'],
        images: ['/images/thresher.jpg'],
        description: 'High-efficiency wheat thresher designed for separating grain from wheat stalks. Suitable for medium to large-scale farming operations.',
        available: true,
        condition: 'excellent',
        yearOfManufacture: 2021,
        maintenanceRecords: [],
        insurance: null
      }
    ];

    // Sample Bookings Data
    const bookings = [
      {
        id: 1,
        equipmentId: 1,
        renterId: 2,
        ownerId: 1,
        startDate: '2024-01-20',
        endDate: '2024-01-22',
        duration: 3,
        totalCost: 7500,
        paymentMethod: 'UPI',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        notes: 'Need for wheat harvesting season',
        delivery: {
          required: true,
          address: 'Village Khanna, District Ludhiana, Punjab',
          deliveryFee: 500
        }
      },
      {
        id: 2,
        equipmentId: 3,
        renterId: 3,
        ownerId: 2,
        startDate: '2024-01-25',
        endDate: '2024-01-27',
        duration: 2,
        totalCost: 3600,
        paymentMethod: 'Bank Transfer',
        status: 'pending',
        createdAt: new Date().toISOString(),
        notes: 'Threshing required for 10 acres',
        delivery: {
          required: false,
          address: null,
          deliveryFee: 0
        }
      }
    ];

    // Write data to files
    await fs.writeFile(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
    await fs.writeFile(path.join(dataDir, 'equipment.json'), JSON.stringify(equipment, null, 2));
    await fs.writeFile(path.join(dataDir, 'bookings.json'), JSON.stringify(bookings, null, 2));

    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log(`   - ${users.length} users`);
    console.log(`   - ${equipment.length} equipment items`);
    console.log(`   - ${bookings.length} bookings`);

    return {
      users: users.length,
      equipment: equipment.length,
      bookings: bookings.length
    };

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};

// Run if called directly
if (require.main === module) {
  seedData()
    .then(result => {
      console.log('🎉 Seeding completed!', result);
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedData;