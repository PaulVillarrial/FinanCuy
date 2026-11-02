// Estado de la aplicación y progreso guardado (localStorage)
'use strict';

let state, view, run = null, modal = null, practice = null;
let svgSerial = 0, storageNotice = '', toastTimer, restoreFocus = null, lostStreak = false;
const toolState = { interest: { capital: 100, rate: 10, years: 2, mode: 'compound' }, business: { product: 'Refrescos de maracuyá', fixed: 20, variable: 2, price: 5, quantity: 30 } };

function lessons(grade = state.grade) { return grade ? COURSE_DATA[grade].units.flatMap(unit => unit.lessons) : []; }
function gradeProgress(grade = state.grade) { return grade ? state.grades[grade] : null; }
function allXP() { return GRADE_IDS.reduce((sum, grade) => sum + state.grades[grade].xp, 0); }
function playerLevel() { return 1 + Math.floor(allXP() / 200); }
function currentGear() { return gradeProgress()?.equipped || []; }
function getLesson() { return run ? lessons(run.grade).find(lesson => lesson.id === run.lessonId) : null; }
function getStars(correct, total) { return correct / total >= .8 ? 3 : correct / total >= .5 ? 2 : 1; }
function freshState() {
  return {
    version: 1, grade: null, alias: '', results: [],
    grades: Object.fromEntries(GRADE_IDS.map(grade => [grade, { xp: 0, seeds: 0, hearts: 5, completed: {}, badges: {}, owned: [], equipped: [] }])),
    daily: { lastDate: null, streak: 0, longest: 0 }
  };
}
function loadState() {
  const clean = freshState();
  let raw;
  try { raw = localStorage.getItem(STORAGE_KEY); }
  catch (error) { storageNotice = 'Tu navegador no permite guardar datos. Puedes jugar, pero el progreso solo durará esta sesión.'; return clean; }
  if (!raw) return clean;
  try {
    const saved = JSON.parse(raw);
    if (!isObject(saved) || saved.version !== 1 || !(saved.grade === null || GRADE_IDS.includes(saved.grade)) || !isObject(saved.grades) || !isObject(saved.daily)) throw new Error('Formato incompatible');
    for (const grade of GRADE_IDS) {
      const progress = saved.grades[grade];
      if (!isObject(progress) || !integer(progress.xp, 0, 1000000) || !integer(progress.seeds, 0, 1000000) || !integer(progress.hearts, 0, 5)) throw new Error('Contadores inválidos');
      if (!isObject(progress.completed) || !isObject(progress.badges) || !Array.isArray(progress.owned) || !Array.isArray(progress.equipped)) throw new Error('Progreso inválido');
      const courseLessons = lessons(grade);
      let computedXP = 0;
      for (const [id, record] of Object.entries(progress.completed)) {
        const lesson = courseLessons.find(item => item.id === id);
        if (!lesson || !isObject(record) || record.total !== lesson.exercises.length || !integer(record.best, 0, record.total) || !integer(record.attempts, 1, 1000000) || !validDate(record.completedOn)) throw new Error('Lección inválida');
        record.stars = getStars(record.best, record.total);
        computedXP += 20 + record.best * 10;
      }
      if (computedXP !== progress.xp) throw new Error('XP incoherente');
      for (let i = 1; i < courseLessons.length; i++) {
        if (progress.completed[courseLessons[i].id] && !progress.completed[courseLessons[i - 1].id]) throw new Error('Ruta incoherente');
      }
      const itemIDs = SHOP_DATA.map(item => item.id);
      if (progress.owned.some(id => !itemIDs.includes(id)) || new Set(progress.owned).size !== progress.owned.length || progress.equipped.some(id => !progress.owned.includes(id)) || new Set(progress.equipped).size !== progress.equipped.length) throw new Error('Accesorio inválido');
      if (Object.entries(progress.badges).some(([id, date]) => !BADGE_DATA.some(badge => badge.id === id) || !validDate(date))) throw new Error('Insignia inválida');
    }
    const daily = saved.daily;
    if (!(daily.lastDate === null || validDate(daily.lastDate)) || !integer(daily.streak, 0, 100000) || !integer(daily.longest, daily.streak, 100000) || (daily.lastDate === null && daily.streak !== 0)) throw new Error('Racha inválida');
    saved.results = sanitizeResults(saved.results);
    saved.alias = sanitizeAlias(saved.alias);
    return saved;
  } catch (error) {
    storageNotice = 'Encontramos un progreso dañado y lo reiniciamos de forma segura. Tu nueva aventura está lista.';
    try { localStorage.removeItem(STORAGE_KEY); } catch (storageError) { /* La sesión sigue funcionando si el navegador bloquea el almacenamiento. */ }
    return clean;
  }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (error) { storageNotice = 'No se pudo guardar en este navegador. Tu progreso se mantiene durante esta sesión; evita cerrar la página.'; }
}
function refreshStreak() {
  const previous = state.daily.lastDate;
  lostStreak = Boolean(previous && dateNumber(today()) - dateNumber(previous) > 1);
  if (lostStreak && state.daily.streak > 0) {
    state.daily.streak = 0;
    saveState();
  }
}
function markDailyCompletion() {
  const day = today();
  const daily = state.daily;
  if (daily.lastDate === day) return;
  const difference = daily.lastDate ? dateNumber(day) - dateNumber(daily.lastDate) : Infinity;
  daily.streak = difference === 1 ? daily.streak + 1 : 1;
  daily.lastDate = day;
  daily.longest = Math.max(daily.longest, daily.streak);
  lostStreak = false;
}
