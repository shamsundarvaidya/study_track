const User = require("../Models/UserModel");
const { ERROR_CODE } = require("../responseCodes");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");
const passport = require('passport');


module.exports.login = async  (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ success: false, message: 'Invalid username or password' });
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true, message: 'Logged in successfully', user: { username: user.username } });
    });
  })(req, res, next);
}

  module.exports.register = async (req, res) => {

  const { username, password,email } = req.body;
  console.log(username,email);
  try {
    const user = new User({ username,email });
    await User.register({user,email}, password);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
  }

  module.exports.dashboard = (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ success: false, message: 'Unauthorized' });
    res.json({ success: true, message: `Welcome ${req.user.username}` });
  }

  module.exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to log out' });
      }
      res.json({ success: true, message: `Logged out  successfully` });
    });
  }