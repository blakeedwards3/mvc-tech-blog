const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for getting all users
router.get('/', (req, res) => {
    // Get all users and exclude the password
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

// Route for getting a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(userData => {
            if (!userData) {
                // Return 404 code if no user found by id
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route for creating new user
router.post('/', (req,res) => {
    User.create({
        // Extract username from the request body
        username: req.body.username,
        // Extract email from the request body
        email: req.body.email,
        // Extract password fromt he request body
        password: req.body.password
    })
        .then(userData => {
            req.session.save(() => {
                // Set session user_id
                req.session.user_id = userData.id;
                // Set session username
                req.session.username = userData.username;
                // Set session as loggedIn
                req.session.loggedIn = true;

                // Return created user
                res.json(userData);
            });
        });
});

// Route for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            // Check database for the email
            email: req.body.email
        }
    })
        .then(userData => {
            if (!userData) {
                // return 404 if email isn't found
                res.status(400).json({ message: 'No user found with that email address' });
                return;
            }

            // check if password is valid
            const validPassword = userData.checkPassword(req.body.password);

            if (!validPassword) {
                // return 400 code if password isn't valid
                res.status(400).json({ message: 'Incorrect password' });
                return;
            }

            req.session.save(() => {
                // Save user's session data
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ user: userData, message: 'You are now logged in!' });
            });
        });
});

// Route for logging out
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;