// Vista: bienvenida y elección de grado
'use strict';

function gradeCards() {
  return GRADE_IDS.map(grade => {
    const course = COURSE_DATA[grade];
    const done = Object.keys(state.grades[grade].completed).length;
    return `<button class="grade-card" data-action="choose-grade" data-grade="${grade}" aria-label="${course.label}. ${course.units[0].title}. ${done ? `${done} lecciones completadas` : 'Disponible para empezar'}"><div class="grade-card-top"><span class="grade-icon">${icon(course.icon)}</span><span class="grade-level">${course.level}</span></div><h3>${course.label}</h3><p>${course.units[0].title}</p><div class="grade-card-bottom"><span>${done ? `${done} de ${lessons(grade).length} completadas` : `${lessons(grade).length} lecciones · A tu ritmo`}</span><span class="grade-arrow">${icon('arrow')}</span></div></button>`;
  }).join('');
}
function renderWelcome() {
  return `<section class="welcome-hero" aria-labelledby="welcome-title"><div class="hero-copy"><div class="hero-logo">${brandMark('white', 144)}</div><div class="eyebrow">Educación financiera, a tu manera</div><h1 id="welcome-title">FinanCuy ${icon('spark')}</h1><h2>Pequeñas decisiones.<br>Un gran futuro.</h2><p>${lostStreak ? 'Tu Cuy descansó un poquito. Hoy puedes comenzar una nueva racha, sin perder lo que aprendiste.' : '¡Habla, futuro crack! Aprende a cuidar tus soles, cumple retos y descubre todo lo que puedes lograr.'}</p></div><div class="hero-stage">${mascot(lostStreak ? 'sleeping' : 'happy')}</div></section>
    <section class="grade-section" aria-labelledby="grade-title"><div class="section-heading"><div><h2 id="grade-title">¿En qué grado estás?</h2><p>Elige dónde empieza tu aventura. Puedes cambiar cuando quieras.</p></div><span class="availability">${icon('unlock')}Todos los grados disponibles</span></div><div class="grade-grid">${gradeCards()}</div></section>
    <p class="welcome-assurance">${icon('shield')}Sin contraseñas. Sin datos personales. Solo ganas de aprender.</p>`;
}
