import API_URL from "../config";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP");
  return res.json();
}

export async function fetchCategories(domain) {
  const api = `${API_URL}/api/categories?domain=${domain}`;
  const legacy = `${API_URL}/categories?domain=${domain}`;
  try {
    const data = await getJson(api);
    return Array.isArray(data) ? data : [];
  } catch {
    try {
      const data = await getJson(legacy);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
}

export async function fetchProducts(domain) {
  const api = `${API_URL}/api/products?domain=${domain}`;
  const legacy = `${API_URL}/products?domain=${domain}`;
  try {
    const data = await getJson(api);
    return Array.isArray(data) ? data : [];
  } catch {
    try {
      const data = await getJson(legacy);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
}
