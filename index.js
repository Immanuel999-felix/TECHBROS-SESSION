const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

// Routes
const pairRoute = require('./pair');
const qrRoute = require('./qr');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serves CSS/JS

// API Endpoints
app.use('/pair', pairRoute);
app.use('/qr', qrRoute);

// HTML Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/pairing', (req, res) => res.sendFile(path.join(__dirname, 'public', 'pair.html')));
app.get('/scan', (req, res) => res.sendFile(path.join(__dirname, 'public', 'qr.html')));

app.listen(PORT, () => {
    console.log(`✅ TECHBROS SERVER RUNNING ON PORT ${PORT}`);
});

module.exports = app;
