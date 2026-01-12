// src/business/services/bookService.js
const bookRepository = require('../../data/repositories/bookRepository');
const bookValidator = require('../validators/bookValidator');
const { ValidationError, NotFoundError, ConflictError } = require('../../presentation/errors/customErrors');

class BookService {
    async getAllBooks(status = null) {
        if (status) {
            const validStatuses = ['available', 'borrowed'];
            if (!validStatuses.includes(status)) {
                throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
            }
        }

        const books = await bookRepository.findAll(status);
        
        const statistics = {
            total: books.length,
            available: books.filter(b => b.status === 'available').length,
            borrowed: books.filter(b => b.status === 'borrowed').length
        };

        return { books, statistics };
    }

    async getBookById(id) {
        const validatedId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validatedId);
        
        if (!book) {
            throw new NotFoundError(`Book with ID ${id} not found`);
        }

        return book;
    }

    async createBook(bookData) {
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);
        
        const createdBook = await bookRepository.create(bookData);
        return createdBook;
    }

    async updateBook(id, bookData) {
        const validatedId = bookValidator.validateId(id);
        bookValidator.validateBookData(bookData);
        bookValidator.validateISBN(bookData.isbn);

        const book = await bookRepository.findById(validatedId);
        if (!book) {
            throw new NotFoundError(`Book with ID ${id} not found`);
        }

        const updatedBook = await bookRepository.update(validatedId, bookData);
        return updatedBook;
    }

    async borrowBook(id) {
        const validatedId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validatedId);
        
        if (!book) {
            throw new NotFoundError(`Book with ID ${id} not found`);
        }

        if (book.status === 'borrowed') {
            throw new ConflictError('Book is already borrowed');
        }

        const updatedBook = await bookRepository.updateStatus(validatedId, 'borrowed');
        return updatedBook;
    }

    async returnBook(id) {
        const validatedId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validatedId);
        
        if (!book) {
            throw new NotFoundError(`Book with ID ${id} not found`);
        }

        if (book.status === 'available') {
            throw new ConflictError('Book is already available');
        }

        const updatedBook = await bookRepository.updateStatus(validatedId, 'available');
        return updatedBook;
    }

    async deleteBook(id) {
        const validatedId = bookValidator.validateId(id);
        const book = await bookRepository.findById(validatedId);
        
        if (!book) {
            throw new NotFoundError(`Book with ID ${id} not found`);
        }

        const result = await bookRepository.delete(validatedId);
        return result;
    }
}

module.exports = new BookService();