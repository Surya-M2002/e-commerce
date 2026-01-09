import API_URL from "../config";

export async function loadDomainData(domain) {
  try {
    const [catsRes, prodRes] = await Promise.all([
      fetch(`${API_URL}/categories?domain=${domain}`),
      fetch(`${API_URL}/products?domain=${domain}`),
    ]);
    let cats = await catsRes.json();
    let items = await prodRes.json();
    let okCats = Array.isArray(cats) ? cats : [];
    let okItems = Array.isArray(items) ? items : [];
    if (!okCats.length || !okItems.length) {
      try {
        const fallbackRes = await fetch(`/data/${domain}.json`);
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          okCats = Array.isArray(data.categories) ? data.categories : okCats;
          okItems = Array.isArray(data.products) ? data.products : okItems;
        }
      } catch {
        void 0;
      }
    }
    if (okCats.length && okItems.length) {
      return { categories: okCats, products: okItems };
    }
    const FALLBACK = {
      grocery: {
        categories: [
          { id: "fruits", name: "Fruits & Vegetables", icon: "Apple" },
          { id: "dairy", name: "Dairy", icon: "Droplets" },
          { id: "snacks", name: "Snacks", icon: "Coffee" },
        ],
        products: [
          {
            id: "apple",
            name: "Apples",
            unit: "500g",
            price: 120,
            image: "https://placehold.co/300x300?text=Apples",
            categoryId: "fruits",
          },
          {
            id: "milk",
            name: "Milk",
            unit: "1L",
            price: 60,
            image: "https://placehold.co/300x300?text=Milk",
            categoryId: "dairy",
          },
          {
            id: "chips",
            name: "Potato Chips",
            unit: "100g",
            price: 35,
            image: "https://placehold.co/300x300?text=Chips",
            categoryId: "snacks",
          },
        ],
      },
      bakery: {
        categories: [
          { id: "breads", name: "Bread" },
          { id: "cakes", name: "Cakes & Pastries" },
          { id: "cookies", name: "Cookies" },
        ],
        products: [
          {
            id: "bread",
            name: "Whole Wheat Bread",
            unit: "400g",
            price: 79,
            image: "https://placehold.co/300x300?text=Bread",
            categoryId: "breads",
          },
          {
            id: "choco-cake",
            name: "Chocolate Cake",
            unit: "1 pc",
            price: 299,
            image: "https://placehold.co/300x300?text=Cake",
            categoryId: "cakes",
          },
          {
            id: "cookie",
            name: "Butter Cookies",
            unit: "200g",
            price: 99,
            image: "https://placehold.co/300x300?text=Cookies",
            categoryId: "cookies",
          },
        ],
      },
      gadget: {
        categories: [
          { id: 1, name: "Consoles", icon: "Gamepad" },
          { id: 2, name: "Laptops", icon: "Laptop" },
          { id: 3, name: "Accessories", icon: "Usb" },
        ],
        products: [
          {
            id: "ps5",
            name: "PlayStation 5",
            unit: "1 pc",
            price: 49900,
            image: "https://placehold.co/300x300?text=PS5",
            categoryId: 1,
          },
          {
            id: "laptop",
            name: "Gaming Laptop",
            unit: "1 pc",
            price: 75990,
            image: "https://placehold.co/300x300?text=Laptop",
            categoryId: 2,
          },
          {
            id: "mouse",
            name: "Wireless Mouse",
            unit: "1 pc",
            price: 799,
            image: "https://placehold.co/300x300?text=Mouse",
            categoryId: 3,
          },
        ],
      },
      electronics: {
        categories: [
          { id: 1, name: "TVs" },
          { id: 2, name: "Mobiles" },
        ],
        products: [
          {
            id: "tv",
            name: 'Smart TV 43"',
            unit: "1 pc",
            price: 27999,
            image: "https://placehold.co/300x300?text=TV",
            categoryId: 1,
          },
          {
            id: "mobile",
            name: "Android Phone",
            unit: "1 pc",
            price: 14999,
            image: "https://placehold.co/300x300?text=Mobile",
            categoryId: 2,
          },
        ],
      },
      fashion: {
        categories: [
          { id: 1, name: "Men" },
          { id: 2, name: "Women" },
        ],
        products: [
          {
            id: "men-shirt",
            name: "Men T-Shirt",
            unit: "M",
            price: 499,
            image: "https://placehold.co/300x300?text=Men%20Tee",
            categoryId: 1,
          },
          {
            id: "women-dress",
            name: "Women Dress",
            unit: "S",
            price: 1299,
            image: "https://placehold.co/300x300?text=Dress",
            categoryId: 2,
          },
        ],
      },
      furniture: {
        categories: [
          { id: 1, name: "Living" },
          { id: 2, name: "Bedroom" },
        ],
        products: [
          {
            id: "sofa",
            name: "Sofa 3-Seater",
            unit: "1 pc",
            price: 18999,
            image: "https://placehold.co/300x300?text=Sofa",
            categoryId: 1,
          },
          {
            id: "bed",
            name: "Queen Bed",
            unit: "1 pc",
            price: 24999,
            image: "https://placehold.co/300x300?text=Bed",
            categoryId: 2,
          },
        ],
      },
      clothing: {
        categories: [
          { id: 1, name: "Men" },
          { id: 2, name: "Women" },
        ],
        products: [
          {
            id: "tee",
            name: "Cotton Tee",
            unit: "L",
            price: 399,
            image: "https://placehold.co/300x300?text=Tee",
            categoryId: 1,
          },
          {
            id: "skirt",
            name: "Floral Skirt",
            unit: "M",
            price: 699,
            image: "https://placehold.co/300x300?text=Skirt",
            categoryId: 2,
          },
        ],
      },
      bags: {
        categories: [
          { id: 1, name: "Handbag" },
          { id: 2, name: "Backpack" },
        ],
        products: [
          {
            id: "handbag",
            name: "Leather Handbag",
            unit: "1 pc",
            price: 2999,
            image: "https://placehold.co/300x300?text=Handbag",
            categoryId: 1,
          },
          {
            id: "backpack",
            name: "Travel Backpack",
            unit: "1 pc",
            price: 2499,
            image: "https://placehold.co/300x300?text=Backpack",
            categoryId: 2,
          },
        ],
      },
      sports: {
        categories: [
          { id: 1, name: "Fitness" },
          { id: 2, name: "Outdoor" },
        ],
        products: [
          {
            id: "dumbbell",
            name: "Dumbbell 5kg",
            unit: "1 pc",
            price: 999,
            image: "https://placehold.co/300x300?text=Dumbbell",
            categoryId: 1,
          },
          {
            id: "ball",
            name: "Football",
            unit: "1 pc",
            price: 599,
            image: "https://placehold.co/300x300?text=Football",
            categoryId: 2,
          },
        ],
      },
      gift: {
        categories: [
          { id: 1, name: "Festive" },
          { id: 2, name: "Kids" },
        ],
        products: [
          {
            id: "hamper",
            name: "Festive Hamper",
            unit: "1 set",
            price: 1999,
            image: "https://placehold.co/300x300?text=Hamper",
            categoryId: 1,
          },
          {
            id: "toy",
            name: "Toy Car",
            unit: "1 pc",
            price: 399,
            image: "https://placehold.co/300x300?text=Toy",
            categoryId: 2,
          },
        ],
      },
      makeup: {
        categories: [
          { id: 1, name: "Face" },
          { id: 2, name: "Lips" },
        ],
        products: [
          {
            id: "foundation",
            name: "Liquid Foundation",
            unit: "30ml",
            price: 799,
            image: "https://placehold.co/300x300?text=Foundation",
            categoryId: 1,
          },
          {
            id: "lipstick",
            name: "Matte Lipstick",
            unit: "1 pc",
            price: 499,
            image: "https://placehold.co/300x300?text=Lipstick",
            categoryId: 2,
          },
        ],
      },
    };
    const f = FALLBACK[domain];
    if (f) return { categories: f.categories, products: f.products };
    return { categories: okCats, products: okItems };
  } catch {
    try {
      const fallbackRes = await fetch(`/data/${domain}.json`);
      if (fallbackRes.ok) {
        const data = await fallbackRes.json();
        const cats = Array.isArray(data.categories) ? data.categories : [];
        const items = Array.isArray(data.products) ? data.products : [];
        return { categories: cats, products: items };
      }
    } catch {
      void 0;
    }
    const FALLBACK = {
      grocery: {
        categories: [
          { id: "fruits", name: "Fruits & Vegetables", icon: "Apple" },
          { id: "dairy", name: "Dairy", icon: "Droplets" },
          { id: "snacks", name: "Snacks", icon: "Coffee" },
        ],
        products: [
          {
            id: "apple",
            name: "Apples",
            unit: "500g",
            price: 120,
            image: "https://placehold.co/300x300?text=Apples",
            categoryId: "fruits",
          },
          {
            id: "milk",
            name: "Milk",
            unit: "1L",
            price: 60,
            image: "https://placehold.co/300x300?text=Milk",
            categoryId: "dairy",
          },
          {
            id: "chips",
            name: "Potato Chips",
            unit: "100g",
            price: 35,
            image: "https://placehold.co/300x300?text=Chips",
            categoryId: "snacks",
          },
        ],
      },
      bakery: {
        categories: [
          { id: "breads", name: "Bread" },
          { id: "cakes", name: "Cakes & Pastries" },
          { id: "cookies", name: "Cookies" },
        ],
        products: [
          {
            id: "bread",
            name: "Whole Wheat Bread",
            unit: "400g",
            price: 79,
            image: "https://placehold.co/300x300?text=Bread",
            categoryId: "breads",
          },
          {
            id: "choco-cake",
            name: "Chocolate Cake",
            unit: "1 pc",
            price: 299,
            image: "https://placehold.co/300x300?text=Cake",
            categoryId: "cakes",
          },
          {
            id: "cookie",
            name: "Butter Cookies",
            unit: "200g",
            price: 99,
            image: "https://placehold.co/300x300?text=Cookies",
            categoryId: "cookies",
          },
        ],
      },
      gadget: {
        categories: [
          { id: 1, name: "Consoles", icon: "Gamepad" },
          { id: 2, name: "Laptops", icon: "Laptop" },
          { id: 3, name: "Accessories", icon: "Usb" },
        ],
        products: [
          {
            id: "ps5",
            name: "PlayStation 5",
            unit: "1 pc",
            price: 49900,
            image: "https://placehold.co/300x300?text=PS5",
            categoryId: 1,
          },
          {
            id: "laptop",
            name: "Gaming Laptop",
            unit: "1 pc",
            price: 75990,
            image: "https://placehold.co/300x300?text=Laptop",
            categoryId: 2,
          },
          {
            id: "mouse",
            name: "Wireless Mouse",
            unit: "1 pc",
            price: 799,
            image: "https://placehold.co/300x300?text=Mouse",
            categoryId: 3,
          },
        ],
      },
      electronics: {
        categories: [
          { id: 1, name: "TVs" },
          { id: 2, name: "Mobiles" },
        ],
        products: [
          {
            id: "tv",
            name: 'Smart TV 43"',
            unit: "1 pc",
            price: 27999,
            image: "https://placehold.co/300x300?text=TV",
            categoryId: 1,
          },
          {
            id: "mobile",
            name: "Android Phone",
            unit: "1 pc",
            price: 14999,
            image: "https://placehold.co/300x300?text=Mobile",
            categoryId: 2,
          },
        ],
      },
      fashion: {
        categories: [
          { id: 1, name: "Men" },
          { id: 2, name: "Women" },
        ],
        products: [
          {
            id: "men-shirt",
            name: "Men T-Shirt",
            unit: "M",
            price: 499,
            image: "https://placehold.co/300x300?text=Men%20Tee",
            categoryId: 1,
          },
          {
            id: "women-dress",
            name: "Women Dress",
            unit: "S",
            price: 1299,
            image: "https://placehold.co/300x300?text=Dress",
            categoryId: 2,
          },
        ],
      },
      furniture: {
        categories: [
          { id: 1, name: "Living" },
          { id: 2, name: "Bedroom" },
        ],
        products: [
          {
            id: "sofa",
            name: "Sofa 3-Seater",
            unit: "1 pc",
            price: 18999,
            image: "https://placehold.co/300x300?text=Sofa",
            categoryId: 1,
          },
          {
            id: "bed",
            name: "Queen Bed",
            unit: "1 pc",
            price: 24999,
            image: "https://placehold.co/300x300?text=Bed",
            categoryId: 2,
          },
        ],
      },
      clothing: {
        categories: [
          { id: 1, name: "Men" },
          { id: 2, name: "Women" },
        ],
        products: [
          {
            id: "tee",
            name: "Cotton Tee",
            unit: "L",
            price: 399,
            image: "https://placehold.co/300x300?text=Tee",
            categoryId: 1,
          },
          {
            id: "skirt",
            name: "Floral Skirt",
            unit: "M",
            price: 699,
            image: "https://placehold.co/300x300?text=Skirt",
            categoryId: 2,
          },
        ],
      },
      bags: {
        categories: [
          { id: 1, name: "Handbag" },
          { id: 2, name: "Backpack" },
        ],
        products: [
          {
            id: "handbag",
            name: "Leather Handbag",
            unit: "1 pc",
            price: 2999,
            image: "https://placehold.co/300x300?text=Handbag",
            categoryId: 1,
          },
          {
            id: "backpack",
            name: "Travel Backpack",
            unit: "1 pc",
            price: 2499,
            image: "https://placehold.co/300x300?text=Backpack",
            categoryId: 2,
          },
        ],
      },
      sports: {
        categories: [
          { id: 1, name: "Fitness" },
          { id: 2, name: "Outdoor" },
        ],
        products: [
          {
            id: "dumbbell",
            name: "Dumbbell 5kg",
            unit: "1 pc",
            price: 999,
            image: "https://placehold.co/300x300?text=Dumbbell",
            categoryId: 1,
          },
          {
            id: "ball",
            name: "Football",
            unit: "1 pc",
            price: 599,
            image: "https://placehold.co/300x300?text=Football",
            categoryId: 2,
          },
        ],
      },
      gift: {
        categories: [
          { id: 1, name: "Festive" },
          { id: 2, name: "Kids" },
        ],
        products: [
          {
            id: "hamper",
            name: "Festive Hamper",
            unit: "1 set",
            price: 1999,
            image: "https://placehold.co/300x300?text=Hamper",
            categoryId: 1,
          },
          {
            id: "toy",
            name: "Toy Car",
            unit: "1 pc",
            price: 399,
            image: "https://placehold.co/300x300?text=Toy",
            categoryId: 2,
          },
        ],
      },
      makeup: {
        categories: [
          { id: 1, name: "Face" },
          { id: 2, name: "Lips" },
        ],
        products: [
          {
            id: "foundation",
            name: "Liquid Foundation",
            unit: "30ml",
            price: 799,
            image: "https://placehold.co/300x300?text=Foundation",
            categoryId: 1,
          },
          {
            id: "lipstick",
            name: "Matte Lipstick",
            unit: "1 pc",
            price: 499,
            image: "https://placehold.co/300x300?text=Lipstick",
            categoryId: 2,
          },
        ],
      },
    };
    const f = FALLBACK[domain];
    if (f) return { categories: f.categories, products: f.products };
    return { categories: [], products: [] };
  }
}
