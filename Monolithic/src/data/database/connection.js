// src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../../library.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'available',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (!err) {
            // Insert sample data if table is empty
            db.get('SELECT COUNT(*) as count FROM books', (err, row) => {
                if (row.count === 0) {
                    const sampleBooks = [
                        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '978-0743273565', status: 'available' },
                        { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '978-0061120084', status: 'available' },
                        { title: '1984', author: 'George Orwell', isbn: '978-0451524935', status: 'borrowed' },
                        { title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '978-0141439518', status: 'available' },
                        { title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '978-0316769174', status: 'available' },
                        { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '978-0547928227', status: 'borrowed' },
                        { title: 'Fahrenheit 451', author: 'Ray Bradbury', isbn: '978-1451673265', status: 'available' },
                        { title: 'Jane Eyre', author: 'Charlotte Brontë', isbn: '978-0141441146', status: 'available' }
                    ];

                    const insertSql = 'INSERT INTO books (title, author, isbn, status) VALUES (?, ?, ?, ?)';
                    sampleBooks.forEach(book => {
                        db.run(insertSql, [book.title, book.author, book.isbn, book.status]);
                    });
                    console.log('Sample data inserted into database');
                }
            });
        }
    });
}

module.exports = db;