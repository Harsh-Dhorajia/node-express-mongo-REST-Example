const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now()
    },
    rating: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);