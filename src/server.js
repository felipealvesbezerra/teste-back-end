const express = require('express');
const cors = require('cors');
require('dotenv').config();
const  connectDb  = require('./config/database/connection')
const app = express(); 
const PORT = process.env.PORT || 3000;


// Connect Database
connectDb();

// Routes
const indexRoute = require('./routes/index')
const customerRoute = require('./routes/customer.router')

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/', indexRoute);
app.use('/customers', customerRoute);

app.listen(PORT, ()=>{
    console.log("Server conected in port " + PORT);
});