// Rasteriza los logos de las marcas para la galleta del vinilo.
//
//   node scripts/logos-marcas.mjs <carpeta-origen> <carpeta-destino>
//
// Salen PNG con transparencia, recortados al contenido y de 420px de ancho:
// en el vinilo se ven a unos 30px, así que no hace falta más.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const [SRC, OUT] = process.argv.slice(2);
if (!SRC || !OUT) { console.error('uso: node scripts/logos-marcas.mjs <origen> <destino>'); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });

const logos = [
  ['movistar.svg', 'movistar'],
  ['skoda.svg', 'skoda'],
  ['casaTarradellas.svg', 'casa-tarradellas'],
  ['juntaDeAndalucia.svg', 'junta-andalucia'],
  ['dia.svg', 'dia'],
  ['eroski.svg', 'eroski'],
  ['freixenet.svg', 'freixenet'],
  ['airbnb.svg', 'airbnb'],
  ['ICEX.svg', 'icex'],
  ['seleccionEspañola.svg', 'seleccion-espanola'],
];

for (const [archivo, nombre] of logos) {
  try {
    const buf = await sharp(path.join(SRC, archivo), { density: 400 })
      .resize({ width: 260, height: 260, fit: 'inside' })
      .trim({ threshold: 1 })
      .png({ compressionLevel: 9, palette: true, quality: 90 })
      .toBuffer();
    const meta = await sharp(buf).metadata();
    fs.writeFileSync(path.join(OUT, nombre + '.png'), buf);
    console.log(nombre, `${meta.width}x${meta.height}`, Math.round(buf.length / 1024) + 'KB');
  } catch (e) {
    console.log('ERROR', nombre, e.message);
  }
}
