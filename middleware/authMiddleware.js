const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated and has the required role
const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Decode the token and verify it
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      // console.log(decoded)
      req.user = decoded.userId;
      // Attach the user information to the request object
      req.user = { id: decoded.userId, role: decoded.role };

      // Check role if required
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: `Access denied: Requires ${requiredRole} role` });
      }

      next();
    } catch (err) {
      console.error('JWT Verification Error:', err.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
