const mongoose = require("mongoose");

mongoose
    .connect('mongodb://127.0.0.1:27017/swine', { 
        useUnifiedTopology: true,
        useNewUrlParser: true,
     })
    .catch((error)=>{
        console.error('Database Connection Error', error.message);
    });


const db = mongoose.connection;

module.exports = db;