const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getCommentsPost = (req, res, next) => {
    console.log(req.params.id);
    Comment.findAll({
        where: {posts_id: req.params.id},
        order: sequelize.literal('(createdAt) DESC'),
        include: [{model: User}]
    })
    
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}));
};

exports.createOneComment = (req, res, next) => {
    Comment.create({
        posts_id: req.params.id,
        users_id: req.body.id,
        content: req.body.content
    })
    .then(() => res.status(201).json({message:'Post créé'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteOneComment = (req, res, next) => {
    Comment.destroy({ where: {posts_id: req.params.id}})
    .then(() => res.status(200).json({message: 'Commentaire supprimé'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyOneComment = (req, res, next) => {
    Comment.update({
        content : req.body.content
    },
    {
        where: {
            posts_id: req.params.id
        }
    })
    .then(() => res.status(200).json({message: 'Commentaire modifié'}))
    .catch(error => res.status(400).json({error}));
}
