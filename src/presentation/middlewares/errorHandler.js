// src/presentation/middlewares/errorHandler.js
const { ValidationError, NotFoundError, ConflictError } = require('../errors/customErrors');

function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    
    // Handle specific error types
    if (err instanceof ValidationError) {
        return res.status(400).json({
            success: false,
            error: err.message
        });
    }
    
    if (err instanceof NotFoundError) {
        return res.status(404).json({
            success: false,
            error: err.message
        });
    }
    
    if (err instanceof ConflictError) {
        return res.status(409).json({
            success: false,
            error: err.message
        });
    }
    
    // Handle database errors (SQLite)
    if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({
            success: false,
            error: 'ISBN already exists in the database'
        });
    }
    
    // Default error response
    res.status(500).json({
        success: false,
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;