import API_URL from "../config";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP");
  return res.json();
}

export async function fetchCategories(domain) {
  const u1 = `${API_URL}/api/categories?domain=${domain}`;
  const u2 = `${API_URL}/categories?domain=${domain}`;
  try {
    const data = await getJson(u1);
    return Array.isArray(data) ? data : [];
  } catch {
    try {
      const data = await getJson(u2);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
}

export async function fetchProducts(domain) {
  const u1 = `${API_URL}/api/products?domain=${domain}`;
  const u2 = `${API_URL}/products?domain=${domain}`;
  try {
    const data = await getJson(u1);
    return Array.isArray(data) ? data : [];
  } catch {
    try {
      const data = await getJson(u2);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
}

