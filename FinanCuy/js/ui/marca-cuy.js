// Logo BCP, mascota FinanCuy y piezas visuales pequeñas (estrellas, corazones)
'use strict';

// Logo BCP en vectores: letras y casquetes con el color de la versión (blanco sobre azul, azul sobre claro); chevrones siempre naranja.
const BCP_LOGO = {
  ink: [
    'M343.5,118.6c24.5,8.2,38.4,22.3,40.2,46.8c2,27.2-9.7,47.5-31.6,62.5c-12.6,8.8-26.9,14.1-41.9,16.8c-28.5,5.3-57.2,5.5-85.6,0.9c-28.7-4.6-41.3-22.1-35.1-50.8c12.8-59.2,26.5-118.4,40-177.4c1.1-4.6,2.4-8.2,8.4-8.6C270,6,302,1.1,334.4,6.6c11.9,2,23.4,4.9,34,10.2c36.6,18.1,40.4,61.8,7.9,86.4C367.1,110,356.7,114.4,343.5,118.6z M259.1,141.2c-4.2,19.2-8.2,36.9-12.1,54.3c-1.5,6.6-0.7,11.9,7.3,12.4c18.5,0.9,37.1,0,53.6-9.7c12.6-7.3,17.9-18.8,16.1-33.4c-1.8-13.9-11.7-19.4-23.8-23.2C286.7,137.6,273.7,144.3,259.1,141.2z M300,44.6c-5.7,3.8-16.6-5.3-20.1,6.6c-3.8,13.3-6.4,26.9-9.5,40.6c-1.1,4.6,0.4,8.8,5.5,9.1c19.9,1.1,39.7,1.3,55.8-12.8c15.7-13.7,10.8-34.9-9.1-41.3C315.6,44.9,308.4,44.9,300,44.6z',
    'M604.8,11.1c-51-18.6-100-15.2-142.2,21.2c-40.4,34.9-53.2,81.3-48.1,133.4c2.9,29.8,15.5,54.8,42.2,70c34,19.4,70.4,20.1,107.1,9.3c8.2-2.4,14.3-8.2,16.6-16.8c3.3-13,6.2-26.1,9.5-40.9c-11.5,6.2-20.7,11.9-31.3,15.2c-33.3,10.4-66.7-2.4-78.4-30.3c-16.1-38.4,6.8-99,45-116.6c31.3-14.4,61.6-8,91.8,8.8c1.8-6.6,3.5-12.6,5.1-18.6C626.4,27.6,622.7,17.7,604.8,11.1z',
    'M822.7,48C811.4,17,782.9,9.7,753.8,6.9c-26.9-2.7-54.1-1.3-81,1.8c-9.3,1.1-13.9,4.6-16.1,14.4c-15.9,72.5-32.4,144.9-48.6,217.4c-0.7,2.7-2,5.5,1.5,8.8c6.4,0,13.9,0,21.2,0c26.9,0,34.9-6.4,40.8-32.5c3.5-15.5,7.1-31.1,10.4-46.2c5.5-2,9.9-0.4,14.3-0.2c38.8,1.3,75.7-5.1,104.2-34.2C824.9,111.3,835,81.3,822.7,48z M774.1,86.6c-5.3,25.2-26.9,40.9-56.7,41.1c-19.4,0-21.2-2.2-17-21.9c3.5-16.1,7.3-32,10.2-48.2c1.3-8,5.3-11,13-11c8.2-0.2,16.3-0.7,24.5,0.9C769.3,51.5,778.5,65.4,774.1,86.6z',
    'M92.7,29.2c14.3,26.9,13,53.9,0.7,81.1C74.6,89.9,51.2,76,26.5,65C39.5,29.8,69.1,14.4,92.7,29.2z',
    'M920.5,29.2c14.6,26.9,13.7,53.9,0.9,81.3c-18.5-20.3-41.7-34-67.8-45.7c8.6-19.4,21-33.6,40.4-40.9C903.9,19.9,912.5,22.8,920.5,29.2z'
  ],
  chevrons: [
    'M92.7,29.2c30,15.2,54.1,37.1,71.7,65.4c10.8,17.4,9.5,36.7-2.6,53.5c-24.9,34.9-58.1,60.5-96.5,78.2c-25.8,11.9-54.3-2-65.3-30c15.5-8.2,30.9-16.6,45-26.9c21.2-15.5,39.5-33.4,48.6-58.8C106,83.3,107.1,56.1,92.7,29.2z',
    'M920.5,29.2c30,15,54.1,37.3,72,65.4c10.8,17,9.9,35.8-1.8,52.3c-25.2,35.8-58.9,61.8-98.2,79.7c-25.6,11.5-53.4-2.7-64.2-30c14.6-8,29.4-15.9,42.8-25.8c21.9-15.9,41.3-34,50.5-60.3C934.1,83.1,935,55.9,920.5,29.2z'
  ]
};
// Logo BCP como botón: lleva al apartado principal (Mi aprendizaje o la elección de grado)
function logoLink(variant = 'white', width = 112) {
  return `<button type="button" class="logo-link" data-action="navigate" data-view="learn" aria-label="BCP: ir al inicio">${brandMark(variant, width)}</button>`;
}
function brandMark(variant = 'white', width = 112) {
  const height = Math.round(width * 0.252 * 100) / 100;
  return `<svg class="bcp-mark ${variant === 'white' ? 'on-blue' : 'on-light'}" width="${width}" height="${height}" style="width:${width}px;height:${height}px" viewBox="0 0 1000 252" role="img" aria-label="BCP"><title>BCP</title>${BCP_LOGO.chevrons.map(path => `<path class="bcp-chev" d="${path}"/>`).join('')}${BCP_LOGO.ink.map(path => `<path class="bcp-ink" d="${path}"/>`).join('')}</svg>`;
}

