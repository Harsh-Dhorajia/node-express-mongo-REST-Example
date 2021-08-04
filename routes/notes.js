module.exports = (app) => {
    const notes = require('../controllers/notes');

    // Create a new Note
    app.post('/create', notes.create);

    // Retrieve all Notes
    app.get('/find-all-notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/note/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/note/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/note/:noteId', notes.delete);
}