import type { Texto } from '../i18n/config';

export const moods = [
  { id: 'calma', name: 'Calma', number: '01', title: 'Sin prisa', description: 'Notas espaciadas, aire y un lugar donde quedarse.', source: '/sounds/demo-calma.mp3' },
  { id: 'nostalgia', name: 'Nostalgia', number: '02', title: 'Lo que vuelve', description: 'Una melodía cálida que mira un poco hacia atrás.', source: '/sounds/demo-nostalgia.mp3' },
  { id: 'tension', name: 'Tensión', number: '03', title: 'Algo va a pasar', description: 'Un pulso insistente. La misma imagen empieza a inquietar.', source: '/sounds/demo-tension.mp3' },
  { id: 'energia', name: 'Energía', number: '04', title: 'A la calle', description: 'Bajo, ritmo y ganas de ponerse en marcha.', source: '/sounds/demo-energia.mp3' },
] as const;

export type MoodId = (typeof moods)[number]['id'];

// Las mismas emisoras en los idiomas de la casa. Las usa el televisor del
// home (src/components/RadioTV.astro); /radio y /television son las páginas
// viejas y siguen tirando de los campos de arriba, solo en español.
export const emisoras: Record<MoodId, { nombre: Texto; titulo: Texto }> = {
  calma: {
    nombre: { es: 'Calma', en: 'Calm' },
    titulo: { es: 'Sin prisa', en: 'No hurry' },
  },
  nostalgia: {
    nombre: { es: 'Nostalgia', en: 'Nostalgia' },
    titulo: { es: 'Lo que vuelve', en: 'What comes back' },
  },
  tension: {
    nombre: { es: 'Tensión', en: 'Tension' },
    titulo: { es: 'Algo va a pasar', en: 'Something is coming' },
  },
  energia: {
    nombre: { es: 'Energía', en: 'Energy' },
    titulo: { es: 'A la calle', en: 'Out the door' },
  },
};

// Replace this sample with a cleared studio clip when available.
export const televisionScene = {
  source: '/videos/demo-flower.mp4',
  description: 'Una flor rosa se abre en primer plano, rodeada de hojas verdes y violetas.',
  credit: 'Vídeo de demostración: Flower, archivo CC0 de MDN.',
  creditUrl: 'https://github.com/mdn/interactive-examples/tree/main/live-examples/media/cc0-videos',
};

/** La escena del televisor, contada en los dos idiomas */
export const escena: { descripcion: Texto; credito: Texto } = {
  descripcion: {
    es: 'Una flor rosa se abre en primer plano, rodeada de hojas verdes y violetas.',
    en: 'A pink flower opens in close-up, surrounded by green and violet leaves.',
  },
  credito: {
    es: 'Vídeo de demostración: Flower, archivo CC0 de MDN.',
    en: 'Demo video: Flower, a CC0 file from MDN.',
  },
};
