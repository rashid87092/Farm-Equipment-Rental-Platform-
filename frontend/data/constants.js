export const EQUIPMENT = [
  { id: 1, name: "John Deere 5075E Tractor", category: "Tractor", owner: "Ramesh Kumar", location: "Karnal, Haryana", distance: "3.2 km", price: 850, unit: "hour", rating: 4.8, reviews: 124, available: true, img: "🚜", power: "75 HP", fuel: "Diesel", features: ["GPS", "AC Cabin", "Power Steering"] },
  { id: 2, name: "Mahindra Arjun Ultra 605", category: "Tractor", owner: "Suresh Patel", location: "Ludhiana, Punjab", distance: "5.7 km", price: 700, unit: "hour", rating: 4.6, reviews: 89, available: true, img: "🚜", power: "60 HP", fuel: "Diesel", features: ["Power Steering", "4WD"] },
  { id: 3, name: "New Holland TC5.30 Harvester", category: "Harvester", owner: "Vikram Singh", location: "Amritsar, Punjab", distance: "8.1 km", price: 2200, unit: "acre", rating: 4.9, reviews: 67, available: false, img: "🌾", power: "170 HP", fuel: "Diesel", features: ["GPS", "Auto-header", "Yield Monitor"] },
  { id: 4, name: "Kubota MU5502 Tractor", category: "Tractor", owner: "Priya Sharma", location: "Rohtak, Haryana", distance: "2.9 km", price: 750, unit: "hour", rating: 4.7, reviews: 112, available: true, img: "🚜", power: "55 HP", fuel: "Diesel", features: ["Power Steering", "Dual Clutch"] },
  { id: 5, name: "Rotavator MB-135 (7 feet)", category: "Implement", owner: "Anwar Sheikh", location: "Muzaffarnagar, UP", distance: "11.3 km", price: 400, unit: "acre", rating: 4.5, reviews: 45, available: true, img: "⚙️", power: "N/A", fuel: "PTO", features: ["7 Ft Width", "Heavy Duty"] },
  { id: 6, name: "CLAAS Crop Tiger Harvester", category: "Harvester", owner: "Balwinder Gill", location: "Bathinda, Punjab", distance: "15.6 km", price: 2800, unit: "acre", rating: 4.8, reviews: 78, available: true, img: "🌾", power: "200 HP", fuel: "Diesel", features: ["GPS", "Threshing System", "Large Tank"] },
  { id: 7, name: "Fieldking Laser Leveller", category: "Implement", owner: "Tejpal Yadav", location: "Hisar, Haryana", distance: "6.4 km", price: 500, unit: "acre", rating: 4.4, reviews: 33, available: true, img: "📐", power: "N/A", fuel: "PTO", features: ["Laser Guided", "High Precision"] },
  { id: 8, name: "Sonalika DI 750 III Tractor", category: "Tractor", owner: "Manjeet Kaur", location: "Patiala, Punjab", distance: "9.2 km", price: 650, unit: "hour", rating: 4.3, reviews: 56, available: false, img: "🚜", power: "75 HP", fuel: "Diesel", features: ["Power Steering"] },
];

export const BOOKINGS = [
  { id: "BK001", equipment: "John Deere 5075E", date: "24 May 2026", status: "confirmed", amount: 3400, hours: 4 },
  { id: "BK002", equipment: "Rotavator MB-135", date: "21 May 2026", status: "completed", amount: 1600, hours: 4 },
  { id: "BK003", equipment: "Kubota MU5502", date: "18 May 2026", status: "completed", amount: 2250, hours: 3 },
  { id: "BK004", equipment: "CLAAS Crop Tiger", date: "10 May 2026", status: "cancelled", amount: 5600, hours: 2 },
];

export const STATS = [
  { label: "Equipment Listed", value: "12,400+", icon: "🚜" },
  { label: "Active Farmers", value: "85,000+", icon: "👨‍🌾" },
  { label: "States Covered", value: "22", icon: "🗺️" },
  { label: "Acres Served", value: "2.1M+", icon: "🌾" },
];

export const CATEGORIES = ["All", "Tractor", "Harvester", "Implement"];

export const TESTIMONIALS = [
  { name: "Gurpreet Singh", location: "Ludhiana, Punjab", text: "FarmRent saved me ₹2 lakhs in one season. I get top-quality equipment right at my doorstep. The booking is as easy as ordering food online!", rating: 5, crop: "Wheat Farmer" },
  { name: "Kavita Devi", location: "Sonipat, Haryana", text: "As a woman farmer running my own land, FarmRent gave me independence. No more begging neighbours — I book, I farm, I earn.", rating: 5, crop: "Paddy & Mustard" },
  { name: "Mohammad Ayub", location: "Muzaffarnagar, UP", text: "My harvester was sitting idle for 8 months a year. Now it earns ₹80,000 extra annually through FarmRent. Fantastic platform!", rating: 5, crop: "Equipment Owner" },
];

export const WEATHER = {
  temp: 34,
  condition: "Sunny & Clear",
  humidity: 42,
  wind: "12 km/h NW",
  advisory: "Good conditions for harvesting wheat. Low chances of rain for next 5 days.",
};
