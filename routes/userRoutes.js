const express = require("express");
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  adminDashboard,
  uploadProfileImage
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// Delete Account
router.delete("/profile", protect, deleteAccount);

// Admin Dashboard
router.get("/admin", protect, admin, adminDashboard);

// Profile Image
router.post("/profile-image", protect, upload.single("image"), uploadProfileImage);

module.exports = router;