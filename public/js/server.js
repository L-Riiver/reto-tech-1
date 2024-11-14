// Importar la librería cors-anywhere
const corsAnywhere = require('cors-anywhere');

// Configuración del puerto del servidor
const host = '127.0.0.1'; // Escuchar en todas las interfaces
const port = 5500; // Puerto donde se ejecutará el proxy

// Configuración del servidor CORS
corsAnywhere.createServer({
  originWhitelist: [], // Permitir todas las solicitudes de cualquier origen (opcional, puedes especificar una lista de orígenes)
  requireHeaders: [],   // Puedes personalizar los encabezados requeridos
  removeHeaders: ['cookie', 'authorization'], // Opcionalmente elimina ciertos encabezados
}).listen(port, host, () => {
  console.log(`CORS Anywhere está corriendo en http://${host}:${port}`);
});