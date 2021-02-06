const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const User = require('../models/User');

const Post = sequelize.define('Post', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    users_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
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

Post.belongsTo(User, { foreignKey: 'users_id', onDelete: 'cascade'});
User.hasMany(Post, { foreignKey: 'users_id', onDelete: 'cascade'});

Post.sync()
.then(() => console.log('La table Post a été créée dans la base de données'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = Post;