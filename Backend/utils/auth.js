const jwt = require("jsonwebtoken");
var secret = "cmpelab2";
exports.createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   console.log("jwt here")
   return jwt.sign(payload, secret, {
     expiresIn: duration,
   });
};