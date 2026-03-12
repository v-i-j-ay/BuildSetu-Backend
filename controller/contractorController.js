const Contractor=require("../model/Contractor");
const sendEmail = require("../config/mail");
const registerContractor=async (req,res)=>{
    try{
        const { name, email, phone, category, experience, location } = req.body;

        const profile = req.file ? `/uploads/${req.file.filename}` : "";
         const contractor = await Contractor.create({
      name,
      email,
      phone,
      category,
      experience,
      location,
      profile
    });

     //to admin
    await sendEmail(
  process.env.ADMIN_EMAIL,
  "New Registration on BuildSetu",
  `
  <div style="font-family:Arial,sans-serif;padding:20px;background:#f4f6f8">

    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

      <h2 style="color:#2c3e50">New Registration Alert</h2>

      <p>A new user has registered on <b>BuildSetu</b>.</p>

      <table style="width:100%;border-collapse:collapse;margin-top:15px">

        <tr>
          <td style="padding:8px;border:1px solid #ddd"><b>Name</b></td>
          <td style="padding:8px;border:1px solid #ddd">${name}</td>
        </tr>

        <tr>
          <td style="padding:8px;border:1px solid #ddd"><b>Email</b></td>
          <td style="padding:8px;border:1px solid #ddd">${email}</td>
        </tr>

        <tr>
          <td style="padding:8px;border:1px solid #ddd"><b>Category</b></td>
          <td style="padding:8px;border:1px solid #ddd">${category}</td>
        </tr>

        <tr>
          <td style="padding:8px;border:1px solid #ddd"><b>Location</b></td>
          <td style="padding:8px;border:1px solid #ddd">${location}</td>
        </tr>

      </table>

      <br/>

      <p>Please review this profile in the admin dashboard.</p>

      <hr/>

      <small style="color:gray">
      BuildSetu Admin Notification System
      </small>

    </div>
  </div>
  `
);

    //to user 

    await sendEmail(
  email,
  "BuildSetu – Profile Submitted Successfully",
  `
  <div style="font-family:Arial,sans-serif;padding:20px;background:#f4f6f8">
    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

      <h2 style="color:#2c3e50">BuildSetu</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>Thank you for registering on <b>BuildSetu</b>.</p>

      <p>Your profile has been successfully submitted and is currently <b>under review</b> by our admin team.</p>

      <p>Once your profile is verified, it will be visible to contractors and employers on our platform.</p>

      <p>This process usually takes a short time. We will notify you once your profile is approved.</p>

      <br/>

      <p>Best Regards,<br><b>BuildSetu Team</b></p>

      <hr/>

      <small style="color:gray">
      This is an automated email. Please do not reply directly.
      </small>

    </div>
  </div>
  `
);
      res.status(201).json({message: "contractor registered successfully",contractor });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getpendingContractors=async(req,res)=>{
  try{
    const contractor=await Contractor.find({status:"pending"});

    res.status(200).json(contractor);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
};

const approveContractor = async (req, res) => {
  try {

    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    
     // send approval email
    await sendEmail(
      contractor.email,
      "BuildSetu – Profile Approved 🎉",
      `
      <div style="font-family:Arial;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

          <h2 style="color:#2c3e50">BuildSetu</h2>

          <p>Hello <b>${contractor.name}</b>,</p>

          <p>Great news! Your profile has been <b>approved</b> by our team.</p>

          <p>Your profile is now visible on BuildSetu and contractors can contact you.</p>

          <br/>

          <p>Best Regards,<br><b>BuildSetu Team</b></p>

        </div>
      </div>
      `
    );

    res.json({
      message: "Contractor approved successfully",
      contractor
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectContractor = async (req, res) => {
  try {

    const contractor = await Contractor.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    // send rejection email
    await sendEmail(
      contractor.email,
      "BuildSetu – Profile Verification Update",
      `
      <div style="font-family:Arial;padding:20px;background:#f4f6f8">
        <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px">

          <h2 style="color:#2c3e50">BuildSetu</h2>

          <p>Hello <b>${contractor.name}</b>,</p>

          <p>Thank you for registering with BuildSetu.</p>

          <p>Unfortunately, we could not approve your profile at this time.</p>

          <p>If you believe this was a mistake, you can contact support or register again with updated information.</p>

          <br/>

          <p>Regards,<br><b>BuildSetu Team</b></p>

        </div>
      </div>
      `
    );


    res.json({
      message: "contractor rejected",
      contractor
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApprovedContractors = async (req, res) => {
  try {

    const contractors = await Contractor.find({ status: "approved" });

    res.json(contractors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getContractorsByCategory = async (req, res) => {
  try {

    const { category } = req.params;

    const contractors = await Contractor.find({
      status: "approved",
      category: { $regex: category, $options: "i" }
    });

    res.json(contractors);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={registerContractor,getpendingContractors,approveContractor,rejectContractor,getApprovedContractors,getContractorsByCategory};