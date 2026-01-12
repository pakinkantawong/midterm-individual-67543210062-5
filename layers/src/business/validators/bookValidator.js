// src/business/validators/bookValidator.js
const { ValidationError } = require('../../presentation/errors/customErrors');

class BookValidator {
    validateBookData(data) {
        const { title, author, isbn } = data;
        
        if (!title || !author || !isbn) {
            throw new ValidationError('Title, author, and ISBN are required');
        }
        
        return true;
    }
    
    validateISBN(isbn) {
        // Accept any non-empty ISBN
        if (!isbn || isbn.trim() === '') {
            throw new ValidationError('ISBN cannot be empty');
        }
        
        return true;
    }
    
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new ValidationError('Invalid book ID');
        }
        return numId;
    }
}

module.exports = new BookValidator();