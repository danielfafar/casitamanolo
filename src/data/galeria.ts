// Las mesas de la galería y las servilletas que hay encima.
//
// Las fotos son de la casa: Paula y Víctor, los fundadores, componiendo y en
// sesión. Nada de fotogramas de los encargos: esos ya están en el archivo
// musical. Si una foto todavía no existe, la servilleta enseña el hueco
// "FOTO PENDIENTE" en vez de una imagen rota: basta con dejar el archivo en
// public/images para que aparezca.

import type { Texto } from '../i18n/config';

export type Tinta = 'azul' | 'rojo';

export interface Servilleta {
    foto: string;
    categoria: Texto;
    descripcion: Texto;
    tinta: Tinta;
    /** Giro sobre la mesa en reposo y al abrirla, en grados */
    giro: [number, number];
    /** Desplazamiento vertical dentro de su hueco, para que no queden alineadas */
    dy: number;
    /** Qué parte de la foto se ve en el hueco (background-position) */
    foco?: string;
}

export interface Mesa {
    id: 'vermut' | 'cafe' | 'sobremesa';
    nombre: Texto;
    servilletas: Servilleta[];
}

export const mesas: Mesa[] = [
    {
        id: 'vermut',
        nombre: { es: 'El vermut', en: 'The vermouth' },
        servilletas: [
            {
                foto: '/images/paula-partitura.jpg',
                categoria: { es: 'SOBRE EL PIANO', en: 'ON THE PIANO' },
                descripcion: {
                    es: 'Paula, cofundadora de Casita Manolo, escribiendo a mano sobre la partitura',
                    en: 'Paula, co-founder of Casita Manolo, writing on the score by hand',
                },
                tinta: 'azul', giro: [-9, -2], dy: -18, foco: '38% center',
            },
            {
                foto: '/images/paula-retrato.jpg',
                categoria: { es: 'ENTRE TOMA Y TOMA', en: 'BETWEEN TAKES' },
                descripcion: {
                    es: 'Un alto en el estudio, con la grabación a medias',
                    en: 'A break in the studio, halfway through the session',
                },
                tinta: 'rojo', giro: [11, 2], dy: 22, foco: 'center 38%',
            },
            {
                foto: '/images/paula-ventana.jpg',
                categoria: { es: 'LUZ DE VENTANA', en: 'WINDOW LIGHT' },
                descripcion: {
                    es: 'Paula en una sesión de retrato en el estudio',
                    en: 'Paula during a portrait session at the studio',
                },
                tinta: 'azul', giro: [-5, 3], dy: -6, foco: '58% 45%',
            },
        ],
    },
    {
        id: 'cafe',
        nombre: { es: 'El café', en: 'The coffee' },
        servilletas: [
            {
                foto: '/images/paula-pausa.jpg',
                categoria: { es: 'LA PAUSA', en: 'THE PAUSE' },
                descripcion: {
                    es: 'La casa también se para a mirar por la ventana',
                    en: 'The house stops to look out of the window too',
                },
                tinta: 'rojo', giro: [-7, -3], dy: 20, foco: '55% 35%',
            },
            {
                foto: '/images/paula-contraluz.jpg',
                categoria: { es: 'A CONTRALUZ', en: 'AGAINST THE LIGHT' },
                descripcion: {
                    es: 'Retrato de Paula, mitad de la casa junto a Víctor',
                    en: 'A portrait of Paula, half of the house alongside Víctor',
                },
                tinta: 'azul', giro: [13, 1], dy: -16, foco: 'center 35%',
            },
        ],
    },
    {
        id: 'sobremesa',
        nombre: { es: 'La sobremesa', en: 'After dinner' },
        servilletas: [
            {
                foto: '/images/victor-direccion.jpg',
                categoria: { es: 'DIRIGIENDO', en: 'CONDUCTING' },
                descripcion: {
                    es: 'Víctor, cofundador de Casita Manolo, dirigiendo una sesión de grabación',
                    en: 'Víctor, co-founder of Casita Manolo, conducting a recording session',
                },
                tinta: 'rojo', giro: [-8, -2], dy: -14, foco: '52% 40%',
            },
            {
                foto: '/images/victor-2.jpg',
                categoria: { es: 'EN LA SALA', en: 'IN THE ROOM' },
                descripcion: {
                    es: 'Otra foto de Víctor en el estudio',
                    en: 'Another photo of Víctor at the studio',
                },
                tinta: 'azul', giro: [10, 2], dy: 18,
            },
        ],
    },
];
