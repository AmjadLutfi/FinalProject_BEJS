const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['accesstoken'];
  if (!token) {
    return res.status(403).send({ error: "Unauthorized", message: "Please login first" });
  }
  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Unauthorized", message: "Invalid token" });
    }
    req.user = {
      id : decoded.id,
      role : decoded.role
    }
    next();
  });
};

module.exports = authMiddleware;