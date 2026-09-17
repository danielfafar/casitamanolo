export interface Client {
  id: string;
  name: string;
  category: string;
  surface: 'white' | 'black' | 'kraft';
  project?: { title: string; year?: string; role: string; summary: string; audio?: string; video?: string };
}

// Marcas con las que ha trabajado Casita Manolo. Los proyectos coinciden con
// los del archivo musical (src/data/portfolio.ts); las marcas sin proyecto
// publicable todavía muestran la ficha como pendiente.
export const clients: Client[] = [
  {
    id: 'movistar', name: 'MOVISTAR', category: 'Spot TV', surface: 'white',
    project: { title: 'Batido', year: '2025', role: 'Música original', summary: 'Campaña de Movistar con la Selección Española: «Es por la Roja».' },
  },
  {
    id: 'airbnb', name: 'AIRBNB', category: 'Campaña global', surface: 'white',
    project: { title: 'Roots & Heritage', role: 'Música original', summary: 'Un homenaje acústico a la España rural: maderas, cuerdas íntimas y el calor de reunirse alrededor de una chimenea leonesa.' },
  },
  {
    id: 'icex', name: 'ICEX', category: 'Institucional', surface: 'black',
    project: { title: 'La Tarara', role: 'Banda sonora original', summary: 'Spain, Where Talent Ignites: el talento audiovisual español presentado al mundo, con estreno en el Festival de Cannes.', video: '/portfolio/la-tarara.mp4' },
  },
  {
    id: 'freixenet', name: 'FREIXENET', category: 'Campaña digital', surface: 'black',
    project: { title: 'Freixenet × Laura Escanes', role: 'Música original', summary: 'Orquesta de cine con una estética fresca para una campaña digital.', video: '/portfolio/freixenet.mp4' },
  },
  {
    id: 'skoda', name: 'ŠKODA', category: 'Spot TV', surface: 'kraft',
    project: { title: 'Navidad 2026', year: '2026', role: 'Música original', summary: 'La campaña de Navidad de Škoda.' },
  },
  {
    id: 'seleccion-espanola', name: 'SELECCIÓN ESPAÑOLA', category: 'Fútbol', surface: 'kraft',
    project: { title: 'Es por la Roja', year: '2025', role: 'Música original', summary: 'Campaña de Movistar con la Selección Española.' },
  },
  {
    id: 'casa-tarradellas', name: 'CASA TARRADELLAS', category: 'Spot TV', surface: 'white',
    project: { title: 'In Fraganti', year: '2025', role: 'Música original', summary: 'Spot de Casa Tarradellas.' },
  },
  {
    id: 'adolfo-dominguez', name: 'ADOLFO DOMÍNGUEZ', category: 'Moda', surface: 'black',
    project: { title: 'Impermeable', year: '2025', role: 'Música original', summary: 'Spot de Adolfo Domínguez.' },
  },
  {
    id: 'junta-andalucia', name: 'JUNTA DE ANDALUCÍA', category: 'Institucional', surface: 'white',
    project: { title: 'El Trato Andaluz', year: '2025', role: 'Música original', summary: 'Campaña institucional de la Junta de Andalucía.' },
  },
  {
    id: 'dia', name: 'DIA', category: 'Spot TV', surface: 'kraft',
    project: { title: 'En serio, muy bien', year: '2026', role: 'Música original', summary: 'Spot de DIA.' },
  },
  {
    id: 'eroski', name: 'EROSKI', category: 'Spot TV', surface: 'white',
    project: { title: '¿Quieres ahorrar conmigo?', year: '2025', role: 'Música original', summary: 'Campaña de Eroski.' },
  },
  { id: 'ministerio-cultura', name: 'MINISTERIO DE CULTURA', category: 'Institucional', surface: 'kraft' },
  { id: 'abante', name: 'ABANTE', category: 'Marca', surface: 'black' },
];
