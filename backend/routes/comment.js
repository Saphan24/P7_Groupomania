const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/create/:id' ,auth,  commentCtrl.createOneComment);
router.get('/:id', auth, commentCtrl.getCommentsPost);
router.delete('/:id', auth, commentCtrl.deleteOneComment);
router.post('/:id', auth, commentCtrl.modifyOneComment);

module.exports = router;