const jwt = require("jsonwebtoken");



module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.userToken, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
      console.log("authentication error")
      res.status(401).json({verified: false});
    } else {
      console.log("authenticated!")
      req.jwtpayload = payload
      next();
    }
  });
}