const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
});

// connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = connection;