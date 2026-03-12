const express=require('express');
require('dotenv').config();
const cors = require("cors");
const connectDB=require('./config/db');
const labourRoute=require("./routers/labourRoute");
const contractorRoute=require("./routers/contractorRoute");
const app=express();



app.use(express.json());
connectDB();
app.use(cors());
app.use("/api/labours",labourRoute);
app.use("/api/contractors",contractorRoute);

app.use("/uploads", express.static("uploads"));

const PORT=process.env.PORT||5000;

app.listen(PORT, ()=>{
    console.log("server started");
})