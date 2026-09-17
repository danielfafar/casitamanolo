import type { Texto } from '../i18n/config';

export interface Client {
  id: string;
  /** El nombre de la marca no se traduce */
  name: string;
  category: Texto;
  surface: 'white' | 'black' | 'kraft';
  /** Logo de la marca impreso en el posavasos; sin él va el nombre en letra */
  logo?: string;
  project?: {
    title: Texto;
    year?: string;
    role: Texto;
    summary: Texto;
    audio?: string;
    video?: string;
    poster?: string;
  };
}

const musicaOriginal: Texto = { es: 'Música original', en: 'Original music' };
const spotTv: Texto = { es: 'Spot TV', en: 'TV commercial' };
const institucional: Texto = { es: 'Institucional', en: 'Institutional' };

// Marcas con las que ha trabajado Casita Manolo. Los proyectos coinciden con
// los del archivo musical (src/data/portfolio.ts); las marcas sin proyecto
// publicable todavía muestran la ficha como pendiente.
export const clients: Client[] = [
  {
    id: 'movistar', name: 'MOVISTAR', category: spotTv, surface: 'black', logo: '/portfolio/logos/movistar.png',
    project: {
      title: { es: 'Batido', en: 'Milkshake' }, year: '2025', role: musicaOriginal,
      summary: {
        es: 'Campaña de Movistar con la Selección Española: «Es por la Roja».',
        en: 'Movistar campaign with the Spanish national team: “Es por la Roja”.',
      },
    },
  },
  {
    id: 'airbnb', name: 'AIRBNB', category: { es: 'Campaña global', en: 'Global campaign' }, surface: 'white', logo: '/portfolio/logos/airbnb.png',
    project: {
      title: { es: 'Roots & Heritage', en: 'Roots & Heritage' }, role: musicaOriginal,
      summary: {
        es: 'Un homenaje acústico a la España rural: maderas, cuerdas íntimas y el calor de reunirse alrededor de una chimenea leonesa.',
        en: 'An acoustic tribute to rural Spain: woodwinds, intimate strings and the warmth of gathering around a fireplace in León.',
      },
    },
  },
  {
    id: 'icex', name: 'ICEX', category: institucional, surface: 'black', logo: '/portfolio/logos/icex.png',
    project: {
      title: { es: 'La Tarara', en: 'La Tarara' },
      role: { es: 'Banda sonora original', en: 'Original score' },
      summary: {
        es: 'Spain, Where Talent Ignites: el talento audiovisual español presentado al mundo, con estreno en el Festival de Cannes.',
        en: 'Spain, Where Talent Ignites: Spanish film-making introduced to the world, premiered at the Cannes Film Festival.',
      },
      video: '/portfolio/la-tarara.mp4', poster: '/portfolio/la-tarara.webp',
    },
  },
  {
    id: 'freixenet', name: 'FREIXENET', category: { es: 'Campaña digital', en: 'Digital campaign' }, surface: 'black', logo: '/portfolio/logos/freixenet.png',
    project: {
      title: { es: 'Freixenet × Laura Escanes', en: 'Freixenet × Laura Escanes' }, role: musicaOriginal,
      summary: {
        es: 'Orquesta de cine con una estética fresca para una campaña digital.',
        en: 'A film orchestra with a fresh look, for a digital campaign.',
      },
      video: '/portfolio/freixenet.mp4', poster: '/portfolio/freixenet-laura-escanes.webp',
    },
  },
  {
    id: 'skoda', name: 'ŠKODA', category: spotTv, surface: 'kraft', logo: '/portfolio/logos/skoda.png',
    project: {
      title: { es: 'Navidad 2026', en: 'Christmas 2026' }, year: '2026', role: musicaOriginal,
      summary: { es: 'La campaña de Navidad de Škoda.', en: 'Škoda’s Christmas campaign.' },
    },
  },
  {
    id: 'seleccion-espanola', name: 'SELECCIÓN ESPAÑOLA', category: { es: 'Fútbol', en: 'Football' }, surface: 'kraft', logo: '/portfolio/logos/seleccion-espanola.png',
    project: {
      title: { es: 'Es por la Roja', en: 'Es por la Roja' }, year: '2025', role: musicaOriginal,
      summary: {
        es: 'Campaña de Movistar con la Selección Española.',
        en: 'Movistar campaign with the Spanish national team.',
      },
    },
  },
  {
    id: 'casa-tarradellas', name: 'CASA TARRADELLAS', category: spotTv, surface: 'white', logo: '/portfolio/logos/casa-tarradellas.png',
    project: {
      title: { es: 'In Fraganti', en: 'In Fraganti' }, year: '2025', role: musicaOriginal,
      summary: { es: 'Spot de Casa Tarradellas.', en: 'Casa Tarradellas commercial.' },
    },
  },
  {
    id: 'adolfo-dominguez', name: 'ADOLFO DOMÍNGUEZ', category: { es: 'Moda', en: 'Fashion' }, surface: 'black',
    project: {
      title: { es: 'Impermeable', en: 'Raincoat' }, year: '2025', role: musicaOriginal,
      summary: { es: 'Spot de Adolfo Domínguez.', en: 'Adolfo Domínguez commercial.' },
    },
  },
  {
    id: 'junta-andalucia', name: 'JUNTA DE ANDALUCÍA', category: institucional, surface: 'white', logo: '/portfolio/logos/junta-andalucia.png',
    project: {
      title: { es: 'El Trato Andaluz', en: 'The Andalusian Deal' }, year: '2025', role: musicaOriginal,
      summary: {
        es: 'Campaña institucional de la Junta de Andalucía.',
        en: 'Institutional campaign for the regional government of Andalusia.',
      },
    },
  },
  {
    id: 'dia', name: 'DIA', category: spotTv, surface: 'kraft', logo: '/portfolio/logos/dia.png',
    project: {
      title: { es: 'En serio, muy bien', en: 'Seriously, very good' }, year: '2026', role: musicaOriginal,
      summary: { es: 'Spot de DIA.', en: 'DIA commercial.' },
    },
  },
  {
    id: 'eroski', name: 'EROSKI', category: spotTv, surface: 'white', logo: '/portfolio/logos/eroski.png',
    project: {
      title: { es: '¿Quieres ahorrar conmigo?', en: 'Want to save with me?' }, year: '2025', role: musicaOriginal,
      summary: { es: 'Campaña de Eroski.', en: 'Eroski campaign.' },
    },
  },
  { id: 'ministerio-cultura', name: 'MINISTERIO DE CULTURA', category: institucional, surface: 'kraft' },
  { id: 'abante', name: 'ABANTE', category: { es: 'Marca', en: 'Brand' }, surface: 'black' },
];
