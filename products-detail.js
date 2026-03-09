// URL‑Parameter auslesen
const params = new URLSearchParams(window.location.search);
const titleParam = params.get('title') || "";

// direkt dekodieren, ohne zusätzlich .toLowerCase() hier
const titleDecoded = decodeURIComponent(titleParam);

// Produkte laden (global + LocalStorage)
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

const allProducts = [...(window.products || []), ...farmerProducts];

// Produkt suchen
const product = allProducts.find(p => p.title === titleDecoded);

if (!product) {
    alert("Zugriff auf Details nicht möglich!");
    window.location.href = "index.html";
} else {
    document.getElementById("product-img").src = product.img;
    document.getElementById("product-title").innerText = product.title;
    document.getElementById("product-farmer").innerText = product.farmer;
    document.getElementById("product-desc").innerText = product.desc;
    document.getElementById("product-price").innerText = product.price.toFixed(2).replace('.', ',') + "€";
}
