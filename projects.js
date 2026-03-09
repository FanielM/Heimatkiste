// --- STANDARD PRODUKTE ---
const defaultProducts = [
    { 
        title: "Bio-Äpfel (Elstar)", 
        price: 2.80, 
        farmer: "Obsthof Meyer", 
        category: "Frisch vom Feld", 
        img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=400",
        desc: "Knackige Bio-Äpfel aus der Region. Ideal für Snacks oder Kuchen. Frei von Pestiziden, frisch vom Baum."
    },
    { 
        title: "Heumilch", 
        price: 1.45, 
        farmer: "Hof Sonnenschein", 
        category: "Milchprodukte", 
        img: "https://images.unsplash.com/photo-1550583724-125581f77833?w=400",
        desc: "Frische Heumilch von glücklichen Kühen. Voller Geschmack, direkt vom Bauernhof in deine Küche."
    },
    { 
        title: "Freiland-Eier (10er)", 
        price: 3.90, 
        farmer: "Geflügelhof Weber", 
        category: "Eier & Honig", 
        img: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=400",
        desc: "Frische Freiland-Eier aus regionaler Haltung. Perfekt für Frühstück, Backen oder kreative Rezepte."
    },
    { 
        title: "Bunte Karotten", 
        price: 1.90, 
        farmer: "Gemüsebau Lang", 
        category: "Frisch vom Feld", 
        img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400",
        desc: "Süße, knackige Karotten direkt vom Feld in deine Küche."
    },
    { 
        title: "Waldhonig (500g)", 
        price: 6.50, 
        farmer: "Imkerei Schmidt", 
        category: "Eier & Honig", 
        img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400",
        desc: "Naturbelassener Waldhonig aus nachhaltiger Imkerei. Perfekt zum Süßen und Verwöhnen."
    }
];

// Produkte global verfügbar machen
window.products = defaultProducts;

// Render‑Funktion (wie du sie schon hattest)
window.renderProducts = function(filter = 'Alle') {
    const container = document.getElementById('products-grid');
    if (!container) return;
    let farmerProducts = [];
    try {
        const localData = JSON.parse(localStorage.getItem('farmerProducts')) || [];
        farmerProducts = localData.map(p => ({
            title: p.name,
            price: parseFloat(String(p.price).replace(',', '.')),
            farmer: p.farmer,
            category: p.category,
            img: p.img,
            desc: p.desc
        }));
    } catch (e) {}

    const allProducts = [...window.products, ...farmerProducts];
    const filtered = (filter === 'Alle') ? allProducts : allProducts.filter(p => p.category === filter);

    container.innerHTML = filtered.map(p => `
        <a href="products-detail.html?title=${encodeURIComponent(p.title)}" class="box">
            <div class="farmer-tag">${p.farmer}</div>
            <img src="${p.img}" alt="${p.title}">
            <h2>${p.title}</h2>
            <p class="product-desc">${p.desc}</p>
            <h3 class="preis">${p.price.toFixed(2).replace('.', ',')}€</h3>
        </a>
    `).join('');

    updateCategoryCounts(allProducts);
};
