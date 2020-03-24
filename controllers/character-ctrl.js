const Character = require("../models/character-model");

const handleError=(statusCode, statusMessage)=>{
    return res.status(statusCode).json({
        success: false,
        error: statusMessage,
    });
}

createCharacter=(req, res)=>{
    const { body } = req;

    if(!body){
        return handleError(400, "Character information is incomplete.");
    }
    else{
        // update database and send response or error
        const character = new Character(body);
        character
            .save()
            .then(()=>{
                return res.status(201).json({
                    success: true,
                    id: character._id,
                    message: "Character created.",
                });
            })
            .catch(()=>{
                return handleError(400, "Character not created.");
            });
    }
}

module.exports = {
    createCharacter,
};