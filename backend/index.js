// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs", songRoutes);


app.use(cors());  // This will allow all origins by default

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
