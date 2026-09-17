// La cerveza de cada idioma.
//
// El selector de idioma son los tiradores de la barra, y cada idioma tiene
// su cerveza: una etiqueta de la casa que recuerda a la cerveza más conocida
// de ese sitio sin copiar ninguna. El nombre y el dibujo son nuestros; lo
// único prestado es la pinta.
//
// Al añadir un idioma hay que darle su cerveza aquí (TypeScript avisa).

import type { Idioma } from './config';

export interface Cerveza {
    /** Cómo se llama el idioma en su propio idioma */
    idioma: string;
    /** Lo que se lee grande en el tirador */
    codigo: string;
    /** Las dos líneas pequeñas de la etiqueta */
    marca: string;
    variedad: string;
    /** Qué se dibuja arriba de la etiqueta */
    emblema: 'estrella' | 'monograma';
    fondo: string;
    borde: string;
    tinta: string;
    tintaSuave: string;
    /** Color del emblema */
    emblemaColor: string;
    emblemaTinta: string;
}

export const cervezas: Record<Idioma, Cerveza> = {
    es: {
        idioma: 'Español',
        codigo: 'ES',
        marca: 'MANOLO',
        variedad: 'CINCO ESTRELLAS',
        emblema: 'estrella',
        fondo: '#E8B059',
        borde: '#8a5f14',
        tinta: '#4a2a05',
        tintaSuave: '#6b3f08',
        emblemaColor: '#8a1a14',
        emblemaTinta: '#F4F1EC',
    },
    en: {
        idioma: 'English',
        codigo: 'EN',
        marca: 'MANOLO',
        variedad: 'LAGER · BROOKLYN',
        emblema: 'monograma',
        fondo: '#F4F1EC',
        borde: '#1f5c3a',
        tinta: '#123d26',
        tintaSuave: '#1f5c3a',
        emblemaColor: '#1f5c3a',
        emblemaTinta: '#F4F1EC',
    },
};
