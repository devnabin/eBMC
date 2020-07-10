const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator= require('validator')
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
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
      validate(value){
        if(!validator.isEmail(value)){
      throw new Error('Email is invalid or not available')
        }
      }
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("password contain that word password");
        }
      },
    },
    bio: {
      type: String,
      minlength: 20,
    },
    age: {
      type: Number,
    },
    popularity: [
      [
        {
          nofollower: {
            type: Number,
          },
        },
      ],
      [
        {
          nofollowing: {
            type: Number,
          },
        },
      ],
      [
        {
          followers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
      [
        {
          following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
        },
      ],
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
userSchema.methods.tokenAuth = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.Scode);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// 2 .Finding login user
userSchema.statics.findbyCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new error("Unable to login , User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new error("unable to login , password is incorrect");
  return user;
};

// 3. hasing password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

//4.deleting property before sending
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.tokens;
  return obj;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
