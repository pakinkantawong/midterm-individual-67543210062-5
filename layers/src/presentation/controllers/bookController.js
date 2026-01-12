// src/presentation/controllers/bookController.js
const bookService = require('../../business/services/bookService');

class BookController {
    async getAllBooks(req, res, next) {
        try {
            const { status } = req.query;
            const result = await bookService.getAllBooks(status);
            
            res.status(200).json({
                success: true,
                data: result.books,
                statistics: result.statistics
            });
        } catch (error) {
            next(error);
        }
    }

    async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await bookService.getBookById(id);
            
            res.status(200).json({
                success: true,
                data: book
            });
        } catch (error) {
            next(error);
        }
    }

    async createBook(req, res, next) {
        try {
            const bookData = req.body;
            const createdBook = await bookService.createBook(bookData);
            
            res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: createdBook
            });
        } catch (error) {
            next(error);
        }
    }

    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const bookData = req.body;
            const updatedBook = await bookService.updateBook(id, bookData);
            
            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (error) {
            next(error);
        }
    }

    async borrowBook(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBook = await bookService.borrowBook(id);
            
            res.status(200).json({
                success: true,
                message: 'Book borrowed successfully',
                data: updatedBook
            });
        } catch (error) {
            next(error);
        }
    }

    async returnBook(req, res, next) {
        try {
            const { id } = req.params;
            const updatedBook = await bookService.returnBook(id);
            
            res.status(200).json({
                success: true,
                message: 'Book returned successfully',
                data: updatedBook
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;
            const result = await bookService.deleteBook(id);
            
            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new BookController();