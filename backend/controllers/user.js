const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

// Création d'un schéma
const schema = new passwordValidator();
 
// Ajout des propriétés de passwordValidator
schema
.is().min(6)                                    //  Longueur minimale 6
.is().max(10)                                   //  Longueur maximale 10
.has().uppercase()                              //  Doit avoir des lettres majuscules
.has().lowercase()                              //  Doit avoir des lettres minuscules
.has().digits(1)                                //  Doit avoir au moins 1 chiffres
.has().not().spaces()                           //  Ne doit pas avoir d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist de ces valeurs

// Création d'un utilisateur dans la bdd
exports.signup = (req, res, next) => {
    if(!schema.validate(req.body.password)){
        console.error('Mot de passe non valide');
        return res.status(400).send('Mot de passe non valide');
    }
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                confirmPassword: hash,
                bio: req.body.bio
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}

// Envoi et vérification de l'entrée utilisateur pour se connecter
exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({where: { email: req.body.email }})
        .then(user => {
            console.log(req.body.email)
            if (!user){
                return res.status(404).json({error: "Utilisateur non trouvé"});
            }
            console.log(user.password)
            bcrypt.compare( req.body.password, user.password)
                .then(valid => {
                    if (!valid){
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user.userId,
                        token: jwt.sign(
                            { userId: user.userId },
                            "RANDOM_TOKEN_SECRET",
                            { expiresIn: '24h'}
                        )
                    });
                }) 
                .catch(error => res.status(500).json({error}))   
        })
        .catch(error => res.status(400).json({error : "test"}));
}


// Récupération d'un seul utilisateur dans la table Users
exports.getOneUser = (req, res, next) => {
    User.findAll({where: {userId: req.body.userId }})
        .then(user => {res.status(200).json(user)})
        .catch(error => res.status(404).json({error}));
}

// Suppression d'un utilisateur de la base de données
exports.deleteOneUser = (req, res, next) => {
    User.destroy({where: {userId: req.body.userId }})
        .then(() => res.status(200).json({message: 'Utilisateur supprimé'}))
        .catch(error => res.status(400).json({error}));
}

