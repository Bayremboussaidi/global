const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



/*
const express = require("express");
var cors = require("cors");
const connection = require("./connection");
require("dotenv").config();
const RouterReservation = require("./routes/transport");
const RouterUsers = require("./routes/users");
const RouterPlat = require("./routes/plat");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/transport", RouterReservation);
app.use("/users", RouterUsers);
app.use("/plat", RouterPlat);

module.exports = app;*/