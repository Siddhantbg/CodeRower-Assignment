# CodeRower Assignment - Configuration Management Platform

![CodeRower Platform](https://github.com/Siddhantbg/CodeRower-Assignment/blob/main/assets/ss.png)

> A modern full-stack configuration management platform built as part of the CodeRower Software Pvt Ltd developer assessment.

**Author**: Siddhant Bhagat  
**Institution**: University Student  
**Assignment**: Full-Stack Software Developer Trainee Position  

## 🚀 Project Overview

This project demonstrates a complete full-stack application with a beautiful purple gradient UI, smooth GSAP animations, and real-time MongoDB integration. Built using modern web technologies, it showcases professional development practices and clean architecture.

### ✨ Key Features

- **Modern React Frontend** with Vite for lightning-fast development
- **Beautiful UI Design** with Tailwind CSS and purple gradient theme
- **Smooth Animations** using GSAP for professional user experience
- **REST API Backend** with Express.js and MongoDB integration
- **Responsive Design** that works perfectly on all devices
- **Real-time Data** fetching and updating with proper error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animation library
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **React Hook Form** - Performant form library
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with company-provided connection
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **ES6 Modules** - Modern JavaScript module system

## 📁 Project Structure

```
Codeware-Assignment/
├── backend/                     # Node.js Express API
│   ├── config/
│   │   └── database.js         # MongoDB connection setup
│   ├── controllers/
│   │   └── configurationController.js  # Business logic
│   ├── models/
│   │   └── Configuration.js    # MongoDB schema
│   ├── routes/
│   │   └── configurations.js   # API routes
│   ├── middleware/
│   │   └── errorHandler.js     # Error handling middleware
│   ├── server.js              # Express server entry point
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables
├── frontend/                   # React Vite application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Layout.jsx     # Main layout wrapper
│   │   │   ├── Navigation.jsx # Navigation component
│   │   │   └── Loader.jsx     # KrizPay-style loader
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── FetchConfig.jsx # Configuration fetching
│   │   │   └── UpdateRemark.jsx # Remark updating
│   │   ├── services/          # API service layer
│   │   │   └── api.js         # Axios configuration
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useGSAP.js     # GSAP animation hooks
│   │   ├── utils/             # Utility functions
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind configuration
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Siddhantbg/Codeware-Assignment.git
   cd Codeware-Assignment
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cd ../backend
   # Create .env file with:
   MONGODB_URI=mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/database
   PORT=8080
   NODE_ENV=development
   ```

### 🏃‍♂️ Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server will run on http://localhost:8080
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   # App will run on http://localhost:5173
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## 🌐 API Endpoints

### GET `/api/configurations/:id`
- **Purpose**: Fetch configuration data by ID
- **Response**: 2D array of configuration data
- **Example**: `GET /api/configurations/qwertyuiop`

### PUT `/api/configurations/:id`
- **Purpose**: Update configuration remark
- **Request Body**: `{ "remark": "Your remark here" }`
- **Response**: `{ "message": "success" }`

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Select the `frontend` folder as the root directory
3. Deploy with default Vite settings

### Backend (Render)
1. Connect your GitHub repository to Render
2. Select the `backend` folder as the root directory
3. Add environment variables:
   - `MONGODB_URI`
   - `PORT=8080`
   - `NODE_ENV=production`

## 🎨 Features Showcase

### 🎭 Beautiful UI Design
- Purple gradient theme throughout the application
- Glass morphism effects and modern card designs
- Responsive layout that works on all screen sizes
- Professional typography and spacing

### ⚡ Smooth Animations
- Page transition animations with GSAP
- Interactive hover effects on buttons and cards
- Form input focus animations
- Results reveal animations with stagger effects

### 🔧 Technical Excellence
- Clean, modular code architecture
- Proper error handling and user feedback
- Real-time API integration with MongoDB
- Modern ES6+ JavaScript throughout

## 🎯 Assignment Requirements

### ✅ Backend Requirements
- [x] REST API with Express.js
- [x] MongoDB integration using provided connection string
- [x] GET endpoint returning 2D array data
- [x] PUT endpoint for updating remarks
- [x] Proper error handling and validation

### ✅ Frontend Requirements
- [x] Modern UI consuming REST endpoints
- [x] Configuration fetching page with form
- [x] Remark updating page with validation
- [x] Responsive design and user experience
- [x] Creative design and animations (bonus points)

## 🏆 Bonus Features Implemented

- **Professional Design**: Purple gradient theme with modern UI components
- **GSAP Animations**: Smooth transitions and micro-interactions
- **Advanced Error Handling**: Comprehensive error states and user feedback
- **Performance Optimization**: Lazy loading and optimized animations
- **Code Quality**: Clean, maintainable, and well-documented code

## 📧 Contact

**Siddhant Bhagat**  
University Student  
Email: siddhantbg005@gmail.com  
GitHub: [@Siddhantbg](https://github.com/Siddhantbg)
