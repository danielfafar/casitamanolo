# Radio, televisión y posavasos

La casa de la portada conserva su SVG original. Radio y televisión se añaden
como anotaciones manuscritas; no se sustituye el dibujo por una imagen realista.

## Radio y televisión

- `/radio`: cuatro emociones, sintonizador, presets, encendido y volumen.
- `/television`: una escena con tres músicas o silencio. Cambiar de canal no
  modifica el vídeo ni su posición. La música sigue pausa, reproducción,
  búsqueda y velocidad del vídeo. Se corta al navegar o salir de la pestaña.
- Las músicas incluidas son **demos sintéticas**, no trabajos de Casita Manolo.
  Se generan con `python scripts/generate-demo-audio.py` (NumPy y FFmpeg).
- Sustituir los archivos y textos en `src/data/listening.ts` con el material
  final. El motor reproduce el audio en bucle y alinea el punto de escucha con
  el tiempo del vídeo. Para una comparación justa, exportar las versiones con
  la misma duración y el mismo origen temporal.
- El vídeo Flower se descargó de
  https://developer.mozilla.org/shared-assets/videos/flower.mp4.
  Fuente: MDN interactive-examples, carpeta de vídeos CC0:
  https://github.com/mdn/interactive-examples/tree/main/live-examples/media/cc0-videos.
  Licencia del repositorio: https://github.com/mdn/interactive-examples/blob/main/LICENSE.
  Se conserva una copia en `public/videos/LICENSE-CC0.txt` y un fotograma como
  póster. La descripción accesible y el crédito también aparecen en la página.

## Posavasos

Se conservan las seis marcas y categorías del repositorio original. Un toque
gira el posavasos; el reverso permite abrir su ficha con otro toque. Arrastrar
no debe abrir ni girar la ficha. Enter/Espacio permiten hacer lo mismo con
teclado. Los diálogos nativos gestionan Escape y el foco. «Ordenar la mesa»
recupera todos los posavasos sin perder sus fichas.

Las fichas reales no estaban en el repositorio. `src/data/clients.ts` contiene
los campos para título, año, participación, resumen y audio/vídeo opcional.
Cuando falta información se muestra un estado honesto; no se han inventado
colaboraciones ni asociado las demos a las marcas. Revisar las marcas y cargar
los casos definitivos antes de presentar esta sección como portfolio completo.

## Validación manual de publicación

- En móvil y escritorio: entrar a cada rincón y volver a la casa.
- Radio: cambiar rápidamente de frecuencia, apagar mientras carga y ajustar
  volumen; nunca debe quedar más de una pista ni reactivarse al apagar.
- Televisión: comparar los canales durante la reproducción; pausar, buscar,
  terminar la escena y navegar a otra página deben detener/sincronizar el audio.
- Posavasos: clic, arrastre, teclado, Escape, ordenar y cambio de tamaño.
- Preferencia de movimiento reducido: sin animaciones de giro ni inercia.

Los problemas previos del formulario de contacto y los medios pendientes del
portfolio/galería no se incluyen en este cambio.
