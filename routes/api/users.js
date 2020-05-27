const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

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
	(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	res.send('User route');
});

module.exports = router;