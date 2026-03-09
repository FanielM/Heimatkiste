// --- URL PARAMETER AUSLESEN ---
const params = new URLSearchParams(window.location.search);
const titleParam = params.get('title');
const title = titleParam ? decodeURIComponent(titleParam).trim().toLowerCase() : '';

// --- Produkte aus globalem Array + LocalStorage laden ---
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
    console.warn("Farmer Products konnten nicht geladen werden.");
}

const allProducts = [...(window.products || []), ...farmerProducts];

// --- Produkt finden ---
const product = allProducts.find(p => p.title.trim().toLowerCase() === title);

// --- Zugriff prüfen ---
if (!product) {
    alert("Zugriff auf Details nicht möglich!");
    window.location.href = "index.html";
} else {
    // Produktdetails einfügen
    document.getElementById('product-img').src = product.img;
    document.getElementById('product-img').alt = product.title;
    document.getElementById('product-title').innerText = product.title;
    document.getElementById('product-farmer').innerText = product.farmer;
    document.getElementById('product-desc').innerText = product.desc;
    document.getElementById('product-price').innerText = product.price.toFixed(2).replace('.', ',') + "€";

    // Warenkorb-Button
    document.getElementById('add-cart-btn').onclick = () => {
        window.addToCart(product.title, product.price);
        alert("Produkt in den Warenkorb gelegt!");
    };
}

// --- SIDEBARS ---
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');

cartBtn.onclick = () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
};
const hideCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
};
closeCart.onclick = hideCart;
cartOverlay.onclick = hideCart;

// Favoriten
const favBtn = document.querySelector('.favorites-icon');
const favSidebar = document.querySelector('.favorites-sidebar');
const favOverlay = document.getElementById('favorites-overlay');
const closeFav = document.getElementById('close-favorites');

favBtn.onclick = () => {
    favSidebar.classList.add('active');
    favOverlay.classList.add('active');
};
const hideFav = () => {
    favSidebar.classList.remove('active');
    favOverlay.classList.remove('active');
};
closeFav.onclick = hideFav;
favOverlay.onclick = hideFav;

// Initiales Laden von Favoriten
document.addEventListener('DOMContentLoaded', () => {
    if (window.updateCartUI) window.updateCartUI();
    const favCount = JSON.parse(localStorage.getItem('heimatkiste_favs')) || [];
    document.getElementById('favorites-count').innerText = favCount.length;
});
