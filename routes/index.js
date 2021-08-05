const notes = require('../controllers/notes');
const users = require('../controllers/users');

const validationMiddleware = require('../middlewares/validations');
const authMiddleware = require('../middlewares/authenticateUser');
const notesValidationSchema = require('../utils/validationSchema/notesValidation')
const userValidationSchema = require('../utils/validationSchema/usersValidation')
module.exports = (app) => {

    //users Module
    app.post('/users/register', validationMiddleware(userValidationSchema.register), users.register);
    app.post('/users/login', validationMiddleware(userValidationSchema.login), users.login);

    // Notes Module
    app.post('/note/create', authMiddleware, validationMiddleware(notesValidationSchema.notesCreate), notes.create);
    app.get('/note/find-all-notes', authMiddleware,  notes.findAll);
    app.get('/note/:noteId', authMiddleware, notes.findOne);
    app.put('/note/:noteId', authMiddleware,  validationMiddleware(notesValidationSchema.notesUpdate), notes.update);
    app.delete('/note/:noteId', authMiddleware, notes.delete);
}