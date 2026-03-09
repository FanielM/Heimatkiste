<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>README – Heimatkiste | Regionaler Marktplatz</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500,700&family=Inter:wght@400,500,600,700&display=swap" rel="stylesheet">

  <style>
    :root{
      --bg: #fbfaf7;
      --paper: rgba(255,255,255,.72);
      --ink: #142018;
      --muted: rgba(20,32,24,.72);
      --line: rgba(20,32,24,.12);
      --accent: #2f6b45;
      --accent2: #d38b2f;
      --shadow: 0 18px 40px rgba(20,32,24,.10);
      --radius: 18px;
      --max: 980px;
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      color:var(--ink);
      background:
        radial-gradient(1000px 600px at 18% 10%, rgba(47,107,69,.18), transparent 55%),
        radial-gradient(900px 520px at 88% 22%, rgba(211,139,47,.18), transparent 55%),
        radial-gradient(800px 520px at 50% 110%, rgba(20,32,24,.10), transparent 60%),
        linear-gradient(180deg, #fbfaf7, #f6f3ec);
    }

    a{color:inherit}
    .wrap{max-width:var(--max); margin:0 auto; padding: clamp(18px, 4vw, 42px);}
    header{
      position:relative;
      padding: clamp(18px, 3.5vw, 34px);
      border:1px solid var(--line);
      border-radius: calc(var(--radius) + 6px);
      background: linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.56));
      backdrop-filter: blur(10px);
      box-shadow: var(--shadow);
      overflow:hidden;
    }
    header::before{
      content:"";
      position:absolute; inset:-2px;
      background:
        radial-gradient(600px 280px at 12% 22%, rgba(47,107,69,.20), transparent 60%),
        radial-gradient(520px 260px at 92% 30%, rgba(211,139,47,.18), transparent 60%),
        repeating-linear-gradient(135deg, rgba(20,32,24,.06) 0 1px, transparent 1px 9px);
      opacity:.8;
      pointer-events:none;
      mask: linear-gradient(180deg, rgba(0,0,0,.9), rgba(0,0,0,.15));
    }

    .kicker{
      position:relative;
      display:inline-flex;
      gap:.5rem;
      align-items:center;
      padding:.35rem .7rem;
      border:1px solid var(--line);
      border-radius: 999px;
      background: rgba(255,255,255,.65);
      font-size:.92rem;
      color: var(--muted);
    }
    .dot{
      width:9px; height:9px; border-radius:99px;
      background: conic-gradient(from 90deg, var(--accent), var(--accent2), var(--accent));
      box-shadow: 0 0 0 4px rgba(47,107,69,.12);
    }

    h1{
      position:relative;
      margin: .9rem 0 .3rem;
      font-family: Fraunces, serif;
      font-weight: 700;
      letter-spacing: -.02em;
      font-size: clamp(2rem, 4.2vw, 3.1rem);
      line-height: 1.08;
    }
    .sub{
      position:relative;
      margin:0;
      max-width: 70ch;
      color: var(--muted);
      line-height:1.55;
      font-size: 1.02rem;
    }

    main{margin-top: clamp(16px, 3vw, 28px);}

    .grid{
      display:grid;
      grid-template-columns: 1.2fr .8fr;
      gap: clamp(14px, 2.6vw, 22px);
      align-items:start;
    }
    @media (max-width: 900px){
      .grid{grid-template-columns:1fr}
    }

    section{
      border:1px solid var(--line);
      border-radius: var(--radius);
      background: rgba(255,255,255,.62);
      backdrop-filter: blur(10px);
      box-shadow: 0 12px 28px rgba(20,32,24,.08);
      overflow:hidden;
    }

    .sec-h{
      padding: 18px 18px 0;
      display:flex;
      align-items:baseline;
      justify-content:space-between;
      gap:12px;
    }
    h2{
      margin:0;
      font-family: Fraunces, serif;
      font-size: 1.25rem;
      letter-spacing: -.01em;
    }
    .tag{
      font-size:.85rem;
      color: var(--muted);
      padding:.25rem .55rem;
      border:1px solid var(--line);
      border-radius:999px;
      background: rgba(255,255,255,.55);
      white-space:nowrap;
    }

    .content{padding: 14px 18px 18px;}
    .content p{margin:.5rem 0; color: var(--muted); line-height:1.6}
    ul{margin:.55rem 0 0; padding-left: 1.1rem; color: var(--muted); line-height:1.65}
    li{margin:.28rem 0}

    .callout{
      border-top:1px solid var(--line);
      padding: 14px 18px 18px;
      background: linear-gradient(180deg, rgba(47,107,69,.06), rgba(211,139,47,.05));
    }
    .callout strong{color: var(--ink)}
    .mono{
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size:.92rem;
      color: rgba(20,32,24,.82);
      background: rgba(20,32,24,.04);
      border:1px solid rgba(20,32,24,.10);
      padding: .18rem .45rem;
      border-radius: 9px;
      white-space:nowrap;
    }

    .aside{
      display:grid;
      gap: clamp(14px, 2.6vw, 22px);
    }

    .btns{
      display:flex;
      flex-wrap:wrap;
      gap:10px;
      margin-top: 12px;
    }
    .btn{
      display:inline-flex;
      align-items:center;
      gap:.55rem;
      padding:.65rem .9rem;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: rgba(255,255,255,.68);
      text-decoration:none;
      font-weight:600;
      color: rgba(20,32,24,.92);
      transition: transform .15s ease, background .15s ease, box-shadow .15s ease;
      box-shadow: 0 10px 20px rgba(20,32,24,.08);
    }
    .btn:hover{transform: translateY(-2px); background: rgba(255,255,255,.86)}
    .btn.primary{
      border-color: rgba(47,107,69,.28);
      background: linear-gradient(180deg, rgba(47,107,69,.12), rgba(47,107,69,.06));
    }
    .btn .ic{
      width: 10px; height: 10px; border-radius: 99px;
      background: var(--accent);
      box-shadow: 0 0 0 4px rgba(47,107,69,.12);
    }

    footer{
      margin-top: 18px;
      color: rgba(20,32,24,.65);
      font-size: .92rem;
      display:flex;
      justify-content:space-between;
      gap:12px;
      flex-wrap:wrap;
    }

    /* reveal */
    .reveal{opacity:0; transform: translateY(10px); animation: rise .7s ease forwards}
    .reveal.d2{animation-delay:.08s}
    .reveal.d3{animation-delay:.16s}
    .reveal.d4{animation-delay:.24s}
    @keyframes rise{
      to{opacity:1; transform:none}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header class="reveal">
      <div class="kicker"><span class="dot" aria-hidden="true"></span> Kurzes README (Projektübersicht)</div>
      <h1>Heimatkiste – Regionaler Marktplatz</h1>
      <p class="sub">
        <strong>Heimatkiste</strong> ist eine Landingpage für einen digitalen Hofladen/Regional‑Marktplatz:
        Nutzer:innen stöbern Kategorien, entdecken Produkte und nutzen <em>Warenkorb</em> & <em>Favoriten</em>.
        Die Produktdaten und Interaktionen werden über JavaScript gesteuert.
      </p>
    </header>

    <main class="grid">
      <section class="reveal d2" aria-labelledby="sec-main">
        <div class="sec-h">
          <h2 id="sec-main">Inhalt & Struktur</h2>
          <span class="tag">index.html</span>
        </div>
        <div class="content">
          <ul>
            <li><strong>Header/Nav:</strong> Links (Start, Kategorien, Marktplatz, Über uns) + Buttons/Icons für <em>Für Bauern</em>, Warenkorb & Favoriten.</li>
            <li><strong>Hero:</strong> Claim „Direkt & Fair“ + CTA zu Marktplatz und Vision.</li>
            <li><strong>Kategorien:</strong> klickbare Kacheln, die <span class="mono">renderProducts('…')</span> auslösen (Produktfilter).</li>
            <li><strong>Produktbereich:</strong> Container <span class="mono">#products-grid</span> (wird dynamisch befüllt; ansonsten „Keine Produkte verfügbar…“).</li>
            <li><strong>Über uns:</strong> Mission/Story + Link zu <span class="mono">farmer.html</span> („Partner werden“).</li>
            <li><strong>Footer:</strong> Social + Kontakt (Mail/Telefon/Ort).</li>
          </ul>
        </div>
        <div class="callout">
          <p>
            <strong>Dynamik:</strong> Zählerstände für Warenkorb/Favoriten (<span class="mono">#cart-count</span>, <span class="mono">#favorites-count</span>)
            sowie Kategorie‑Counts (z. B. <span class="mono">#count-Obst</span>) werden per JS aktualisiert.
          </p>
        </div>
      </section>

      <div class="aside">
        <section class="reveal d3" aria-labelledby="sec-files">
          <div class="sec-h">
            <h2 id="sec-files">Dateien (wichtig)</h2>
            <span class="tag">Assets/JS</span>
          </div>
          <div class="content">
            <ul>
              <li><span class="mono">style.css</span> – globales Styling</li>
              <li><span class="mono">products.js</span> – Produktdaten & Rendering (u. a. <span class="mono">renderProducts</span>)</li>
              <li><span class="mono">main.js</span> – UI‑Interaktionen (Zähler, Menüs, Events)</li>
              <li>Externe Libraries: Google Fonts (Poppins), Boxicons, Swiper CSS</li>
            </ul>
            <p><strong>Hinweis:</strong> In der gelieferten Seite werden teils externe Unsplash‑Bilder verwendet.</p>
          </div>
        </section>

        <section class="reveal d4" aria-labelledby="sec-run">
          <div class="sec-h">
            <h2 id="sec-run">Starten</h2>
            <span class="tag">lokal</span>
          </div>
          <div class="content">
            <p>Da es sich um eine statische Seite mit JS handelt:</p>
            <ul>
              <li>Öffne <span class="mono">index.html</span> direkt im Browser, oder</li>
              <li>nutze einen lokalen Server (empfohlen), z. B. VS Code „Live Server“.</li>
            </ul>

            <div class="btns" role="list" aria-label="Quick actions">
              <a class="btn primary" href="#" role="listitem" onclick="copySnippet(event, 'index.html')">
                <span class="ic" aria-hidden="true"></span> Nächster Einstieg: index.html
              </a>
              <a class="btn" href="#" role="listitem" onclick="copySnippet(event, 'products.js / main.js')">
                <span class="ic" aria-hidden="true" style="background: var(--accent2)"></span> Prüfe Logik: products.js / main.js
              </a>
            </div>
          </div>

          <div class="callout">
            <p>
              <strong>To‑Dos (kurz):</strong> Externe Bilder optional durch lokale Assets ersetzen, Accessibility (ARIA/Focus),
              Performance (lazy loading), und SEO‑Basics (Meta‑Description, strukturierte Daten) ergänzen.
            </p>
          </div>
        </section>
      </div>
    </main>

    <footer>
      <span>README (Kurzfassung) – Heimatkiste</span>
      <span id="copy-status" aria-live="polite">Tipp: Buttons kopieren Dateinamen in die Zwischenablage.</span>
    </footer>
  </div>

  <script>
    async function copySnippet(e, text){
      e.preventDefault();
      const status = document.getElementById('copy-status');
      try{
        await navigator.clipboard.writeText(text);
        status.textContent = `Kopiert: ${text}`;
      } catch(err){
        status.textContent = `Konnte nicht kopieren. Bitte manuell: ${text}`;
      }
      clearTimeout(window.__t);
      window.__t = setTimeout(()=> status.textContent = 'Tipp: Buttons kopieren Dateinamen in die Zwischenablage.', 2600);
    }
  </script>
</body>
</html>
