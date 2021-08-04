const Joi = require('joi')
const schemas = {
	notesCreate: Joi.object().keys({
		title: Joi.string().optional(),
		content: Joi.string().required(),
		date: Joi.date().optional(),
		rating: Joi.number().optional(),
	}),

	notesUpdate: Joi.object().keys({
		content: Joi.string().required(),
		date: Joi.date().optional(),
		rating: Joi.number().optional(),
	}),
};
module.exports = schemas;