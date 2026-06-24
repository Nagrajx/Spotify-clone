const express = require('express');
const cookieParser= require("cookie-parser")
const authRoute = require('./routes/auth.routes');

const app = express();

// this middleware for raw data
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);



module.exports = app;