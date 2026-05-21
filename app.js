/* =========================================================
   GeoPortal — WebGIS  ·  app.js
   Estrutura com design tokens, toasts, theme, status bar
   ========================================================= */

// ----- Camadas vetoriais -----
const VECTOR_LAYERS = [
    {
        id: 'perimetro_spe',
        name: 'Perímetro SPE',
        sub: 'Setor Especial',
        icon: 'fa-draw-polygon',
        file: 'data/perimetro_spe.geojson',
        style: { color: '#ef4444', weight: 3, opacity: 1, fill: false, dashArray: '8,4' },
        visible: true,
        interactive: false,
        type: 'polygon'
    },
    {
        id: 'parque_municipal',
        name: 'Parque Municipal',
        sub: 'PM — Área verde protegida',
        popupTitle: 'Parque Municipal',
        code: 'PM',
        area: '455.653,01 m²',
        icon: 'fa-tree',
        file: 'data/parque_municipal.geojson',
        style: { color: '#15803d', weight: 2, opacity: 1, fillColor: '#22c55e', fillOpacity: 0.45 },
        visible: true,
        type: 'polygon'
    },
    {
        id: 'zar',
        name: 'ZAR',
        sub: 'Zona de Alta Restrição',
        popupTitle: 'Zona de Alta Restrição',
        code: 'ZAR',
        area: '744.867,78 m²',
        icon: 'fa-square',
        file: 'data/zar.geojson',
        style: { color: '#ca8a04', weight: 2, opacity: 1, fillColor: '#eab308', fillOpacity: 0.32 },
        visible: true,
        type: 'polygon'
    },
    {
        id: 'zc1',
        name: 'ZC1',
        sub: 'Zona Comercial 1',
        popupTitle: 'Zona Comercial 1',
        code: 'ZC1',
        area: '94.333,89 m²',
        icon: 'fa-square',
        file: 'data/zc1.geojson',
        style: { color: '#9333ea', weight: 2, opacity: 1, fillColor: '#a855f7', fillOpacity: 0.32 },
        visible: true,
        type: 'polygon'
    },
    {
        id: 'zp',
        name: 'ZP',
        sub: 'Zona de Proteção',
        popupTitle: 'Zona de Proteção',
        code: 'ZP',
        area: '696.009,18 m²',
        icon: 'fa-square',
        file: 'data/zp.geojson',
        style: { color: '#0284c7', weight: 2, opacity: 1, fillColor: '#0ea5e9', fillOpacity: 0.28 },
        visible: true,
        type: 'polygon'
    },
    {
        id: 'curva_nivel',
        name: 'Curvas de Nível',
        sub: 'Topografia',
        icon: 'fa-wave-square',
        file: 'data/curva_nivel.geojson',
        style: { color: '#d97706', weight: 1.2, opacity: 0.9 },
        visible: false,
        type: 'line'
    }
];

