const express = require("express");
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// Delete Account
router.delete("/profile", protect, deleteAccount);

module.exports = router;