const express = require("express");
const Router = express.Router();


const upload = require("../config/multer");

const {
  registerContractor,
  getpendingContractors,
  approveContractor,
  rejectContractor,
  getApprovedContractors,
  getContractorsByCategory,
} = require("../controller/contractorController");

// -------------------- Routes --------------------

// Register Contractor with Cloudinary profile upload
Router.post("/register", upload.single("profile"), registerContractor);

// Get pending contractors
Router.get("/pending", getpendingContractors);

// Approve contractor
Router.patch("/:id/approve", approveContractor);

// Reject contractor
Router.patch("/:id/reject", rejectContractor);

// Get approved contractors
Router.get("/approved", getApprovedContractors);

// Get contractors by category
Router.get("/category/:category", getContractorsByCategory);

module.exports = Router;