// ----- Mapas de fundo -----
// Usamos data-URL SVG como miniatura para evitar dependência de tiles externos
const BASEMAPS = {
    satellite: {
        name: 'Satélite',
        desc: 'Esri World Imagery',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: '© Esri, Maxar, Earthstar Geographics',
        thumb: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
              <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#163a26"/><stop offset=".6" stop-color="#1e5a3a"/><stop offset="1" stop-color="#316b4a"/>
              </linearGradient></defs>
              <rect width="160" height="100" fill="url(#g)"/>
              <path d="M0,72 Q40,50 80,68 T160,60 L160,100 L0,100 Z" fill="#083a4d" opacity=".7"/>
              <circle cx="40" cy="30" r="8" fill="#a8b88a" opacity=".6"/>
              <circle cx="90" cy="42" r="12" fill="#86a87a" opacity=".6"/>
              <circle cx="130" cy="28" r="6" fill="#a8b88a" opacity=".6"/>
            </svg>`),
        maxZoom: 19
    },
    osm: {
        name: 'OpenStreetMap',
        desc: 'Mapa colaborativo',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '© OpenStreetMap contributors',
        thumb: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
              <rect width="160" height="100" fill="#f2efe9"/>
              <path d="M20,30 L70,28 L90,55 L140,52" stroke="#c6b899" stroke-width="3" fill="none"/>
              <path d="M0,70 L160,68" stroke="#a8c8e8" stroke-width="4" fill="none"/>
              <rect x="30" y="50" width="20" height="12" fill="#d8c9a8" stroke="#a89968" stroke-width=".5"/>
              <rect x="100" y="30" width="25" height="15" fill="#d8c9a8" stroke="#a89968" stroke-width=".5"/>
              <circle cx="80" cy="40" r="3" fill="#ef4444"/>
            </svg>`),
        maxZoom: 19
    },
    carto: {
        name: 'CartoDB',
        desc: 'Tema claro neutro',
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '© OpenStreetMap · © CartoDB',
        thumb: 'data:image/svg+xml;utf8,' + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100">
              <rect width="160" height="100" fill="#fafbfc"/>
              <path d="M10,20 L150,18 M10,40 L150,42 M10,60 L150,62 M10,80 L150,80" stroke="#dde3eb" stroke-width="1"/>
              <path d="M40,5 L42,95 M90,5 L92,95" stroke="#dde3eb" stroke-width="1"/>
              <path d="M10,50 Q80,30 150,50" stroke="#b8c4d2" stroke-width="2" fill="none"/>
              <circle cx="80" cy="50" r="4" fill="#14b88a"/>
            </svg>`),
        maxZoom: 19,
        subdomains: 'abcd'
    }
};

// ----- Configuração de view -----
const HOME_VIEW = { center: [-23.809, -45.449], zoom: 15 };
const MAP_BOUNDS = L.latLngBounds([-23.825, -45.475], [-23.795, -45.425]);

const map = L.map('map', {
    center: HOME_VIEW.center,
    zoom: HOME_VIEW.zoom,
    minZoom: 11,
    maxZoom: 21,
    zoomControl: false,
    fullscreenControl: false,
    preferCanvas: true,
    worldCopyJump: true,
    zoomAnimation: true,
    fadeAnimation: true,
    attributionControl: true
});

// ----- Basemaps -----
const basemapLayers = {};
Object.entries(BASEMAPS).forEach(([key, cfg]) => {
    basemapLayers[key] = L.tileLayer(cfg.url, {
        attribution: cfg.attribution,
        maxZoom: 21,
        maxNativeZoom: cfg.maxZoom,
        subdomains: cfg.subdomains || 'abc'
    });
});

let currentBasemap = 'satellite';
basemapLayers[currentBasemap].addTo(map);

// ----- Ortofoto (tiles XYZ locais) -----
const ortoLayer = L.tileLayer('tiles/ortofoto/{z}/{x}/{y}.jpg', {
    attribution: 'Ortofoto 2024 (1:19.000)',
    minZoom: 13,
    maxZoom: 21,
    maxNativeZoom: 19,
    opacity: 1,
    bounds: MAP_BOUNDS,
    crossOrigin: true,
    keepBuffer: 4,
    updateWhenIdle: false,
    updateWhenZooming: true
});
ortoLayer.addTo(map);

// ----- Camadas vetoriais -----
const vectorGroups = {};

async function loadVectorLayers() {
    const fetched = await Promise.all(VECTOR_LAYERS.map(async (cfg) => {
        try {
            const res = await fetch(cfg.file);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return { cfg, data, error: null };
        } catch (e) {
            console.error(`Falha ao carregar ${cfg.file}:`, e);
            return { cfg, data: null, error: e.message };
        }
    }));

    fetched.forEach(({ cfg, data, error }) => {
        if (error || !data) {
            vectorGroups[cfg.id] = { layer: null, cfg, count: 0, error };
            return;
        }
        const opts = {
            style: () => ({ ...cfg.style }),
            onEachFeature: (feature, lyr) => bindFeaturePopup(feature, lyr, cfg)
        };
        if (cfg.interactive === false) opts.interactive = false;
        const layer = L.geoJSON(data, opts);
        vectorGroups[cfg.id] = { layer, cfg, count: data.features.length, data, opacityScale: 1 };
        if (cfg.visible) layer.addTo(map);
    });

    renderLayerList();
    renderLegend();
    updateStatus();
}

function bindFeaturePopup(feature, layer, cfg) {
    const props = feature.properties || {};
    const fillColor = cfg.style.fillColor || cfg.style.color;
    const title = cfg.popupTitle || cfg.name;
    const subtitle = cfg.code || (cfg.popupTitle ? '' : cfg.sub);

    let html = `
        <div class="popup-header">
            <div class="popup-icon" style="background:${fillColor}">
                <i class="fa-solid ${cfg.icon}"></i>
            </div>
            <div>
                <div class="popup-title">${title}</div>
                ${subtitle ? `<div class="popup-subtitle">${subtitle}</div>` : ''}
            </div>
        </div>`;

    let body = '';
    if (cfg.area) {
        body = `<div class="popup-row"><div class="popup-key">Área</div><div class="popup-val">${cfg.area}</div></div>`;
    } else {
        const entries = Object.entries(props).filter(([k, v]) => v !== null && v !== undefined && String(v).length);
        entries.forEach(([k, v]) => {
            body += `<div class="popup-row"><div class="popup-key">${k}</div><div class="popup-val">${v}</div></div>`;
        });
    }
    if (body) html += `<div class="popup-body">${body}</div>`;

    layer.bindPopup(html, { maxWidth: 320, className: 'styled-popup' });

    if (feature.geometry.type !== 'Point') {
        layer.on('mouseover', e => {
            const l = e.target;
            const baseW = cfg.style.weight || 2;
            l.setStyle({ weight: baseW + 2 });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) l.bringToFront();
        });
        layer.on('mouseout', e => vectorGroups[cfg.id].layer.resetStyle(e.target));
    }
}

// ----- Layer list rendering -----
function renderLayerList() {
    const list = document.getElementById('layer-list');
    list.innerHTML = '';
    VECTOR_LAYERS.forEach(cfg => {
        const g = vectorGroups[cfg.id];
        const fillColor = cfg.style.fillColor || cfg.style.color;
        const isActive = cfg.visible && !g.error;
        const item = document.createElement('div');
        item.className = `layer-item ${isActive ? 'is-active' : ''}`;
        item.dataset.layer = cfg.id;
        item.innerHTML = `
            <div class="layer-swatch" style="background:${fillColor}${cfg.style.dashArray ? ';outline:2px dashed '+cfg.style.color+';outline-offset:-3px' : ''}">
                <i class="fa-solid ${cfg.icon}"></i>
            </div>
            <div class="layer-info">
                <div class="layer-name">${cfg.name}</div>
                <div class="layer-meta">${g.error ? '<span style="color:var(--danger)">Erro: '+g.error+'</span>' : (cfg.sub + ' · ' + g.count + ' ' + (g.count !== 1 ? 'feições' : 'feição'))}</div>
            </div>
            <div class="layer-actions">
                <button class="layer-zoom" data-zoom="${cfg.id}" data-tooltip="Zoom à camada" aria-label="Zoom à camada ${cfg.name}">
                    <i class="fa-solid fa-magnifying-glass-location"></i>
                </button>
                <label class="switch" aria-label="Ativar camada ${cfg.name}">
                    <input type="checkbox" data-layer="${cfg.id}" ${cfg.visible ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
            <div class="layer-opacity">
                <i class="fa-solid fa-circle-half-stroke" style="font-size:11px"></i>
                <input type="range" min="0" max="100" value="100" data-opacity="${cfg.id}" aria-label="Opacidade ${cfg.name}">
                <span class="opacity-val" data-opacity-val="${cfg.id}">100%</span>
            </div>
        `;
        list.appendChild(item);
    });

    list.querySelectorAll('input[data-layer]').forEach(inp => {
        inp.addEventListener('change', (e) => {
            const id = e.target.dataset.layer;
            const g = vectorGroups[id];
            if (!g.layer) return;
            const item = e.target.closest('.layer-item');
            if (e.target.checked) {
                g.layer.addTo(map);
                item.classList.add('is-active');
                toast({ title: g.cfg.name + ' ativada', type: 'success', icon: 'fa-eye' });
            } else {
                map.removeLayer(g.layer);
                item.classList.remove('is-active');
                toast({ title: g.cfg.name + ' ocultada', icon: 'fa-eye-slash' });
            }
            updateStatus();
        });
    });
    list.querySelectorAll('input[data-opacity]').forEach(inp => {
        inp.addEventListener('input', (e) => {
            const id = e.target.dataset.opacity;
            const v = +e.target.value / 100;
            const g = vectorGroups[id];
            if (!g.layer) return;
            const isPoly = g.cfg.type === 'polygon';
            g.layer.setStyle({
                opacity: v * (g.cfg.style.opacity ?? 1),
                fillOpacity: isPoly ? v * (g.cfg.style.fillOpacity ?? 0.3) : 0
            });
            const valEl = document.querySelector(`[data-opacity-val="${id}"]`);
            if (valEl) valEl.textContent = Math.round(v * 100) + '%';
        });
    });
    list.querySelectorAll('[data-zoom]').forEach(b => {
        b.addEventListener('click', () => {
            const id = b.dataset.zoom;
            const g = vectorGroups[id];
            if (g.layer) {
                const bnd = g.layer.getBounds();
                if (bnd.isValid()) {
                    map.flyToBounds(bnd, { padding: [60, 60], duration: 0.8 });
                    toast({ title: 'Centralizando em ' + g.cfg.name, icon: 'fa-location-arrow' });
                }
            }
        });
    });
}

// ----- Legend -----
function renderLegend() {
    const el = document.getElementById('legend-content');
    let html = '';
    html += `<div class="legend-group">
        <div class="legend-group-title"><i class="fa-solid fa-satellite-dish"></i>Ortofoto</div>
        <div class="legend-row"><div class="legend-ortho"></div><span>Orto 2024 — 1:19.000 (0,27 m/px)</span></div>
    </div>`;

    html += `<div class="legend-group">
        <div class="legend-group-title"><i class="fa-solid fa-shapes"></i>Zoneamento e Áreas</div>`;
    VECTOR_LAYERS.filter(c => c.type === 'polygon').forEach(cfg => {
        const dash = cfg.style.dashArray ? `;border:2px dashed ${cfg.style.color}` : `;border:1px solid ${cfg.style.color}`;
        html += `<div class="legend-row">
            <div class="legend-swatch" style="background:${cfg.style.fillColor}${dash}"></div>
            <div><b style="color:var(--text-primary)">${cfg.name}</b> — ${cfg.sub}</div>
        </div>`;
    });
    html += `</div>`;

    html += `<div class="legend-group">
        <div class="legend-group-title"><i class="fa-solid fa-wave-square"></i>Topografia</div>`;
    VECTOR_LAYERS.filter(c => c.type === 'line').forEach(cfg => {
        html += `<div class="legend-row">
            <div class="legend-line" style="background:${cfg.style.color}"></div>
            <div><b style="color:var(--text-primary)">${cfg.name}</b> — ${cfg.sub}</div>
        </div>`;
    });
    html += `</div>`;
    el.innerHTML = html;
}

// ----- Basemap picker -----
function renderBasemapGrid() {
    const grid = document.getElementById('basemap-grid');
    grid.innerHTML = '';
    Object.entries(BASEMAPS).forEach(([key, cfg]) => {
        const card = document.createElement('button');
        card.className = `basemap-card ${key === currentBasemap ? 'active' : ''}`;
        card.dataset.basemap = key;
        card.setAttribute('aria-label', `Mapa de fundo: ${cfg.name}`);
        card.innerHTML = `
            <div class="basemap-thumb" style="background-image:url('${cfg.thumb}')">
                <div class="check"><i class="fa-solid fa-check"></i></div>
            </div>
            <div class="basemap-info">
                <div class="basemap-name">${cfg.name}</div>
                <div class="basemap-desc">${cfg.desc}</div>
            </div>
        `;
        card.addEventListener('click', () => setBasemap(key));
        grid.appendChild(card);
    });
}

function setBasemap(key) {
    if (key === currentBasemap) return;
    map.removeLayer(basemapLayers[currentBasemap]);
    basemapLayers[key].addTo(map);
    basemapLayers[key].bringToBack();
    currentBasemap = key;
    document.querySelectorAll('.basemap-card').forEach(c => {
        c.classList.toggle('active', c.dataset.basemap === key);
    });
    updateStatus();
    toast({ title: 'Base alterada para ' + BASEMAPS[key].name, icon: 'fa-map' });
}

// ----- Orthophoto toggle -----
document.getElementById('toggle-ortofoto').addEventListener('change', e => {
    const item = document.getElementById('item-ortofoto');
    if (e.target.checked) {
        ortoLayer.addTo(map);
        item.classList.add('is-active');
        toast({ title: 'Ortofoto ativada', type: 'success', icon: 'fa-satellite' });
    } else {
        map.removeLayer(ortoLayer);
        item.classList.remove('is-active');
        toast({ title: 'Ortofoto ocultada', icon: 'fa-eye-slash' });
    }
});
document.getElementById('opacity-ortofoto').addEventListener('input', e => {
    const v = +e.target.value / 100;
    ortoLayer.setOpacity(v);
    document.getElementById('opacity-ortofoto-val').textContent = Math.round(v * 100) + '%';
});
document.querySelector('[data-zoom="ortofoto"]').addEventListener('click', () => {
    map.flyToBounds(MAP_BOUNDS, { padding: [40, 40], duration: 0.8 });
    toast({ title: 'Centralizando na ortofoto', icon: 'fa-location-arrow' });
});

// ----- Tabs -----
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

// ----- Sidebar toggle -----
const sidebar = document.getElementById('sidebar');
document.getElementById('sidebar-toggle').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    setTimeout(() => map.invalidateSize(), 340);
});

// Em mobile, sidebar comeca fechada para nao cobrir o mapa
function applyMobileSidebarState() {
    if (window.innerWidth < 768) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
}
applyMobileSidebarState();
let _resizeT;
window.addEventListener('resize', () => {
    clearTimeout(_resizeT);
    _resizeT = setTimeout(() => {
        applyMobileSidebarState();
        map.invalidateSize();
    }, 200);
});

// Em mobile, clicar fora da sidebar fecha ela
document.addEventListener('click', (e) => {
    if (window.innerWidth >= 768) return;
    if (sidebar.classList.contains('collapsed')) return;
    if (e.target.closest('#sidebar') || e.target.closest('#sidebar-toggle')) return;
    sidebar.classList.add('collapsed');
});

// ----- Mobile search toggle -----
const mobileSearchBtn = document.getElementById('btn-search');
if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', () => {
        const search = document.querySelector('.search-wrap');
        if (!search) return;
        const isOpen = search.classList.toggle('mobile-open');
        if (isOpen) {
            document.getElementById('search-input').focus();
        }
    });
}

// ----- Theme toggle -----
const themeIcon = document.getElementById('theme-icon');
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    try { localStorage.setItem('geoportal-theme', theme); } catch (e) {}
}
applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
document.getElementById('btn-theme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    toast({ title: 'Tema ' + (next === 'dark' ? 'escuro' : 'claro'), icon: next === 'dark' ? 'fa-moon' : 'fa-sun' });
});

// ----- Top bar buttons -----
document.getElementById('btn-home').addEventListener('click', () => {
    map.flyTo(HOME_VIEW.center, HOME_VIEW.zoom, { duration: 0.8 });
    toast({ title: 'Visão inicial', icon: 'fa-house' });
});
document.getElementById('btn-info').addEventListener('click', () => openModal());
document.getElementById('modal-close').addEventListener('click', () => closeModal());
document.getElementById('modal-info').addEventListener('click', (e) => {
    if (e.target.id === 'modal-info') closeModal();
});
function openModal() { document.getElementById('modal-info').classList.add('open'); }
function closeModal() { document.getElementById('modal-info').classList.remove('open'); }

// ----- Search (Nominatim) -----
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let searchTimer;
searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const q = searchInput.value.trim();
    if (q.length < 3) { searchResults.classList.remove('open'); return; }
    searchTimer = setTimeout(() => doSearch(q), 350);
});
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { searchInput.blur(); searchResults.classList.remove('open'); }
});
async function doSearch(q) {
    try {
        const coordMatch = q.match(/^\s*(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)\s*$/);
        if (coordMatch) {
            const lat = +coordMatch[1], lon = +coordMatch[2];
            searchResults.innerHTML = `<div class="search-result-item" data-lat="${lat}" data-lon="${lon}">
                <i class="fa-solid fa-location-crosshairs"></i>
                <div><div class="sr-title">Coordenada</div>
                <div class="sr-sub">Lat ${lat.toFixed(5)}°  ·  Lon ${lon.toFixed(5)}°</div></div></div>`;
            attachSearchResultHandlers();
            searchResults.classList.add('open');
            return;
        }
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=6&accept-language=pt-BR`;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const items = await res.json();
        if (items.length === 0) {
            searchResults.innerHTML = `<div class="search-result-item"><i class="fa-solid fa-circle-question"></i><div><div class="sr-title">Sem resultados</div><div class="sr-sub">Tente outros termos</div></div></div>`;
        } else {
            searchResults.innerHTML = items.map(it => {
                const parts = it.display_name.split(',');
                return `
                <div class="search-result-item" data-lat="${it.lat}" data-lon="${it.lon}">
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <div class="sr-title">${parts.slice(0,2).join(',').trim()}</div>
                        <div class="sr-sub">${parts.slice(2).join(',').trim() || it.type}</div>
                    </div>
                </div>`;
            }).join('');
        }
        attachSearchResultHandlers();
        searchResults.classList.add('open');
    } catch (e) {
        console.error(e);
        toast({ title: 'Erro na busca', sub: e.message, type: 'error', icon: 'fa-triangle-exclamation' });
    }
}
function attachSearchResultHandlers() {
    searchResults.querySelectorAll('.search-result-item[data-lat]').forEach(el => {
        el.addEventListener('click', () => {
            const lat = +el.dataset.lat, lon = +el.dataset.lon;
            map.flyTo([lat, lon], 17, { duration: 1 });
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<div class="popup-header"><div class="popup-icon" style="background:var(--accent)"><i class="fa-solid fa-location-dot"></i></div><div><div class="popup-title">${el.querySelector('.sr-title').textContent}</div><div class="popup-subtitle">${lat.toFixed(5)}°, ${lon.toFixed(5)}°</div></div></div>`)
                .openPopup();
            searchResults.classList.remove('open');
            searchInput.value = el.querySelector('.sr-title').textContent;
        });
    });
}
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrap')) searchResults.classList.remove('open');
});
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault(); searchInput.focus();
    }
    if (e.key === 'Escape') closeModal();
});

// ----- Controls -----
L.control.zoom({ position: 'topright', zoomInTitle: 'Aproximar', zoomOutTitle: 'Afastar' }).addTo(map);
L.control.scale({ position: 'bottomleft', imperial: false, maxWidth: 180 }).addTo(map);

L.control.mousePosition({
    position: 'bottomright',
    separator: '  ·  ',
    numDigits: 5,
    prefix: '',
    latFormatter: v => `Lat ${v.toFixed(5)}°`,
    lngFormatter: v => `Lon ${v.toFixed(5)}°`
}).addTo(map);

const fsControl = L.control.fullscreen({ position: 'topright', title: 'Tela cheia', titleCancel: 'Sair da tela cheia' });
fsControl.addTo(map);

// Custom locate control
const locateControl = L.control({ position: 'topright' });
locateControl.onAdd = function() {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = `<a href="#" title="Minha localização" role="button" style="display:flex;align-items:center;justify-content:center;width:30px;height:30px"><i class="fa-solid fa-location-arrow"></i></a>`;
    L.DomEvent.on(div, 'click', (e) => { L.DomEvent.preventDefault(e); locateUser(); });
    return div;
};
locateControl.addTo(map);

function locateUser() {
    toast({ title: 'Buscando sua localização...', icon: 'fa-location-arrow' });
    map.locate({ setView: true, maxZoom: 17, enableHighAccuracy: true, timeout: 8000 });
}
map.on('locationfound', e => {
    L.circleMarker(e.latlng, { radius: 8, color: 'var(--accent)', fillColor: '#14b88a', fillOpacity: 0.8, weight: 3 })
        .addTo(map).bindPopup('Você está aqui').openPopup();
    toast({ title: 'Localização encontrada', type: 'success', icon: 'fa-circle-check' });
});
map.on('locationerror', e => {
    toast({ title: 'Erro de localização', sub: e.message, type: 'error', icon: 'fa-triangle-exclamation' });
});

// Measure
const measureControl = L.control.measure({
    position: 'topright',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'sqmeters',
    secondaryAreaUnit: 'hectares',
    activeColor: '#14b88a',
    completedColor: '#0c7c5c',
    localization: 'pt_BR'
});
measureControl.addTo(map);

// Minimap
const miniLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '', subdomains: 'abcd', minZoom: 0, maxZoom: 13
});
new L.Control.MiniMap(miniLayer, {
    toggleDisplay: true, position: 'bottomright',
    width: 160, height: 120, zoomLevelOffset: -5
}).addTo(map);

// ----- Tool buttons -----
document.getElementById('tool-measure').addEventListener('click', (e) => {
    const el = document.querySelector('.leaflet-control-measure-toggle');
    if (el) el.click();
    e.currentTarget.classList.toggle('active');
});
let coordPickActive = false;
document.getElementById('tool-coords').addEventListener('click', (e) => {
    coordPickActive = !coordPickActive;
    e.currentTarget.classList.toggle('active', coordPickActive);
    map.getContainer().style.cursor = coordPickActive ? 'crosshair' : '';
    toast({
        title: coordPickActive ? 'Ferramenta de coordenada ativa' : 'Ferramenta desativada',
        sub: coordPickActive ? 'Clique em qualquer ponto do mapa' : '',
        icon: 'fa-location-crosshairs'
    });
});
document.getElementById('tool-print').addEventListener('click', () => window.print());
document.getElementById('tool-fullscreen').addEventListener('click', () => map.toggleFullscreen());
document.getElementById('tool-locate').addEventListener('click', locateUser);

map.on('click', (e) => {
    if (!coordPickActive) return;
    const { lat, lng } = e.latlng;
    const utmZ = Math.floor((lng + 180) / 6) + 1;
    const display = document.getElementById('coord-display');
    display.classList.remove('empty');
    display.innerHTML = `
        <div><span class="label">Latitude</span></div>
        <div><span class="value">${lat.toFixed(6)}°</span></div>
        <div style="margin-top:6px"><span class="label">Longitude</span></div>
        <div><span class="value">${lng.toFixed(6)}°</span></div>
        <div style="margin-top:6px"><span class="label">CRS:</span> WGS 84 · EPSG:4326</div>
        <button class="copy-btn" id="copy-coord">
            <i class="fa-solid fa-copy"></i> Copiar coordenada
        </button>
    `;
    document.getElementById('copy-coord').addEventListener('click', () => {
        navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lng.toFixed(6)}`).then(() => {
            toast({ title: 'Coordenada copiada', type: 'success', icon: 'fa-circle-check' });
        });
    });
    L.popup({ closeButton: true, className: 'styled-popup' })
        .setLatLng(e.latlng)
        .setContent(`
            <div class="popup-header">
                <div class="popup-icon" style="background:var(--accent)"><i class="fa-solid fa-location-crosshairs"></i></div>
                <div><div class="popup-title">Coordenada capturada</div><div class="popup-subtitle">WGS 84 · EPSG:4326</div></div>
            </div>
            <div class="popup-body">
                <div class="popup-row"><div class="popup-key">Latitude</div><div class="popup-val">${lat.toFixed(6)}°</div></div>
                <div class="popup-row"><div class="popup-key">Longitude</div><div class="popup-val">${lng.toFixed(6)}°</div></div>
                <div class="popup-row"><div class="popup-key">Zona UTM</div><div class="popup-val">${utmZ}S</div></div>
            </div>`)
        .openOn(map);
});

