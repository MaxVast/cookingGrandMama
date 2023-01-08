const express = require('express');
const router = express.Router();
//CONTROLLER
const ControllerRecipe = require('../controllers/recipe');
//MIDDLEWARE
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, ControllerRecipe.createRecipe);
router.put('/:id', auth, multer, ControllerRecipe.updateOneRecipe);
router.delete('/:id', auth, ControllerRecipe.deleteOneRecipe);
router.get('/', ControllerRecipe.getAllRecipe);
router.get('/:id', ControllerRecipe.getOneRecipe);

module.exports = router;