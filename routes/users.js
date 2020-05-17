const express = require('express');

const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller')
const homeController = require('../controllers/home_controller')
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);

router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);




router.post('/create-session', passport.authenticate(

    'local',
    {failureRedirect: '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession);


router.get('/auth/google', passport.authenticate('google',  {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}),usersController.createSession);

router.post('/update/:id', passport.checkAuthentication, usersController.update);

module.exports= router;