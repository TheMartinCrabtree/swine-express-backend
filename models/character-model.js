const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const Character = new Schema(
    {
        name_first: { type: String, required: true },
        name_family: { type: String, required: true },
        age: { type: Number, required: true },
    },
    {timestamps: true},
)

module.exports = mongoose.model( "characters", Character );