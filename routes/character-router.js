const express = require("express");
const CharacterCtrl = require("../controllers/character-ctrl");

const router = express.Router();

router.get('/characters', CharacterCtrl.getCharacters);
// router.get('/character/:id', );
router.post('/character', CharacterCtrl.createCharacter);
// router.put('/character/:id', );
// router.delete('/character/:id', );


module.exports = router;