const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

console.log(process.env);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define the User schema
const UserSchema = new mongoose.Schema({
  title: String,
  detail: String
});

// Create the User model
const UserModel = mongoose.model("users", UserSchema);

// Endpoint to get all users
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then(users => {
      res.json({
        msg: "THE OUTPUT IS HERE",
        users: users
      });
    })
    .catch(err => {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "An error occurred while fetching users." });
    });
});

// Start the server
app.listen(3002, () => {
  console.log("Server is up on port 3002");
});
