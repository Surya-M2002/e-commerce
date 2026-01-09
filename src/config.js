const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  /localhost|127\.0\.0\.1/.test(window.location.hostname)
    ? "http://localhost:4000"
    : "https://ecommerce-backend.onrender.com");

export default API_URL;
