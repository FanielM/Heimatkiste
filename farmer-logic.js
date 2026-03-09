// farmer-logic.js

// --- 1. Elemente selektieren ---
const addForm = document.getElementById('add-product-form');
const imgInput = document.getElementById('product-img');
const imgPreview = document.getElementById('img-preview');

// --- 2. Bildvorschau beim Upload ---
imgInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        imgPreview.src = reader.result;
        imgPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

// --- 3. Produkt hinzufügen ---
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value.trim();
    const farmer = document.getElementById('farmer-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const img = imgPreview.src || "https://via.placeholder.com/400";

    if (!name || !farmer || !price || !category) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    // LocalStorage laden
    const stored = JSON.parse(localStorage.getItem('farmerProducts')) || [];

    // Neues Produkt hinzufügen
    stored.push({ name, farmer, price, category, img });

    // Speichern
    localStorage.setItem('farmerProducts', JSON.stringify(stored));

    // Formular zurücksetzen
    addForm.reset();
    imgPreview.src = "";
    imgPreview.style.display = 'none';

    alert("Produkt erfolgreich hinzugefügt!");

    // Produkt-Liste und Homepage aktualisieren
    if (window.renderProducts) window.renderProducts();
    displayFarmerProducts();
});

// --- 4. Farmer-Inventar anzeigen ---
function displayFarmerProducts() {
    const container = document.getElementById('products-display');
    const stored = JSON.parse(localStorage.getItem('farmerProducts')) || [];
    if (!container) return;

    if (stored.length === 0) {
        container.innerHTML = "<p>Du hast aktuell keine Produkte.</p>";
        return;
    }

    container.innerHTML = stored.map((p, index) => `
        <div class="product-card-mini">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info-mini">
                <h4>${p.name}</h4>
                <p>${p.category} | ${p.price.toFixed(2).replace('.', ',')}€</p>
            </div>
            <button class="btn-delete" onclick="deleteFarmerProduct(${index})">Löschen</button>
        </div>
    `).join('');
}

// --- 5. Produkt löschen ---
window.deleteFarmerProduct = function(index) {
    const stored = JSON.parse(localStorage.getItem('farmerProducts')) || [];
    stored.splice(index, 1);
    localStorage.setItem('farmerProducts', JSON.stringify(stored));
    displayFarmerProducts();
    if (window.renderProducts) window.renderProducts();
}

// --- 6. Initialisierung ---
document.addEventListener('DOMContentLoaded', () => {
    displayFarmerProducts();
});