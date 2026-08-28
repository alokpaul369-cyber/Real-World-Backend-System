const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();

app.use(express.json());


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes")


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "MERN Backend API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});