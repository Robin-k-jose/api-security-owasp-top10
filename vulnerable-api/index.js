console.log("RUNNING THIS INDEX.JS FILE");

const express = require("express");

const app = express();

// This allows the server to read JSON data from requests
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Security Project is running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.post("/login",(req,res) =>{
  const username = req.body.username;
  const password = req.body.password;

  //insecure login intentional
  if(username ==="admin" && password === "admin123"){
    res.json({
      message: "Login Sucessful",
      role:"admin"
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials"
    });
  }
});