const { sequelize } = require('../models/Post');
const Post = require('../models/Post');
const User = require('../models/User');
const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    sequelize.query("SELECT * FROM posts")
       .then(posts => res.status(200).json(posts))
       .catch(error => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
    console.log(req.body)
    const post = new Post({
        users_id: req.body.userId,
        content: req.body.content,
    });
    post.save()
        .then(() => res.status(200).json({message: 'Post créé'}))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteOnePost = (req, res, next) => {
    Post.findAll({ where: {users_id: req.body.users_id}})
    .then( post => {
        //const filename = post[0].attachment.split('/images/')[1];
        //fs.unlink(`images/${filename}`,() => {
            console.log(req.body)
            Post.destroy({ where: {users_Id: req.body.users_id}})
            .then(() => res.status(200).json({ message: "Post supprimé ! "}))
            .catch(error => res.status(400).json({ error }));
        //})
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOnePost = (req, res, next) => {
    Post.findAll({ where: {users_id: req.body.id}, include: [{model: User}]})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.modifyOnePost = (req, res, next) => {
    let PostObject;
    console.log(req.body.id)
    if (req.file){
        PostObject = {
            content: req.body.content,
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        Post.findAll({where: {users_id: req.body.id}})
        .then(post => {
            const filename = post[0].attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`,() =>{
                Post.update({
                    ...PostObject
                },
                {
                    where: {
                        users_id: req.body.id
                    }
                })
                .then(() => res.status(200).json({message: "Votre post a été modifié !"}))
                .catch(error => res.status(400).json({message: "Votre post n'a pas pu être modifié" + error}));
            })
        })
        .catch(error => console.log("Post introuvable", error))
        
    } else {
        Post.update({
            content: req.body.content
        },
        {
            where: {
                users_id: req.body.id
            }
        })
        .then(() => res.status(200).json({message: "Votre post a été modifié !"}))
        .catch(error => res.status(400).json({message: "Votre post n'a pas pu être modifié" + error}));
    }
};