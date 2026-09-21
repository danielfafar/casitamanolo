"""Copias pequeñas de las fotos de la galería.

La servilleta las enseña a unos 200px, así que servir el archivo de 1400px
solo hacía que tardaran en aparecer. La grande se queda para el ampliado.

Uso: python scripts/fotos-galeria.py
"""
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parents[1]
FOTOS = RAIZ / 'public' / 'images'
MINI = FOTOS / 'mini'
LADO = 560

MINI.mkdir(exist_ok=True)
for foto in sorted(FOTOS.glob('*.jpg')):
    im = Image.open(foto).convert('RGB')
    im.thumbnail((LADO, LADO), Image.LANCZOS)
    salida = MINI / foto.name
    im.save(salida, quality=78, optimize=True, progressive=True)
    print(f'{foto.name:26} {foto.stat().st_size / 1024:6.0f} KB -> {salida.stat().st_size / 1024:5.0f} KB')
