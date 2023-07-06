const Comment = require('../models/comment');

const commentSeeds = [
    {
        comment_text: "It's all personal preference and which UI you're used to using",
        date_created: '2/13/2023 at 8:24',
        user_id: 3,
        post_id: 1,
    },

    {
        comment_text: "I don't know about that! Tailwind CSS gets the job done too!",
        date_created: '3/26/2023 at 7:03',
        user_id: 4,
        post_id: 2,
    },

    {
        comment_text: "Yesss I am too! The new legend looks so good.",
        date_created: '4/6/2023 at 4:32',
        user_id: 1,
        post_id: 3,
    },

    {
        comment_text: "You have to go with AMD. I've never had issues with them!",
        date_created: '6/4/2023 at 11:57',
        user_id: 3,
        post_id: 4,
    },

    {
        comment_text: "Hello Groot! My name is Rocket",
        date_created: '7/1/2023 at 8:39',
        user_id: 2,
        post_id: 5
    },
]

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;