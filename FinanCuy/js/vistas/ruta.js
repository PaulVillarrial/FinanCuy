// Vista: ruta de aprendizaje y estado sin grado
'use strict';

function firstPending() { return lessons().find(lesson => !gradeProgress().completed[lesson.id]); }
function isUnlocked(lessonId, grade = state.grade) {
  const list = lessons(grade);
  const index = list.findIndex(lesson => lesson.id === lessonId);
  return index >= 0 && (index === 0 || Boolean(gradeProgress(grade).completed[list[index - 1].id]));
}
function renderRoute() {
  if (!state.grade) return renderWelcome();
  const course = COURSE_DATA[state.grade];
  const progress = gradeProgress();
  const pending = firstPending();
  const activeUnit = course.units.find(unit => unit.lessons.some(lesson => !progress.completed[lesson.id])) || course.units[course.units.length - 1];
  const totalDone = lessons().filter(lesson => progress.completed[lesson.id]).length;
  const total = lessons().length;
  const unitIndex = course.units.indexOf(activeUnit);
  return `<section class="page-top"><div><div class="eyebrow">${course.label} · Unidad ${String(unitIndex + 1).padStart(2, '0')}</div><h1>${activeUnit.title}</h1><p>${activeUnit.description}</p></div>${mascot('happy', 'page-cuy', { simple: true })}</section>
    <div class="unit-progress"><div class="thin-progress" role="progressbar" aria-label="Lecciones completadas" aria-valuenow="${totalDone}" aria-valuemin="0" aria-valuemax="${total}"><span style="width:${totalDone / total * 100}%"></span></div><span><strong>${totalDone} de ${total}</strong> lecciones completadas</span></div>
    <div class="route-layout"><div>${course.units.map((unit, unitNumber) => {
      const coordinates = unit.lessons.map((lesson, index) => ({ x: 38 + [0, 40, 80, 40][index % 4], y: 71 + index * 142 }));
      const path = coordinates.map((point, index) => index ? `C${coordinates[index - 1].x} ${point.y - 71} ${point.x} ${point.y - 71} ${point.x} ${point.y}` : `M${point.x} ${point.y}`).join(' ');
      return `${course.units.length > 1 ? `<h2 class="tool-heading" style="margin-top:25px">Unidad ${unitNumber + 1}: ${unit.title}</h2>` : ''}<div class="lesson-path"><svg class="path-line" style="height:${unit.lessons.length * 142}px;top:26px" viewBox="0 0 180 ${unit.lessons.length * 142}" aria-hidden="true"><path d="${path}" stroke="#DCE4F3" stroke-width="5" stroke-dasharray="4 10" stroke-linecap="round" fill="none"/></svg>${unit.lessons.map((lesson, index) => {
        const done = progress.completed[lesson.id];
        const unlocked = isUnlocked(lesson.id);
        const status = done ? 'completed' : unlocked ? 'available' : 'locked';
        return `<div class="lesson-node-row" style="--offset:${[0, 40, 80, 40][index % 4]}px"><button class="lesson-node ${status}" data-action="start-lesson" data-lesson="${lesson.id}" aria-label="${lesson.title}. ${done ? `Completada con ${done.stars} estrellas. Repetir` : unlocked ? 'Disponible. Comenzar' : 'Bloqueada. Completa la lección anterior'}">${icon(done ? 'check' : unlocked ? lesson.icon : 'lock')}</button><div class="node-info ${status === 'locked' ? 'locked' : ''}"><span class="node-status ${status === 'available' ? 'current' : ''}">${done ? '¡Lo lograste!' : unlocked ? 'Tu próximo paso' : `Lección ${index + 1}`}</span><h3>${lesson.title}</h3><p>${lesson.subtitle}</p>${done ? starsMarkup(done.stars) : ''}</div></div>`;
      }).join('')}</div>`;
    }).join('')}</div>
    <aside class="route-companion">${mascot(lostStreak ? 'sleeping' : pending ? 'happy' : 'celebrating')}<p class="cuy-quote">${lostStreak ? 'Una pausa no borra lo aprendido. ¿Empezamos una nueva racha?' : pending ? totalDone ? '¡Vas muy bien! Tu siguiente superpoder está a un reto de distancia.' : '¡Vamos paso a paso! Yo pongo la magia, tú las buenas decisiones.' : '¡La hiciste! Ya tienes más herramientas para cuidar tu futuro.'}</p><button class="btn primary" data-action="${pending ? 'start-lesson' : 'navigate'}" ${pending ? `data-lesson="${pending.id}"` : 'data-view="badges"'}>${pending ? totalDone ? 'Continuar mi aventura' : 'Empezar mi aventura' : 'Ver mis insignias'}${icon('arrow')}</button><small>Aprende, decide y practica.<br>Los errores también enseñan.</small></aside></div>`;
}
function renderEmptyGrade(target) {
  return `<section class="empty-grade">${mascot('thinking')}<h1>Primero, elige tu aventura</h1><p>Las ${target === 'shop' ? 'semillas y los accesorios' : 'insignias'} se guardan por separado para cada grado. No necesitas registrarte.</p><button class="btn primary" data-action="grades">Elegir mi grado ${icon('arrow')}</button></section>`;
}
