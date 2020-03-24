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

getCharacters=async(req, res)=>{
    await Character.find({}, (error, characters)=>{
        if(error){
            return handleError(400, error);
        }
        else if(!characters.length){
            return handleError(404, "Character was not found.");
        }
        else{
            return res.status(200).jon({ success: true, data: characters });
        }
    })
    .catch((error)=>console.log("issue with getCharacters", error));
}

module.exports = {
    createCharacter,
    getCharacters,
};