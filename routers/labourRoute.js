const express = require("express");
const Router = express.Router();

const upload = require("../config/multer");

const {
  registerLabour,
  getpendingLabours,
  approveLabour,
  rejectLabour,
  getApprovedLabours,
  getLaboursByCategory,
} = require("../controller/labourController");

// -------------------- Routes --------------------

// Register Labour with Cloudinary profile upload
Router.post("/register", upload.single("profile"), registerLabour);

// Get pending labours
Router.get("/pending", getpendingLabours);

// Approve labour
Router.patch("/:id/approve", approveLabour);

// Reject labour
Router.patch("/:id/reject", rejectLabour);

// Get approved labours
Router.get("/approved", getApprovedLabours);

// Get labours by category
Router.get("/category/:category", getLaboursByCategory);

module.exports = Router;