// La carta de la casa: lo que se compone aquí, escrito como un menú.
// El precio va en la pizarra como "S/M", según mercado.

import type { Texto } from '../i18n/config';

export type Curso = 'primeros' | 'segundos' | 'postres';

export interface Plato {
    curso: Curso;
    nombre: Texto;
    descripcion: Texto;
}

export const platos: Plato[] = [
    {
        curso: 'primeros',
        nombre: { es: 'Identidad Sonora', en: 'Sonic Identity' },
        descripcion: {
            es: 'El logo de tu marca, pero para el oído.',
            en: "Your brand's logo, but for the ear.",
        },
    },
    {
        curso: 'primeros',
        nombre: { es: 'Supervisión Musical', en: 'Music Supervision' },
        descripcion: {
            es: 'Buscamos, negociamos y licenciamos el tema que pide la escena.',
            en: 'We find, negotiate and license the track the scene is asking for.',
        },
    },
    {
        curso: 'segundos',
        nombre: { es: 'Banda Sonora Original', en: 'Original Score' },
        descripcion: {
            es: 'Score a medida para largo, corto o serie. De piano solo a orquesta.',
            en: 'A score made to measure for a feature, a short or a series. From solo piano to full orchestra.',
        },
    },
    {
        curso: 'segundos',
        nombre: { es: 'Música para Spot', en: 'Music for Commercials' },
        descripcion: {
            es: 'Composición original para campaña, con todos sus cortes y duraciones.',
            en: 'Original composition for the campaign, with every cutdown and length.',
        },
    },
    {
        curso: 'postres',
        nombre: { es: 'Grabación y Arreglos', en: 'Recording & Arrangements' },
        descripcion: {
            es: 'Músicos de sesión, cuerdas y metales. Aquí se toca de verdad.',
            en: "Session players, strings and brass. Here it's actually played.",
        },
    },
    {
        curso: 'postres',
        nombre: { es: 'Diseño Sonoro y Mezcla', en: 'Sound Design & Mix' },
        descripcion: {
            es: 'Ambientes, foley y mezcla final. Nosotros recogemos la mesa.',
            en: 'Ambiences, foley and the final mix. We clear the table.',
        },
    },
];
