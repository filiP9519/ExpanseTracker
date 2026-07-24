const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5432,
    password: 'admin',

});

app.post('/api/save',async (req, res) => {
    const{stock_name,stock_price_atm,stock_amount} = req.body;
    await pool.query('INSERT INTO transaction (stock_name, stock_price_atm, stock_amount) VALUES ($1, $2, $3)',
        [stock_name,stock_price_atm,stock_amount]);
    res.send("Data saved!");
});

app.listen(3000, () => console.log('Server started on port 3000'));