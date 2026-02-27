import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../config';
import './Customers.css';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: ''
    });

    // Fetch all customers
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_CONFIG.CUSTOMERS_API}/customers`);
            setCustomers(response.data.customers || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch customers: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Add new customer
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_CONFIG.CUSTOMERS_API}/customer`, formData);
            setFormData({ name: '', email: '', age: '', address: '' });
            fetchCustomers();
            alert('Customer added successfully!');
        } catch (err) {
            alert('Failed to add customer: ' + err.message);
        }
    };

    // Delete customer
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`${API_CONFIG.CUSTOMERS_API}/customers/${id}`);
                fetchCustomers();
                alert('Customer deleted successfully!');
            } catch (err) {
                alert('Failed to delete customer: ' + err.message);
            }
        }
    };

    return (
        <div className="customers-container">
            <h2>👥 Customers Management</h2>

            {/* Add Customer Form */}
            <div className="form-section">
                <h3>Add New Customer</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />
                    <button type="submit">Add Customer</button>
                </form>
            </div>

            {/* Customers List */}
            <div className="list-section">
                <h3>Customers List</h3>
                {loading && <p>Loading customers...</p>}
                {error && <p className="error">{error}</p>}
                {!loading && !error && (
                    <div className="customers-grid">
                        {customers.length === 0 ? (
                            <p>No customers found. Add your first customer!</p>
                        ) : (
                            customers.map((customer) => (
                                <div key={customer._id} className="customer-card">
                                    <h4>{customer.name}</h4>
                                    <p><strong>Email:</strong> {customer.email}</p>
                                    <p><strong>Age:</strong> {customer.age}</p>
                                    <p><strong>Address:</strong> {customer.address}</p>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(customer._id)}
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

export default Customers;
