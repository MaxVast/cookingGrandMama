//DEPEDENCIES
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
//const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://mongo_db_syneido_lab1:'+process.env.PWDBDD+'@cluster0.zwpc9n5.mongodb.net/?retryWrites=true&w=majority',
        { useNewUrlParser: true,
            useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/recipe', recipeRoutes);
//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;