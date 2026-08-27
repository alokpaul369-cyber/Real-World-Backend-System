const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Get Profile...........................
const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile retrieved successfully",
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

//Update Profile...........................
const updateProfile = async (req, res) => {
  try {
    const {name, email} = req.body;
    const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    if(name) {
      user.name = name;
    }
    if(email) {
      user.email = email;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    res.status(500).jason({
      message: "Server error",
      error: error.message
    });
  }
};

// Change Password..........................
const changePassword = async (req, res) => {
  try {
    const {currentPassword, newPassword} = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Please provide current password and new password"
      });
    }
    if(newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters"
      });
    }
     const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword, user.password
    );
    if(!isPasswordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect"
      });
    }
    user.password = await bcrypt.hash(newPassword,16);
    await user.save();
    res.status(200).json({
      message: "Password changed successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Delete Account..................................
const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if(!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    await user.deleteOne();
    res.status(200).json({
      message: "Account deleted successfully"
    });
  } catch(error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
};