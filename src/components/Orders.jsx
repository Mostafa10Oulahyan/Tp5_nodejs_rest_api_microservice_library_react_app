import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [books, setBooks] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        CustomerID: '',
        BookID: '',
        initialDate: '',
        deliveryDate: ''
    });

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_CONFIG.ORDERS_API}/orders`);
            setOrders(response.data.orders || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch orders: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch books and customers for the form
    const fetchBooksAndCustomers = async () => {
        try {
            const [booksRes, customersRes] = await Promise.all([
                axios.get(`${API_CONFIG.BOOKS_API}/books`),
                axios.get(`${API_CONFIG.CUSTOMERS_API}/customers`)
            ]);
            setBooks(booksRes.data.books || []);
            setCustomers(customersRes.data.customers || []);
        } catch (err) {
            console.error('Failed to fetch books/customers:', err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchBooksAndCustomers();
    }, []);

    // Add new order
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.CustomerID || !formData.BookID) {
            alert('Please select both a customer and a book');
            return;
        }
        try {
            await axios.post(`${API_CONFIG.ORDERS_API}/order`, formData);
            setFormData({ CustomerID: '', BookID: '', initialDate: '', deliveryDate: '' });
            fetchOrders();
            alert('Order created successfully!');
        } catch (err) {
            alert('Failed to create order: ' + err.message);
        }
    };

    // Get order details
    const getOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`${API_CONFIG.ORDERS_API}/order/${orderId}`);
            alert(`Order Details:\nCustomer: ${response.data.order.customerName}\nBook: ${response.data.order.bookTitle}`);
        } catch (err) {
            alert('Failed to get order details: ' + err.message);
        }
    };

    return (
        <div className="orders-container">
            <h2>📦 Orders Management</h2>

            {/* Add Order Form */}
            <div className="form-section">
                <h3>Create New Order</h3>
                <form onSubmit={handleSubmit}>
                    <select
                        value={formData.CustomerID}
                        onChange={(e) => setFormData({ ...formData, CustomerID: e.target.value })}
                        required
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer._id} value={customer._id}>
                                {customer.name} ({customer.email})
                            </option>
                        ))}
                    </select>

                    <select
                        value={formData.BookID}
                        onChange={(e) => setFormData({ ...formData, BookID: e.target.value })}
                        required
                    >
                        <option value="">Select Book</option>
                        {books.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.title} by {book.author}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        placeholder="Initial Date"
                        value={formData.initialDate}
                        onChange={(e) => setFormData({ ...formData, initialDate: e.target.value })}
                        required
                    />

                    <input
                        type="date"
                        placeholder="Delivery Date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        required
                    />

                    <button type="submit">Create Order</button>
                </form>
            </div>

            {/* Orders List */}
            <div className="list-section">
                <h3>Orders List</h3>
                {loading && <p>Loading orders...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && (
                    <div className="orders-grid">
                        {orders.length === 0 ? (
                            <p>No orders found. Create your first order!</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <p><strong>Order ID:</strong> {order._id.slice(-8)}</p>
                                    <p><strong>Customer ID:</strong> {order.CustomerID.toString().slice(-8)}</p>
                                    <p><strong>Book ID:</strong> {order.BookID.toString().slice(-8)}</p>
                                    <p><strong>Initial Date:</strong> {new Date(order.initialDate).toLocaleDateString()}</p>
                                    <p><strong>Delivery Date:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
                                    <button
                                        className="details-btn"
                                        onClick={() => getOrderDetails(order._id)}
                                    >
                                        View Details
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

export default Orders;
