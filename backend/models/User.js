const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})

const validateUser = async (username) =>  {
    const query = 'SELECT username FROM users WHERE username = $1';
    const values = [username];

    const rows = await pool.query(query, values);
    return rows.rowCount > 0;
}

//(ekvivalent User.create())
const User = {
    async create(email, password, username){
        const userExists = await validateUser(username);
        if (userExists){
            throw Error('user already exists');
        }
        //zasifrovanie hesla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const query = 'INSERT INTO users(email,password,username) VALUES ($1,$2,$3) RETURNING *';
        const values = [email, hashedPassword, username];
        const result = await pool.query(query, values);
        return result.rows[0]; // Vráti vytvoreného používateľa
    },
    async login(username, password){
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query,values);
        if(result){
            const auth = await bcrypt.compare(password, result.rows[0].password);
            if (auth){
                return result.rows[0];
            }
            throw Error('Incorrect password!');
        }
        throw Error('Incorrect username!');
    }
}

module.exports = User;