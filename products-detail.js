// --- HELPER: Sidebar Toggle ---
const setupSidebar = (btnId, sidebarSelector, overlayId, closeId) => {
    const btn = document.getElementById(btnId) || document.querySelector(btnId);
    const sidebar = document.querySelector(sidebarSelector);
    const overlay = document.getElementById(overlayId);
    const close = document.getElementById(closeId);

    if (!btn || !sidebar || !overlay) return;

    const toggle = (show) => {
        sidebar.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
    };

    btn.onclick = () => toggle(true);
    close.onclick = () => toggle(false);
    overlay.onclick = () => toggle(false);
};

// --- DATEN LADEN ---
const getProducts = () => {
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
        console.warn("Fehler beim Laden der Farmer Products:", e);
    }
    return [...(window.products || []), ...farmerProducts];
};

// --- INITIALISIERUNG ---
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const titleParam = params.get('title');
    const searchTitle = titleParam ? decodeURIComponent(titleParam).trim().toLowerCase() : '';

    const allProducts = getProducts();
    const product = allProducts.find(p => p.title.trim().toLowerCase() === searchTitle);

    if (!product) {
        console.error("Produkt nicht gefunden:", searchTitle);
        // Optional: Nachricht anzeigen statt sofortigem Redirect
        // alert("Produkt nicht gefunden!");
        // window.location.href = "index.html";
        return;
    }

    // UI befüllen (mit optional chaining zur Sicherheit)
    const updateEl = (id, prop, value) => {
        const el = document.getElementById(id);
        if (el) el[prop] = value;
    };

    updateEl('product-img', 'src', product.img);
    updateEl('product-img', 'alt', product.title);
    updateEl('product-title', 'innerText', product.title);
    updateEl('product-farmer', 'innerText', product.farmer);
    updateEl('product-desc', 'innerText', product.desc);
    updateEl('product-price', 'innerText', `${product.price.toFixed(2).replace('.', ',')}€`);

    // Warenkorb Logik
    const cartBtn = document.getElementById('add-cart-btn');
    if (cartBtn) {
        cartBtn.onclick = () => {
            if (typeof window.addToCart === 'function') {
                window.addToCart(product.title, product.price);
                alert(`${product.title} wurde hinzugefügt!`);
            }
        };
    }

    // Sidebars aktivieren
    setupSidebar('cart-btn', '.cart-sidebar', 'cart-overlay', 'close-cart');
    setupSidebar('.favorites-icon', '.favorites-sidebar', 'favorites-overlay', 'close-favorites');

    // UI Updates
    if (window.updateCartUI) window.updateCartUI();
    const favs = JSON.parse(localStorage.getItem('heimatkiste_favs')) || [];
    const favCountEl = document.getElementById('favorites-count');
    if (favCountEl) favCountEl.innerText = favs.length;
});
