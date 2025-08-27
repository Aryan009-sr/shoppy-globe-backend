# Shoppy-globe-backend

🛒 ShoppyGlobe Backend

Backend for ShoppyGlobe E-commerce App built with Node.js, Express, and MongoDB.
Includes authentication, product CRUD, and cart management with JWT protection.

.

🚀 Features

User Registration & Login with JWT Authentication

Products: Create, Read, Update, Delete

Cart: Add, Update, Remove, Get

MongoDB integration with seed script for sample products

ThunderClient tested with screenshots included

⚙️ Steps to Run the Project

1. Clone Repository:
https://github.com/Aryan009-sr/shoppy-globe-backend.git
cd shoppy-globe-backend

2. install dependencies:
command: npm install

3. Create a .env file in the root (use .env.example as reference):

env:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shoppyglobe
JWT_SECRET=supersecret_change_me
JWT_EXPIRES_IN=7d

4. Seed the Database:
command: npm run seed
Note: Check MongoDB Compass → database shoppyglobe → products collection.

5. Start the server:
command: npm run dev


API ENDPOINTS:
API Endpoints
🔐 Auth

POST /register → Register new user

POST /login → Login and receive JWT

📦 Products

GET /products → Fetch all products

GET /products/:id → Fetch product by ID

POST /products → Add product (protected)

PUT /products/:id → Update product (protected)

DELETE /products/:id → Delete product (protected)

🛒 Cart (Protected)

POST /cart → Add product to cart

PUT /cart/:productId → Update product quantity

DELETE /cart/:productId → Remove product from cart

GET /cart → Get user’s cart

Use header for protected routes:

Authorization: Bearer <your_token>

🌱 Seeding Explained

The npm run seed command:

Connects to MongoDB

Inserts predefined sample products

Allows you to test cart & product APIs immediately without creating products manually

📸 Screenshots

Auth (Register & Login)

Products (CRUD)

Cart (Add, Update, Delete, Fetch)

MongoDB Compass views

All included in the screenshots/ folder.

👨‍💻 AuthoR: Developed by Prakhar Singh
