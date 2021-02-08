const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth'); // Importation middleware d'authentification
const multer = require('../middleware/multer-config'); // Middleware multer-config gestion des fichiers images


// routes CRUD: Create, Read, Update et Delete
// Middleware d'authentification pour sécuriser les routes de l'API
router.get('/', auth, postCtrl.getAllPosts);
router.get('./:id', auth, postCtrl.getOnePost);
router.post('/create', auth, multer, postCtrl.createPost);
router.post('/:id', auth, multer, postCtrl.modifyOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);

module.exports = router;