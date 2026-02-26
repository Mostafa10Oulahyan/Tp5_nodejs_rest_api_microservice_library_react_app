import { useState } from 'react';
import Books from './components/Books';
import Customers from './components/Customers';
import Orders from './components/Orders';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Library Management System</h1>
        <p>Manage your books, customers, and orders</p>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'books' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('books')}
        >
          📚 Books
        </button>
        <button
          className={activeTab === 'customers' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('customers')}
        >
          👥 Customers
        </button>
        <button
          className={activeTab === 'orders' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'books' && <Books />}
        {activeTab === 'customers' && <Customers />}
        {activeTab === 'orders' && <Orders />}
      </main>

      <footer className="app-footer">
        <p>Library Management System - Built with React & Node.js</p>
      </footer>
    </div>
  );
}

export default App;
