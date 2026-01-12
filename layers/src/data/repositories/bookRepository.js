// src/data/repositories/bookRepository.js
const db = require('../database/connection');

class BookRepository {
    // TODO: Implement findAll
    async findAll(status = null) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM books';
            let params = [];
            
            if (status) {
                sql += ' WHERE status = ?';
                params.push(status);
            }
            
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    // TODO: Implement findById
    async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    // TODO: Implement create
    async create(bookData) {
        const { title, author, isbn } = bookData;
        
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)';
            
            db.run(sql, [title, author, isbn], function(err) {
                if (err) {
                    console.error('❌ เพิ่มหนังสือ ล้มเหลว:', err.message);
                    reject(err);
                } else {
                    // Return the created book
                    db.get('SELECT * FROM books WHERE id = ?', [this.lastID], (err, row) => {
                        if (err) {
                            console.error('❌ เพิ่มหนังสือ ล้มเหลว:', err.message);
                            reject(err);
                        } else {
                            console.log(`✅ เพิ่มหนังสือ: "${title}" (ID: ${row.id})`);
                            resolve(row);
                        }
                    });
                }
            });
        });
    }

    // TODO: Implement update
    async update(id, bookData) {
        const { title, author, isbn } = bookData;
        
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?';
            
            db.run(sql, [title, author, isbn, id], function(err) {
                if (err) {
                    console.error(`❌ แก้ไขหนังสือ ID ${id} ล้มเหลว:`, err.message);
                    reject(err);
                } else {
                    // Return updated book
                    db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                        if (err) {
                            console.error(`❌ แก้ไขหนังสือ ID ${id} ล้มเหลว:`, err.message);
                            reject(err);
                        } else {
                            console.log(`✏️  แก้ไขหนังสือ: "${title}" (ID: ${id})`);
                            resolve(row);
                        }
                    });
                }
            });
        });
    }

    // TODO: Implement updateStatus
    async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE books SET status = ? WHERE id = ?', 
                [status, id], 
                function(err) {
                    if (err) {
                        console.error(`❌ เปลี่ยนสถานะ ID ${id} ล้มเหลว:`, err.message);
                        reject(err);
                    } else {
                        // Return updated book
                        db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
                            if (err) {
                                console.error(`❌ เปลี่ยนสถานะ ID ${id} ล้มเหลว:`, err.message);
                                reject(err);
                            } else {
                                const statusLabel = status === 'borrowed' ? '📚 ยืมแล้ว' : '✨ คืนแล้ว';
                                console.log(`${statusLabel} เปลี่ยนสถานะ: "${row.title}" (ID: ${id})`);
                                resolve(row);
                            }
                        });
                    }
                }
            );
        });
    }

    // TODO: Implement delete
    async delete(id) {
        return new Promise((resolve, reject) => {
            // ดึงชื่อหนังสือก่อนลบ
            db.get('SELECT title FROM books WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(`❌ ลบหนังสือ ID ${id} ล้มเหลว:`, err.message);
                    reject(err);
                } else if (!row) {
                    reject(new Error('Book not found'));
                } else {
                    db.run('DELETE FROM books WHERE id = ?', [id], function(err) {
                        if (err) {
                            console.error(`❌ ลบหนังสือ ID ${id} ล้มเหลว:`, err.message);
                            reject(err);
                        } else {
                            console.log(`🗑️  ลบหนังสือ: "${row.title}" (ID: ${id})`);
                            resolve({ message: 'Book deleted successfully' });
                        }
                    });
                }
            });
        });
    }
}

module.exports = new BookRepository();