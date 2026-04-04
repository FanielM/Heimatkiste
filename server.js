const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Erlaubt dem Frontend, Anfragen an dieses Backend zu senden
app.use(cors());
// Erlaubt es dem Backend, JSON-Daten (z. B. aus dem Checkout) zu verstehen
app.use(express.json());

// Unsere vorläufige "Datenbank" (später ersetzen wir das durch PostgreSQL)
const products = [
  { id:'d1', name:'Bio-Äpfel Elstar', farm:'Obsthof Meyer', region:'Mosbach, Baden', cat:'Obst', price:2.90, unit:'kg', badge:'bio', rating:4.9, reviews:82, img:'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=700&q=80', desc:'Knackige Elstar-Äpfel, handgepflückt vom Familienbetrieb.' },
  { id:'d2', name:'Freilandeier (10er)', farm:'Geflügelhof Weber', region:'Neckar-Odenwald', cat:'Eier & Honig', price:3.50, unit:'10 Stk.', badge:'regional', rating:5.0, reviews:104, img:'https://images.unsplash.com/photo-1510130387422-82bed34b37e9?w=700&q=80', desc:'Täglich frisch gesammelte Freilandeier.' },
  { id:'d3', name:'Bunte Karotten', farm:'Gemüsebau Lang', region:'Rhein-Neckar', cat:'Gemüse', price:1.80, unit:'500g', badge:'bio', rating:4.7, reviews:28, img:'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=700&q=80', desc:'Bunte Karottenmischung aus biozertifiziertem Anbau.', outOfStock:true },
  { id:'d4', name:'Heumilch Vollmilch', farm:'Hof Sonnenschein', region:'Schwarzwald', cat:'Milchprodukte', price:1.45, unit:'1 L', badge:'regional', rating:4.8, reviews:61, img:'https://images.unsplash.com/photo-1550583724-125581f77833?w=700&q=80', desc:'Frische Heumilch von glücklichen Kühen.' },
  { id:'d5', name:'Waldhonig', farm:'Imkerei Schmidt', region:'Schwarzwald-Baar', cat:'Eier & Honig', price:7.90, unit:'500g', badge:'bio', rating:5.0, reviews:94, img:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80', desc:'Naturbelassener Waldhonig.' },
  { id:'d6', name:'Bergkäse gereift', farm:'Sennerei Hochalp', region:'Allgäu', cat:'Milchprodukte', price:5.80, unit:'250g', badge:'bio', rating:4.9, reviews:38, img:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=700&q=80', desc:'Würziger Alpkäse, 6 Monate gereift.' }
];

// ─── API ENDPUNKTE ───

// 1. Alle Produkte abrufen (GET /api/products)
app.get('/api/products', (req, res) => {
  res.json(products);
});

// 2. Eine neue Bestellung annehmen (POST /api/orders)
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  console.log("Neue Bestellung empfangen:", newOrder);
  // Hier speichern wir die Bestellung später in der echten Datenbank
  res.json({ success: true, message: "Bestellung erfolgreich angelegt", orderNum: "HK-2026-X123" });
});

// ─── SERVER STARTEN ───
app.listen(PORT, () => {
  console.log(`🧺 Heimatkiste Backend läuft auf http://localhost:${PORT}`);
});