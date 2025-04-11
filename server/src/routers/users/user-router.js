const express = require('express');
const { httpCreateUser, httpSignInUser } = require('../../controllers/users/user-contoller');
const userRouter = express.Router();

require('dotenv').config();
const UserSchema = require('../../models/users/user'); // *Import the user schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

userRouter.post('/create-user', async(req, res) => {

  const { fullName, phoneNumber, language, password } = req.body;

  //*  Validate request body
  if (!fullName || !phoneNumber || !password) {
    return res.status(400).json({ error : "User validation failed" });
  }

  try {
    //* Check if the user already exists
    const existingUser = await UserSchema.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // * Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // * Create a new user object
    const newUser = new UserSchema({
      name : fullName,
      phoneNumber : phoneNumber,
      preferredLanguage : language,
      password: hashedPassword,
    });

    // * Save the user to the database
    await newUser.save();

    // *Respond with success
    return res.status(201).json({
      message: 'User account created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
})

userRouter.post('/login', async(req, res) => {

    // * Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { phoneNumber, password } = req.body;
  
    try {
      // * Check if the user exists
      const user = await UserSchema.findOne({ phoneNumber });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // * Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // * Generate JWT token
      const token = jwt.sign(
        { userId: user._id, phoneNumber: user.phoneNumber },
        process.env.JWT_SECRET, // * Secret key from environment variables
        { expiresIn: '1h' } // * Token expiry time
      );
  
      // * Respond with token and user info
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ message: 'Server error' });
    }
})

userRouter.get('/get-dummy', (req, res) => {
    return res.status(200).json({
        msg : {
            "id" : 1,
            "name" : "raven"
        }
    })
})

module.exports = { userRouter };