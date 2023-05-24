const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const tokenVerify = require('./middleware/verify');
const db = require("./models");

const PORT = process.env.LOCALHOST_PORT || process.env.PRODUCTION_PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const registrationRouter = require('./routes/registration');
app.use('/api/registration', registrationRouter);

const loginRouter = require('./routes/login');
app.use('/api/login', loginRouter);

const verifyRouter = require('./routes/verify');
app.use('/api/verify', tokenVerify.isTokenValid, verifyRouter);


db.sequelize.sync().then(() => {}).catch((err) => {});


app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);