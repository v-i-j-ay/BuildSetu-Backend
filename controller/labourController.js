const Labour = require("../model/Labour");
const sendEmail = require("../config/mail");

const registerLabour = async (req, res) => {
  try {
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
    const { name, email, phone, category, experience, location } = req.body;

    // Cloudinary upload path (req.file is handled by multer-storage-cloudinary)
     const profile = req.file ? req.file.path : "";
    const public_id = req.file ? req.file.filename : "";


    const labour = await Labour.create({
      name,
      email,
      phone,
      category,
      experience,
      location,
      profile, // now stores Cloudinary URL
      public_id 
    });
      
     res.status(201).json({ message: "Labour registered successfully", labour });

    // ---- Email to admin ----
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Registration on BuildSetu",
      `<div style="font-family:Arial,sans-serif;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">
          <h2 style="color:#2c3e50">New Registration Alert</h2>
          <p>A new user has registered on <b>BuildSetu</b>.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:15px">
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Name</b></td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Email</b></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Category</b></td><td style="padding:8px;border:1px solid #ddd">${category}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><b>Location</b></td><td style="padding:8px;border:1px solid #ddd">${location}</td></tr>
          </table>
          <br/>
          <p>Please review this profile in the admin dashboard.</p>
          <hr/>
          <small style="color:gray">BuildSetu Admin Notification System</small>
        </div>
      </div>`
    );

    // ---- Email to user ----
    await sendEmail(
      email,
      "BuildSetu – Profile Submitted Successfully",
      `<div style="font-family:Arial,sans-serif;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">
          <h2 style="color:#2c3e50">BuildSetu</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Thank you for registering on <b>BuildSetu</b>.</p>
          <p>Your profile has been successfully submitted and is currently <b>under review</b> by our admin team.</p>
          <p>Once approved, it will be visible to contractors and employers.</p>
          <br/>
          <p>Best Regards,<br><b>BuildSetu Team</b></p>
          <hr/>
          <small style="color:gray">This is an automated email. Please do not reply directly.</small>
        </div>
      </div>`
    );

   
  } catch (error) {
    console.error("Labour registration error:", error);
    res.status(500).json({ message: error.message, stack: error.stack });
  }
};

const getpendingLabours=async(req,res)=>{
  try{
    const labours=await Labour.find({status:"pending"});

    res.status(200).json(labours);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};

const approveLabour = async (req, res) => {
  try {

    const labour = await Labour.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!labour) {
      return res.status(404).json({ message: "Labour not found" });
    }

   
    res.json({
      message: "Labour approved successfully",
      labour
    });

   
    sendEmail(
      labour.email,
      "BuildSetu – Profile Approved 🎉",
      `
      <div style="font-family:Arial;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">
          <h2 style="color:#2c3e50">BuildSetu</h2>
          <p>Hello <b>${labour.name}</b>,</p>
          <p>Your profile has been approved.</p>
        </div>
      </div>
      `
    ).catch(err => console.log("MAIL ERROR:", err));

  } catch (error) {
    console.log("APPROVE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


const rejectLabour = async (req, res) => {
  try {

    const labour = await Labour.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!labour) {
      return res.status(404).json({ message: "Labour not found" });
    }

    
    res.json({
      message: "Labour rejected",
      labour
    });

   
    sendEmail(
      labour.email,
      "BuildSetu – Profile Verification Update",
      `
      <div style="font-family:Arial;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

          <h2 style="color:#2c3e50">BuildSetu</h2>

          <p>Hello <b>${labour.name}</b>,</p>

          <p>Your profile was not approved at this time.</p>

          <p>You can re-register with correct details.</p>

          <br/>

          <p>Regards,<br><b>BuildSetu Team</b></p>

        </div>
      </div>
      `
    ).catch(err => console.log("MAIL ERROR:", err));

  } catch (error) {
    console.log("REJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getApprovedLabours = async (req, res) => {
  try {

    const labours = await Labour.find({ status: "approved" });

    res.json(labours);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLaboursByCategory = async (req, res) => {
  try {

    const { category } = req.params;

    const labours = await Labour.find({
      status: "approved",
      category: { $regex: category, $options: "i" }
    });

    res.json(labours);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports={registerLabour,getpendingLabours,approveLabour,rejectLabour,getApprovedLabours,getLaboursByCategory};