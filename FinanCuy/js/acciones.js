// Acciones del usuario: navegar, elegir grado, iniciar lección, responder, comprar, reiniciar
'use strict';

function hasActiveLesson() { return Boolean(run && !run.finished && view === 'lesson'); }
function navigate(target) {
  if (!['learn', 'badges', 'shop', 'teacher'].includes(target)) return;
  const commit = () => {
    run = null;
    view = target === 'learn' ? state.grade ? 'route' : 'welcome' : target;
    renderApp(true);
  };
  if (hasActiveLesson()) confirmModal('¿Salimos de esta lección?', 'Tus lecciones completadas y recompensas están guardadas. Esta lección en curso comenzará desde el inicio al volver; las vidas usadas se conservan.', commit, 'Salir de la lección');
  else commit();
}
function chooseGrade(grade) {
  if (!GRADE_IDS.includes(grade)) return;
  if (grade === state.grade) { closeModal(); return; }
  const target = ['shop', 'badges'].includes(view) ? view : 'route';
  const commit = () => {
    state.grade = grade;
    run = null;
    view = target;
    closeModal();
    saveState();
    renderApp(true);
    announce(`Elegiste ${COURSE_DATA[grade].label}. Tu aventura está lista.`);
  };
  if (hasActiveLesson()) confirmModal('¿Cambiamos de aventura?', 'El progreso completado de cada grado se conserva por separado. La lección que estás haciendo comenzará desde el inicio cuando regreses.', commit, 'Cambiar de grado');
  else commit();
}
function startLesson(id) {
  if (!state.grade) { openModal('grades'); return; }
  const lesson = lessons().find(item => item.id === id);
  if (!lesson) return;
  if (!isUnlocked(id)) {
    const index = lessons().findIndex(item => item.id === id);
    toast(`Primero completa “${lessons()[index - 1].title}”. Vamos paso a paso.`);
    return;
  }
  run = { grade: state.grade, lessonId: id, phase: 'theory', slide: 0, scenarioStep: 0, scenarioChoice: null, scenarioHistory: [], balance: lesson.scenario.initial, questionIndex: 0, answers: [], correct: 0, response: null, checked: false, lastCorrect: null, finished: false, summary: null };
  view = 'lesson';
  renderApp(true);
  if (gradeProgress().hearts === 0) openPractice();
}
function checkAnswer() {
  if (!responseReady()) return;
  const progress = gradeProgress();
  if (progress.hearts === 0) { openPractice(); return; }
  const correct = isCorrect(currentQuestion(), run.response);
  run.checked = true;
  run.lastCorrect = correct;
  run.answers.push({ correct });
  if (correct) run.correct++;
  else progress.hearts = Math.max(0, progress.hearts - 1);
  state.results.push({ k: 'e', g: run.grade, l: run.lessonId, i: run.questionIndex, t: currentQuestion().type, c: correct, d: today() });
  if (state.results.length > 5000) state.results = state.results.slice(-5000);
  saveState();
  renderApp();
  announce(`${correct ? '¡Correcto!' : 'Seguimos aprendiendo.'} ${currentQuestion().explanation} ${progress.hearts} vidas disponibles.`);
  document.querySelector('.lesson-actions .btn:not(:disabled)')?.focus({ preventScroll: true });
}
function resetProgress() {
  confirmModal('¿Empezamos de nuevo?', 'Esto borrará las lecciones, XP, semillas, vidas, accesorios, insignias y racha de los tres grados en este navegador. No se puede deshacer.', () => {
    state = freshState();
    run = null;
    lostStreak = false;
    storageNotice = '';
    view = 'welcome';
    toolState.interest = { capital: 100, rate: 10, years: 2, mode: 'compound' };
    toolState.business = { product: 'Refrescos de maracuyá', fixed: 20, variable: 2, price: 5, quantity: 30 };
    saveState();
    renderApp(true);
    toast('Tu nueva aventura está lista. ¡Vamos de nuevo!');
  }, 'Sí, reiniciar todo', true);
}
function shopAction(id) {
  const item = SHOP_DATA.find(product => product.id === id);
  const progress = gradeProgress();
  if (!item || !progress) return;
  if (progress.owned.includes(id)) {
    const equipped = progress.equipped.includes(id);
    progress.equipped = equipped ? progress.equipped.filter(value => value !== id) : [...progress.equipped, id];
    toast(equipped ? `${item.name}: guardado para otra aventura.` : `¡${item.name} equipado! Tu Cuy está listo.`);
  } else {
    if (progress.seeds < item.cost) { toast(`Te faltan ${item.cost - progress.seeds} semillas. Completa lecciones o mejora tu mejor marca para ganarlas.`); return; }
    progress.seeds -= item.cost;
    progress.owned.push(id);
    progress.equipped.push(id);
    toast(`¡Canjeaste ${item.cost} semillas! ${item.name} ya está equipado.`);
  }
  saveState();
  renderApp();
}
function showBadge(id) {
  const badge = BADGE_DATA.find(item => item.id === id);
  if (!badge || !state.grade) return;
  const earned = badgeUnlocked(badge);
  const lesson = badge.lessons ? lessons().find(item => item.id === badge.lessons[state.grade]) : null;
  const date = gradeProgress().badges[id];
  infoModal(badge.name, `<p>${earned ? '<strong>¡Esta insignia ya es tuya!</strong> ' : ''}${badge.description}</p>${lesson ? `<p style="margin-top:12px">En este grado: <strong>${lesson.title}</strong>.</p>` : ''}${id === 'streak' ? '<p style="margin-top:12px">La racha es general: terminar una lección de cualquier grado cuenta para ese día, incluso si es un repaso.</p>' : ''}${date ? `<p style="margin-top:12px">Conseguida el ${niceDate(date)}.</p>` : ''}`, earned ? 'celebrating' : 'thinking');
}
