const mongoose = require('mongoose');  

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: mongoose.Schema.Types.ObjectId,ref:"content.model", required: true },
    tags: {type: [String], default: []},
    isPinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
