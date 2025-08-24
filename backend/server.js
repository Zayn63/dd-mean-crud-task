const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable CORS
var corsOptions = {
  origin: "http://localhost:8081" // change if frontend runs elsewhere
};
app.use(cors(corsOptions));

// Parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to the database!");
  })
  .catch(err => {
    console.error("❌ Cannot connect to the database!", err);
    process.exit();
  });

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zayn's application 🚀" });
});

// API routes
require("./app/routes/tutorial.routes")(app);

// Set port and listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});