// ----- Status bar -----
function updateStatus() {
    document.getElementById('status-zoom').textContent = map.getZoom().toFixed(0);
    document.getElementById('status-basemap').textContent = BASEMAPS[currentBasemap].name;
    let active = 0;
    if (map.hasLayer(ortoLayer)) active++;
    Object.values(vectorGroups).forEach(g => { if (g.layer && map.hasLayer(g.layer)) active++; });
    const total = 1 + VECTOR_LAYERS.length;
    document.getElementById('status-layers').textContent = `${active}/${total}`;
}
map.on('zoomend moveend', updateStatus);

// ----- Toasts -----
const toastStack = document.getElementById('toast-stack');
function toast({ title, sub, type, icon, duration }) {
    duration = duration || 2800;
    const t = document.createElement('div');
    t.className = `toast ${type || ''}`;
    t.innerHTML = `
        <i class="fa-solid ${icon || 'fa-circle-info'}"></i>
        <div class="toast-text">
            <div class="toast-title">${title}</div>
            ${sub ? `<div class="toast-sub">${sub}</div>` : ''}
        </div>
        <button class="toast-close" aria-label="Fechar"><i class="fa-solid fa-xmark"></i></button>
    `;
    toastStack.appendChild(t);
    const remove = () => {
        t.classList.add('removing');
        setTimeout(() => t.remove(), 220);
    };
    t.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(remove, duration);
}

// ----- Loading overlay -----
let tilesLoading = 0;
function bumpLoading(d) { tilesLoading = Math.max(0, tilesLoading + d); }
[ortoLayer, ...Object.values(basemapLayers)].forEach(l => {
    l.on('loading', () => { bumpLoading(1); document.getElementById('status-conn').textContent = 'Carregando…'; });
    l.on('load', () => { bumpLoading(-1); checkLoadingDone(); });
});
function checkLoadingDone() {
    if (tilesLoading === 0) {
        document.getElementById('map-loading').classList.add('hidden');
        document.getElementById('status-conn').textContent = 'Pronto';
    }
}
setTimeout(() => document.getElementById('map-loading').classList.add('hidden'), 3500);

// ----- Boot -----
renderBasemapGrid();
loadVectorLayers().then(() => {
    const g = vectorGroups['perimetro_spe'];
    if (g && g.layer) {
        const b = g.layer.getBounds();
        if (b.isValid()) map.fitBounds(b, { padding: [40, 40] });
    }
    updateStatus();
    setTimeout(() => toast({ title: 'GeoPortal pronto', sub: 'Pressione "/" para buscar', type: 'success', icon: 'fa-circle-check' }), 800);
});
