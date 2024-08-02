const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const jwt = require('jsonwebtoken');

const app = express();


//middleware 
app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


