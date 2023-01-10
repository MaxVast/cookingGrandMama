const fs = require('fs');
//MODEL
const Recipe = require('../models/Recipe');

exports.createRecipe = (req, res, next) => {
    const recipeObject = req.body;
    const recipe = new Recipe({
        ...recipeObject,
        userId: req.auth.userId,
        //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    recipe.save()
        .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
};

exports.updateOneRecipe = (req, res, next) => {
    const recipeObject = req.file ? {
        ...JSON.parse(req.body.recipe),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    Recipe.findOne({_id: req.params.id})
        .then((recipe) => {
            if (recipe.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Recipe.updateOne({ _id: req.params.id}, { ...recipeObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteOneRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id})
        .then(recipe => {
            if (recipe.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            /*} else if(recipe.userId === req.auth.userId && recipe.imageUrl) {
                const filename = recipe.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Recipe.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });*/
            }else{
                Recipe.deleteOne({_id: req.params.id})
                    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.getAllRecipe = (req, res, next) => {
    Recipe.find()
        .then(recipes => res.status(200).json(recipes))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneRecipe = (req, res, next) => {
    Recipe.findOne({ _id: req.params.id })
        .then(recipe => res.status(200).json(recipe))
        .catch(error => res.status(404).json({ error }));
};