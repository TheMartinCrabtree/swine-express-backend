const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

// FOR TESTING ONLY. NO AUTH

const User = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    {timestamps: true},
)

module.exports = mongoose.model( "users", User );