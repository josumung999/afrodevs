const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Se connecter à la base de données
connectDB();

app.get('/', (req, res) => res.send('API Running'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server lancé sur le port ${PORT}`));