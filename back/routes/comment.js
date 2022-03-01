const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/comment');


router.post('/:id', auth, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/', auth, commentCtrl.getAllComments);

module.exports = router;