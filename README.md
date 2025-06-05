### FoodTrace Pro 🌾














**FoodTrace Pro** is a comprehensive food storage management system powered by AI and real-time monitoring. It provides end-to-end traceability, predictive analytics, and intelligent storage optimization for agricultural products.





## 🌟 Key Features

- **📊 Real-time Dashboard** - Live monitoring of storage conditions and system health
- **📦 Inventory Management** - Complete product tracking from farm to consumer
- **🚨 Alert System** - Proactive notifications for quality risks and environmental issues
- **📋 Activity Logging** - Comprehensive record of all storage operations
- **🔍 Supply Chain Traceability** - Full transparency with QR code access
- **🧠 AI-Powered Analytics** - ML models for waste reduction and quality prediction
- **🌡️ Environmental Monitoring** - Real-time temperature, humidity, and air quality tracking
- **📈 Predictive Insights** - Smart recommendations for optimal storage conditions


## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Lucide React icons
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (via Neon)
- **Real-time**: Server-Sent Events (SSE)
- **AI/ML**: Custom prediction models for quality and waste management


## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL database (optional, app works with mock data)


## 🚀 Installation

1. **Clone the repository**


```shellscript
git clone https://github.com/yourusername/foodtrace-pro.git
cd foodtrace-pro
```

2. **Install dependencies**


```shellscript
npm install --legacy-peer-deps
# or
yarn install
```

3. **Set up environment variables**


Create a `.env.local` file in the root directory:

```plaintext
DATABASE_URL=your_neon_database_url_here
```

4. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
```

5. **Open your browser**


Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Setup (Optional)

The application works with mock data by default. To use a real database:

1. **Create a Neon account** at [neon.tech](https://neon.tech)
2. **Create a new project** and get your connection string
3. **Run the SQL scripts** in the `scripts` folder:

1. `01-create-tables.sql` - Creates the database schema
2. `02-seed-data.sql` - Populates the database with sample data





```shellscript
# Connect to your database and run:
psql -h your_host -U your_user -d your_database -f scripts/01-create-tables.sql
psql -h your_host -U your_user -d your_database -f scripts/02-seed-data.sql
```

## 📁 Project Structure

```plaintext
foodtrace-pro/
├── app/
│   ├── components/        # UI components
│   │   ├── dashboard.tsx
│   │   ├── inventory.tsx
│   │   ├── alerts.tsx
│   │   ├── activities.tsx
│   │   ├── analytics.tsx
│   │   ├── traceability.tsx
│   │   └── ml-insights.tsx
│   ├── api/               # API routes
│   │   ├── products/
│   │   ├── alerts/
│   │   ├── activities/
│   │   ├── environmental/
│   │   ├── dashboard/
│   │   ├── ml/
│   │   ├── zones/
│   │   └── realtime/
│   ├── page.tsx           # Main page
│   └── layout.tsx         # App layout
├── components/ui/         # shadcn/ui components
├── lib/                   # Utility functions
│   └── database.ts        # Database connection
├── scripts/               # SQL scripts
│   ├── 01-create-tables.sql
│   └── 02-seed-data.sql
└── public/                # Static assets
```

## 📱 Features Overview

### Dashboard

- System health monitoring
- Storage capacity visualization
- Environmental conditions tracking
- AI-powered insights
- Recent activities feed


### Inventory Management

- Product registration and tracking
- Detailed product information
- Storage history
- Quality assessment


### Alert System

- Expiry warnings
- Environmental alerts
- Pest activity detection
- Priority distribution recommendations


### Activities & Operations

- Activity logging
- Treatment tracking
- Quality inspections
- Environmental adjustments


### Supply Chain Traceability

- Complete journey tracking
- QR code access for consumers
- Transparency reports


### ML Insights

- Waste reduction forecasting
- Quality degradation risk assessment
- Treatment optimization
- Market timing intelligence
- Energy efficiency recommendations


## 🖼️ Screenshots

### Dashboard





### Inventory Management





### ML Insights





## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Neon Database](https://neon.tech/)
- [Tailwind CSS](https://tailwindcss.com/)

---


