const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports={protect};