const express = require("express");
const cors = require("cors")
const volleyball = require("volleyball")
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();
connectDB()

app.use(cors())
app.use(volleyball)
app.use(express.json())

app.use("/api", router)

const port = process.env.PORT || 5000
// const hostname = "127.0.0.1"


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
  console.log(`server running on port:${port}`);
});

