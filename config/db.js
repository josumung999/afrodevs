const mongoose = require('mongoose');

// Recuperer le fichier de configuration de la base de donnée
const config = require('config');
const db = config.get('mongoURI');

// Se connecter à la base de données avec mongoose
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		console.log('Connecté à MongoDB...');
	} catch(err) {
		console.error(err.message);
		// Annuler la procédure en cas d'echec
		process.exit(1);
	}
}

module.exports = connectDB;
