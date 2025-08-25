# Express Mobile Check-In Application

A modern, enterprise-grade Angular application for managing employee check-ins and check-outs across multiple locations.

## 🚀 Features

- **Check-In/Check-Out Management**: Complete workflow for recording employee arrivals and departures
- **Multi-Location Support**: Support for offices, warehouses, retail stores, and other facility types
- **Real-time Dashboard**: Comprehensive overview with statistics and recent activity
- **User Management**: Employee profiles with department and position tracking
- **History Tracking**: Complete audit trail of all check-in/check-out activities
- **Responsive Design**: Mobile-first design that works on all devices
- **Material Design**: Modern UI components following Google's Material Design guidelines

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20.1.0
- **UI Components**: Angular Material 20.1.5
- **State Management**: NgRx Store
- **Styling**: SCSS with CSS Custom Properties
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📱 Application Structure

```
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       ├── api.service.ts          # HTTP client and API handling
│   │       └── checkin.service.ts      # Check-in business logic
│   ├── modules/
│   │   ├── checkin/                    # Check-in functionality
│   │   ├── checkout/                   # Check-out functionality
│   │   ├── dashboard/                  # Main dashboard
│   │   ├── history/                    # Activity history
│   │   ├── confirmation/               # Success confirmations
│   │   ├── profile/                    # User profile management
│   │   └── settings/                   # Application settings
│   ├── shared/
│   │   └── components/
│   │       └── navigation/             # Bottom navigation
│   └── store/                          # NgRx state management
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v20 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd express-mobile-checkin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📋 API Services

The application includes dummy API services for demonstration purposes:

### Check-In Service
- `getLocations()`: Retrieve available locations
- `getUsers()`: Get employee list
- `performCheckin()`: Record a check-in
- `performCheckout()`: Record a check-out
- `getCheckinHistory()`: Get activity history
- `getCurrentUser()`: Get current user information

### Sample Data
The application includes sample data for:
- 4 different locations (offices, warehouses, retail stores)
- 3 sample employees
- Mock check-in/check-out history

## 🎨 Design System

### Color Palette
- **Primary**: #1976d2 (Blue)
- **Accent**: #ff4081 (Pink)
- **Success**: #4caf50 (Green)
- **Warning**: #ff9800 (Orange)
- **Error**: #f44336 (Red)

### Typography
- **Font Family**: Roboto
- **Base Size**: 16px
- **Line Height**: 1.5

### Spacing
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

## 📱 Responsive Design

The application is designed to work seamlessly across all device sizes:

- **Desktop**: Full-featured interface with side-by-side layouts
- **Tablet**: Optimized touch interface with larger touch targets
- **Mobile**: Mobile-first design with bottom navigation

## 🔧 Configuration

### Environment Variables
Create a `src/environments/environment.ts` file for production configuration:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/v1',
  appName: 'Express Mobile'
};
```

### Material Design Theme
The application uses Angular Material's Indigo-Pink theme by default. Custom themes can be configured in `src/styles.scss`.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run e2e
```

## 📦 Deployment

### Build for Production
```bash
npm run build --prod
```

### Deploy to Static Hosting
The built application can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core check-in/check-out functionality
- **v1.1.0**: Added dashboard and statistics
- **v1.2.0**: Enhanced UI/UX and responsive design
- **v1.3.0**: Added history tracking and user management

---

**Built with ❤️ using Angular and Material Design**
