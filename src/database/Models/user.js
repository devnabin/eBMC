const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pic: {
      type: Buffer,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    bio: {
      type: String,
      minlength: 20,
    },
    age: {
      type: Number,
    },
    popularity: [
      {
        nofollower: {
          type: Number,
        },
        nofollowing: {
          type: Number,
        },
        followers: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        following: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
//1. jwt for after registration and login 
userSchema.methods.tokenAuth = async function(){
  const token = jwt.sign({ _id : this._id.toString()} , process.env.Scode)
  this.tokens = this.tokens.concat({token})
  await this.save()
  return token;
}

// 2 .Finding login user
userSchema.statics.findbyCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user)
  if (!user) throw new error("Unable to login");
  //   const isMatch = await bcrypt.compare(password, user.password);
  //   if (!isMatch) throw new error("unable to login");
  return user;
};



const User = mongoose.model("user", userSchema);

module.exports = User;
