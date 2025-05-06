const mongoose = require('mongoose');

function connectDb() {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('mongodb connected....');
        })
        .catch((err) => {
            console.log('Error in mongodb connection.', err);
        });
}

module.exports = connectDb;