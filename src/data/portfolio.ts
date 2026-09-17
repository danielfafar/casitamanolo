// Archivo musical de Casita Manolo.
//
// Cada estación es una caja de discos con su tema: los proyectos grandes
// tienen caja propia y los spots van juntos. Soltar un disco en el plato
// enciende el monitor si tiene vídeo; si es audio, suena sin reproductor.
//
// Para añadir un proyecto basta con meter un disco aquí.

/** Lo que suena o se ve al poner el disco. El audio suena sin abrir el monitor. */
export type Medio =
  | { tipo: 'video'; src: string }
  | { tipo: 'vimeo'; id: string }
  | { tipo: 'audio'; src: string };

export interface Disco {
  id: string;
  /** Rótulo corto sobre la carátula */
  etiqueta: string;
  /** Título grande bajo el plato */
  titulo: string;
  /** Línea bajo el título: tipo de trabajo, año… */
  detalle: string;
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
  texto: string;
  sello?: string;
  fondo?: string;
  enlace?: { href: string; texto: string };
}

export type Tema = 'duelo' | 'tarara' | 'airbnb' | 'publicidad' | 'obra';

export interface Estacion {
  tema: Tema;
  /** Nombre en la cabecera */
  nombre: string;
  /** Rótulo gigante de fondo */
  rotulo: string;
  izquierda: Disco[];
  derecha: Disco[];
  /** Tarjeta de notas en el estante derecho, cuando no hay discos */
  notas?: Notas;
}

const P = '/portfolio';
const L = '/portfolio/logos';

