const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller')

router.get('/profile', usersController.profile);
router.get('/posts', postsController.posts );
router.get('/Sign-up', usersController.signUp);

router.get('/Sign-in', usersController.signIn);



module.exports= router;