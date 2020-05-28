const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route 	GET api/auth
// @desc 	Test route
// @access 	Public

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch(err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route 	POST api/users
// @desc 	Register user
// @access 	Public

router.post(
	'/', 
	[
		check('email', 'Veuillez saisir un email valide').isEmail(),
		check(
			'password', 
			'Le mot de passe est obligatoire'
		).exists(),
	],
	async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	try {
		// See if user exists
		
		let user = await User.findOne({ email });

		if(!user) {
			return res
				.status(400)
				.json({ errors: [ { msg: 'Identifiants incorrect' } ]});
		}

		// Matching email and password
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: [ { msg: 'Nom d\'utilisateur ou mot de passe incorrect' } ]});
		}

		// Return jsonwebtoken
		const payload = {
			user: {
				id: user.id
			}
		}

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 360000 },
			(err, token) => {
				if(err) throw error;
				res.json({ token });
			});

	} catch(err) {
		console.error(err.message);
		res.status(500).send('Erreur Serveur');
	}

});

module.exports = router;