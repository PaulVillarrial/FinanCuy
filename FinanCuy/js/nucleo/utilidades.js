// Funciones auxiliares: formato, fechas, validación y mezcla
'use strict';

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&#60;', '>': '&#62;', '"': '&quot;', "'": '&#39;' }[character]));
}
function icon(name, extra = '') {
  return `<svg class="icon ${extra}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.star}</svg>`;
}
function money(number) {
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
}
function today() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
function dateNumber(date) {
  const [year, month, day] = date.split('-').map(Number);
  return Date.UTC(year, month - 1, day) / 86400000;
}
function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(dateNumber(value) * 86400000);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
function niceDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day, 12).toLocaleDateString('es-PE', { day: 'numeric', month: 'long' });
}
function integer(value, min, max) { return Number.isInteger(value) && value >= min && value <= max; }
function isObject(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function normalize(value) { return String(value).trim().toLocaleLowerCase('es-PE').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' '); }

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (shuffled.length > 1 && shuffled.every((item, index) => item === array[index])) shuffled.push(shuffled.shift());
  return shuffled;
}
