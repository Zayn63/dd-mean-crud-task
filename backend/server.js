const express = require("express");
// const cors = require("cors");

const app = express();

// Middleware to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const mongoose = db.mongoose;

// Use your provided MongoDB Atlas connection string (exactly as given)
const mongoUri = "mongodb+srv://junaidmansuri7863:dpYQVbtc7n1NrR3z@cluster1.wyxpkve.mongodb.net/";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("❌ Cannot connect to MongoDB Atlas!", err);
    process.exit();
  });

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your MongoDB Atlas connected app 🚀" });
});

// Routes
require("./app/routes/turorial.routes")(app);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
