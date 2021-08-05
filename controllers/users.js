const bcrypt = require("bcryptjs");
const User = require("../models/users");
const generate = require('../utils/generateToken');
// Create and Save a new Note
exports.register = async (req, res) => {
	// Validate request
	try {
		let {
			username,
			email,
			password
		} = req.body;
		const isUserAlreadyRegistered = await User.find({
			email,
		});
		if (isUserAlreadyRegistered.length) {
			return res.status(403).send({
				message: "Email already exists",
			});
		}
		password = await bcrypt.hash(password, 12);
		const user = await User.create({
			email,
			password,
			username,
		});
		const token = generate(user);
		return res.status(200).send({
			message: "User is registered successfully",
			user,
			token
		});
	} catch (error) {
		console.log(`error`, error);
		return res.status(500).send({
			error,
		});
	}
};

exports.login = async (req, res) => {
	// Validate request
	try {
		let {
			email,
			password
		} = req.body;
		const isUserExists = await User.findOne({
			email,
		});
		if (!isUserExists) {
			return res.status(404).send({
				message: "User not found",
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, isUserExists.password);
		if (!isPasswordMatch) {
			return res.status(403).send({
				message: "Invalid password",
			});
		}
		const token = generate(isUserExists);
		return res.status(200).send({
			message: "User is loggedin successfully",
			token
		});
	} catch (error) {
		console.log(`error`, error);
		return res.status(500).send({
			error,
		});
	}
};