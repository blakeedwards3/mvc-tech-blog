const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Homepage route
router.get('/', (req, res) => {
    // Log the session object
    console.log(req.session);

    // Find all posts, comments, and user data
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'body'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            // Serialize data for homepage
            const posts = postData.map(post => post.get({ plain: true }));
            // Render homepage
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to homepage if user is already logged in
        res.redirect('/');
        return;
    }

    // Render login page
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to homepage if user is already logged in
        res.redirect('/');
        return;
    }

    // Render signup page
    res.render('signup');
});

// Single post by id route
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'body'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            if (!postData) {
                // Return 404 code if no post is found
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            // Serialize data for single-post
            const post = postData.get({ plain: true });

            // Render single-post with data
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;