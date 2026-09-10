const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password:{
      type: String,
      required: true,
      minlength: 8
    },
    role:{
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    profileImage: {
      url: {
        type: String,
        default: ""
      },
      publicId: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: true
  }
);
const User = mongoose.model("User", userSchema)
module.exports = User;