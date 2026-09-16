export const moods = [
  { id: 'calma', name: 'Calma', number: '01', title: 'Sin prisa', description: 'Notas espaciadas, aire y un lugar donde quedarse.', source: '/sounds/demo-calma.mp3' },
  { id: 'nostalgia', name: 'Nostalgia', number: '02', title: 'Lo que vuelve', description: 'Una melodía cálida que mira un poco hacia atrás.', source: '/sounds/demo-nostalgia.mp3' },
  { id: 'tension', name: 'Tensión', number: '03', title: 'Algo va a pasar', description: 'Un pulso insistente. La misma imagen empieza a inquietar.', source: '/sounds/demo-tension.mp3' },
  { id: 'energia', name: 'Energía', number: '04', title: 'A la calle', description: 'Bajo, ritmo y ganas de ponerse en marcha.', source: '/sounds/demo-energia.mp3' },
] as const;

export type MoodId = (typeof moods)[number]['id'];

// Replace this sample with a cleared studio clip when available.
export const televisionScene = {
  source: '/videos/demo-flower.mp4',
  description: 'Una flor rosa se abre en primer plano, rodeada de hojas verdes y violetas.',
  credit: 'Vídeo de demostración: Flower, archivo CC0 de MDN.',
  creditUrl: 'https://github.com/mdn/interactive-examples/tree/main/live-examples/media/cc0-videos',
};
