"""Dibuja un telon de terciopelo de verdad para la estacion de Cannes.

Las rayas de CSS no son tela: son rayas. Un terciopelo recogido tiene los
pliegues desiguales, la cresta estrecha y muy brillante (el pelo de la tela
rebota la luz), el valle ancho y casi negro, y los pliegues se mecen segun
bajan. Eso no se puede escribir con degradados, asi que se dibuja.

Sale a public/portfolio/terciopelo.webp
"""
import os
import numpy as np
from PIL import Image

W, H = 1920, 1080
DEST = r'C:\Dani universidad\casita manolo\red-raspberry\public\portfolio\terciopelo.webp'
rng = np.random.default_rng(7)


def ruido_suave(n, escala, semilla):
    """Ruido de una dimension, suave: puntos sueltos interpolados."""
    r = np.random.default_rng(semilla)
    pocos = r.standard_normal(int(n / escala) + 4)
    x = np.linspace(0, len(pocos) - 3, n)
    i = x.astype(int)
    t = (x - i)[:, None].ravel()
    # interpolacion suave (coseno) entre los puntos, sin esquinas
    t = (1 - np.cos(t * np.pi)) / 2
    return pocos[i] * (1 - t) + pocos[i + 1] * t


# ---------------------------------------------------------------- 1. LOS PLIEGUES
# Centros de pliegue con separacion desigual: una cortina no se recoge a regla.
centros = [0.0]
while centros[-1] < W + 120:
    centros.append(centros[-1] + 54 * (0.55 + 0.9 * rng.random()))
centros = np.array(centros)

# Segun baja, cada pliegue se mece un poco. Dos ondas lentas que no casan.
y = np.arange(H)[:, None]
vaiven = (7.0 * np.sin(y / 190.0) + 4.0 * np.sin(y / 71.0 + 1.3)).astype(np.float32)

x = np.arange(W)[None, :].astype(np.float32)
xs = x + vaiven                                   # (H, W)

# En que pliegue cae cada punto y que fase ocupa dentro de el
idx = np.searchsorted(centros, xs.ravel()).reshape(H, W)
idx = np.clip(idx, 1, len(centros) - 1)
izq = centros[idx - 1]
der = centros[idx]
fase = (xs - izq) / np.maximum(der - izq, 1e-3)   # 0..1 dentro del pliegue

# ------------------------------------------------------- 2. EL CORTE DEL PLIEGUE
# 0 en la cresta, 1 en el valle. Elevado, la cresta sale estrecha y el
# valle ancho: asi cae el terciopelo, no como un seno.
t = (1 - np.cos(2 * np.pi * fase)) / 2
luz = (1 - t) ** 2.3

# La luz entra por la izquierda: el lado derecho de cada pliegue se apaga
ladera = np.sin(2 * np.pi * fase)
luz = np.clip(luz * (1 + 0.22 * ladera), 0, 1.4)

# Brillo del pelo justo en la cresta
luz += 0.20 * np.exp(-((t / 0.11) ** 2))

# --------------------------------------------------------- 3. LA LUZ DE LA SALA
# Foco desde arriba, y la tela se apaga segun baja
yy = np.linspace(0, 1, H)[:, None]
vertical = 1.00 - 0.74 * yy ** 1.15
# hacia los lados tambien se apaga: el centro es donde va el tocadiscos
xx = np.linspace(-1, 1, W)[None, :]
lateral = 1 - 0.40 * xx ** 2
# el foco, centrado arriba
foco = 0.20 * np.exp(-(xx ** 2) / 0.40) * np.exp(-(yy ** 2) / 0.26)
# sombra de la barra, arriba del todo
barra = 1 - 0.50 * np.exp(-((yy / 0.045) ** 2))

luz = luz * vertical * lateral * barra + foco

# ------------------------------------------------------------ 4. EL PELO DE LA TELA
# Ruido fino y estirado en vertical: el terciopelo se peina hacia abajo
pelo = rng.standard_normal((H // 2, W)).astype(np.float32)
pelo = np.repeat(pelo, 2, axis=0)[:H]
pelo = (pelo + np.roll(pelo, 1, axis=0) + np.roll(pelo, 2, axis=0)) / 3
luz = luz * (1 + 0.055 * pelo)

# Manchas grandes, para que la tela no sea uniforme
manchas = ruido_suave(H, 120, 3)[:, None] * ruido_suave(W, 200, 4)[None, :]
luz = luz * (1 + 0.05 * manchas)

luz = np.clip(luz, 0, 1.30)

# ------------------------------------------------------------------ 5. EL COLOR
# Del valle casi negro a la cresta encendida, pasando por el carmín
paradas = np.array([
    [0.00, 0x0b, 0x02, 0x05],
    [0.22, 0x1e, 0x04, 0x09],
    [0.45, 0x3d, 0x07, 0x0f],
    [0.68, 0x64, 0x0c, 0x17],
    [0.90, 0x8a, 0x16, 0x21],
    [1.30, 0xa8, 0x33, 0x39],
], dtype=np.float32)

img = np.zeros((H, W, 3), dtype=np.float32)
for c in range(3):
    img[:, :, c] = np.interp(luz, paradas[:, 0], paradas[:, c + 1])

Image.fromarray(np.clip(img, 0, 255).astype(np.uint8)).save(
    DEST, 'WEBP', quality=82, method=6)
print('guardado', DEST, f'{os.path.getsize(DEST) / 1024:.0f} KB')
