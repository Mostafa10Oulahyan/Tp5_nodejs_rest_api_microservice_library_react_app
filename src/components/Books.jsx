import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config';
import './Books.css';

function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        numberPages: '',
        publisher: ''
    });

    // Fetch all books
    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_CONFIG.BOOKS_API}/books`);
            setBooks(response.data.books || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch books: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Add new book
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_CONFIG.BOOKS_API}/book`, formData);
            setFormData({ title: '', author: '', numberPages: '', publisher: '' });
            fetchBooks();
            alert('Book added successfully!');
        } catch (err) {
            alert('Failed to add book: ' + err.message);
        }
    };

    // Delete book
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`${API_CONFIG.BOOKS_API}/books/${id}`);
                fetchBooks();
                alert('Book deleted successfully!');
            } catch (err) {
                alert('Failed to delete book: ' + err.message);
            }
        }
    };

    return (
        <div className="books-container">
            <h2>📚 Books Management</h2>

            {/* Add Book Form */}
            <div className="form-section">
                <h3>Add New Book</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Number of Pages"
                        value={formData.numberPages}
                        onChange={(e) => setFormData({ ...formData, numberPages: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Publisher"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                        required
                    />
                    <button type="submit">Add Book</button>
                </form>
            </div>

            {/* Books List */}
            <div className="list-section">
                <h3>Books List</h3>
                {loading && <p>Loading books...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && (
                    <div className="books-grid">
                        {books.length === 0 ? (
                            <p>No books found. Add your first book!</p>
                        ) : (
                            books.map((book) => (
                                <div key={book._id} className="book-card">
                                    <h4>{book.title}</h4>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Pages:</strong> {book.numberPages}</p>
                                    <p><strong>Publisher:</strong> {book.publisher}</p>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(book._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;