export const estaciones: Estacion[] = [
  {
    tema: 'duelo',
    nombre: 'El Último Duelo',
    rotulo: 'EL DUELO',
    izquierda: [
      {
        id: 'duelo-cristiano',
        etiqueta: 'CARA A · CRISTIANO',
        titulo: 'El Último Duelo',
        detalle: 'Documental · Música original · Cara A: Cristiano',
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
        etiqueta: 'CARA B · MESSI',
        titulo: 'El Último Duelo',
        detalle: 'Documental · Música original · Cara B: Messi',
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
    nombre: 'Spain, Where Talent Ignites',
    rotulo: 'CANNES',
    izquierda: [
      {
        id: 'la-tarara',
        etiqueta: 'LA TARARA',
        titulo: 'La Tarara',
        detalle: 'Spain, Where Talent Ignites · ICEX · Estreno en Cannes',
        portada: `${P}/la-tarara.webp`,
        galleta: '#b3141c',
        logo: `${L}/icex.png`,
        medio: { tipo: 'video', src: `${P}/la-tarara.mp4` },
      },
    ],
    derecha: [],
    notas: {
      sello: `${P}/cannes.svg`,
      texto:
        'Un encargo de ICEX para enseñar al mundo el talento audiovisual español. Raíces clásicas y un pulso moderno, en rojo carmín y oro. Estreno en el Festival de Cannes.',
      enlace: { href: 'https://spainwheretalentignites.com/la-tarara', texto: 'Ver la película completa ↗' },
    },
  },
  {
    tema: 'airbnb',
    nombre: 'Airbnb · Roots & Heritage',
    rotulo: 'RAÍCES',
    izquierda: [
      {
        id: 'airbnb',
        etiqueta: 'AIRBNB',
        titulo: 'Roots & Heritage',
        detalle: 'Airbnb · Campaña global · Música original',
        portada: `${P}/airbnb-roots.webp`,
        galleta: '#ff5a5f',
        logo: `${L}/airbnb.png`,
        medio: { tipo: 'vimeo', id: '1200890612' },
      },
    ],
    derecha: [],
    notas: {
      fondo: `${P}/chimenea.webp`,
      texto:
        'Un homenaje acústico a la España rural: maderas, cuerdas íntimas y el calor de reunirse alrededor de una chimenea leonesa.',
    },
  },
  {
    tema: 'publicidad',
    nombre: 'Publicidad',
    rotulo: 'PUBLICIDAD',
    izquierda: [
      {
        id: 'movistar-batido',
        etiqueta: 'MOVISTAR',
        titulo: 'Batido',
        detalle: 'Movistar · Es por la Roja · Spot 2025',
        portada: `${P}/movistar-batido.webp`,
        galleta: '#019df4',
        logo: `${L}/movistar.png`,
        medio: { tipo: 'vimeo', id: '1195977095' },
      },
      {
        id: 'skoda-navidad',
        etiqueta: 'ŠKODA',
        titulo: 'Navidad 2026',
        detalle: 'Škoda · Spot 2026',
        portada: `${P}/skoda-navidad.webp`,
        galleta: '#4ba82e',
        logo: `${L}/skoda.png`,
        medio: { tipo: 'vimeo', id: '1154287399' },
      },
      {
        id: 'casa-tarradellas',
        etiqueta: 'CASA TARRADELLAS',
        titulo: 'In Fraganti',
        detalle: 'Casa Tarradellas · Spot 2025',
        portada: `${P}/casa-tarradellas.webp`,
        galleta: '#c8102e',
        logo: `${L}/casa-tarradellas.png`,
        medio: { tipo: 'vimeo', id: '1192277273' },
      },
      {
        id: 'trato-andaluz',
        etiqueta: 'JUNTA DE ANDALUCÍA',
        titulo: 'El Trato Andaluz',
        detalle: 'Turismo de Andalucía · Campaña 2025',
        portada: `${P}/trato-andaluz.webp`,
        galleta: '#007a33',
        logo: `${L}/junta-andalucia.png`,
        medio: { tipo: 'vimeo', id: '1145955458' },
      },
    ],
    derecha: [
      {
        id: 'adolfo-dominguez',
        etiqueta: 'ADOLFO DOMÍNGUEZ',
        titulo: 'Impermeable',
        detalle: 'Adolfo Domínguez · Spot 2025',
        portada: `${P}/adolfo-dominguez-impermeable.webp`,
        galleta: '#2b2b2b',
        medio: { tipo: 'vimeo', id: '1131715408' },
      },
      {
        id: 'dia',
        etiqueta: 'DIA',
        titulo: 'En serio, muy bien',
        detalle: 'DIA · Spot 2026',
        portada: `${P}/dia.webp`,
        galleta: '#e30613',
        logo: `${L}/dia.png`,
        medio: { tipo: 'vimeo', id: '1190131920' },
      },
      {
        id: 'eroski',
        etiqueta: 'EROSKI',
        titulo: '¿Quieres ahorrar conmigo?',
        detalle: 'Eroski · Spot 2025',
        portada: `${P}/eroski.webp`,
        galleta: '#e2001a',
        logo: `${L}/eroski.png`,
        medio: { tipo: 'vimeo', id: '1177732189' },
      },
      {
        id: 'freixenet',
        etiqueta: 'FREIXENET',
        titulo: 'Freixenet × Laura Escanes',
        detalle: 'Freixenet · Campaña digital',
        portada: `${P}/freixenet-laura-escanes.webp`,
        galleta: '#c9a24a',
        logo: `${L}/freixenet.png`,
        medio: { tipo: 'video', src: `${P}/freixenet.mp4` },
      },
    ],
  },
  {
    tema: 'obra',
    nombre: 'Obra propia',
    rotulo: 'OBRA PROPIA',
    izquierda: [
      {
        id: 'caprice-espagnole',
        etiqueta: 'CAPRICE ESPAGNOLE',
        titulo: 'Caprice Espagnole',
        detalle: 'Obra original · Grabada en Power Station, Nueva York',
        portada: `${P}/caprice-espagnole.webp`,
        galleta: '#c9a24a',
        medio: { tipo: 'vimeo', id: '1190280142' },
      },
      {
        id: 'komorebi',
        etiqueta: 'KOMOREBI',
        titulo: 'Komorebi',
        detalle: 'Obra original · Finalista en el concurso de Red Bull',
        portada: `${P}/komorebi.webp`,
        galleta: '#7d8f86',
        medio: { tipo: 'audio', src: `${P}/komorebi.mp3` },
      },
    ],
    derecha: [
      {
        id: 'larghetto',
        etiqueta: 'LARGHETTO',
        titulo: 'Larghetto',
        detalle: 'Obra original · Orquesta',
        portada: `${P}/larghetto.webp`,
        galleta: '#b5763a',
        medio: { tipo: 'audio', src: `${P}/larghetto.mp3` },
      },
    ],
  },
];
