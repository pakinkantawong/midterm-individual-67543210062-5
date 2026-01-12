// src/presentation/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /api/books - Get all books (with optional status filter)
router.get('/', bookController.getAllBooks);

// GET /api/books/:id - Get book by ID
router.get('/:id', bookController.getBookById);

// POST /api/books - Create new book
router.post('/', bookController.createBook);

// PUT /api/books/:id - Update book
router.put('/:id', bookController.updateBook);

// PATCH /api/books/:id/borrow - Borrow book
router.patch('/:id/borrow', bookController.borrowBook);

// PATCH /api/books/:id/return - Return book
router.patch('/:id/return', bookController.returnBook);

// DELETE /api/books/:id - Delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;