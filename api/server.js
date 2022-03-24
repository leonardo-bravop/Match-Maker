const express = require("express");
const cors = require("cors")
const volleyball = require("volleyball")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes")

app.use(cors())
app.use(volleyball)

require("dotenv").config();

app.use(express.json())
app.use("/api", router)

const connection_string = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000
// const hostname = "127.0.0.1"

app.get("/", (req, res) => {
  res.send("welcome to the server with mongo db atlas");
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
  console.log(`server running on port:${port}`);
});

