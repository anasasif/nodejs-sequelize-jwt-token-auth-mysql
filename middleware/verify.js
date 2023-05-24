const jwt = require("jsonwebtoken");
const fs = require('fs');
const publicKey = fs.readFileSync('./public.key', 'utf8');

module.exports = {

  isTokenValid: (req, res, next) => {
    const token = req.headers['x-authorization']
    if (token) {
      try {
        const tokenb = token?.split(' ')[1];
        const decoded = jwt?.verify(token, publicKey, { issuer: 'innovation', expiresIn: '1h', algorithm: ["RS256"] });
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(400).send({
          error: 'Token is invalid',
        });
      }
    } else {
      return res.status(400).send({
        error: 'Token required',
      });
    }
  },

};