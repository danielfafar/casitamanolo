// Archivo musical de Casita Manolo.
//
// Cada estación es una caja de discos con su tema: los proyectos grandes
// tienen caja propia y los spots van juntos. Soltar un disco en el plato
// enciende el monitor si tiene vídeo; si es audio, suena sin reproductor.
//
// Para añadir un proyecto basta con meter un disco aquí. Los textos llevan
// sus idiomas al lado; `igual()` es para lo que no se traduce, como el
// nombre de una marca.

import type { Texto } from '../i18n/config';

/** Lo que suena o se ve al poner el disco. El audio suena sin abrir el monitor.
 *  `vertical` cambia el televisor por un móvil, para los anuncios de redes. */
export type Medio =
  | { tipo: 'video'; src: string; vertical?: boolean }
  | { tipo: 'vimeo'; id: string; vertical?: boolean }
  | { tipo: 'audio'; src: string };

export interface Disco {
  id: string;
  /** Rótulo corto sobre la carátula */
  etiqueta: Texto;
  /** Título grande bajo el plato */
  titulo: Texto;
  /** Línea bajo el título: tipo de trabajo, año… */
  detalle: Texto;
  /** Carátula: un fotograma del propio trabajo */
  portada: string;
  /** Color de la galleta del vinilo */
  galleta: string;
  /** Logo de la marca: impreso en la galleta y de marca de agua al sonar */
  logo?: string;
  /** Lo que sale de la funda. Por defecto, un vinilo */
  forma?: 'vinilo' | 'balon';
  /** Colores de los pentágonos del balón; si hay varios, se alternan */
  pentagonos?: string[];
  medio?: Medio;
}

export interface Notas {
  texto: Texto;
  sello?: string;
  fondo?: string;
  enlace?: { href: string; texto: Texto };
}

export type Tema = 'duelo' | 'tarara' | 'airbnb' | 'paula' | 'publicidad' | 'obra';

export interface Estacion {
  tema: Tema;
  /** Nombre en la cabecera */
  nombre: Texto;
  /** Rótulo gigante de fondo */
  rotulo: Texto;
  izquierda: Disco[];
  derecha: Disco[];
  /** Tarjeta de notas en el estante derecho, cuando no hay discos */
  notas?: Notas;
}

const P = '/portfolio';
const L = '/portfolio/logos';

/** Lo que se escribe igual en todos los idiomas: marcas, nombres propios… */
const igual = (texto: string): Texto => ({ es: texto, en: texto });