// Colores del Cuy: solo tonos y sombras del azul y el naranja de la marca, más blanco y azul noche.
const CUY_BRAND_COLORS = {
  '#DEA568': '#FF9C45', '#B7773B': '#E86800', '#FFF6D9': '#FFFFFF', '#F0DBAE': '#FFE9D6', '#2D5FC7': '#1D4BB0',
  '#FFE395': '#FFB066', '#FFA928': '#FF7800', '#FF9F27': '#FF7800', '#FFC151': '#FFA24D', '#EE9B24': '#FF7800',
  '#FFE3A5': '#FFFFFF', '#B76D17': '#002A8D', '#4D332E': '#0B1B4D', '#352A2B': '#0B1B4D', '#302B31': '#0B1B4D',
  '#8D5635': '#B84F00', '#72412E': '#0B1B4D', '#744331': '#0B1B4D', '#7B4034': '#0B1B4D', '#74392D': '#0B1B4D',
  '#FFFDF6': '#FFFFFF', '#E1D1B4': '#D5DEF2', '#D57F72': '#FF8A3D', '#DD8677': '#FF8A3D', '#A36435': '#B84F00',
  '#D99B5C': '#FFB066', '#AE6C37': '#B84F00', '#A36A3D': '#D96000', '#73442D': '#B84F00', '#AA703D': '#B84F00',
  '#A76B39': '#B84F00', '#AB713E': '#B84F00', '#DCB491': '#FFD2A8', '#DFA38A': '#FFB27A', '#87523C': '#B84F00',
  '#BD8B6C': '#FFB066', '#1744A6': '#002A8D', '#FFC14D': '#FF7800', '#CF8A20': '#D96000', '#FF8400': '#FFFFFF',
  '#D79A52': '#FFB066', '#AA6E36': '#B84F00', '#153E9C': '#1D4BB0', '#001F6D': '#001D63', '#FFBC46': '#FF7800',
  '#123B96': '#1D4BB0', '#FF9B25': '#FF7800', '#FFB23B': '#FF7800', '#FF9F32': '#FF7800', '#FF8D23': '#FF7800',
  '#BD5717': '#B84F00', '#FFBA59': '#FFD2A8', '#98431C': '#B84F00', '#DF701B': '#FF7800', '#88B9E822': '#E8EEFB33',
  '#123370': '#0B1B4D', '#112D70': '#001D63', '#4777D0': '#1D4BB0', '#E49A1D': '#D96000', '#FFF0B3': '#FFFFFF',
  '#B27115': '#002A8D', '#FFAE26': '#FF7800', '#5A79B4': '#1D4BB0'
};
function mascot(mood = 'happy', extraClass = '', options = {}) {
  const id = `cuy-${++svgSerial}`;
  const gear = options.gear || currentGear();
  const equipped = item => gear.includes(item);
  const labels = { happy: 'feliz, te saluda', thinking: 'pensando contigo', celebrating: 'celebrando tu esfuerzo', sad: 'animándote a seguir', sleeping: 'durmiendo, listo para una nueva racha' };
  const pose = mood === 'thinking' ? 'rotate(-4 180 220)' : mood === 'sad' ? 'rotate(4 180 230) translate(0 4)' : mood === 'sleeping' ? 'rotate(8 180 235) translate(0 8)' : mood === 'celebrating' ? 'rotate(-4 180 230) translate(0 -5)' : 'rotate(0 180 220)';
  let eyes = '';
  if (mood === 'sleeping') {
    eyes = '<path d="M124 143q14 11 28 0m48-1q15 11 29-2" fill="none" stroke="#4D332E" stroke-width="5" stroke-linecap="round"/><path d="m129 148-3 4m21-3 3 4m55-4-2 4m21-6 4 4" stroke="#4D332E" stroke-width="2.5"/>';
  } else if (mood === 'celebrating') {
    eyes = '<path d="M122 148q15-25 31 0m45-1q15-25 31 0" fill="none" stroke="#352A2B" stroke-width="6" stroke-linecap="round"/>';
  } else {
    const dx = mood === 'thinking' ? 4 : mood === 'sad' ? -1 : 1;
    eyes = `<ellipse cx="138" cy="142" rx="21" ry="24" fill="white"/><ellipse cx="215" cy="142" rx="21" ry="24" fill="white"/><ellipse cx="${140 + dx}" cy="143" rx="14" ry="19" fill="#302B31"/><ellipse cx="${213 + dx}" cy="143" rx="14" ry="19" fill="#302B31"/><ellipse cx="${135 + dx}" cy="135" rx="5" ry="7" fill="white"/><ellipse cx="${208 + dx}" cy="135" rx="5" ry="7" fill="white"/><circle cx="${145 + dx}" cy="150" r="2.5" fill="white"/><circle cx="${218 + dx}" cy="150" r="2.5" fill="white"/>${mood === 'sad' ? '<path d="m124 114 25-5m52 0 25 6" stroke="#8D5635" stroke-width="4" stroke-linecap="round"/>' : mood === 'thinking' ? '<path d="m125 113 24 3m51-10 24 5" stroke="#8D5635" stroke-width="4" stroke-linecap="round"/>' : ''}`;
  }
  const mouth = mood === 'sleeping' ? '<ellipse cx="180" cy="184" rx="7" ry="5" fill="#72412E"/>' : mood === 'thinking' ? '<path d="M172 188q10-5 19-1" fill="none" stroke="#744331" stroke-width="3.5" stroke-linecap="round"/>' : mood === 'sad' ? '<path d="M166 188q15-9 29-1" fill="none" stroke="#744331" stroke-width="3.5" stroke-linecap="round"/>' : mood === 'celebrating' ? '<path d="M154 175q26 16 53-1-4 35-27 35-23-1-26-34Z" fill="#74392D"/><path d="M170 183h19v11q-9 4-19 0Z" fill="#FFFDF6"/><path d="M180 184v10" stroke="#E1D1B4"/><path d="M166 202q14-13 29 0-14 14-29 0Z" fill="#DD8677"/>' : '<path d="M160 178q21 14 41-1-4 29-21 28-16-2-20-27Z" fill="#7B4034"/><path d="M173 184h15v10q-7 3-15 0Z" fill="#FFFDF6"/><path d="M180 185v9" stroke="#E1D1B4" stroke-width="1"/><path d="M169 198q11-9 22 0-12 13-22 0Z" fill="#D57F72"/>';
  const leftArm = mood === 'celebrating' ? '<path d="M117 226C88 214 74 185 80 168c5-10 15-8 18 2l7 20 25 14Z" fill="url(#FUR)"/><path d="m82 169 3 11m6-15 3 13" stroke="#A36435" stroke-width="2.5" stroke-linecap="round"/>' : mood === 'thinking' ? '<path d="M115 239q-22-5-12-29l34-31c11-5 19 5 11 15l-21 22 6 14Z" fill="url(#FUR)"/>' : '<path d="M114 213c-15 4-29 22-26 36 2 10 12 14 20 7l24-24Z" fill="url(#FUR)"/><path d="m92 249 8-8m-2 12 8-9" stroke="#A36435" stroke-width="2.5" stroke-linecap="round"/>';
  const wandY = mood === 'celebrating' ? 88 : mood === 'sleeping' ? 169 : 111;
  const hat = equipped('hat') ? '<path d="M114 92 152 12q8 29 29 28l32 51Z" fill="#002A8D" stroke="#001F6D" stroke-width="3"/><path d="m124 72 77 6 8 13-96 1Z" fill="#FF7800"/><ellipse cx="164" cy="93" rx="64" ry="12" fill="#153E9C" stroke="#001F6D" stroke-width="3"/><path d="m154 38 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z" fill="#FFBC46"/>' : '<path d="M151 74q9-24 19-19l-2 12q14-15 22-11l-6 16" fill="#D79A52" stroke="#AA6E36" stroke-width="2" stroke-linejoin="round"/>';
  const cape = equipped('cape') ? '<path d="M128 164C88 185 72 251 48 300q61 11 126-6 70 28 129 6c-30-53-35-101-77-136Z" fill="url(#CAPE)" stroke="#FFB23B" stroke-width="5"/><path d="m77 267 8 12 14-3-8 11 7 13-14-5-10 10 1-14-12-8 14-2Zm174-16 6 9 11-2-6 9 5 9-10-3-8 8 1-11-9-6 10-2Z" fill="#FF9B25"/>' : '<path d="M126 167C100 188 77 247 66 284q47 18 102-2 65 22 118-1c-18-52-27-89-60-114Z" fill="url(#CAPE)" stroke="#123B96" stroke-width="2"/><path d="m91 237 5 10 11 2-8 7 2 11-10-5-10 5 2-11-8-7 11-2Zm163 8 4 8 9 1-6 6 1 9-8-4-8 4 2-9-7-6 9-1Z" fill="#FF9F32"/>';
  let drawing = `<svg class="cuy-svg ${extraClass}" viewBox="0 0 360 350" role="img" aria-label="FinanCuy ${labels[mood] || labels.happy}"><defs><linearGradient id="FUR" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#DEA568"/><stop offset="1" stop-color="#B7773B"/></linearGradient><linearGradient id="CREAM" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#FFF6D9"/><stop offset="1" stop-color="#F0DBAE"/></linearGradient><linearGradient id="CAPE" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2D5FC7"/><stop offset="1" stop-color="#002A8D"/></linearGradient><linearGradient id="COIN" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFE395"/><stop offset="1" stop-color="#FFA928"/></linearGradient></defs>
    <ellipse cx="179" cy="323" rx="100" ry="10" fill="#0B2F7C" opacity=".09"/>
    ${options.simple ? '' : '<g class="magic-glint" fill="#FF9F27"><path d="m60 109 4 10 11 4-11 4-4 10-4-10-10-4 10-4Z"/><path d="m284 48 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="m303 268 2 6 7 2-7 3-2 6-2-6-7-3 7-2Z"/></g><g fill="#7EA0E2"><circle cx="75" cy="201" r="3"/><circle cx="266" cy="72" r="3"/><circle cx="292" cy="238" r="2.5"/><path d="m69 63 3 6 6 3-6 2-3 7-2-7-7-2 7-3Z"/></g><g transform="translate(47 250) rotate(-18)"><ellipse rx="15" ry="18" fill="#FFC151" stroke="#EE9B24" stroke-width="2"/><ellipse rx="10" ry="13" fill="none" stroke="#FFE3A5" stroke-width="2"/><text text-anchor="middle" y="5" fill="#B76D17" font-size="13" font-family="Arial,sans-serif" font-weight="bold">S/</text></g>'}
    <g class="cuy-body"><g transform="${pose}">
      ${cape}
      ${equipped('backpack') ? '<rect x="77" y="185" width="53" height="85" rx="18" fill="#FF8D23" stroke="#BD5717" stroke-width="3"/><rect x="82" y="227" width="39" height="28" rx="7" fill="#FFBA59" stroke="#BD5717" stroke-width="2"/><path d="M91 185v-9q12-13 24 0v10" stroke="#98431C" stroke-width="5" fill="none"/>' : ''}
      <ellipse cx="139" cy="303" rx="28" ry="13" fill="#A36A3D"/><ellipse cx="214" cy="303" rx="29" ry="13" fill="#A36A3D"/><path d="m132 306 1 7m9-8 1 8m66-8-1 8m10-8-1 8" stroke="#73442D" stroke-width="2"/>
      <path d="M122 183C101 204 98 254 111 282q15 29 64 28c43 1 70-9 76-38 6-29-5-71-25-89Z" fill="url(#FUR)" stroke="#AA703D" stroke-width="2"/>
      <path d="M144 196c-21 19-27 68-12 89 15 20 62 22 84 3 18-18 13-71-11-91Z" fill="url(#CREAM)"/><path d="M151 271q21 11 43 0" stroke="#E0C590" stroke-width="2" fill="none"/>
      ${leftArm}
      <path d="M244 213q16 2 26-21c11-9 22 0 16 12l-16 30q-8 14-26 9Z" fill="url(#FUR)" stroke="#AA703D" stroke-width="2"/>
      <path d="m263 229 34-${229 - wandY}" stroke="#112D70" stroke-width="7" stroke-linecap="round"/><path d="m264 225 12-41" stroke="#4777D0" stroke-width="2" stroke-linecap="round"/>
      <circle cx="297" cy="${wandY}" r="23" fill="url(#COIN)" stroke="#E49A1D" stroke-width="3"/><circle cx="297" cy="${wandY}" r="17" fill="none" stroke="#FFF0B3" stroke-width="2"/><text x="297" y="${wandY + 7}" text-anchor="middle" fill="#B27115" font-family="Arial,sans-serif" font-size="20" font-weight="bold">S/</text><path class="magic-glint" d="m314 ${wandY - 27} 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#FFAE26"/>
      <ellipse cx="272" cy="204" rx="12" ry="10" transform="rotate(-25 272 204)" fill="#D99B5C"/><path d="m266 200 8 8m-4-12 8 8" stroke="#AE6C37" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="113" cy="104" rx="31" ry="34" fill="url(#FUR)" stroke="#AB713E" stroke-width="2"/><ellipse cx="114" cy="105" rx="19" ry="23" fill="#DCB491"/><ellipse cx="235" cy="104" rx="31" ry="34" fill="url(#FUR)" stroke="#AB713E" stroke-width="2"/><ellipse cx="234" cy="105" rx="19" ry="23" fill="#DCB491"/>
      <path d="M100 126C97 87 126 66 164 68c22-6 49-1 67 11 22 13 29 31 27 52 17 26 9 60-20 77-29 20-90 24-122 2-30-18-35-55-16-84Z" fill="url(#FUR)" stroke="#A76B39" stroke-width="2"/>
      <path d="M163 71q-9 26-4 42c2 14-7 34-28 37-16 2-26 13-26 28 1 28 34 42 72 43 41-1 72-16 72-44 0-16-12-27-28-29-26-3-34-25-30-41 4-14-4-30-9-38Z" fill="url(#CREAM)"/>
      <path d="M105 170q-7 3-10 0m154 0q8 3 12-1M108 185l-10 3m147-2 11 3" stroke="#A76B39" stroke-width="2" stroke-linecap="round"/>
      ${eyes}
      <ellipse cx="120" cy="173" rx="13" ry="7" fill="#DFA38A" opacity=".66"/><ellipse cx="231" cy="173" rx="13" ry="7" fill="#DFA38A" opacity=".66"/>
      <path d="M168 165q12-7 23 0c0 7-8 12-12 11-5-1-11-6-11-11Z" fill="#87523C"/><ellipse cx="176" cy="164" rx="5" ry="2" fill="#BD8B6C"/>
      ${mouth}
      <path d="m128 211 45 14 50-15-10 18-37 9-38-11Z" fill="#1744A6"/><circle cx="176" cy="228" r="10" fill="#FFC14D" stroke="#CF8A20" stroke-width="2"/><path d="m176 221 2 4 5 1-4 3 1 5-4-2-4 2 1-5-4-3 5-1Z" fill="#FF8400"/>
      ${hat}
      ${equipped('backpack') ? '<path d="M123 218q-13 29-6 57" stroke="#DF701B" stroke-width="9" fill="none" stroke-linecap="round"/>' : ''}
      ${equipped('glasses') ? '<g fill="#88B9E822" stroke="#123370" stroke-width="5"><circle cx="138" cy="144" r="27"/><circle cx="215" cy="144" r="27"/><path d="M165 141q12-8 23 0m-77-1-13-5m144 5 13-6" fill="none"/></g>' : ''}
    </g></g>
    ${mood === 'sleeping' ? '<g fill="#5A79B4" font-family="Arial,sans-serif" font-weight="bold"><text x="270" y="84" font-size="21">z</text><text x="289" y="59" font-size="27">Z</text><text x="318" y="29" font-size="33">Z</text></g>' : ''}
  </svg>`;
  for (const name of ['FUR', 'CREAM', 'CAPE', 'COIN']) drawing = drawing.replaceAll(`id="${name}"`, `id="${id}-${name}"`).replaceAll(`url(#${name})`, `url(#${id}-${name})`);
  return drawing.replace(/#[0-9A-Fa-f]{6,8}\b/g, color => CUY_BRAND_COLORS[color.toUpperCase()] || color);
}

function starsMarkup(count, className = 'tiny-stars') {
  return `<div class="${className}" role="img" aria-label="${count} de 3 estrellas">${[1, 2, 3].map(number => icon('star', number > count ? 'unearned' : '')).join('')}</div>`;
}
function heartMarkup() {
  const hearts = gradeProgress()?.hearts ?? 5;
  return `<button class="heart-meter" data-action="hearts" aria-label="${hearts} de 5 vidas. Ver práctica de recuperación" title="${hearts} de 5 vidas">${Array.from({ length: 5 }, (_, index) => icon('heart', index >= hearts ? 'empty' : '')).join('')}</button>`;
}
