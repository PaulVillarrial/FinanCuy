// Avisos (toast), anuncios para lectores de pantalla y ventanas modales
'use strict';

function announce(message) { document.getElementById('announcer').textContent = message; }
function toast(message) {
  clearTimeout(toastTimer);
  document.getElementById('toast-root').innerHTML = `<div class="toast">${icon('spark')}<span>${esc(message)}</span></div>`;
  toastTimer = setTimeout(() => { document.getElementById('toast-root').innerHTML = ''; }, 4500);
}
function openModal(type, data = {}) {
  if (!modal) restoreFocus = document.activeElement;
  modal = { type, ...data };
  document.getElementById('app').inert = true;
  document.body.classList.add('modal-open');
  renderModal(true);
}
function closeModal() {
  modal = null;
  practice = null;
  document.getElementById('modal-root').innerHTML = '';
  document.getElementById('app').inert = false;
  document.body.classList.remove('modal-open');
  if (restoreFocus?.isConnected) restoreFocus.focus({ preventScroll: true });
  else document.getElementById('main-content')?.focus({ preventScroll: true });
  restoreFocus = null;
}
function infoModal(title, body, mood = 'happy') { openModal('info', { title, body, mood }); }
function confirmModal(title, body, onConfirm, label = 'Sí, continuar', danger = false) {
  openModal('confirm', { title, body, onConfirm, label, danger });
}
function renderModal(focus = false) {
  if (!modal) return;
  const focusedButton = document.activeElement?.closest('button[data-action]');
  const focusData = focusedButton ? { ...focusedButton.dataset } : null;
  let content = '';
  if (modal.type === 'grades') {
    content = `<h2 id="modal-title" tabindex="-1">Tu aventura, tu grado.</h2><p>Los tres están disponibles desde el inicio. Cada grado conserva sus propias lecciones, vidas, semillas y accesorios.</p><div class="grade-grid">${gradeCards()}</div>`;
  } else if (modal.type === 'confirm') {
    content = `<h2 id="modal-title" tabindex="-1">${modal.title}</h2><p>${modal.body}</p><div class="button-row"><button class="btn secondary" data-action="modal-close">${modal.danger ? 'Conservar progreso' : 'Quedarme aquí'}</button><button class="btn ${modal.danger ? 'danger' : 'primary'}" data-action="confirm-action">${modal.label}</button></div>`;
  } else if (modal.type === 'practice') {
    content = renderPractice();
  } else if (modal.type === 'export') {
    const hasData = state.results.length > 0;
    content = `${mascot('happy', 'modal-cuy', { simple: true })}<h2 id="modal-title" tabindex="-1">Comparte tu avance con tu docente</h2><p>Se descarga un archivo con tus resultados por lección y ejercicio. No incluye contraseñas ni datos personales: solo el apodo que tú elijas.</p><label class="field"><span>Apodo o nombre corto (opcional)</span><input type="text" id="alias-input" maxlength="30" value="${esc(state.alias)}" placeholder="Ej.: Vale Q." autocomplete="off"></label>${hasData ? '' : '<p class="form-error">Aún no tienes ejercicios respondidos. Completa una lección y vuelve.</p>'}<div class="button-row"><button class="btn secondary" data-action="modal-close">Ahora no</button><button class="btn primary" data-action="export-ficha" ${hasData ? '' : 'disabled'}>${icon('download')}Descargar mi ficha</button></div>`;
  } else {
    content = `${mascot(modal.mood || 'happy', 'modal-cuy', { simple: true })}<h2 id="modal-title" tabindex="-1">${modal.title}</h2><div class="modal-copy">${modal.body}</div><div class="button-row"><button class="btn primary" data-action="modal-close">¡Vamos con todo! ${icon('arrow')}</button></div>`;
  }
  document.getElementById('modal-root').innerHTML = `<div class="modal-backdrop"><section class="modal ${modal.type === 'grades' ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" data-action="modal-close" aria-label="Cerrar ventana">${icon('close')}</button>${content}</section></div>`;
  if (focus) requestAnimationFrame(() => document.getElementById('modal-title')?.focus({ preventScroll: true }));
  else if (focusData) {
    const replacement = [...document.querySelectorAll('#modal-root button[data-action]')].find(button => !button.disabled && Object.entries(focusData).every(([key, value]) => button.dataset[key] === value));
    if (replacement) replacement.focus({ preventScroll: true });
  }
}
function renderPractice() {
  if (!practice) return '';
  if (practice.finished) return `${mascot('celebrating', 'modal-cuy', { simple: true })}<h2 id="modal-title" tabindex="-1">¡Tus cinco vidas están de vuelta!</h2><p>Repasar también es avanzar. Vuelve al reto con todo lo que acabas de recordar.</p><div style="display:flex;justify-content:center;gap:10px;color:var(--orange);margin-top:20px">${Array.from({ length: 5 }, () => icon('heart')).join('')}</div><div class="button-row"><button class="btn primary" data-action="practice-finish">Volver a mi aventura ${icon('arrow')}</button></div>`;
  const question = practice.questions[practice.index];
  return `${mascot(practice.checked ? practice.correct ? 'celebrating' : 'sad' : 'thinking', 'modal-cuy', { simple: true })}<h2 id="modal-title" tabindex="-1">Una pausa para recargar.</h2><p>Responde dos preguntas de repaso y recupera tus cinco vidas. Aquí puedes intentar sin perder corazones.</p><div class="practice-count">Pregunta ${practice.index + 1} de ${practice.questions.length}</div><p class="practice-question">${question.prompt}</p><div class="answer-list practice-options">${optionsFor(question).map((option, index) => `<button class="answer-option ${practice.checked ? index === answerIndex(question) ? 'correct' : practice.selected === index ? 'incorrect' : '' : practice.selected === index ? 'selected' : ''}" data-action="practice-select" data-index="${index}" aria-pressed="${practice.selected === index}" ${practice.checked ? 'disabled' : ''}><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join('')}</div>${practice.checked ? `<div class="feedback ${practice.correct ? '' : 'wrong'}" style="padding:14px 17px" role="status"><div><strong>${practice.correct ? '¡Eso es! Lo estás recordando.' : 'Vamos otra vez, sin apuro.'}</strong><p>${question.explanation}</p>${!practice.correct ? `<p class="correct-answer">Respuesta: ${correctAnswerText(question)}</p>` : ''}</div></div>` : ''}<div class="button-row"><button class="btn ${practice.checked ? 'primary' : 'blue'}" data-action="${practice.checked ? practice.correct ? 'practice-next' : 'practice-retry' : 'practice-check'}" ${!practice.checked && practice.selected === null ? 'disabled' : ''}>${practice.checked ? practice.correct ? practice.index === practice.questions.length - 1 ? 'Recuperar mis 5 vidas' : 'Siguiente pregunta' : 'Volver a intentarlo' : 'Comprobar'}${icon(practice.checked && practice.correct && practice.index === practice.questions.length - 1 ? 'heart' : 'arrow')}</button></div>`;
}
function openPractice() {
  if (!state.grade) { openModal('grades'); return; }
  if (gradeProgress().hearts === 5) {
    infoModal('¡Tus cinco vidas están listas!', '<p>Cada error en los ejercicios usa una vida. Si se acaban, dos preguntas de repaso te devuelven las cinco. Aquí no hay que esperar ni pagar.</p>');
    return;
  }
  const lesson = getLesson() || firstPending() || lessons()[0];
  practice = { questions: lesson.exercises.filter(question => question.type === 'choice' || question.type === 'tf').slice(0, 2), index: 0, selected: null, checked: false, correct: false, finished: false };
  openModal('practice');
}
