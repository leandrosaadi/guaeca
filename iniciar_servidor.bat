@echo off
REM ===========================================================
REM  Iniciar servidor local do GeoPortal
REM  Necessario porque o navegador nao carrega tiles/geojson
REM  diretamente de file:// por restricao de seguranca.
REM ===========================================================
title GeoPortal - Servidor Local

set PORT=8080

REM Tenta usar o Python que vem com o QGIS
set PY="C:\Program Files\QGIS 3.40.11\apps\Python312\python.exe"

if not exist %PY% (
    echo Python do QGIS nao encontrado. Tentando python do sistema...
    set PY=python
)

cd /d "%~dp0"

echo.
echo ==========================================================
echo   GeoPortal - WebGIS
echo ==========================================================
echo.
echo   Servidor iniciando na porta %PORT%...
echo   Abra no navegador:  http://localhost:%PORT%
echo.
echo   (Pressione CTRL+C para encerrar o servidor)
echo ==========================================================
echo.

start "" "http://localhost:%PORT%"

%PY% -m http.server %PORT%

pause
