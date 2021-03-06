const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route 	POST api/users
// @desc 	Register user
// @access 	Public

router.post('/', [
	check('name', 'Le nom est obligatoire')
		.not()
		.isEmpty(),
	check('email', 'Veuillez saisir un email valide').isEmail(),
	check('password', 'le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
	],
	async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, email, password } = req.body;

	try {
		// See if user exists
		
		let user = await User.findOne({ email });

		if(user) {
			return res.status(400).json({ errors: [ { msg: 'L\'utilisateur existe déjà' } ]});
		}

		// Get users gravatar

		const avatar = gravatar.url(email, {
			s: '200',
			r: 'pg',
			d: 'mm'
		});

		user = new User({
			name,
			email,
			avatar,
			password
		});

		// Encrypt password

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

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

module.exports = router;3