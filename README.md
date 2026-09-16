# AgriMart - Agricultural E-Commerce Platform

AgriMart is a modern full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It is designed to provide farmers and agricultural businesses a simple and seamless way to purchase seeds, fertilizers, and farming equipment online.

This project includes two separate sections: a customer-facing shop and a secure admin dashboard to manage products and orders.

---

## 🌟 Key Features

**For Users (Customers):**
* Browse agricultural products by category (Seeds, Fertilizers, Machinery, etc.).
* Create an account and log in securely.
* Add items to a shopping cart.
* Checkout and place orders.
* User profile and order history tracking.

**For Admins:**
* Secure Admin Login portal.
* Dashboard to view total orders and revenue.
* Manage products (Add, Edit, Delete).
* View and update customer order statuses.

---

## 💻 Technologies Used

**Frontend:**
* React.js - UI Library
* React Router - Navigation
* CSS3 - Styling (Custom clean design)
* Context API - State Management

**Backend:**
* Node.js - Runtime Environment
* Express.js - Web Framework
* MongoDB & Mongoose - Database & ORM
* JSON Web Tokens (JWT) & bcrypt - Security and Authentication

---

## 🚀 Getting Started

Follow these step-by-step instructions to set up the project on your local machine.

### 1. Prerequisites
Make sure you have the following installed on your computer:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB Compass](https://www.mongodb.com/products/compass) (or MongoDB Atlas for cloud database)

### 2. Clone the Repository
Download or clone the project folder to your local machine:
```bash
git clone https://github.com/jayjaviya/Agrimart.git
cd Agrimart
```

### 3. Backend Setup
Open a terminal and navigate to the backend folder:
```bash
cd backend
```
Install the required dependencies:
```bash
npm install
```
Create a `.env` file in the `backend` folder and add the following lines:
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/agrimart
JWT_SECRET=your_super_secret_key_here
```
Start the backend server:
```bash
node server.js
```
*(The backend will run on http://localhost:5001)*

### 4. Frontend Setup
Open a **new** terminal window and navigate to the frontend folder:
```bash
cd frontend
```
Install the required dependencies:
```bash
npm install
```
Start the React application:
```bash
npm run dev
```
*(The frontend will open in your browser at http://localhost:5173)*

---

## 👨‍💻 Default Admin Credentials
To access the admin dashboard, you can use the default seeded credentials (or create your own using the seeder script):
* **Admin URL:** `http://localhost:5173/admin/login`
* **Email:** `jdjaviya98790@gmail.com`
* **Password:** `jayid@026`

*(Note: To insert dummy products into the database for testing, you can run `node seedMoreProducts.js` inside the backend folder).*

---

## 📚 Folder Structure (For Beginners)
* **`/backend`**: Contains all server-side code (APIs, Database Models, Routes, and Security logic).
* **`/frontend`**: Contains all client-side code (React Components, Pages, Styles, and Context).

---
*Created by Jay Javiya*
