const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const labourRoute = require("./routers/labourRoute");
const contractorRoute = require("./routers/contractorRoute");

const app = express();

/* ---------- MIDDLEWARE ---------- */

app.use(cors());

// IMPORTANT for form-data text fields
app.use(express.urlencoded({ extended: true }));

// JSON APIs
app.use(express.json());

/* ---------- DB ---------- */

connectDB();

/* ---------- ROUTES ---------- */

app.use("/api/labours", labourRoute);
app.use("/api/contractors", contractorRoute);

/* ---------- GLOBAL ERROR HANDLER ---------- */

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: err.message,
    error: err,
  });
});

/* ---------- SERVER ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server started");
});