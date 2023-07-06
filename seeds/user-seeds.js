const User = require('../models/user');

const userSeeds = [
    {
        username: 'JohnDoe',
        email: 'johndoe@email.com',
        password: 'password1',
    },

    {
        username: 'TechyBlogger',
        email: 'techyblogger@email.com',
        password: 'password1'
    },
    
    {
        username: 'CodingBilly',
        email: 'codingbilly@email.com',
        password: 'password1',
    },
]

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;