// Vista: resumen, premios e insignias al completar una lección
'use strict';

function awardBadges(grade) {
  const progress = gradeProgress(grade);
  const unlocked = [];
  for (const badge of BADGE_DATA) {
    let qualifies = badge.lessons ? Boolean(progress.completed[badge.lessons[grade]]) : false;
    if (badge.id === 'perfect') qualifies = Object.values(progress.completed).some(record => record.best === record.total);
    if (badge.id === 'unit') qualifies = COURSE_DATA[grade].units.some(unit => unit.lessons.every(lesson => progress.completed[lesson.id]));
    if (badge.id === 'streak') qualifies = state.daily.longest >= 3;
    if (qualifies && !progress.badges[badge.id]) { progress.badges[badge.id] = today(); unlocked.push(badge.id); }
  }
  return unlocked;
}
function completeLesson() {
  if (!run || run.finished || run.answers.length !== getLesson().exercises.length) return;
  const lesson = getLesson();
  const progress = gradeProgress(run.grade);
  const previous = progress.completed[lesson.id];
  const oldLevel = playerLevel();
  const improvement = previous ? Math.max(0, run.correct - previous.best) : run.correct;
  const xpEarned = (previous ? 0 : 20) + improvement * 10;
  const seedsEarned = (previous ? 0 : 10) + improvement * 2;
  const best = Math.max(previous?.best || 0, run.correct);
  progress.xp += xpEarned;
  progress.seeds += seedsEarned;
  progress.completed[lesson.id] = { best, total: lesson.exercises.length, stars: getStars(best, lesson.exercises.length), attempts: (previous?.attempts || 0) + 1, completedOn: previous?.completedOn || today() };
  markDailyCompletion();
  const newBadges = awardBadges(run.grade);
  if (state.daily.longest >= 3) for (const grade of GRADE_IDS) awardBadges(grade);
  run.finished = true;
  run.phase = 'summary';
  run.summary = { xp: xpEarned, seeds: seedsEarned, stars: getStars(run.correct, lesson.exercises.length), newBadges, oldLevel, newLevel: playerLevel(), repeated: Boolean(previous), improved: improvement > 0 };
  view = 'summary';
  saveState();
  renderApp(true);
  announce(`Lección terminada. ${run.correct} aciertos. Ganaste ${xpEarned} XP y ${seedsEarned} semillas.`);
}
function renderSummary() {
  if (!run?.summary) return renderRoute();
  const lesson = getLesson();
  const result = run.summary;
  const list = lessons(run.grade);
  const next = list[list.findIndex(item => item.id === lesson.id) + 1];
  return `<section class="summary">${mascot('celebrating')}<h1>${run.correct === lesson.exercises.length ? '¡Te salió de campeonato!' : '¡Un superpoder más para ti!'}</h1><p>Completaste <strong>${lesson.title}</strong>.</p>${starsMarkup(result.stars, 'summary-stars')}<p>${run.correct} de ${lesson.exercises.length} ejercicios correctos. ${run.correct === lesson.exercises.length ? '¡Lección perfecta!' : 'Cada intento te ayuda a seguir creciendo.'}</p><div class="reward-line"><div><div class="reward-number">${icon('xp')}+${result.xp}</div><p>XP ganados</p></div><div><div class="reward-number" style="color:var(--orange-ink)">${icon('seed')}+${result.seeds}</div><p>semillas mágicas</p></div><div><div class="reward-number" style="color:var(--green-ink)">${icon('check')}${run.correct}/${lesson.exercises.length}</div><p>aciertos</p></div></div>${result.newLevel > result.oldLevel ? `<div class="level-up">${icon('spark')} ¡Subiste al nivel ${result.newLevel}!</div>` : ''}${result.newBadges.length ? `<div class="new-badges">${icon('award')} Nuevas insignias: ${result.newBadges.map(id => BADGE_DATA.find(badge => badge.id === id).name).join(' · ')}</div>` : ''}${result.repeated ? `<p class="tool-note" style="text-align:center">${result.improved ? '¡Superaste tu mejor marca! Ganaste la diferencia de recompensas.' : 'Este repaso cuenta para tu racha. Las recompensas anteriores no se duplican.'}</p>` : ''}<div class="button-row"><button class="btn secondary" data-action="navigate" data-view="learn">Volver a mi ruta</button><button class="btn primary" data-action="${next ? 'start-lesson' : 'navigate'}" ${next ? `data-lesson="${next.id}"` : 'data-view="badges"'}>${next ? 'Siguiente lección' : 'Ver mis insignias'}${icon('arrow')}</button></div><button class="btn ghost small" style="margin-top:17px" data-action="start-lesson" data-lesson="${lesson.id}">${icon('reset')}Repasar esta lección</button></section>`;
}
