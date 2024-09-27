const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    deadline: {
        type: String
    },
    priority: {
        type: String
    },
    createdDateTime: {
        type: String
    },
    status: {
        type: String
    },
});

module.exports = mongoose.model('Task', taskSchema);

