const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
// Middleware pre spracovanie JSON a CORS
app.use(express.json());
app.use(cors());

// Middleware pre servírovanie statických súborov (CSS, JS, obrázky)
// Keď prehliadač požiada o súbor, Express ho bude hľadať v adresári 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

// Pripojenie auth routes
// Všetky cesty definované v authRoutes budú dostupné (napr. /login, /signup)
app.use(authRoutes);

// Konfigurácia databázy
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
    password: 'admin',
});

// Existujúca cesta pre ukladanie dát
app.post('/api/save', async (req, res) => {
    const { stock_name, stock_price_atm, stock_amount } = req.body;
    await pool.query('INSERT INTO transaction (stock_name, stock_price_atm, stock_amount) VALUES ($1, $2, $3)',
        [stock_name, stock_price_atm, stock_amount]);
    res.send("Data saved!");
});

// Spustenie servera
app.listen(3000, () => console.log('Server started on port 3000'));