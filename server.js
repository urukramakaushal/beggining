const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your MySQL password
    database: 'crud_app',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// CREATE
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    db.query(sql, [name, email, age], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, name, email, age });
    });
});

// READ
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    db.query(sql, [name, email, age, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
