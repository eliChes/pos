const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const port = 8083;
require('dotenv').config();


app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); // Add this line to parse incoming JSON data

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//Routes:
const masterRoute = require("./routes/masterlist.route");

const userRoute = require("./routes/userRole.route");

const extraOption = require("./routes/extraOption.route");

const category = require("./routes/category.route");

const product = require("./routes/product.route");


const authenticateToken = require('./middleware/token_authentication.middleware');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use("/masterList", masterRoute);
app.use("/userRole", userRoute);
app.use("/extraOption", extraOption);
app.use("/category", category);
app.use("/product", product)

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
