const express = require("express");
const router = express.Router();
const User = require("../database/Models/user");

//find all user
router.get("/user/users", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});


//find user by nickname
router.get("/user/:name", async (req, res) => {
  try {
    const user = await User.findOne({ nickname: `${req.params.name}` });
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// // delete user by nickname
// router.delete("/user/:id",  async (req, res) => {
//   try {
//     const user = await User.findByIdAndRemove(req.params.id);
//     if(!user){
//       throw new Error('user not found')
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error)
//   }
// });

router.delete("/user/:nickname", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      nickname: `${req.params.nickname}`,
    });
    // const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      throw new Error("user not found");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
