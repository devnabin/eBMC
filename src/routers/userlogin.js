const express = require("express");
const router = express.Router();


//custome module
const signupValidation = require("../modules/signup");
const checkAdmin = require("../modules/check");


//Models
const User = require("../database/Models/user");


//post register
router.post("/register", signupValidation, async (req, res) => {
  try {
    console.log(req.body);
    let obj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body["first-password"] || req.body["second-password"],
    };
    const user = await User(obj);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


//delete user if not validate or confirmation
// delete user by id
router.delete("/register/:id", checkAdmin ,  async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
     throw new error()
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error)
  }
});



//post login
router.post("/login", (req, res) => {
  res.send(req.body);
});

module.exports = router;
