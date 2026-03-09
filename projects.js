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

// --- GLOBAL VERFÜGBAR MACHEN ---
window.products = defaultProducts;

// --- PRODUKTE RENDERN ---
window.renderProducts = function(filter = 'Alle') {
    const container = document.getElementById('products-grid');
    if (!container) return;

    // Farmer-Produkte aus LocalStorage laden
    let farmerProducts = [];
    try {
        const localData = JSON.parse(localStorage.getItem('farmerProducts')) || [];
        farmerProducts = localData.map(p => ({
            title: p.name || "Unbenannt",
            price: parseFloat(String(p.price).replace(',', '.')) || 0,
            farmer: p.farmer || "Lokaler Hof",
            category: p.category || "Allgemein",
            img: p.img || "https://via.placeholder.com/400",
            desc: p.desc || ""
        }));
    } catch (e) {
        console.warn("LocalStorage konnte nicht gelesen werden.");
    }

    const allProducts = [...window.products, ...farmerProducts];

    // Filter anwenden
    const filtered = (filter === 'Alle' || filter === 'Alle zeigen') 
        ? allProducts 
        : allProducts.filter(p => p.category === filter);

    // HTML erzeugen
    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aktuell keine Produkte in dieser Kategorie verfügbar.</p>';
    } else {
        container.innerHTML = filtered.map(p => `
            <a href="products-detail.html?title=${encodeURIComponent(p.title)}" class="box">
                <div class="farmer-tag"><i class='bx bxs-store-alt'></i> ${p.farmer}</div>
                <img src="${p.img}" alt="${p.title}">
                <h2>${p.title}</h2>
                <p class="product-desc">${p.desc}</p>
                <h3 class="preis">${p.price.toFixed(2).replace('.', ',')}€</h3>
                <div class="box-icons">
                    <i class='bx bx-cart-alt' onclick="addToCart('${p.title}', ${p.price}); event.stopPropagation();"></i>
                    <i class='bx bx-heart' onclick="toggleFavorite('${p.title}'); event.stopPropagation();"></i>
                </div>
            </a>
        `).join('');
    }

    // Kategorie-Zähler updaten
    updateCategoryCounts(allProducts);
};

// --- KATEGORIE-ZÄHLER ---
window.updateCategoryCounts = function(allProducts) {
    const categories = ['Frisch vom Feld','Obst','Gemüse','Milchprodukte','Eier & Honig','Fleisch'];

    // Gesamtanzahl
    const totalCount = allProducts.length;
    const allCountElement = document.getElementById('count-Alle');
    if (allCountElement) allCountElement.innerText = `${totalCount} Produkte`;

    categories.forEach(cat => {
        const count = allProducts.filter(p => p.category === cat).length;
        const element = document.getElementById(`count-${cat}`);
        if (element) {
            element.innerText = `${count} ${count === 1 ? 'Produkt' : 'Produkte'}`;
        }
    });
};

// --- AUTOMATISCH RENDERN ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.renderProducts());
} else {
    window.renderProducts();
}
