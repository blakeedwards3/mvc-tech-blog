const { Post } = require('../models');

const postSeeds = [
    {
        title: 'Windows or Mac?',
        body: "I'm personally a windows guy, but I love Mac's UI!",
        date_created: '2023-01-13 04:30:00',
        user_id: 1,
    },

    {
        title: 'Bootstrap CSS is superior',
        body: "Bootstrap CSS outweighs any other CSS framework out there",
        date_created: '2023-03-26 06:48:00',
        user_id: 2,
    },

    {
        title: 'Apex Legends season 18',
        body: "Anyone else as excited as me for the next season of Apex Legends??",
        date_created: '2023-04-06 02:36:00',
        user_id: 3,
    },

    {
        title: 'Processor brand',
        body: "Should I get an AMD or Intel processor?",
        date_created: '2023-06-04 11:11:00',
        user_id: 4,
    },

    {
        title: 'I am Groot',
        body: "Hi, I am Groot",
        date_created: '2023-07-01 7:23:00',
        user_id: 5,
    },
]

const seedPosts = () => Post.bulkCreate(postSeeds);

module.exports = seedPosts;