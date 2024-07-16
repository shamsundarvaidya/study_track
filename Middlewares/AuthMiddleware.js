const User = require("../Models/UserModel");
require("dotenv").config();
const { ERROR_CODE } = require("../responseCodes");

module.exports.userVerification = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(401).json({ success: false, message: 'Unauthorized' });
  
  console.log({ success: true, message: ` ${req.user.username} is authenticated` });
  next();

}


