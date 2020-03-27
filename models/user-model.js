const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const validator = require("validator-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// FOR TESTING ONLY 

const User = new Schema(
    {
        username:   { type: String, required: true, trim: true },
        password:   { type: String, required: true, minlength: 3 },
        tokens:     { type: String, required: true },
    },
    {timestamps: true},
)

// execute the password hash before saving to the database
User.pre("save", async function (next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})


User.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

User.statics.findByCredentials = async (username, password)=>{
    // might need to adapt this search users or User?
    const user = await  users.findOne({username});
    if(!user){
        console.log("Invalid username.", username );
        throw new Error({error: "Invalid login."})
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        console.log("Invalid password.", password )
        throw new Error({error: "Invalid login."})
    }

}

module.exports = mongoose.model( "users", User );