export const estaciones: Estacion[] = [
  {
    tema: 'duelo',
    nombre: { es: 'El Último Duelo', en: 'The Final Duel' },
    rotulo: { es: 'EL DUELO', en: 'THE DUEL' },
    izquierda: [
      {
        id: 'duelo-cristiano',
        etiqueta: { es: 'CARA A · CRISTIANO', en: 'SIDE A · CRISTIANO' },
        titulo: { es: 'El Último Duelo', en: 'The Final Duel' },
        detalle: {
          es: 'Documental · Música original · Cara A: Cristiano',
          en: 'Documentary · Original music · Side A: Cristiano',
        },
        portada: `${P}/duelo-cristiano.webp`,
        galleta: '#c9a24a',
        forma: 'balon',
        pentagonos: ['#c9a24a'],
        medio: { tipo: 'vimeo', id: '1203280837' },
      },
    ],
    derecha: [
      {
        id: 'duelo-messi',
        etiqueta: { es: 'CARA B · MESSI', en: 'SIDE B · MESSI' },
        titulo: { es: 'El Último Duelo', en: 'The Final Duel' },
        detalle: {
          es: 'Documental · Música original · Cara B: Messi',
          en: 'Documentary · Original music · Side B: Messi',
        },
        portada: `${P}/duelo-messi.webp`,
        galleta: '#004d98',
        forma: 'balon',
        pentagonos: ['#a50044', '#004d98'],
        medio: { tipo: 'vimeo', id: '1203280837' },
      },
    ],
  },
  {
    tema: 'tarara',
    nombre: igual('Spain, Where Talent Ignites'),
    rotulo: igual('CANNES'),
    izquierda: [
      {
        id: 'la-tarara',
        etiqueta: igual('LA TARARA'),
        titulo: igual('La Tarara'),
        detalle: {
          es: 'Spain, Where Talent Ignites · ICEX · Estreno en Cannes',
          en: 'Spain, Where Talent Ignites · ICEX · Premiered at Cannes',
        },
        portada: `${P}/la-tarara.webp`,
        galleta: '#b3141c',
        logo: `${L}/icex.png`,
        medio: { tipo: 'video', src: `${P}/la-tarara.mp4` },
      },
    ],
    derecha: [],
    notas: {
      sello: `${P}/cannes.svg`,
      texto: {
        es: 'Un encargo de ICEX para enseñar al mundo el talento audiovisual español. Raíces clásicas y un pulso moderno, en rojo carmín y oro. Estreno en el Festival de Cannes.',
        en: 'A commission from ICEX to show the world what Spanish film-making can do. Classical roots with a modern pulse, in crimson and gold. Premiered at the Cannes Film Festival.',
      },
      enlace: {
        href: 'https://spainwheretalentignites.com/la-tarara',
        texto: { es: 'Ver la película completa ↗', en: 'Watch the full film ↗' },
      },
    },
  },
  {
    tema: 'airbnb',
    nombre: igual('Airbnb · Roots & Heritage'),
    rotulo: { es: 'RAÍCES', en: 'ROOTS' },
    izquierda: [
      {
        id: 'airbnb',
        etiqueta: igual('AIRBNB'),
        titulo: igual('Roots & Heritage'),
        detalle: {
          es: 'Airbnb · Campaña global · Música original',
          en: 'Airbnb · Global campaign · Original music',
        },
        portada: `${P}/airbnb-roots.webp`,
        galleta: '#ff5a5f',
        logo: `${L}/airbnb.png`,
        medio: { tipo: 'vimeo', id: '1200890612' },
      },
    ],
    derecha: [],
    notas: {
      fondo: `${P}/chimenea.webp`,
      texto: {
        es: 'Un homenaje acústico a la España rural: maderas, cuerdas íntimas y el calor de juntarse alrededor del fuego.',
        en: 'An acoustic tribute to rural Spain: woodwinds, intimate strings and the warmth of gathering around the fire.',
      },
    },
  },
  {
    tema: 'paula',
    nombre: { es: 'Los anuncios de Paula', en: "Paula's spots" },
    rotulo: igual('PAULA'),
    izquierda: [
      {
        id: 'custo',
        etiqueta: igual('CUSTO'),
        titulo: igual('Custo'),
        detalle: { es: 'Moda · Anuncio vertical', en: 'Fashion · Vertical spot' },
        portada: `${P}/custo.webp`,
        galleta: '#d4645a',
        // Grabado en vertical: el monitor se convierte en un móvil
        medio: { tipo: 'video', src: `${P}/custo.mp4`, vertical: true },
      },
      {
        id: 'perfume',
        etiqueta: igual('PERFUME'),
        titulo: igual('Perfume'),
        detalle: { es: 'Campaña · Música original', en: 'Campaign · Original music' },
        portada: `${P}/perfume.webp`,
        galleta: '#c9a24a',
        medio: { tipo: 'video', src: `${P}/perfume.mp4` },
      },
    ],
    derecha: [
      {
        id: 'port-adriano',
        etiqueta: igual('PORT ADRIANO'),
        titulo: igual('Port Adriano'),
        detalle: { es: 'Campaña · Música original', en: 'Campaign · Original music' },
        portada: `${P}/port-adriano.webp`,
        galleta: '#2f7f9e',
        medio: { tipo: 'video', src: `${P}/port-adriano.mp4` },
      },
      {
        id: 'gym',
        etiqueta: igual('GYM'),
        titulo: { es: 'Gimnasio', en: 'Gym' },
        detalle: { es: 'Campaña · Música original', en: 'Campaign · Original music' },
        portada: `${P}/gym.webp`,
        galleta: '#8c1c13',
        medio: { tipo: 'video', src: `${P}/gym.mp4` },
      },
    ],
  },
  {
    tema: 'publicidad',
    nombre: { es: 'Publicidad', en: 'Advertising' },
    rotulo: { es: 'PUBLICIDAD', en: 'ADVERTISING' },
    izquierda: [
      {
        id: 'movistar-batido',
        etiqueta: igual('MOVISTAR'),
        titulo: { es: 'Batido', en: 'Milkshake' },
        detalle: {
          es: 'Movistar · Es por la Roja · Spot 2025',
          en: 'Movistar · Es por la Roja · 2025 commercial',
        },
        portada: `${P}/movistar-batido.webp`,
        galleta: '#019df4',
        logo: `${L}/movistar.png`,
        medio: { tipo: 'vimeo', id: '1195977095' },
      },
      {
        id: 'skoda-navidad',
        etiqueta: igual('ŠKODA'),
        titulo: { es: 'Navidad 2026', en: 'Christmas 2026' },
        detalle: { es: 'Škoda · Spot 2026', en: 'Škoda · 2026 commercial' },
        portada: `${P}/skoda-navidad.webp`,
        galleta: '#4ba82e',
        logo: `${L}/skoda.png`,
        medio: { tipo: 'vimeo', id: '1154287399' },
      },
      {
        id: 'casa-tarradellas',
        etiqueta: igual('CASA TARRADELLAS'),
        titulo: igual('In Fraganti'),
        detalle: { es: 'Casa Tarradellas · Spot 2025', en: 'Casa Tarradellas · 2025 commercial' },
        portada: `${P}/casa-tarradellas.webp`,
        galleta: '#c8102e',
        logo: `${L}/casa-tarradellas.png`,
        medio: { tipo: 'vimeo', id: '1192277273' },
      },
      {
        id: 'trato-andaluz',
        etiqueta: { es: 'JUNTA DE ANDALUCÍA', en: 'ANDALUSIA' },
        titulo: { es: 'El Trato Andaluz', en: 'The Andalusian Deal' },
        detalle: {
          es: 'Turismo de Andalucía · Campaña 2025',
          en: 'Andalusia Tourism · 2025 campaign',
        },
        portada: `${P}/trato-andaluz.webp`,
        galleta: '#007a33',
        logo: `${L}/junta-andalucia.png`,
        medio: { tipo: 'vimeo', id: '1145955458' },
      },
    ],
    derecha: [
      {
        id: 'adolfo-dominguez',
        etiqueta: igual('ADOLFO DOMÍNGUEZ'),
        titulo: { es: 'Impermeable', en: 'Raincoat' },
        detalle: { es: 'Adolfo Domínguez · Spot 2025', en: 'Adolfo Domínguez · 2025 commercial' },
        portada: `${P}/adolfo-dominguez-impermeable.webp`,
        galleta: '#2b2b2b',
        medio: { tipo: 'vimeo', id: '1131715408' },
      },
      {
        id: 'dia',
        etiqueta: igual('DIA'),
        titulo: { es: 'En serio, muy bien', en: 'Seriously, very good' },
        detalle: { es: 'DIA · Spot 2026', en: 'DIA · 2026 commercial' },
        portada: `${P}/dia.webp`,
        galleta: '#e30613',
        logo: `${L}/dia.png`,
        medio: { tipo: 'vimeo', id: '1190131920' },
      },
      {
        id: 'eroski',
        etiqueta: igual('EROSKI'),
        titulo: { es: '¿Quieres ahorrar conmigo?', en: 'Want to save with me?' },
        detalle: { es: 'Eroski · Spot 2025', en: 'Eroski · 2025 commercial' },
        portada: `${P}/eroski.webp`,
        galleta: '#e2001a',
        logo: `${L}/eroski.png`,
        medio: { tipo: 'vimeo', id: '1177732189' },
      },
      {
        id: 'freixenet',
        etiqueta: igual('FREIXENET'),
        titulo: igual('Freixenet × Laura Escanes'),
        detalle: { es: 'Freixenet · Campaña digital', en: 'Freixenet · Digital campaign' },
        portada: `${P}/freixenet-laura-escanes.webp`,
        galleta: '#c9a24a',
        logo: `${L}/freixenet.png`,
        medio: { tipo: 'video', src: `${P}/freixenet.mp4` },
      },
    ],
  },
  {
    tema: 'obra',
    nombre: { es: 'Obra propia', en: 'Our own work' },
    rotulo: { es: 'OBRA PROPIA', en: 'OUR OWN WORK' },
    izquierda: [
      {
        id: 'caprice-espagnole',
        etiqueta: igual('CAPRICE ESPAGNOLE'),
        titulo: igual('Caprice Espagnole'),
        detalle: {
          es: 'Obra original · Grabada en Power Station, Nueva York',
          en: 'Original work · Recorded at Power Station, New York',
        },
        portada: `${P}/caprice-espagnole.webp`,
        galleta: '#c9a24a',
        medio: { tipo: 'vimeo', id: '1190280142' },
      },
      {
        id: 'komorebi',
        etiqueta: igual('KOMOREBI'),
        titulo: igual('Komorebi'),
        detalle: {
          es: 'Obra original · Finalista en el concurso de Red Bull',
          en: 'Original work · Finalist in the Red Bull contest',
        },
        portada: `${P}/komorebi.webp`,
        galleta: '#7d8f86',
        medio: { tipo: 'audio', src: `${P}/komorebi.mp3` },
      },
      {
        id: 'la-nina-del-vals',
        etiqueta: igual('LA NIÑA DEL VALS'),
        titulo: igual('La Niña del Vals'),
        detalle: { es: 'Obra original · Cuerdas', en: 'Original work · Strings' },
        portada: `${P}/la-nina-del-vals.webp`,
        galleta: '#8a6a9e',
        medio: { tipo: 'audio', src: `${P}/la-nina-del-vals.mp3` },
      },
    ],
    derecha: [
      {
        id: 'larghetto',
        etiqueta: igual('LARGHETTO'),
        titulo: igual('Larghetto'),
        detalle: { es: 'Obra original · Orquesta', en: 'Original work · Orchestra' },
        portada: `${P}/larghetto.webp`,
        galleta: '#b5763a',
        medio: { tipo: 'audio', src: `${P}/larghetto.mp3` },
      },
      {
        id: 'thriller',
        etiqueta: igual('THRILLER'),
        titulo: igual('Thriller'),
        detalle: { es: 'Obra original · Tensión', en: 'Original work · Tension' },
        portada: `${P}/thriller.webp`,
        galleta: '#8c1c13',
        medio: { tipo: 'audio', src: `${P}/thriller.mp3` },
      },
    ],
  },
];
