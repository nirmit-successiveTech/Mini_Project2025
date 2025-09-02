#  HungerHub

HungerHub is a community-driven platform that connects people, NGOs, and restaurants to reduce food waste and fight hunger. The platform enables users to donate surplus food, receive meals, and purchase food online, creating a hybrid solution that merges social good with modern food services.

##  Key Features

### 1. Food Donation & Sharing
- Users can donate extra food (home-cooked, restaurant leftovers, or packaged).
- Others in need can browse and claim available food items.
- Donation posts include title, description, image, and status (available/claimed).
- Status updates in real time via GraphQL subscriptions or live updates.

### 2. NGO-like Mail Service
- Donors get customized email notifications (using Nodemailer).
- Email confirmations for the requested food items.
- Helps create a professional NGO-like experience.

### 3. Online Food Ordering (Restaurant Integration)
- Users can buy food online from partnered restaurants.
- Secure payments powered by Stripe.
- Supports multiple payment methods (cards, UPI, wallets).

### 4. Core Features
- Custom Mail to donor on requested food items.
- Stripe payment to buy new food.
- Real time notification on new food items being added.

### 5. General Features
- Pagination to limit data.
- Toast notification.
- Context to store maintain user session.
- Jwt token to create user session.
- Password hashing to encrypt data.
- Cookies to create user session.


##  Tech Stack

**Frontend**: Next.js (App Router) + Tailwind CSS + Axios  
**Backend**: Node.js + Express + MongoDB  
**API**: GraphQL + REST (hybrid)  
**Auth**: JWT-based authentication  
**Payments**: Stripe API integration  
**Emails**: Nodemailer for  emails  




##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A running [MongoDB](https://www.mongodb.com/) instance (local or on a cloud service like MongoDB Atlas)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Recommended GUI for MongoDB)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nirmit-successiveTech/Mini_Project2025.git
   cd mini_project_2025
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
    Already done in step 2.
   ```

###  Configuration (Environment Variables)

This project requires environment variables to be set up.

#### Backend (/frontend/.env)
Create a .env file in the /frontend directory and add the following variables.
```bash


# Port for the backend server
PORT=8000

# Your MongoDB connection string
MONGO_URI=mongodb://localhost:27017/hungerhub
Note:
Please replace the connection string with your local connection string.


# Stripe secret key for payments
PORT=8000;
STRIPE_KEY=sk_test_51S0KDLHlUrORvkPrJH6BHOoRquVmWuF00UIahQ7qWRwJYmiKJ51L0HAFjnBBtpyqMIZMcIKgahNaQ4mo7Bb2mPtW00p6eIpdVe

// Send grip keys for email
SEND_GRIDS=
SEND_GRID_USER=

Note:
The above secret key has not been included as it is against privacy policy.

```



###  Running the Application

#### Backend Server
To start the backend server, navigate to the /frontend/src/backend directory and run:
```bash
npm run backend
```
The server will start on the port specified in your .env file (e.g., http://localhost:8000).

#### Frontend Development Server
To start the frontend React application, navigate to the /frontend directory and run:
```bash
npm run dev
```
The application will open in your browser at http://localhost:3000.


