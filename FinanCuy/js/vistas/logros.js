// Vista: logros (insignias)
'use strict';

function badgeUnlocked(badge, grade = state.grade) { return badge.id === 'streak' ? state.daily.longest >= 3 : Boolean(gradeProgress(grade)?.badges[badge.id]); }
function renderBadges() {
  if (!state.grade) return renderEmptyGrade('badges');
  const count = BADGE_DATA.filter(badge => badgeUnlocked(badge)).length;
  return `<section class="page-top"><div><div class="eyebrow">Tu esfuerzo deja huella</div><h1>Pequeños logros. Grandes pasos.</h1><p>${count} de ${BADGE_DATA.length} insignias descubiertas en ${COURSE_DATA[state.grade].label}.</p></div>${mascot(count ? 'celebrating' : 'happy', 'page-cuy', { simple: true })}</section><div class="badge-list">${BADGE_DATA.map(badge => {
    const earned = badgeUnlocked(badge);
    return `<button class="badge-item ${earned ? 'earned' : ''}" data-action="badge-info" data-badge="${badge.id}" aria-label="${badge.name}. ${earned ? 'Conseguida' : 'Por descubrir'}. Ver cómo conseguirla"><span class="badge-medal">${icon(badge.icon)}</span><h2>${badge.name}</h2><p>${badge.description}</p><span class="badge-status">${earned ? '¡Insignia conseguida!' : 'Por descubrir'}</span></button>`;
  }).join('')}</div><div class="button-row" style="justify-content:center;padding-bottom:34px"><button class="btn secondary" data-action="export-open">${icon('download')}Compartir mi avance con mi docente</button></div>`;
}
