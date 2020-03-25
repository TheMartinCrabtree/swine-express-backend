const Character = require("../models/character-model");

const handleError=(statusCode, statusMessage)=>{
    return res.status(statusCode).json({
        success: false,
        error: statusMessage,
    });
}

createCharacter=(req, res)=>{
    const { body } = req;
    console.log("hit create character: req.body = ", body);

    if(!body){
        return handleError(400, "Character information is incomplete.");
    }
    else{
        // update database and send response or error
        const character = new Character(body);
        console.log("trying to create character", character)
        character
            .save()
            .then(()=>{
                console.log("character created", character)
                return res.status(201).json({
                    success: true,
                    id: character._id,
                    message: "Character created.",
                });
            })
            .catch(()=>{
                console.log("error creating character for database");
                return handleError(400, "Character not created.");
            });
    }
}

getCharacters=async(req, res)=>{
    console.log("hit getCharacters");
    await Character.find({}, (error, characters)=>{
        if(error){
            console.log("400 error");
            return handleError(400, error);
        }
        // else if(!characters.length){
        //     console.log("404 error", characters);
        //     return handleError(404, "Character was not found.");
        // }
        else{
            console.log("200 hit")
            return res.status(200).json({ success: true, data: characters });
        }
    })
    .catch((error)=>console.log("issue with getCharacters", error));
}

module.exports = {
    createCharacter,
    getCharacters,
};