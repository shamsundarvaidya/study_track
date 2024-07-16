const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AppRoute");
const { get_profile_info } = require('./Util/api_util');
const passportConfig = require('./config/passport-config');
require('dotenv').config();

const {PORT, MONGO_URL} = process.env;
const app = express();
app.use(
    cors()
);
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRoute);


mongoose.connect(MONGO_URL,{})
    .then(() => {
        console.log('Conected to DB');
        app.listen(PORT, () =>{
            console.log(`Server listening on port ${PORT}`);
            console.log("Initilizing Broker login");
            get_profile_info();
        });
    })
    .catch((err) => {
        console.error(`Error connecting to DB ${err}`)
    })
