const mongoose=require("mongoose");

const ContractorSchema=new mongoose.Schema({
 name: String,
  email: String,
  phone: String,
  category: String,
  experience: Number,
  location: String,
  profile: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports=mongoose.model("Contractor",ContractorSchema);