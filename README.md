# 🚜 FarmRent - Farm Equipment Rental Platform

A comprehensive web application connecting farmers with equipment owners, making farming equipment accessible, affordable, and available when needed.

## ✨ Features

### 🌾 For Farmers
- **Equipment Search & Discovery**: Find nearby equipment with location-based search
- **Smart Booking System**: Book equipment by hour or per acre with transparent pricing
- **Real-time Availability**: Check equipment availability with calendar integration
- **Secure Payments**: Multiple payment options including mobile payments
- **Review System**: Rate and review equipment owners
- **Dashboard**: Track bookings, payments, and farming activities

### 🚜 For Equipment Owners
- **Equipment Listing**: List tractors, harvesters, and other farming equipment
- **Pricing Management**: Set flexible pricing (hourly/per acre)
- **Booking Management**: Accept/reject booking requests
- **Revenue Tracking**: Monitor earnings and booking statistics
- **Calendar Integration**: Manage equipment availability

### 🌟 Core Features
- **Responsive Design**: Mobile-first design for smartphone accessibility
- **Multi-language Support**: English and Hindi language options
- **Interactive Maps**: Leaflet integration for location services
- **Real-time Notifications**: Push notifications for bookings and updates
- **Live Chat Support**: Real-time customer support
- **Weather Integration**: Agricultural weather alerts
- **Educational Resources**: Farming tips and best practices
- **GPS Location**: Automatic location detection

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Key Dependencies
- **React Leaflet** - Interactive maps
- **Date-fns** - Date manipulation
- **React Calendar** - Calendar component
- **Socket.io Client** - Real-time communication

## 🚀 Getting Started

### Project Layout

- `src/` - React frontend
- `backend/` - Express API and file-based data store
- `public/` - Static frontend assets served by Vite

### Running the App

1. Start the backend API:
```bash
npm run dev:server
```

2. Start the frontend app:
```bash
npm run dev
```

The frontend now proxies API requests to the backend, so both parts behave like one full-stack project in local development.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Farm_rental
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Mobile-First Design

The application is designed mobile-first to ensure optimal experience on smartphones, which are more accessible to farmers in rural areas.

### Key Mobile Features
- Touch-friendly interface
- Optimized for slower internet connections
- Offline-capable booking forms
- SMS and WhatsApp integration
- Voice search capabilities (planned)

## 🌍 Localization

Currently supports:
- **English** - Primary language
- **Hindi** - हिन्दी support for Indian farmers

Additional regional languages can be easily added through the translation system.

## 🔐 Security Features

- JWT-based authentication
- Secure payment processing
- Data encryption
- User verification system
- Anti-fraud measures
- GDPR compliance

## 📊 Analytics & Monitoring

- User behavior tracking
- Equipment utilization analytics
- Revenue analytics for owners
- Performance monitoring
- Error tracking and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Indian farming community for inspiration
- Open source contributors
- Agricultural technology innovators

## 📞 Support

For support and queries:
- Email: support@farmrent.com
- Phone: +91 1800-FARMRENT
- Live Chat: Available on website

## 🗺 Roadmap

### Phase 1 (Current)
- [x] Basic equipment listing and booking
- [x] User authentication and profiles
- [x] Payment integration
- [x] Mobile responsive design

### Phase 2 (Planned)
- [ ] Advanced search filters
- [ ] Equipment tracking with GPS
- [ ] Insurance integration
- [ ] Mobile app development

### Phase 3 (Future)
- [ ] AI-powered equipment recommendations
- [ ] Blockchain-based smart contracts
- [ ] Drone and precision agriculture tools
- [ ] Carbon footprint tracking

---

**Made with ❤️ for Indian farmers**
