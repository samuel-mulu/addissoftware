const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();



app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  origin: "http://localhost:5173", // your Vite frontend
  credentials: true
}));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
