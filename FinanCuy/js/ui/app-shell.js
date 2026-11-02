// Estructura principal: barra lateral, encabezado, contenido y navegación móvil
'use strict';

function renderApp(scroll = false) {
  const focusedButton = document.activeElement?.closest('button[data-action]');
  const focusData = focusedButton ? { ...focusedButton.dataset } : null;
  refreshStreak();
  const selectedNav = ['welcome', 'route', 'lesson', 'summary'].includes(view) ? 'learn' : view;
  const navItems = [{ id: 'learn', label: 'Mi aprendizaje', icon: 'route' }, { id: 'badges', label: 'Mis insignias', icon: 'award' }, { id: 'shop', label: 'Tienda mágica', icon: 'shop' }, { id: 'teacher', label: 'Modo docente', icon: 'users' }];
  const title = selectedNav === 'learn' ? 'Mi aprendizaje' : selectedNav === 'badges' ? 'Mis insignias' : selectedNav === 'teacher' ? 'Modo docente' : 'Tienda mágica';
  const level = playerLevel();
  const xp = allXP();
  const content = view === 'welcome' ? renderWelcome() : view === 'route' ? renderRoute() : view === 'lesson' ? renderLesson() : view === 'summary' ? renderSummary() : view === 'badges' ? renderBadges() : view === 'teacher' ? renderTeacher() : renderShop();
  document.getElementById('app').innerHTML = `<div class="app-shell">
    <aside class="sidebar" aria-label="Navegación principal">
      <div class="logo-panel">${logoLink('white', 112)}</div><div class="brand-block"><div class="sidebar-brand">FinanCuy ${icon('spark')}</div><p class="brand-sub">Tu aventura financiera</p></div>
      <nav class="side-nav">${navItems.map(item => `<button class="nav-link ${selectedNav === item.id ? 'active' : ''}" data-action="navigate" data-view="${item.id}" ${selectedNav === item.id ? 'aria-current="page"' : ''}>${icon(item.icon)}${item.label}${selectedNav === item.id ? '<span class="nav-dot"></span>' : ''}</button>`).join('')}</nav>
      <div class="side-guide">${mascot(lostStreak ? 'sleeping' : 'happy', '', { simple: true })}<p>${state.grade ? 'Un pequeño paso hoy.<br>Un gran superpoder mañana.' : 'Un poquito cada día<br>hace la diferencia.'}</p>${state.grade ? `<div class="side-level"><div class="level-label"><strong>Nivel ${level}</strong><span>${xp % 200} / 200 XP</span></div><div class="thin-progress" role="progressbar" aria-label="Avance al siguiente nivel" aria-valuenow="${xp % 200}" aria-valuemin="0" aria-valuemax="200"><span style="width:${xp % 200 / 2}%"></span></div></div>` : '<small>Yo te acompaño en el camino.</small>'}</div>
      <div class="sidebar-bottom"><button class="reset-button" data-action="export-open" style="margin-bottom:6px">${icon('download')}Mi ficha para el docente</button><button class="reset-button" data-action="reset">${icon('reset')}Reiniciar progreso</button><p class="prototype-note">Hecho para aprender. Edición hackathon.</p></div>
    </aside>
    <div class="workspace">
      <header class="topbar"><div class="topbar-brand">${logoLink('white', 88)}</div><p class="header-title">${title}</p>
        <div class="player-stats" aria-label="Tu progreso">
          <button class="metric fire" data-action="streak" title="Racha diaria" aria-label="Racha de ${state.daily.streak} días">${icon('flame')}<span>${state.daily.streak}</span></button>
          <button class="metric seeds" data-action="navigate" data-view="shop" title="Semillas mágicas de este grado" aria-label="${gradeProgress()?.seeds || 0} semillas. Ir a la tienda">${icon('seed')}<span>${gradeProgress()?.seeds || 0}</span></button>
          <button class="metric xp" data-action="level" title="Nivel ${level}" aria-label="${xp} puntos de experiencia. Nivel ${level}">${icon('xp')}<span>${xp} XP</span></button>
          ${heartMarkup()}
        </div>
        <button class="grade-switch" data-action="grades" aria-label="Cambiar de grado. ${state.grade ? COURSE_DATA[state.grade].label : 'Ningún grado seleccionado'}">${icon('cap')}<span>${state.grade ? COURSE_DATA[state.grade].label : 'Elegir mi grado'}</span>${icon('chevron', 'chev')}</button>
      </header>
      ${storageNotice ? `<div class="storage-notice" role="status">${esc(storageNotice)}</div>` : ''}
      <main class="main-content" id="main-content" tabindex="-1">${content}</main>
      <div class="footer-wrap"><footer class="app-footer"><div class="footer-logo">${brandMark('blue', 96)}</div><p>Contenido educativo. No constituye asesoría financiera.<br>Tu progreso se guarda únicamente en este navegador.</p><p>Un futuro con más posibilidades.<br>Prototipo para hackathon. No es un producto oficial del BCP.</p></footer></div>
    </div>
    <nav class="bottom-nav" aria-label="Navegación móvil">${navItems.map(item => `<button class="${selectedNav === item.id ? 'active' : ''}" data-action="navigate" data-view="${item.id}" ${selectedNav === item.id ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.id === 'learn' ? 'Aprender' : item.id === 'badges' ? 'Insignias' : item.id === 'teacher' ? 'Docente' : 'Tienda'}</span></button>`).join('')}<button data-action="reset" aria-label="Reiniciar progreso">${icon('reset')}<span>Reiniciar progreso</span></button></nav>
  </div>`;
  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main-content').focus({ preventScroll: true });
  } else {
    const study = document.querySelector('.study-content');
    if (study) study.style.animation = 'none';
    if (focusData && !modal) {
      const replacement = [...document.querySelectorAll('#app button[data-action]')].find(button => !button.disabled && Object.entries(focusData).every(([key, value]) => button.dataset[key] === value));
      if (replacement) replacement.focus({ preventScroll: true });
    }
  }
  if (run?.phase === 'scenario' && getLesson()?.tool) updateToolResults();
}
