const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    nameRecipe: { type: String, required: true },
    recipe: { type: String, required: true },
    ingredients: { type: JSON, required: true },
    preparationTime: { type: String },
    cookingTime: { type: String, required: true },
    createdAt: { type: Date },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', recipeSchema);