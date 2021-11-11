const seedUsers = require('./user-seeds');
const seedComments = require('./comment-seeds');
const seedPosts = require('./post-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('----------');
    await seedUsers();
    console.log('seeding users');
    await seedComments();
    console.log('seeding comments');
    await seedPosts();
    console.log('seeding posts');

    process.exit(0);
};

seedAll();