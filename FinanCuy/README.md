 st# FinanCuy BCP · Estructura del proyecto

```
FinanCuy/
├── index.html                  ← página principal (solo enlaza los CSS y los JS)
├── css/                        ← estilos, uno por parte de la interfaz
│   ├── 00-variables.css            Colores, tamaños y fuente de la marca
│   ├── 01-base.css                 Reset y estilos base, accesibilidad
│   ├── 02-layout.css               Barra lateral, encabezado y contenedor
│   ├── 03-bienvenida.css           Portada y tarjetas de grado
│   ├── 04-componentes.css          Botones, títulos de página, pie
│   ├── 05-ruta.css                 Ruta de aprendizaje
│   ├── 06-leccion.css              Teoría y escenario
│   ├── 07-ejercicios.css           Ejercicios y herramientas
│   ├── 08-resumen.css             Resumen de la lección
│   ├── 09-logros-tienda.css        Insignias y tienda
│   ├── 10-modales-avisos.css       Ventanas y avisos
│   ├── 11-animaciones.css          @keyframes
│   ├── 12-responsive.css           Adaptación a pantallas
│   ├── 13-tema-bcp.css             Tema de marca (sobrescribe)
│   └── 14-modo-docente.css         Modo docente e impresión
├── js/                         ← interactividad
│   ├── datos/                      Contenido (sin lógica)
│   │   ├── curso.js                    Grados, unidades, lecciones y ejercicios
│   │   ├── tienda.js                   Catálogo de la tienda
│   │   └── insignias.js                Catálogo de insignias
│   ├── nucleo/                     Base de la app
│   │   ├── constantes.js               Claves y etiquetas
│   │   ├── iconos.js                   Íconos SVG
│   │   ├── utilidades.js               Formato, fechas, validación
│   │   └── estado.js                   Estado y progreso guardado
│   ├── ui/                         Piezas visuales compartidas
│   │   ├── marca-cuy.js                Logo BCP y mascota Cuy
│   │   ├── app-shell.js                Estructura principal
│   │   └── modales-avisos.js           Avisos y ventanas
│   ├── vistas/                     Una vista por pantalla (aquí vive el HTML)
│   │   ├── bienvenida.js               Elección de grado
│   │   ├── ruta.js                     Ruta de aprendizaje
│   │   ├── leccion.js                  Teoría, escenario y calculadoras
│   │   ├── ejercicios.js               Retos de la lección
│   │   ├── resumen.js                  Premios al terminar
│   │   ├── logros.js                   Insignias
│   │   └── tienda.js                   Tienda mágica
│   ├── docente/                    Modo docente
│   │   ├── datos-docente.js            Fichas, estadísticas y demo
│   │   └── vista-docente.js            Vista del aula y reporte
│   ├── acciones.js                 Qué pasa al tocar cada botón
│   ├── eventos.js                  Clics, teclado y formularios
│   ├── validacion.js               Revisión interna del contenido
│   └── app.js                      Arranque
├── package.json
├── server.js                   ← servidor local opcional
└── README.md
```

## Cómo ejecutarla con Node.js

1. **Instala Node.js** (versión 18 o superior) desde https://nodejs.org. Para comprobar que quedó instalado, abre una terminal y escribe `node -v`: debe mostrar un número de versión.
2. **Abre una terminal dentro de la carpeta del proyecto** (en VS Code: menú *Terminal → Nueva terminal*, o clic derecho en la carpeta → *Abrir en terminal*).
3. **Inicia el servidor** con cualquiera de estos dos comandos:
   ```
   npm start
   ```
   o
   ```
   node server.js
   ```
4. **Abre en el navegador** la dirección que aparece en la terminal: http://localhost:3000
5. **Para detenerlo** presiona `Ctrl + C` en la terminal.

Notas:
- No hace falta `npm install`: el proyecto no usa librerías externas.
- Si el puerto 3000 está ocupado, el servidor usa el siguiente libre (3001, 3002…) y te muestra la dirección correcta en la terminal.
- Para elegir otro puerto: `PORT=8080 node server.js` (en Windows PowerShell: `$env:PORT=8080; node server.js`).
- También puedes abrir `index.html` con doble clic, sin Node. Node solo sirve para verla como en un servidor real.

## Cómo se organiza el código
- **El HTML de cada pantalla** está en `js/vistas/`, porque la app dibuja las pantallas con JavaScript. Para cambiar un texto o una estructura de una pantalla, edita su archivo de vista.
- **El orden de los `<script>` en `index.html` importa:** primero `datos/`, luego `nucleo/`, `ui/`, `vistas/`, `docente/`, y al final `eventos.js`, `validacion.js` y `app.js`. Los archivos comparten las mismas funciones y variables, así que no se usan `import`/`export`.
- **El orden de los CSS también importa:** `13-tema-bcp.css` y `14-modo-docente.css` van al final porque sobrescriben a los anteriores.
- **Para agregar contenido:** añade unidades o lecciones en `js/datos/curso.js`; no hace falta tocar la interfaz.
- **El logo BCP** (arriba a la izquierda) es un botón que lleva al apartado principal; su código está en `logoLink()` de `js/ui/marca-cuy.js`.
- **El progreso** se guarda en el navegador (`localStorage`), sin servidor ni cuentas.
