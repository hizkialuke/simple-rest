const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create data
app.post('/api/users', (req, res) => {
    const data = { ...req.body };
    const querySql = 'INSERT INTO chat_users SET ?';

    connection.query(querySql, data, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'failed to insert data!', error: err });
        }

        return res.status(201).json({ success: true, message: 'request success!' });
    });
});

// get data
app.get('/api/users', (req, res) => {
    const querySql = 'SELECT * FROM chat_users';

    connection.query(querySql, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Something gone wrong', error: err });
        }

        return res.status(200).json({ success: true, data: rows });
    });
});

// get detail
app.get('/api/users/:id', (req, res) => {
    const querySearch = 'SELECT * FROM chat_users WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        if (rows.length) {
			return res.status(200).json({ success: true, data: rows });
        } else {
            return res.status(404).json({ message: 'Data not found!', success: false });
        }
    });
});

// update data
app.put('/api/users/:id', (req, res) => {
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM chat_users WHERE id = ?';
    const queryUpdate = 'UPDATE chat_users SET ? WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        if (rows.length) {
            connection.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Something gone wrong', error: err });
                }

                return res.status(200).json({ success: true, message: 'update success!' });
            });
        } else {
            return res.status(404).json({ message: 'Data not found!', success: false });
        }
    });
});

// delete data
app.delete('/api/users/:id', (req, res) => {
    const querySearch = 'SELECT * FROM chat_users WHERE id = ?';
    const queryDelete = 'DELETE FROM chat_users WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ message: 'Something gone wrong', error: err });
        }

        if (rows.length) {
            connection.query(queryDelete, req.params.id, (err, rows, field) => {
                // error handling
                if (err) {
                    return res.status(500).json({ message: 'Something gone wrong', error: err });
                }

                return res.status(200).json({ success: true, message: 'delete success!' });
            });
        } else {
            return res.status(404).json({ message: 'Data not found!', success: false });
        }
    });
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
