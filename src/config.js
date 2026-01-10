const API_URL =
  typeof window !== "undefined" &&
  /localhost|127\.0\.0\.1/.test(window.location.hostname)
    ? "http://localhost:4000"
    : import.meta.env.VITE_API_URL ||
      "https://e-commerce-backend-m3lq.onrender.com";

export default API_URL;
