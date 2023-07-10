const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route for all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    //Return comment data as JSON response
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route for new comments
router.post('/', withAuth, (req, res) => {
    // Check if user is authenticated
    if (req.session) {
        Comment.create({
            // Extract comment_text from request body
            comment_text: req.body.comment_text,
            // Extract post_id from request body
            post_id: req.body.post_id,
            // Use user_id from the session
            user_id: req.session.user_id,
        })
        // Return created comment as JSON response
            .then(commentData => res.json(commentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Route for deleting comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentData => {
            if (!commentData) {
                // Return 404 code if no comment is found by id
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;