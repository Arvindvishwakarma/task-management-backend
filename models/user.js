const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userRegisterSchema = new Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    password: {
        type: String
    },
    createdDateTime: {
        type: String
    },
    status: {
        type: String
    },
});

module.exports = mongoose.model('User', userRegisterSchema);

