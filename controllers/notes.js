const Note = require('../models/notes');

// Create and Save a new Note
exports.create = async (req, res) => {
	// Validate request
	try {
		// Create a Note
		const note = new Note({
			title: req.body.title || "Untitled Note",
			userId: req.user._id,
			...req.body,
		});
		// Save Note in the database
		const notes = await note.save();
		return res.status(200).send({
			message: "Note is created successfully",
			notes,
		});
	} catch (error) {
		console.log(`error`, error)
		return res.status(500).send({
			error
		});
	}
};

// Retrieve and return all notes from the database.
exports.findAll = async (req, res) => {
	try {
		const allNotes = await Note.find({
			userId: req.user._id
		});

		return res.status(200).send({
			message: "Notes are found successfully",
			status: 200,
			code: "OK",
			notes: allNotes,
		});
	} catch (error) {
		console.log(`error`, error)
		return res.status(500).send({
			error
		})
	}
};
// Find a single note with a noteId
exports.findOne = async (req, res) => {
	try {
		if (!req.params.noteId) {
			return res.status(500).send({
				message: "Invalid Request Params"
			})
		}
		const note = await Note.findOne({
			_id: req.params.noteId,
			userId: req.user._id,
		});
		if (!note) {
			return res.status(404).send({
				message: "Given note is not found, please try again"
			})
		}

		return res.status(200).send({
			status: 200,
			code: "OK",
			notes: note,
			message: "Note is found successfully"
		});
	} catch (error) {
		console.log(`error`, error);
		return res.status(500).send({
			error
		})
	}
};

// Update a note identified by the noteId in the request
exports.update = async (req, res) => {
	try {
		// Validate Request
		if (!req.params.noteId) {
			return res.status(500).send({
				message: "Invalid Request Params"
			})
		}
		if (!req.body.content) {
			return res.status(400).send({
				message: "Note content can not be empty"
			});
		}
		const note = await Note.findOne({
			_id: req.params.noteId,
			userId: req.user._id
		});
		if (!note) {
			return res.status(404).send({
				message: "Given note is not found, please try again"
			})
		}
		// Find note and update it with the request body
		const updatedNote = await Note.findByIdAndUpdate(req.params.noteId, {
			title: req.body.title || "Untitled Note",
			content: req.body.content
		}, {
			new: true
		});

		return res.status(200).send({
			status: 200,
			code: "OK",
			notes: updatedNote,
			message: "Note is updated successfully"
		});
	} catch (error) {
		console.log(`error`, error);
		return res.status(500).send({
			error
		})
	}
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
	try {
		// Validate Request
		if (!req.params.noteId) {
			return res.status(500).send({
				message: "Invalid Request Params"
			})
		}
		const note = await Note.findOne({
			_id: req.params.noteId,
			userId: req.user._id
		});
		if (!note) {
			return res.status(404).send({
				message: "Given note is not found, please try again"
			})
		}
		const deletedNote = await Note.findByIdAndRemove(req.params.noteId);
		if (!deletedNote) {
			return res.status(404).send({
				message: "Given note is not found, please try again"
			})
		}

		return res.status(200).send({
			status: 200,
			code: "OK",
			message: "Note is deleted successfully"
		});
	} catch (error) {
		console.log(`error`, error);
		return res.status(500).send({
			error
		})
	}
};