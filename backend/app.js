const express = require('express');
const bodyParser = require('body-parser'); // import Body-parser
const dotenv = require('dotenv').config();

//const User = require('./models/User');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

// Utilisation de la méthode express 
const app = express();

// Connection database
const { Sequelize, Model, DataTypes } = require("sequelize");
const { Router } = require('express');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, 
    {   host: process.env.HOST,
        dialect: 'mysql'
    });


// Middleware général qui s'applique à toutes les routes envoyé au serveur et headers pour éviter les problèmes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

sequelize.authenticate()
.then(() => console.log('Connexion à MysQL réussie !'))
.catch(() => console.log('Connexion à MysQL échouée !'));


// Analyse toutes les requêtes entrantes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;