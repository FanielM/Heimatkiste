const container = document.getElementById('products-grid');

function renderProducts(filter = 'Alle') {
    if (!container) return;

    // Produkte aus LocalStorage
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
    } catch(e) {
        console.warn("LocalStorage konnte nicht gelesen werden.");
    }

    const allProducts = [...window.products, ...farmerProducts];

    const filteredProducts = (filter === 'Alle' || filter === 'Alle zeigen') 
        ? allProducts 
        : allProducts.filter(p => p.category === filter);

    if (filteredProducts.length === 0) {
        container.innerHTML = '<p class="empty-msg">Aktuell keine Produkte in dieser Kategorie verfügbar.</p>';
    } else {
        container.innerHTML = filteredProducts.map(p => `
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

    updateCategoryCounts(allProducts);
}

function updateCategoryCounts(allProducts) {
    const categories = ['Frisch vom Feld','Obst','Gemüse','Milchprodukte','Eier & Honig','Fleisch'];

    const totalCount = allProducts.length;
    const allCountElement = document.getElementById('count-Alle');
    if(allCountElement) allCountElement.innerText = `${totalCount} Produkte`;

    categories.forEach(cat => {
        const count = allProducts.filter(p => p.category === cat).length;
        const element = document.getElementById(`count-${cat}`);
        if(element) element.innerText = `${count} ${count === 1 ? 'Produkt' : 'Produkte'}`;
    });
}

// Platzhalter-Funktionen
function addToCart(title, price) {
    alert(`"${title}" (${price.toFixed(2)}€) wurde in den Warenkorb gelegt!`);
}

function toggleFavorite(title) {
    alert(`"${title}" wurde zu deinen Favoriten hinzugefügt!`);
}

// Automatisches Rendern beim Laden
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => renderProducts());
} else {
    renderProducts();
}
