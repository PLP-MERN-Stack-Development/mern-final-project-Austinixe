# 🍲 9jaKitchen - Nigerian Recipe Platform

A full-stack MERN application for discovering, creating, and sharing authentic Nigerian recipes. Built as a capstone project demonstrating modern web development practices.

![9jaKitchen Banner](https://via.placeholder.com/1200x400/f97316/ffffff?text=9jaKitchen+-+Authentic+Nigerian+Recipes)

## 🌟 Live Demo

- **Frontend:** (https://9jakitchen-frontend.vercel.app)
- **Backend API:** (https://https://ninejakitchen-api.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure JWT-based authentication with registration and login
- 📝 **Recipe Management** - Create, read, update, and delete recipes
- 🖼️ **Image Upload** - Cloud-based image storage with Cloudinary integration
- 🔍 **Search & Filter** - Find recipes by title, category, cooking time, and difficulty
- ❤️ **Favorites System** - Save and organize favorite recipes
- 👤 **User Profiles** - Personal recipe collections and user information
- 📱 **Responsive Design** - Mobile-first approach using Tailwind CSS

### Recipe Features
- Detailed ingredient lists with quantities and units
- Step-by-step cooking instructions
- Category organization (Soups, Rice Dishes, Swallows, Proteins, Snacks, Drinks)
- Cooking time and serving size information
- Difficulty levels (Easy, Medium, Hard)
- Recipe view counter

### Additional Features
- Real-time form validation
- Loading states and error handling
- Protected routes for authenticated users
- Clean and intuitive user interface

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image hosting and management

### Development & Testing
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **Nodemon** - Auto-restart development server
- **dotenv** - Environment variable management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (free tier)
- **Cloudinary Account** (free tier)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Austinixe/9jakitchen-frontend/tree/main/client
cd 9jakitchen
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🔐 Environment Variables

### Backend (.env in server folder)

Create a `.env` file in the `server` directory:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/9jakitchen?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### How to Get MongoDB URI:
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

#### How to Get Cloudinary Credentials:
1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Find credentials on dashboard:
   - Cloud name
   - API Key
   - API Secret

### Frontend (.env in client folder)

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🏃‍♂️ Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Recipe Endpoints

#### Get All Recipes
```http
GET /api/recipes?category=Soups&search=jollof&page=1&limit=12
```

#### Get Single Recipe
```http
GET /api/recipes/:id
```

#### Create Recipe (Protected)
```http
POST /api/recipes
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Jollof Rice",
  "description": "Delicious party jollof",
  "category": "Rice Dishes",
  "ingredients": JSON,
  "instructions": JSON,
  "cookingTime": 45,
  "servings": 6,
  "difficulty": "Medium",
  "image": File
}
```

#### Update Recipe (Protected)
```http
PUT /api/recipes/:id
Authorization: Bearer {token}
```

#### Delete Recipe (Protected)
```http
DELETE /api/recipes/:id
Authorization: Bearer {token}
```

### Favorite Endpoints

#### Get Favorites (Protected)
```http
GET /api/favorites
Authorization: Bearer {token}
```

#### Add to Favorites (Protected)
```http
POST /api/favorites/:recipeId
Authorization: Bearer {token}
```

#### Remove from Favorites (Protected)
```http
DELETE /api/favorites/:recipeId
Authorization: Bearer {token}
```

## 🧪 Testing

### Run All Tests
```bash
cd server
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage
Tests cover:
- User registration and authentication
- Recipe CRUD operations
- Authorization checks
- Input validation
- Error handling

## 🌐 Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Go to [Render Dashboard](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub repository
5. Configure:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment Variables:** Add all .env variables
6. Deploy

### Frontend Deployment (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import GitHub repository
4. Configure:
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** Add `VITE_API_URL`
5. Deploy

### Update Frontend .env
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

## 📁 Project Structure

```
9jakitchen/
├── server/                   # Backend application
│   ├── config/              # Configuration files
│   │   └── cloudinary.js    # Cloudinary setup
│   ├── controllers/         # Route controllers
│   │   ├── authController.js
│   │   ├── recipeController.js
│   │   └── favoriteController.js
│   ├── middleware/          # Express middleware
│   │   ├── auth.js          # JWT verification
│   │   └── errorHandler.js  # Error handling
│   ├── models/              # Mongoose models
│   │   ├── User.js
│   │   ├── Recipe.js
│   │   └── Favorite.js
│   ├── routes/              # API routes
│   │   ├── auth.js
│   │   ├── recipes.js
│   │   ├── favorites.js
│   │   └── users.js
│   ├── __tests__/           # Test files
│   │   ├── auth.test.js
│   │   └── recipe.test.js
│   ├── .env                 # Environment variables
│   ├── server.js            # Entry point
│   ├── seed.js              # Database seeder
│   └── package.json
│
├── client/                  # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx
│   │   │   └── RecipeCard.jsx
│   │   ├── context/         # React context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── RecipeDetail.jsx
│   │   │   ├── CreateRecipe.jsx
│   │   │   ├── MyRecipes.jsx
│   │   │   └── Favorites.jsx
│   │   ├── services/        # API services
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── .env                 # Environment variables
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json
│
└── README.md                # This file
```

## 📸 Screenshots

### Home Page
https://9jakitchen-frontend.vercel.app/

## 🎯 Future Enhancements

- [ ] Recipe ratings and reviews
- [ ] User comments on recipes
- [ ] Follow/unfollow other users
- [ ] Recipe collections/cookbooks
- [ ] Meal planning calendar
- [ ] Shopping list generator
- [ ] Nutritional information
- [ ] Print-friendly recipe format
- [ ] Recipe sharing on social media
- [ ] Advanced search filters (ingredients, dietary restrictions)
- [ ] Video recipe tutorials
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Augustine Omonkaro Salami**
- GitHub:(https://github.com/Austinixe)
- LinkedIn: [Your Name](https://linkedin.com/in/AugustineSalami)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Nigerian cuisine inspiration
- MERN stack community
- Tailwind CSS team
- All contributors and testers

---

**Built with ❤️ for Nigerian food lovers worldwide**

For questions or support, please open an issue or contact the author.










































































# MERN Stack Capstone Project

This assignment focuses on designing, developing, and deploying a comprehensive full-stack MERN application that showcases all the skills you've learned throughout the course.

## Assignment Overview

You will:
1. Plan and design a full-stack MERN application
2. Develop a robust backend with MongoDB, Express.js, and Node.js
3. Create an interactive frontend with React.js
4. Implement testing across the entire application
5. Deploy the application to production

## Getting Started

1. Accept the GitHub Classroom assignment
2. Clone the repository to your local machine
3. Follow the instructions in the `Week8-Assignment.md` file
4. Plan, develop, and deploy your capstone project

## Files Included

- `Week8-Assignment.md`: Detailed assignment instructions

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git and GitHub account
- Accounts on deployment platforms (Render/Vercel/Netlify/etc.)

## Project Ideas

The `Week8-Assignment.md` file includes several project ideas, but you're encouraged to develop your own idea that demonstrates your skills and interests.

## Submission

Your project will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Commit and push your code regularly
2. Include comprehensive documentation
3. Deploy your application and add the live URL to your README.md
4. Create a video demonstration and include the link in your README.md

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [GitHub Classroom Guide](https://docs.github.com/en/education/manage-coursework-with-github-classroom) 