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
    Post.create({
        creator_id: req.body.id,
        content: req.body.content
    })
    .then(() => res.status(200).json({message: 'Post créé'}))
    .then(response => {
        console.log(response)
    })
    .catch(error => res.status(400).json({ error }));
};

exports.deleteOnePost = (req, res, next) => {
    Post.findAll({ where: {posts_id: req.params.id}})
    .then( post => {
        const filename = post[0].attachment.split('/images/')[1];
        fs.unlink(`images/${filename}`,() => {
            Post.destroy({ where: {posts_Id: req.params.id}})
            .then(() => res.status(200).json({ message: "Post supprimé ! "}))
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOnePost = (req, res, next) => {
    Post.findAll({ where: {posts_id: req.params.id}, include: [{model: User}]})
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({error}));
};

exports.modifyOnePost = (req, res, next) => {
    let PostObject;
    console.log(req.params.id)
    /*if (req.file){
        PostObject = {
            content: req.body.content,
            attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        Post.findAll({where: {posts_id: req.params.id}})
        .then(post => {
            const filename = post[0].attachment.split('/images/')[1];
            fs.unlink(`images/${filename}`,() =>{
                Post.update({
                    ...PostObject
                },
                {
                    where: {
                        posts_id: req.params.id
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
                posts_id: req.params.id
            }
        })
        .then(() => res.status(200).json({message: "Votre post a été modifié !"}))
        .catch(error => res.status(400).json({message: "Votre post n'a pas pu être modifié" + error}));
    }*/
};