const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//MODEL
const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                isAdmin: false,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        token: jwt.sign(
                            {userId: user._id, email: user.email, username: user.username},
                            process.env.TOKEN_SECRET,
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUser = (req, res, next) => {
    User.findOne({_id: req.params.id})
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur inconnu'});
            }
            user.password = undefined;
            res.status(200).json({
                user: user
            });
        })
        .catch(error => res.status(404).json({ error }));
};