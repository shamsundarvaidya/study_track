
module.exports.userProfile = (req, res,) => { 
  let payload = {};
  payload.username = req.user.username;
  payload.email = req.user.email;
  payload.firstname = req.user.firstname;
  res.json({ success: true, payload });
}

module.exports.updateProfile = async (req, res, next) => {
    try {
      //console.log(req.body);
      const {username,firstname,lastname,contact_number} = req.body;
      //Verify the email sent and email as per the auth token are same
      req.user.updatedAt = new Date();
      req.user.firstname = firstname?firstname:req.user.firstname;
      req.user.lastname = lastname? lastname: req.user.lastname;
      req.user.contact_number = contact_number?contact_number:req.user.contact_number;
      const response = await req.user.save();
      res.json({status:true,data:response});
      
    } catch (error) {
      console.error(error);
      res.json({status:false})
    }
  };