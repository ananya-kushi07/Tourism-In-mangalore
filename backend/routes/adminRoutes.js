
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;
