const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

exports.getCommentsPost = (req, res, next) => {
    console.log(req.body.id);
    Comment.findAll({
        where: {posts_id: req.body.posts_id},
        order: sequelize.literal('(createdAt) DESC'),
        include: [{model: User}]
    })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}));
};

exports.createOneComment = (req, res, next) => {
    console.log(req.body)
    const comment = new Comment({
        posts_id: req.body.posts_id,
        users_id: req.body.users_id,
        id: req.body.id,
        content: req.body.content,
    });
    comment.save()
        .then(() => res.status(201).json({message:'Post créé'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteOneComment = (req, res, next) => {
    Comment.destroy({ where: {posts_id: req.body.posts_id}})
    .then(() => res.status(200).json({message: 'Commentaire supprimé'}))
    .catch(error => res.status(400).json({error}));
}

exports.modifyOneComment = (req, res, next) => {
    Comment.update({
        content : req.body.content
    },
    { where: { posts_id: req.body.posts_id}})
    .then(() => res.status(200).json({message: 'Commentaire modifié'}))
    .catch(error => res.status(400).json({error}));
}
