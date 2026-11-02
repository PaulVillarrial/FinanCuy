// Servidor estático mínimo, sin dependencias.
// Uso: node server.js   ->  http://localhost:3000   (si el puerto está ocupado, prueba el siguiente)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO_INICIAL = Number(process.env.PORT) || 3000;
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon'
};

const servidor = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const archivo = path.join(__dirname, path.normalize(url === '/' ? '/index.html' : url));
  if (!archivo.startsWith(__dirname)) { res.writeHead(403); return res.end('Prohibido'); }
  fs.readFile(archivo, (error, datos) => {
    if (error) { res.writeHead(404); return res.end('No encontrado'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    res.end(datos);
  });
});

servidor.on('listening', () => {
  console.log(`FinanCuy BCP listo en http://localhost:${servidor.address().port}`);
  console.log('Para detenerlo presiona Ctrl + C');
});

function iniciar(puerto) {
  servidor.once('error', error => {
    if (error.code === 'EADDRINUSE' && puerto < PUERTO_INICIAL + 10) iniciar(puerto + 1);
    else { console.error('No se pudo iniciar el servidor:', error.message); process.exit(1); }
  });
  servidor.listen(puerto);
}
iniciar(PUERTO_INICIAL);
