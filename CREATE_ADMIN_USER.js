/**
 * Admin User Creation Guide
 * Assignment 3 - Part II requirement: Hardcode Admin role credentials in MongoDB
 * 
 * Follow these steps to create an admin user:
 */

// METHOD 1: Using MongoDB Compass (GUI)
// 1. Open MongoDB Compass
// 2. Connect to your MongoDB Atlas cluster
// 3. Navigate to your Portfolio database
// 4. Go to the "users" collection
// 5. Click "INSERT DOCUMENT"
// 6. Use this template (replace with your details):

{
  "name": "Your Admin Name",
  "email": "your.admin@domain.com",
  "password": "$2b$12$...", // You need to hash your password first (see below)
  "isAdmin": true,
  "created": ISODate(),
  "updated": ISODate()
}

// METHOD 2: Using MongoDB Shell
// 1. Open MongoDB shell or use Atlas web shell
// 2. Switch to your database: use Portfolio
// 3. Run this command (replace with your details):

db.users.insertOne({
  name: "Your Admin Name",
  email: "your.admin@domain.com", 
  password: "$2b$12$...", // Hashed password
  isAdmin: true,
  created: new Date(),
  updated: new Date()
});

// METHOD 3: Hash Your Password First
// Since passwords must be hashed, you can use this Node.js script to generate a hash:

/*
const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  const hashedPassword = await bcrypt.hash(plainPassword, 12);
  console.log('Hashed password:', hashedPassword);
};

// Replace 'your_secure_password' with your actual password
hashPassword('your_secure_password');
*/

// METHOD 4: Using the Registration API then Update
// 1. Use the signup form to create a regular account
// 2. Then update the user in MongoDB to set isAdmin: true
// 3. Find your user: db.users.findOne({email: "your.email@domain.com"})
// 4. Update: db.users.updateOne({email: "your.email@domain.com"}, {$set: {isAdmin: true}})

// IMPORTANT SECURITY NOTES:
// - Never commit real passwords to Git
// - Use strong passwords for admin accounts
// - Consider using environment variables for admin credentials in production
// - The admin credentials are hardcoded in the database, not in the code

// TESTING YOUR ADMIN USER:
// 1. Start your application: npm run dev
// 2. Go to http://localhost:5173/signin
// 3. Login with your admin credentials
// 4. You should be redirected to the dashboard
// 5. You should see admin-only features like:
//    - Admin link in navigation
//    - CRUD operations for contacts, projects, qualifications
//    - Different dashboard view for admin users

export default null; // This file is for documentation only
