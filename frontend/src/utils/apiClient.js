import API_URL from "../config";
import { loadDomainData } from "./search";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP");
  return res.json();
}

export function normalizeImageUrl(imgUrl) {
  if (!imgUrl) return "https://placehold.co/60x60?text=IMG";
  try {
    const api = new URL(API_URL);
    if (imgUrl.startsWith("/")) return `${API_URL}${imgUrl}`;
    if (/^https?:\/\//i.test(imgUrl)) {
      const u = new URL(imgUrl);
      if (u.hostname === "localhost" || u.hostname === "127.0.0.1") {
        u.protocol = api.protocol;
        u.host = api.host;
        return u.toString();
      }
      return imgUrl;
    }
    return `${API_URL}/${imgUrl}`;
  } catch {
    return imgUrl;
  }
}

export async function fetchCategories(domain) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : "";
  const api = `${API_URL}/api/categories${qs}`;
  const legacy = `${API_URL}/categories${qs}`;
  const REMOTE = "https://e-commerce-backend-m3lq.onrender.com";
  const apiRemote = `${REMOTE}/api/categories${qs}`;
  const legacyRemote = `${REMOTE}/categories${qs}`;
  try {
    const data = await getJson(api);
    if (Array.isArray(data) && data.length) return data;
  } catch {
    try {
      const data = await getJson(legacy);
      if (Array.isArray(data) && data.length) return data;
    } catch {
      try {
        const rd = await getJson(apiRemote);
        if (Array.isArray(rd) && rd.length) return rd;
      } catch {
        try {
          const rd2 = await getJson(legacyRemote);
          if (Array.isArray(rd2) && rd2.length) return rd2;
        } catch {
          /* noop */
        }
      }
    }
  }
  const fallback = await loadDomainData(REMOTE, domain || "grocery");
  return Array.isArray(fallback.categories) ? fallback.categories : [];
}

export async function fetchProducts(domain) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : "";
  const api = `${API_URL}/api/products${qs}`;
  const legacy = `${API_URL}/products${qs}`;
  const REMOTE = "https://e-commerce-backend-m3lq.onrender.com";
  const apiRemote = `${REMOTE}/api/products${qs}`;
  const legacyRemote = `${REMOTE}/products${qs}`;
  try {
    const data = await getJson(api);
    if (Array.isArray(data) && data.length) return data;
  } catch {
    try {
      const data = await getJson(legacy);
      if (Array.isArray(data) && data.length) return data;
    } catch {
      try {
        const rd = await getJson(apiRemote);
        if (Array.isArray(rd) && rd.length) return rd;
      } catch {
        try {
          const rd2 = await getJson(legacyRemote);
          if (Array.isArray(rd2) && rd2.length) return rd2;
        } catch {
          /* noop */
        }
      }
    }
  }
  const fallback = await loadDomainData(REMOTE, domain || "grocery");
  return Array.isArray(fallback.products) ? fallback.products : [];
}
