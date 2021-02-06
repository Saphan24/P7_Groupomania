const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = require('../models/User');
const Post = require('../models/Post');

const Comment = sequelize.define('Comment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    posts_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    users_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
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

User.hasMany(Comment, {foreignKey: 'users_id', onDelete: "cascade"});
Comment.belongsTo(User, {foreignKey: 'users_id', onDelete: "cascade"});
Post.hasMany(Comment, {foreignKey: "posts_id", onDelete: "cascade"});
Comment.belongsTo(Post, {foreignKey: "posts_id", onDelete: "cascade"});

Comment.sync()
.then(() => console.log('La table Comment a été créée dans la base de données'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Comment;

