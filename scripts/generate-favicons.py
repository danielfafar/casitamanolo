"""Iconos del sitio a partir de src/assets/logo-casita.png. Requiere Pillow.

El logo es un dibujo de linea fina (~7px) en 1254x1254. Reducido a tamano de
pestana los trazos quedan por debajo de un pixel, asi que cada tamano se
recorta a lo esencial y se engruesa el trazo antes de reducir.

Uso: python scripts/generate-favicons.py
"""
import base64
import io
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / 'src' / 'assets' / 'logo-casita.png'
PUBLIC = ROOT / 'public'
CREMA = (244, 241, 236)  # --bg-color del sitio

# Encuadres sobre el logo original (x0, y0, x1, y1), medidos a mano:
# - CASA: casa y chimenea, sin copa ni taburete. Para tamanos de pestana.
# - ENTERO: el dibujo completo con las notas. Para iconos grandes.
CASA = (360, 427, 876, 943)
ENTERO = (181, 108, 1041, 968)

# Dentro del encuadre CASA asoman restos que, reducidos, parecen borrones:
# la nota mas baja sobre la chimenea y las hierbas de las esquinas.
RESTOS_CASA = [(700, 100, 1000, 498), (350, 870, 404, 950), (830, 870, 880, 950)]


def solo_casa(logo):
    """Copia del logo sin los restos que ensucian el encuadre de la casa."""
    limpio = logo.copy()
    pincel = ImageDraw.Draw(limpio)
    for caja in RESTOS_CASA:
        pincel.rectangle(caja, fill='white')
    return limpio


def icono(logo, encuadre, lado, engrosar):
    """Recorta, engruesa el trazo `engrosar` px por lado y reduce a `lado`."""
    img = logo.crop(encuadre)
    # MinFilter expande lo oscuro (y el rojo) sobre el fondo blanco
    for _ in range(engrosar):
        img = img.filter(ImageFilter.MinFilter(3))
    img = img.resize((lado, lado), Image.Resampling.LANCZOS, reducing_gap=3.0)
    # El blanco del dibujo pasa a crema; la tinta no cambia
    img = ImageChops.multiply(img, Image.new('RGB', img.size, CREMA))

    # Esquinas redondeadas: sobre una pestana oscura se ve la loseta clara
    mascara = Image.new('L', (lado, lado), 0)
    radio = max(2, round(lado * 0.18))
    ImageDraw.Draw(mascara).rounded_rectangle((0, 0, lado - 1, lado - 1), radius=radio, fill=255)
    img = img.convert('RGBA')
    img.putalpha(mascara)
    return img


def generar():
    logo = Image.open(LOGO).convert('RGB')

    casa = solo_casa(logo)

    # Pestana y barra de tareas: solo la casa, con el trazo engrosado.
    # Grosores elegidos a ojo: con mas, la ventana se vuelve un bloque negro.
    ico = {16: icono(casa, CASA, 16, 13), 32: icono(casa, CASA, 32, 10), 48: icono(casa, CASA, 48, 8)}
    ico[48].save(PUBLIC / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[ico[16], ico[32]])

    # Google y Android (multiplo de 48): tambien la casa, porque Google lo
    # muestra pequeno en los resultados aunque el archivo sea grande
    icono(casa, CASA, 192, 3).save(PUBLIC / 'icon-192.png', optimize=True)

    # Pantalla de inicio del iPhone: aqui ya cabe el logo entero
    apple = icono(logo, ENTERO, 180, 6)
    # iOS no respeta la transparencia: fondo crema completo, sin redondear
    fondo = Image.new('RGB', apple.size, CREMA)
    fondo.paste(apple, mask=apple.getchannel('A'))
    fondo.save(PUBLIC / 'apple-touch-icon.png', optimize=True)

    # Respaldo en /favicon.svg: ahi estaba el logo de Astro de la plantilla y
    # hay navegadores que lo siguen pidiendo. Lleva dentro la casa a 64px con
    # el trazo de los tamanos de pestana. Ninguna pagina lo anuncia: el .ico
    # afinado sigue siendo el principal.
    buf = io.BytesIO()
    icono(casa, CASA, 64, 7).save(buf, 'PNG', optimize=True)
    datos = base64.b64encode(buf.getvalue()).decode('ascii')
    (PUBLIC / 'favicon.svg').write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        f'<image width="64" height="64" href="data:image/png;base64,{datos}"/></svg>\n',
        encoding='utf-8',
    )

    return ico


if __name__ == '__main__':
    generar()
    for nombre in ('favicon.ico', 'icon-192.png', 'apple-touch-icon.png', 'favicon.svg'):
        print(nombre, (PUBLIC / nombre).stat().st_size, 'bytes')
