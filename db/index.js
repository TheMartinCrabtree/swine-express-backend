const mongoose = require("mongoose");

mongoose
    .connect('mongodb://127.0.0.1:27017/swinedata', { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
     })
    .then(()=>{
        console.log("Database Connected.")
    })
    .catch((error)=>{
        console.error('Database Connection Error', error.message);
    });


const db = mongoose.connection;

module.exports = db;