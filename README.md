# Guaecá — GeoPortal WebGIS

Geoportal interativo da região da praia de Guaecá (São Sebastião / SP) com ortofoto local, camadas de zoneamento e ferramentas de medição, busca e localização.

![tema](https://img.shields.io/badge/tema-dark%20%2F%20light-1abc9c) ![leaflet](https://img.shields.io/badge/Leaflet-1.9-green) ![CRS](https://img.shields.io/badge/CRS-WGS%2084-blue)

## Conteúdo

| Camada | Tipo | Descrição |
|---|---|---|
| **Orto 2024 (1:19.000)** | Raster XYZ | Ortofoto local (~0,27 m/px), tiled em Web Mercator, zoom 13–19 |
| **Perímetro SPE** | Polígono | Setor Especial |
| **Parque Municipal** | Polígono | Área verde protegida |
| **ZAR** | Polígono | Zona de Adensamento Restrito |
| **ZC1** | Polígono | Zona Central 1 |
| **ZP** | Polígono | Zona de Proteção |
| **Curvas de Nível** | Linha | Topografia |

## Mapas de fundo

- **Satélite** — Esri World Imagery
- **OpenStreetMap** — Mapa colaborativo
- **CartoDB Positron** — Tema claro neutro

## Recursos

- **Tema escuro + claro** (persistente em `localStorage`)
- **Busca de endereços** via Nominatim + reconhecimento de coordenadas (`lat, lon`)
- **Ferramentas**: medição (área/distância), captura de coordenadas com cópia, geolocalização GPS, tela cheia, impressão
- **Opacidade individual** por camada
- **Popups** com atributos de cada feição
- **Mini-mapa**, escala em metros, coordenada do mouse em tempo real
- **Barra de status** com zoom, base ativa, camadas ativas, CRS
- **Toast notifications** para feedback de ações
- **Atalho**: pressione `/` para focar a busca, `Esc` para fechar modais

## Como rodar localmente

Por restrição de segurança, abrir o `index.html` direto (URL `file://`) não funciona — é preciso um servidor HTTP.

**Windows** — clique duas vezes em `iniciar_servidor.bat` (usa o Python do QGIS 3.40.11).

**Qualquer SO** — abra um terminal nesta pasta e:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080` no navegador.

## Deploy na Vercel

1. Conecte este repositório em [vercel.com/new](https://vercel.com/new).
2. Framework Preset: **Other** (é um site estático).
3. Root Directory: `.`
4. Build Command: (deixe vazio)
5. Output Directory: `.`
6. Deploy.

O arquivo `vercel.json` já está configurado com headers de cache imutável para `/tiles/*` (1 ano) e CORS aberto.

## Regerar tiles da ortofoto

Caso a ortofoto seja substituída, execute:

```bash
generate_tiles.bat
```

Requer GDAL — o script usa o que vem com **QGIS 3.40.11** em `C:\Program Files\QGIS 3.40.11\`. Os tiles são gerados em JPEG (qualidade 82), zoom 13–19, em Web Mercator.

## Estrutura do repositório

```
.
├── index.html              # Página principal
├── styles.css              # Design system (tokens semânticos)
├── app.js                  # Lógica do mapa
├── vercel.json             # Configuração de deploy / headers
├── iniciar_servidor.bat    # Atalho Windows para servidor local
├── generate_tiles.bat      # (Re)gera os tiles da ortofoto
├── data/                   # GeoJSONs em EPSG:4326
│   ├── parque_municipal.geojson
│   ├── perimetro_spe.geojson
│   ├── zar.geojson
│   ├── zc1.geojson
│   ├── zp.geojson
│   └── curva_nivel.geojson
└── tiles/ortofoto/         # Pirâmide XYZ JPEG (z 13–19)
    └── {z}/{x}/{y}.jpg
```

## Sistema de Referência

- **Camadas vetoriais**: WGS 84 (EPSG:4326)
- **Tiles**: Web Mercator (EPSG:3857)
- **Ortofoto original**: SIRGAS 2000 / UTM 23S (EPSG:31983) — reprojetada pelo GDAL na tilagem

## Tecnologias

- [Leaflet 1.9](https://leafletjs.com/) — engine de mapas
- [leaflet-measure](https://github.com/ljagis/leaflet-measure) — medição
- [leaflet-mouse-position](https://github.com/ardhi/Leaflet.MousePosition) — coordenada do mouse
- [leaflet.fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) — modo tela cheia
- [Leaflet.MiniMap](https://github.com/Norkart/Leaflet-MiniMap) — mini-mapa
- [Nominatim](https://nominatim.org/) — busca de endereços
- [GDAL `gdal2tiles`](https://gdal.org/programs/gdal2tiles.html) — geração da pirâmide

## Licença

Código sob licença MIT. Dados geográficos são propriedade dos respectivos órgãos.
