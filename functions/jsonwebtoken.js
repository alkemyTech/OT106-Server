require('dotenv').config();
const jwt = require('jsonwebtoken');
const getTokenFrom = require('./get-token-from');

module.exports = {
  generateAccesToken: (user) => {
    if (!user.role || !user.id || !user.username) return null; // access denied, it returns null

    const userForToken = {
      username: user.username,
      role: user.role,
      id: user.id
    };

    const token = jwt.sign(userForToken, process.env.ACCESS_SECRET, { expiresIn: 60 * 60 * 24 });

    return token; // it returns token
  },

  validateToken: (req) => {
    const token = getTokenFrom(req);

    if (!token) return null; // if req not contains role or token returns null

    try {
      const user = jwt.verify(token, process.env.ACCESS_SECRET);

      return user; // it returns payload: user
    } catch (err) {
      return null; // returns null if err
    }
  }
};
