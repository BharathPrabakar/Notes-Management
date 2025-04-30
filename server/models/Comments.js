const mongoose = require('mongoose');  

const commentSchema = new mongoose.Schema({
    note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
