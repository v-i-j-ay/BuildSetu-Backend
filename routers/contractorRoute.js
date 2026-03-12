const express=require("express");
const Router=express.Router();

const upload=require("../uploads/multer");

const {registerContractor,getpendingContractors,approveContractor,rejectContractor,getApprovedContractors,getContractorsByCategory}=require("../controller/contractorController");

Router.post("/register",upload.single("profile"),registerContractor);


Router.get("/pending", getpendingContractors);

Router.patch("/:id/approve", approveContractor);

Router.patch("/:id/reject", rejectContractor);

Router.get("/approved", getApprovedContractors);

Router.get("/category/:category", getContractorsByCategory);

module.exports=Router;