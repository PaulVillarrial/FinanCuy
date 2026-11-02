// Eventos globales: clics, formularios, teclado y ciclo de vida de la página
'use strict';

document.addEventListener('click', event => {
  if (event.target.classList?.contains('modal-backdrop')) { closeModal(); return; }
  const button = event.target.closest('[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  const index = Number(button.dataset.index);
  if (action === 'navigate') { navigate(button.dataset.view); return; }
  if (action === 'grades') { openModal('grades'); return; }
  if (action === 'choose-grade') { chooseGrade(button.dataset.grade); return; }
  if (action === 'start-lesson') { startLesson(button.dataset.lesson); return; }
  if (action === 'reset') { resetProgress(); return; }
  if (action === 'modal-close' || action === 'practice-finish') { closeModal(); return; }
  if (action === 'confirm-action') {
    const callback = modal?.onConfirm;
    closeModal();
    if (typeof callback === 'function') callback();
    return;
  }
  if (action === 'hearts' || action === 'recover') { openPractice(); return; }
  if (action === 'teacher-grade') { if (['all', ...GRADE_IDS].includes(button.dataset.grade)) { teacherGrade = button.dataset.grade; renderApp(); } return; }
  if (action === 'teacher-demo') { teacher.students = [...teacher.students.filter(s => s.source !== 'demo'), ...demoClass()]; saveTeacher(); renderApp(); toast('Aula de demostración cargada: 24 estudiantes ficticios en los tres grados.'); return; }
  if (action === 'teacher-clear') { confirmModal('¿Vaciamos el aula?', 'Se quitarán las fichas importadas y el aula de demostración de este navegador. El progreso del estudiante de este dispositivo no se toca.', () => { teacher.students = []; saveTeacher(); renderApp(); toast('Aula vaciada.'); }, 'Sí, vaciar el aula', true); return; }
  if (action === 'teacher-remove') { teacher.students = teacher.students.filter(s => s.id !== button.dataset.id); saveTeacher(); renderApp(); toast('Estudiante quitado del aula.'); return; }
  if (action === 'teacher-student') { showStudent(button.dataset.id); return; }
  if (action === 'teacher-print') { printReport(); return; }
  if (action === 'export-open') { openModal('export'); return; }
  if (action === 'export-ficha') { exportFicha(); return; }
  if (action === 'shop-item') { shopAction(button.dataset.item); return; }
  if (action === 'badge-info') { showBadge(button.dataset.badge); return; }
  if (action === 'streak') {
    refreshStreak();
    infoModal(lostStreak ? 'El Cuy descansó. Tú puedes volver.' : 'Un poquito cada día hace magia.', `<p>Tu racha actual es de <strong>${state.daily.streak} ${state.daily.streak === 1 ? 'día' : 'días'}</strong>. Tu mejor racha: ${state.daily.longest}.</p><p style="margin-top:12px">Termina una lección, nueva o de repaso, cada día. Cuenta la fecha local del navegador, una vez al día y en cualquier grado.</p><p style="margin-top:12px">${state.daily.lastDate === today() ? '¡Hoy ya cumpliste! Vuelve mañana para mantener la racha.' : 'Completa una lección hoy para dar el siguiente paso.'} Una pausa no borra tus lecciones, accesorios ni insignias.</p>`, lostStreak ? 'sleeping' : 'happy');
    return;
  }
  if (action === 'level') {
    infoModal(`Nivel ${playerLevel()}: tu esfuerzo cuenta.`, `<p>Llevas <strong>${allXP()} XP</strong> sumando los tres grados. Cada 200 XP subes un nivel.</p><p style="margin-top:12px">Una lección nueva da 20 XP y 10 semillas por completarla, más 10 XP y 2 semillas por acierto.</p><p style="margin-top:12px">Al repetir, solo ganas la diferencia si mejoras tu mejor marca. Así repasas sin duplicar recompensas. Las semillas pertenecen al grado en el que las ganaste.</p>`);
    return;
  }
  if (action.startsWith('practice-')) {
    if (!practice || practice.finished) return;
    const question = practice.questions[practice.index];
    if (action === 'practice-select' && !practice.checked && integer(index, 0, optionsFor(question).length - 1)) practice.selected = index;
    if (action === 'practice-check' && !practice.checked && practice.selected !== null) { practice.checked = true; practice.correct = practice.selected === answerIndex(question); }
    if (action === 'practice-retry' && practice.checked && !practice.correct) { practice.checked = false; practice.selected = null; }
    if (action === 'practice-next' && practice.checked && practice.correct) {
      if (practice.index < practice.questions.length - 1) { practice.index++; practice.selected = null; practice.checked = false; practice.correct = false; }
      else { gradeProgress().hearts = 5; practice.finished = true; saveState(); renderApp(); announce('Recuperaste tus cinco vidas.'); }
    }
    renderModal();
    return;
  }
  if (!run || run.finished) return;
  const lesson = getLesson();
  if (action === 'theory-next' && run.phase === 'theory') {
    if (run.slide < lesson.theory.length - 1) run.slide++;
    else run.phase = 'scenario';
    renderApp(true);
    return;
  }
  if (action === 'theory-prev' && run.phase === 'theory' && run.slide > 0) { run.slide--; renderApp(true); return; }
  if (action === 'scenario-choice' && run.phase === 'scenario' && run.scenarioChoice === null) {
    const choice = lesson.scenario.steps[run.scenarioStep].options[index];
    if (!choice) return;
    const before = run.balance;
    run.balance += choice.delta;
    run.scenarioChoice = index;
    run.scenarioHistory.push({ choice: index, before, after: run.balance });
    state.results.push({ k: 'd', g: run.grade, l: run.lessonId, i: run.scenarioStep, t: 'decision', c: choice.good, d: today() });
    saveState();
    renderApp();
    announce(`${choice.feedback} Saldo disponible: ${money(run.balance)}.`);
    return;
  }
  if (action === 'scenario-next' && run.phase === 'scenario' && run.scenarioChoice !== null) {
    if (run.scenarioStep < lesson.scenario.steps.length - 1) { run.scenarioStep++; run.scenarioChoice = null; }
    else { run.phase = 'quiz'; prepareQuestion(); }
    renderApp(true);
    return;
  }
  if (run.phase !== 'quiz') return;
  if (action === 'check-answer') { checkAnswer(); return; }
  if (action === 'quiz-next' && run.checked) {
    if (gradeProgress().hearts === 0) { openPractice(); return; }
    if (run.questionIndex === lesson.exercises.length - 1) completeLesson();
    else { run.questionIndex++; prepareQuestion(); renderApp(true); }
    return;
  }
  if (run.checked) return;
  const question = currentQuestion();
  const response = run.response;
  let movedPosition = null;
  if (action === 'select-answer' && ['choice', 'tf'].includes(question.type) && integer(index, 0, optionsFor(question).length - 1)) response.selected = index;
  else if (action === 'move-order' && question.type === 'order') {
    const direction = Number(button.dataset.direction);
    const target = index + direction;
    if ([-1, 1].includes(direction) && integer(index, 0, response.order.length - 1) && integer(target, 0, response.order.length - 1)) {
      [response.order[index], response.order[target]] = [response.order[target], response.order[index]];
      movedPosition = target;
    }
  } else if (action === 'pair-left' && question.type === 'match' && integer(index, 0, question.pairs.length - 1)) response.left = index;
  else if (action === 'pair-right' && question.type === 'match' && integer(index, 0, question.pairs.length - 1)) {
    if (response.left === null) { toast('Primero elige un concepto de la izquierda.'); return; }
    for (const key of Object.keys(response.pairs)) if (response.pairs[key] === index) delete response.pairs[key];
    response.pairs[response.left] = index;
    response.left = null;
  } else if (action === 'classify' && question.type === 'classify' && integer(index, 0, question.items.length - 1)) {
    const group = Number(button.dataset.group);
    if (integer(group, 0, question.groups.length - 1)) response.groups[index] = group;
  } else return;
  renderApp();
  if (movedPosition !== null) {
    const controls = [...document.querySelectorAll(`[data-action="move-order"][data-index="${movedPosition}"]:not(:disabled)`)];
    const nextControl = controls.find(control => control.dataset.direction === button.dataset.direction) || controls[0];
    nextControl?.focus({ preventScroll: true });
    announce(`Paso movido a la posición ${movedPosition + 1}.`);
  }
});

function handleInput(event) {
  const input = event.target;
  if (input.id === 'fill-answer' && run?.phase === 'quiz' && !run.checked) {
    run.response.text = input.value;
    const check = document.getElementById('check-answer');
    if (check) check.disabled = !responseReady();
  }
  const type = input.dataset.tool;
  const field = input.dataset.field;
  if (type && toolState[type] && Object.prototype.hasOwnProperty.call(toolState[type], field)) {
    toolState[type][field] = input.value;
    updateToolResults();
  }
}
document.addEventListener('input', handleInput);
document.addEventListener('change', event => {
  if (event.target.id === 'teacher-import') { importFiles(event.target.files); event.target.value = ''; return; }
  if (event.target.dataset.teacher === 'threshold') { const value = Number(event.target.value); if (THRESHOLDS.includes(value)) { teacher.threshold = value; saveTeacher(); renderApp(); } return; }
  if (event.target.tagName === 'SELECT') handleInput(event);
});
document.addEventListener('keydown', event => {
  if (modal) {
    if (event.key === 'Escape') { event.preventDefault(); closeModal(); return; }
    if (event.key === 'Tab') {
      const focusable = [...document.querySelectorAll('#modal-root button:not(:disabled), #modal-root input:not(:disabled), #modal-root select:not(:disabled), #modal-root a[href]')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (!focusable.includes(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  } else if (event.key === 'Enter' && event.target.id === 'fill-answer') { event.preventDefault(); checkAnswer(); }
  else if ((event.key === 'Enter' || event.key === ' ') && event.target.querySelector?.('#teacher-import')) { event.preventDefault(); document.getElementById('teacher-import').click(); }
  if (modal?.type === 'export' && event.key === 'Enter' && event.target.id === 'alias-input') { event.preventDefault(); exportFicha(); }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden || !state) return;
  const previous = state.daily.streak;
  refreshStreak();
  if (previous !== state.daily.streak) renderApp();
});
window.addEventListener('beforeunload', event => {
  if (!hasActiveLesson()) return;
  event.preventDefault();
  event.returnValue = '';
});
