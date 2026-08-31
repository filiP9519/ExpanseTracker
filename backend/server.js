require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Servírovanie statických súborov
app.use(express.static(path.join(__dirname, '../frontend')));

// Konfigurácia databázy
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
});

// API cesty
/*
app.post('/api/save', async (req, res) => {
    const { stock_name, stock_price_atm, stock_amount } = req.body;
    await pool.query('INSERT INTO transaction (stock_name, stock_price_atm, stock_amount) VALUES ($1, $2, $3)',
        [stock_name, stock_price_atm, stock_amount]);
    res.send("Data saved!");
});
*/
app.use(authRoutes);

// Opravená cesta pre index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Spustenie servera
app.listen(4444, () => {
    console.log('Server started on port 4444');
});