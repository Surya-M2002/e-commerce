import API_URL from "../config";
import { loadDomainData } from "./search";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP");
  return res.json();
}

export async function fetchCategories(domain) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : "";
  const api = `${API_URL}/api/categories${qs}`;
  const legacy = `${API_URL}/categories${qs}`;
  try {
    const data = await getJson(api);
    if (Array.isArray(data) && data.length) return data;
  } catch {
    try {
      const data = await getJson(legacy);
      if (Array.isArray(data) && data.length) return data;
    } catch {
      /* noop */
    }
  }
  const fallback = await loadDomainData(API_URL, domain || "grocery");
  return Array.isArray(fallback.categories) ? fallback.categories : [];
}

export async function fetchProducts(domain) {
  const qs = domain ? `?domain=${encodeURIComponent(domain)}` : "";
  const api = `${API_URL}/api/products${qs}`;
  const legacy = `${API_URL}/products${qs}`;
  try {
    const data = await getJson(api);
    if (Array.isArray(data) && data.length) return data;
  } catch {
    try {
      const data = await getJson(legacy);
      if (Array.isArray(data) && data.length) return data;
    } catch {
      /* noop */
    }
  }
  const fallback = await loadDomainData(API_URL, domain || "grocery");
  return Array.isArray(fallback.products) ? fallback.products : [];
}
