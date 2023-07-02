require("dotenv").config();
const express = require("express");
const app = express();
// const reportRoute = require("./routes/ReportRoute")
const authRoutes = require("./routes/auth")
const cors = require("cors");
app.use(cors({}));
app.use(express.json());

const DB = require("./Database");

//connect to the database
DB();

// app.use("/reports",reportRoute);
app.use("/auth",authRoutes);

const PORT = process.env.PORT||5000;

app.listen(PORT, function(){console.log(`Server started at http://localhost:${PORT}`)});
