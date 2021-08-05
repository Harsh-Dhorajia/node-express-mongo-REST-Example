const Joi = require('joi')
// const pattern = "/$(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,}$/";

const schemas = {
	register: Joi.object().keys({
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(8),
	}),

	login: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(8),
	}),
};
module.exports = schemas;