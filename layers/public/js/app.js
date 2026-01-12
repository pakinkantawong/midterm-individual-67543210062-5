// Main Application Logic for Library Management
let currentFilter = 'all';
let allBooks = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    loadBooks();
});

// Update current time in navbar
function updateCurrentTime() {
    const time = new Date().toLocaleTimeString('th-TH');
    const element = document.getElementById('current-time');
    if (element) {
        element.textContent = time;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Add button
    document.getElementById('add-btn').addEventListener('click', showAddModal);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            filterBooks(filter);
        });
    });
    
    // Modal close button
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    
    // Form submission
    document.getElementById('book-form').addEventListener('submit', handleSubmit);
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchBooks(e.target.value);
        });
    }
    
    // Click outside modal to close
    document.getElementById('book-modal').addEventListener('click', (e) => {
        if (e.target.id === 'book-modal') {
            closeModal();
        }
    });
}

// Load books
async function loadBooks(status = null) {
    try {
        showLoading();
        
        const data = await api.getAllBooks(status);
        allBooks = data.data;
        
        displayBooks(allBooks);
        updateStatistics(data.statistics);
        
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        showToast('Failed to load books: ' + error.message, 'error');
        hideLoading();
    }
}

// Display books
function displayBooks(books) {
    const container = document.getElementById('book-list');
    const emptyState = document.getElementById('empty-state');
    
    if (books.length === 0) {
        container.innerHTML = '';
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        return;
    }
    
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    container.innerHTML = books.map(book => createBookCard(book)).join('');
}

// Create book card HTML
function createBookCard(book) {
    const createdAt = new Date(book.created_at).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    const statusBadge = book.status === 'available' 
        ? '<span class="status-badge status-available">✅ Available</span>'
        : '<span class="status-badge status-borrowed">📤 Borrowed</span>';
    
    const actionButtons = book.status === 'available' 
        ? `<button class="btn btn-success btn-small" onclick="borrowBook(${book.id})">📥 Borrow</button>`
        : `<button class="btn btn-warning btn-small" onclick="returnBook(${book.id})">📤 Return</button>`;
    
    return `
        <div class="book-card">
            <div class="book-card-header">
                <h3 title="${escapeHtml(book.title)}">${escapeHtml(book.title)}</h3>
                <p class="author">👤 ${escapeHtml(book.author)}</p>
            </div>
            <div class="book-card-body">
                <div class="book-meta">
                    📅 Added: ${createdAt}
                </div>
                <div class="isbn">
                    🔖 ${escapeHtml(book.isbn)}
                </div>
                ${statusBadge}
                <div class="book-actions">
                    ${actionButtons}
                    <button class="btn btn-secondary btn-small" onclick="editBook(${book.id})">✏️ Edit</button>
                    <button class="btn btn-danger btn-small" onclick="deleteBook(${book.id})">🗑️ Delete</button>
                </div>
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics(stats) {
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-borrowed').textContent = stats.borrowed;
    document.getElementById('stat-total').textContent = stats.total;
}

// Filter books
function filterBooks(status) {
    currentFilter = status;
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) {
            btn.classList.add('active');
        }
    });
    
    loadBooks(status === 'all' ? null : status);
}

// Search books
function searchBooks(query) {
    if (!query.trim()) {
        displayBooks(allBooks);
        return;
    }
    
    const filtered = allBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query)
    );
    
    displayBooks(filtered);
}

// Show/hide loading
function showLoading() {
    const loading = document.getElementById('loading');
    const bookList = document.getElementById('book-list');
    const emptyState = document.getElementById('empty-state');
    
    if (loading) loading.classList.add('show');
    if (bookList) bookList.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
}

function hideLoading() {
    const loading = document.getElementById('loading');
    const bookList = document.getElementById('book-list');
    
    if (loading) loading.classList.remove('show');
    if (bookList) bookList.style.display = 'grid';
}

// Modal functions
function showAddModal() {
    document.getElementById('modal-title').textContent = '📖 Add New Book';
    document.getElementById('book-form').reset();
    document.getElementById('book-id').value = '';
    document.getElementById('status').value = 'available';
    document.getElementById('book-modal').classList.add('show');
}

function closeModal() {
    document.getElementById('book-modal').classList.remove('show');
    document.getElementById('book-form').reset();
}

// Form submit
async function handleSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
        status: document.getElementById('status').value
    };
    
    try {
        if (id) {
            await api.updateBook(id, bookData);
            showToast('✅ Book updated successfully!', 'success');
        } else {
            await api.createBook(bookData);
            showToast('✅ Book added successfully!', 'success');
        }
        
        closeModal();
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// Edit book
async function editBook(id) {
    try {
        const response = await api.getBookById(id);
        const book = response.data;
        
        document.getElementById('modal-title').textContent = '✏️ Edit Book';
        document.getElementById('book-id').value = book.id;
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('isbn').value = book.isbn;
        document.getElementById('status').value = book.status;
        
        document.getElementById('book-modal').classList.add('show');
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// Borrow book
async function borrowBook(id) {
    if (!confirm('📥 Borrow this book?')) return;
    
    try {
        await api.borrowBook(id);
        showToast('✅ Book borrowed successfully!', 'success');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// Return book
async function returnBook(id) {
    if (!confirm('📤 Return this book?')) return;
    
    try {
        await api.returnBook(id);
        showToast('✅ Book returned successfully!', 'success');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// Delete book
async function deleteBook(id) {
    if (!confirm('🗑️ Are you sure you want to delete this book?')) return;
    
    try {
        await api.deleteBook(id);
        showToast('✅ Book deleted successfully!', 'success');
        loadBooks(currentFilter === 'all' ? null : currentFilter);
    } catch (error) {
        showToast('❌ Error: ' + error.message, 'error');
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}