const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    userId: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    username: {
        allowNull: false,
        type: DataTypes.STRING
    },
    password:{
        allowNull: false,
        type: DataTypes.STRING
    },
    confirmPassword:{
        allowNull: false,
        type: DataTypes.STRING
    },
    bio:{
        allowNull: true,
        type: DataTypes.STRING
    },
    isAdmin: {
        defaultValue: false,
        allowNull: false,
        type: DataTypes.BOOLEAN
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: Sequelize.NOW
    }    
});

User.sync()
.then(() => console.log('La table User a été créée dans la base de données'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = User;