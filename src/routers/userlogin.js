const express = require("express");
const validator = require("validator");
const router = express.Router();

//custome module
const signupValidation = require("../modules/signup");
const sendCode = require("../modules/sendingCode");

//Models
const User = require("../database/Models/user");

//validate user info
router.post("/validate", signupValidation, (req, res) => {
  const isEmail =  validator.isEmail(req.body.email);
  if(!isEmail) return res.status(404).send({error : 'This email is not valid'})
  sendCode(req.body.email , (code)=>{
    if(code){
      res.send({code})
    }else{
      res.status(300).send()
    }
  })
  // let code;
  // randomStrings(8, (args) => {
  //   code = args;
  // });
  // if (code) {
  //   res.send({ code });
  // } else {
  //   res.status(300).send({ error: "Server Error" });
  // }
});



//resend Verification code
router.post("/resendcode",signupValidation, (req, res) => {
   const isEmail =  validator.isEmail(req.body.email);
   if(!isEmail) return res.status(404).send({error : 'This email is not valid'})
   sendCode(req.body.email , (code)=>{
     if(code){
       res.send({code})
     }else{
       res.status(300).send()
     }
   })
});




//post register
router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    let obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body["first-password"] || req.body["second-password"],
    };
    const user = await User(obj);
    await user.save();
    const token = await user.tokenAuth();
    res.status(201).send({user , token});
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post("/login", async (req, res) => {
  try {
    // console.log(req.body)
    const user = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.tokenAuth();
    // const user = userlog.hidedata();  //Old way to hide data
    res.status(200).send({ user  , token });
  } catch (error) {
    res.status(404).send(error);
  }
});



module.exports = router;
