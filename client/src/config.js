const API_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  if (typeof window !== "undefined") {
    const { protocol, hostname } = window.location;
    const isLocalhost = hostname === "localhost";
    const isPrivateIP =
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname);
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(
      navigator.userAgent || "",
    );
    if (isLocalhost || isPrivateIP) {
      if (isMobile) return "https://e-commerce-backend-m3lq.onrender.com";
      return `${protocol}//${hostname}:4000`;
    }
  }
  return "https://e-commerce-backend-m3lq.onrender.com";
})();

export default API_URL;
