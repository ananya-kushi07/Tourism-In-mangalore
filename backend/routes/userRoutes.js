const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

router.post('/signup', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User created successfully', user: newUser });
}));


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('username').notEmpty().withMessage('Username is required'),
  ], asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, username } = req.body;
  

    const user = await User.findOne({ email });
    if (!user || user.username !== username) {
      return res.status(400).json({ message: 'Invalid email or username' });
    }
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
  }));
  

router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
}));

module.exports = router;
