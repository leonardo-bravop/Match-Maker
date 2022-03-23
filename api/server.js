const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes")

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("welcome to node js");
});

app.use(express.json())
app.use("/api", router)

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

mongoose
  .connect(connection_string)
  .then(() => {
    console.log("MongoDB connection established...");
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

