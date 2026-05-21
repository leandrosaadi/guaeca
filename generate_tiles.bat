@echo off
REM ===========================================================
REM  Geração de tiles XYZ a partir da ortofoto (JPEG, zoom 13-19)
REM  Otimizado para deploy em GitHub / Vercel.
REM ===========================================================

call "C:\Program Files\QGIS 3.40.11\bin\o4w_env.bat"

set INPUT=C:\Users\Pichau\Desktop\gisweb\Imagem\Orto 2024 1-19000_modificado.tif
set OUTPUT=C:\Users\Pichau\Desktop\gisweb\webgis\tiles\ortofoto

echo.
echo === Gerando tiles XYZ JPEG (Web Mercator, z=13-19) ===
echo Input : %INPUT%
echo Output: %OUTPUT%
echo.

python "C:\Program Files\QGIS 3.40.11\apps\Python312\Scripts\gdal2tiles.py" ^
    --xyz ^
    -p mercator ^
    -z 13-19 ^
    -r average ^
    --processes=8 ^
    --tiledriver=JPEG ^
    --jpeg-quality=82 ^
    -w none ^
    "%INPUT%" "%OUTPUT%"

echo.
echo === Concluido ===
