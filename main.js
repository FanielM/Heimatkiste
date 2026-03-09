// ==============================
// 1️⃣ ELEMENTE SELEKTIEREN
// ==============================
const cartBtn = document.querySelector('#cart-btn');
const cartSidebar = document.querySelector('#cart-sidebar');
const cartOverlay = document.querySelector('#cart-overlay');
const closeCart = document.querySelector('#close-cart');

const favBtn = document.querySelector('#favorites-btn');
const favSidebar = document.querySelector('#favorites-sidebar');
const favOverlay = document.querySelector('#favorites-overlay');
const closeFav = document.querySelector('#close-favorites');

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

const checkoutBtn = document.querySelector('.checkout-btn');

// ==============================
// 2️⃣ SIDEBAR STEUERUNG
// ==============================

// Warenkorb öffnen
cartBtn.onclick = () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
};

// Warenkorb schließen
const hideCart = () => {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
};
closeCart.onclick = hideCart;
cartOverlay.onclick = hideCart;

// Favoriten öffnen
favBtn.onclick = () => {
    favSidebar.classList.add('active');
    favOverlay.classList.add('active');
};

// Favoriten schließen
const hideFav = () => {
    favSidebar.classList.remove('active');
    favOverlay.classList.remove('active');
};
closeFav.onclick = hideFav;
favOverlay.onclick = hideFav;

// Mobile Menü
if (menuIcon) {
    menuIcon.onclick = () => navbar.classList.toggle('active');
}

// ==============================
// 3️⃣ SWIPER INITIALISIERUNG
// ==============================
if(document.querySelector('.home.swiper')) {
    new Swiper(".home", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
    });
}

// ==============================
// 4️⃣ WARENKORB LOGIK
// ==============================
let cart = JSON.parse(localStorage.getItem('heimatkiste_cart')) || [];

window.updateCartUI = () => {
    const container = document.querySelector('#cart-items-container');
    const totalElement = document.querySelector('#cart-total');
    const countBadge = document.querySelector('#cart-count');

    countBadge.innerHTML = cart.length;
    localStorage.setItem('heimatkiste_cart', JSON.stringify(cart));

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Deine Kiste ist leer...</p>';
        totalElement.innerHTML = '0,00€';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-bottom:1px solid #eee;">
            <div>
                <h4 style="font-size:0.9rem; margin:0;">${item.title}</h4>
                <span style="color:#3cb815; font-weight:600;">${item.price.toFixed(2).replace('.', ',')}€</span>
            </div>
            <i class='bx bx-trash' style="cursor:pointer; color:#ff4d4d; font-size:1.2rem;" onclick="removeFromCart(${index})"></i>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalElement.innerHTML = total.toFixed(2).replace('.', ',') + '€';
};

window.addToCart = (title, price) => {
    cart.push({ title, price: parseFloat(price) });
    updateCartUI();
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCartUI();
};

// Checkout
if(checkoutBtn){
    checkoutBtn.onclick = () => {
        if(cart.length === 0){
            alert("Deine Kiste ist noch leer!");
            return;
        }
        alert("Vielen Dank! Deine Bestellung wurde an die Erzeuger übermittelt.");
        cart = [];
        updateCartUI();
        hideCart();
    };
}

// ==============================
// 5️⃣ FAVORITEN LOGIK
// ==============================
let favorites = JSON.parse(localStorage.getItem('heimatkiste_favs')) || [];

window.toggleFavorite = (title) => {
    const favCountBadge = document.querySelector('#favorites-count');
    const favContainer = document.querySelector('#favorites-items-container');

    if (favorites.includes(title)) {
        favorites = favorites.filter(f => f !== title);
    } else {
        favorites.push(title);
    }

    localStorage.setItem('heimatkiste_favs', JSON.stringify(favorites));
    favCountBadge.innerHTML = favorites.length;

    if(favorites.length === 0){
        favContainer.innerHTML = '<p class="empty-msg">Keine Favoriten gemerkt...</p>';
    } else {
        favContainer.innerHTML = favorites.map((f) => `
            <div class="cart-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
                <span>${f}</span>
                <i class='bx bx-trash' style="cursor:pointer;" onclick="toggleFavorite('${f}')"></i>
            </div>
        `).join('');
    }
};

// ==============================
// 6️⃣ INITIALISIERUNG
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    document.querySelector('#favorites-count').innerHTML = favorites.length;
});
// Container für Produkte
const container = document.getElementById("products-grid");

// Funktion zum Rendern der Produkte
function renderProducts(category = "Alle") {
  container.innerHTML = ""; // zuerst leeren

  let filtered = products;

  if (category !== "Alle") {
    filtered = products.filter(p => p.category === category);
  }

  if (filtered.length === 0) {
    container.innerHTML = "<p class='empty-msg'>Keine Produkte verfügbar...</p>";
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price.toFixed(2)} €</p>
      <p>${p.farmer}</p>
      <button onclick="addToCart('${p.title}')">Kaufen</button>
    `;

    container.appendChild(card);
  });

  updateCategoryCounts();
}

// Kategorie-Zähler aktualisieren
function updateCategoryCounts() {
  const categories = ["Obst", "Gemüse", "Milchprodukte", "Alle"];
  categories.forEach(cat => {
    let count = cat === "Alle" ? products.length : products.filter(p => p.category === cat).length;
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = `${count} Produkte`;
  });
}

// Warenkorb-Funktion (Platzhalter)
function addToCart(title) {
  alert(`Produkt "${title}" zum Warenkorb hinzugefügt!`);
}

// Initial alle Produkte anzeigen
renderProducts("Alle");
