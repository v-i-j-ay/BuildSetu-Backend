const express=require("express");
const Router=express.Router();

const upload=require("../uploads/multer")

const {registerLabour,getpendingLabours,approveLabour,rejectLabour,getApprovedLabours,getLaboursByCategory}=require("../controller/labourController");

Router.post("/register", upload.single("profile"), registerLabour);

Router.get("/pending", getpendingLabours);

Router.patch("/:id/approve", approveLabour);

Router.patch("/:id/reject", rejectLabour);

Router.get("/approved", getApprovedLabours);

Router.get("/category/:category", getLaboursByCategory);



module.exports=Router;