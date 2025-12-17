require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express(); // MUST BE FIRST

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainRoutes = require("./routers/index");
app.use("/", mainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
