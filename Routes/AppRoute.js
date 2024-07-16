const router = require("express").Router();
const {userVerification} = require("../Middlewares/AuthMiddleware");
const { userProfile,updateProfile } = require("../Controllers/AppController");
const { logout,login, register, dashboard } = require("../Controllers/AuthController");

router.post('/login', login);
router.post('/userprofile',userVerification,userProfile);
router.post('/register', register);
router.get("/dashboard",dashboard);
router.post("/logout",logout);
router.post("/update_profile",userVerification,updateProfile);
module.exports = router;

