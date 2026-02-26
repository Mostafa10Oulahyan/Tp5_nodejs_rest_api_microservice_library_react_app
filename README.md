# 📚 Library Management System - React App

A complete Library Management System built with React (Vite) and Node.js microservices.

## ✨ Features

### 📚 Books Management
- View all books in the library
- Add new books (title, author, pages, publisher)
- Delete books
- Beautiful card-based UI

### 👥 Customers Management
- View all customers
- Add new customers (name, email, age, address)
- Delete customers
- User-friendly interface

### 📦 Orders Management
- Create new orders (link customers with books)
- View all orders
- View detailed order information (customer name + book title)
- Date tracking (initial date & delivery date)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend microservices running (Books, Customers, Orders APIs)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure API endpoints:
   - Edit `src/config.js` to set your API URLs
   - For local development: uses localhost (4545, 5555, 6666)
   - For production: update with your Vercel URLs

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## 🔧 Configuration

### API Endpoints

Edit `src/config.js`:

```javascript
export const API_CONFIG = {
  BOOKS_API: 'http://localhost:4545',      // Books service
  CUSTOMERS_API: 'http://localhost:5555',  // Customers service
  ORDERS_API: 'http://localhost:6666',     // Orders service
};
```

### Backend Services Required

Make sure these services are running:

1. **Books Service** (Port 4545)
2. **Customers Service** (Port 5555)
3. **Orders Service** (Port 6666)

## 📦 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🛠️ Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **Axios** - HTTP client for API calls
- **CSS3** - Styling
- **Node.js + Express** - Backend microservices
- **MongoDB** - Database

## 📝 License

MIT

