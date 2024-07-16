// config/passport-config.js
const passport = require('passport');
const User = require('../Models/UserModel');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
