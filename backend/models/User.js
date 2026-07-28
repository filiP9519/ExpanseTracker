const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})

//(ekvivalent User.create())
const User = {
    async create(email, password, username){
        const query = 'INSERT INTO users(email,password,username) VALUES ($1,$2,$3) RETURNING *';
        const values = [email, password, username];
        const result = await pool.query(query, values);
        return result.rows[0]; // Vráti vytvoreného používateľa
    },
    async login(username, password){
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const values = [username, password];
        const result = await pool.query(query,values);
        return result.rows[0];
    }
}

module.exports = User;