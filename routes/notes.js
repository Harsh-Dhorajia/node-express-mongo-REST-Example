module.exports = (app) => {
    const notes = require('../controllers/notes');
    const validationMiddleware = require('../middlewares/validations');
    const validationSchema = require('../utils/validationSchema/notesValidation')
    // Create a new Note
    app.post('/create', validationMiddleware(validationSchema.notesCreate), notes.create);

    // Retrieve all Notes
    app.get('/find-all-notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/note/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/note/:noteId', validationMiddleware(validationSchema.notesUpdate), notes.update);

    // Delete a Note with noteId
    app.delete('/note/:noteId', notes.delete);
}