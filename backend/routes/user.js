const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
//const ExpressBrute = require('express-brute'); // Middleware de protection de brute-force pour les routes express
const auth = require('../middleware/auth');

//const store = new ExpressBrute.MemoryStore();
//const bruteforce = new ExpressBrute(store);

router.post('/signup', userCtrl.signup); // création d'un user
router.post('/login', userCtrl.login); // connection user et si erreur 429 si nous empruntons cette route trop souvent
router.get('/users/:id', auth, userCtrl.getOneUser); // récupération user
router.delete('/users/:id', auth, userCtrl.deleteOneUser); // suppression user


module.exports = router;