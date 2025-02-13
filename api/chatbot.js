import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }
  try {
    const { mensaje } = req.body;
    console.log('Procesando mensaje del chatbot:', mensaje);

    // Simular una llamada a una API externa para obtener información
    // Esta es una respuesta simulada. Reemplaza con una integración real si es necesario.
    const respuesta = `Esta es una respuesta simulada para: "${mensaje}"`;
    console.log('Respuesta generada:', respuesta);
    
    res.status(200).json({ respuesta });
  } catch (error) {
    console.error('Error en el endpoint chatbot:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}