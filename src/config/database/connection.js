 const mongoose = require('mongoose');


 const connectDb = async ()=>{
     await mongoose.connect(process.env.URLMONGO, {useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected");
 }

 module.exports = connectDb;