// API Configuration
// Change these URLs to your deployed Vercel URLs when ready

const isDevelopment = window.location.hostname === "localhost";

export const API_CONFIG = {
  BOOKS_API: isDevelopment
    ? "http://localhost:4545"
    : "https://tp5-nodejs-rest-api-microservice-li.vercel.app",
  CUSTOMERS_API: isDevelopment
    ? "http://localhost:5555"
    : "https://tp5-nodejs-rest-api-microservice-li-eight.vercel.app",
  ORDERS_API: isDevelopment
    ? "http://localhost:6666"
    : "https://tp5-nodejs-rest-api-microservice-li-olive.vercel.app",
};
