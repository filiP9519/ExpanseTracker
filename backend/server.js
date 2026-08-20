const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
// Middleware pre spracovanie JSON a CORS
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Middleware pre servírovanie statických súborov (CSS, JS, obrázky)
// Keď prehliadač požiada o súbor, Express ho bude hľadať v adresári 'frontend'
app.use(express.static(path.join(__dirname, '../frontend')));

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

app.get('/',(req, res)=>res.render('index.html'))
// Pripojenie auth routes
// Všetky cesty definované v authRoutes budú dostupné (napr. /login, /signup)
app.use(authRoutes);


//cookies
//test
/*
app.get('/set-cookie',(req,res) =>{
res.cookie('newUser','false');
res.cookie('isBasicUser',true,{maxAge : 1000*60*60*24, httpOnly: true}); //fix to HTTPS after ready to deploy
res.send('Cookie set.');
});

app.get('/read-cookie',(req, res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    console.log("Cookies of newUser:" + cookies.newUser);
    res.json(cookies); //send cookies back as json to browser
});
*/

