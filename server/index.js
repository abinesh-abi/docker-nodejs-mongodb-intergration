const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());

// mongodb
mongoose
  .connect("mongodb://mongodb:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: "admin",
    pass: "password",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Example usage: create a new user
const User = mongoose.model("Users", userSchema);

app.get("/", async (req, res) => {
  try {
    const newUser = await new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    }).save();

  const userList = await User.find();
    res.json({newUser,userList})
  } catch (error) {
    res
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
