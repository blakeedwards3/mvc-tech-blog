const Post = require('../models/post');

const postSeeds = [
    {
        title: 'Windows or Mac?',
        body: "I'm personally a windows guy, but I love Mac's UI!",
        date_created: '2/13/2023 at 4:30',
        user_id: 1,
    },

    {
        title: 'Bootstrap CSS is superior',
        body: "Bootstrap CSS outweighs any other CSS framework out there",
        date_created: '3/26/2023 at 6:48',
        user_id: 2,
    },

    {
        title: 'Apex Legends season 18',
        body: "Anyone else as excited as me for the next season of Apex Legends??",
        date_created: '4/6/2023 at 2:36',
        user_id: 3,
    },

    {
        title: 'Processor brand',
        body: "Should I get an AMD or Intel processor?",
        date_created: '6/4/2023 at 11:11',
        user_id: 4,
    },

    {
        title: 'I am Groot',
        body: "Hi, I am Groot",
        date_created: '7/1/2023 at 7:23',
        user_id: 5,
    },
]

const seedPosts = () => Post.bulkCreate(postSeeds);

module.exports = seedPosts;