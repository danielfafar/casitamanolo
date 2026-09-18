// Datos de contacto de la casa, en un solo sitio para que el ticket y lo que
// venga después (el botón flotante de WhatsApp, el pie…) tiren del mismo.

export const correo = 'infocasitamanolo@gmail.com';

/** WhatsApp de Víctor. `numero` va sin + ni espacios, que es como lo pide wa.me */
export const whatsapp = {
    numero: '34664813474',
    visible: '+34 664 81 34 74',
};

/** Enlace de WhatsApp con el mensaje ya escrito */
export const enlaceWhatsapp = (mensaje: string) =>
    `https://wa.me/${whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
