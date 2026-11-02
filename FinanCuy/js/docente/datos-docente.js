// Modo docente: fichas locales/importadas, estadísticas y clase de demostración
'use strict';

// ===== Modo docente: fichas locales e importadas, estadísticas y reporte imprimible (sin backend) =====
const TEACHER_KEY = 'cuy-magico-docente-v1';
const THRESHOLDS = [50, 60, 70, 80];
let teacher, teacherGrade = 'all';
const pct = value => value === null || value === undefined || Number.isNaN(value) ? 'Sin datos' : `${Math.round(value * 100)} %`;
function lessonById(id) { for (const grade of GRADE_IDS) { const lesson = lessons(grade).find(item => item.id === id); if (lesson) return { ...lesson, grade }; } return null; }
function sanitizeAlias(value) { return typeof value === 'string' ? value.replace(/[<>&"']/g, '').trim().slice(0, 30) : ''; }
function sanitizeResults(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(r => {
    if (!isObject(r) || !['e', 'd'].includes(r.k) || !GRADE_IDS.includes(r.g) || typeof r.c !== 'boolean' || !validDate(r.d)) return false;
    const lesson = lessons(r.g).find(item => item.id === r.l);
    if (!lesson) return false;
    return r.k === 'e' ? integer(r.i, 0, lesson.exercises.length - 1) && lesson.exercises[r.i].type === r.t : integer(r.i, 0, lesson.scenario.steps.length - 1) && r.t === 'decision';
  }).slice(-5000).map(r => ({ k: r.k, g: r.g, l: r.l, i: r.i, t: r.t, c: r.c, d: r.d }));
}
function sanitizeGrades(grades) {
  const out = {};
  for (const grade of GRADE_IDS) {
    const source = isObject(grades) && isObject(grades[grade]) ? grades[grade] : {};
    const completed = {};
    if (isObject(source.completed)) for (const [id, record] of Object.entries(source.completed)) {
      const lesson = lessons(grade).find(item => item.id === id);
      if (lesson && isObject(record) && record.total === lesson.exercises.length && integer(record.best, 0, record.total) && validDate(record.completedOn)) completed[id] = { best: record.best, total: record.total, stars: getStars(record.best, record.total), completedOn: record.completedOn };
    }
    out[grade] = { completed, badges: Array.isArray(source.badges) ? source.badges.filter(b => BADGE_DATA.some(badge => badge.id === b)) : [] };
  }
  return out;
}
function sanitizeStudent(raw, id, source) {
  if (!isObject(raw)) return null;
  const results = sanitizeResults(raw.results);
  const grades = sanitizeGrades(raw.grades);
  if (!results.length && !GRADE_IDS.some(grade => Object.keys(grades[grade].completed).length)) return null;
  return { id, alias: sanitizeAlias(raw.alias) || 'Estudiante', grade: GRADE_IDS.includes(raw.grade) ? raw.grade : null, exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt.slice(0, 40) : '', source, grades, results };
}
function loadTeacher() {
  const clean = { version: 1, threshold: 60, students: [] };
  try {
    const raw = localStorage.getItem(TEACHER_KEY);
    if (!raw) return clean;
    const saved = JSON.parse(raw);
    if (!isObject(saved) || !Array.isArray(saved.students)) throw new Error('Formato de aula inválido');
    return { version: 1, threshold: THRESHOLDS.includes(saved.threshold) ? saved.threshold : 60, students: saved.students.map((s, i) => sanitizeStudent(s, typeof s?.id === 'string' ? s.id.slice(0, 60) : `s-${i}`, s?.source === 'demo' ? 'demo' : 'import')).filter(Boolean).slice(0, 200) };
  } catch (error) {
    try { localStorage.removeItem(TEACHER_KEY); } catch (storageError) { /* sin almacenamiento disponible */ }
    return clean;
  }
}
function saveTeacher() {
  try { localStorage.setItem(TEACHER_KEY, JSON.stringify(teacher)); }
  catch (error) { storageNotice = 'No se pudo guardar el aula en este navegador. Los datos se mantienen durante esta sesión.'; }
}
function snapshotGrades(source) { return Object.fromEntries(GRADE_IDS.map(grade => [grade, { completed: source.grades[grade].completed, badges: Object.keys(source.grades[grade].badges) }])); }
function localStudent() { return sanitizeStudent({ alias: state.alias || 'Este dispositivo', grade: state.grade, grades: snapshotGrades(state), results: state.results }, 'local', 'local'); }
function studentRecords() { const local = localStudent(); return local ? [local, ...teacher.students] : [...teacher.students]; }
function analyzeStudent(student, gradeFilter, threshold) {
  const grades = gradeFilter === 'all' ? GRADE_IDS : [gradeFilter];
  const results = student.results.filter(r => grades.includes(r.g));
  const latestMap = new Map();
  for (const r of results) if (r.k === 'e') latestMap.set(`${r.l}#${r.i}`, r);
  const latest = [...latestMap.values()];
  const answered = latest.length, correct = latest.filter(r => r.c).length;
  const perLesson = {}, perType = {}, byGrade = {};
  for (const r of latest) {
    const lessonStat = perLesson[r.l] || (perLesson[r.l] = { answered: 0, correct: 0 });
    const typeStat = perType[r.t] || (perType[r.t] = { answered: 0, correct: 0 });
    lessonStat.answered++; typeStat.answered++; byGrade[r.g] = (byGrade[r.g] || 0) + 1;
    if (r.c) { lessonStat.correct++; typeStat.correct++; }
  }
  let weakest = null, strongest = null;
  for (const [id, stat] of Object.entries(perLesson)) {
    if (stat.answered < 3) continue;
    const acc = stat.correct / stat.answered;
    if (!weakest || acc < weakest.acc) weakest = { id, acc };
    if (!strongest || acc > strongest.acc) strongest = { id, acc };
  }
  const totalLessons = grades.reduce((sum, grade) => sum + lessons(grade).length, 0);
  const completed = grades.reduce((sum, grade) => sum + Object.keys(student.grades[grade]?.completed || {}).length, 0);
  const decisions = results.filter(r => r.k === 'd');
  const dominantGrade = student.grade && grades.includes(student.grade) ? student.grade : Object.keys(byGrade).sort((a, b) => byGrade[b] - byGrade[a])[0] || null;
  const accuracy = answered ? correct / answered : null;
  return { student, answered, correct, accuracy, perLesson, perType, weakest, strongest, completed, totalLessons, progress: totalLessons ? completed / totalLessons : 0, decisions: decisions.length, goodDecisions: decisions.filter(r => r.c).length, gradeLabel: dominantGrade ? COURSE_DATA[dominantGrade].label : 'Sin grado', passed: accuracy !== null && accuracy * 100 >= threshold, active: answered > 0 };
}
function buildStats(gradeFilter, threshold) {
  const students = studentRecords().map(s => analyzeStudent(s, gradeFilter, threshold)).filter(a => a.active).sort((a, b) => Number(a.passed) - Number(b.passed) || a.accuracy - b.accuracy || a.student.alias.localeCompare(b.student.alias, 'es'));
  const grades = gradeFilter === 'all' ? GRADE_IDS : [gradeFilter];
  const aggregate = (key, items) => items.map(item => {
    let answered = 0, correct = 0, pass = 0, fail = 0;
    for (const a of students) {
      const stat = a[key][item.id];
      if (!stat) continue;
      answered += stat.answered; correct += stat.correct;
      if (stat.correct / stat.answered * 100 >= threshold) pass++; else fail++;
    }
    return { ...item, answered, correct, accuracy: answered ? correct / answered : null, pass, fail };
  });
  const fields = aggregate('perLesson', grades.flatMap(grade => lessons(grade).map(lesson => ({ id: lesson.id, grade, title: lesson.title }))));
  const types = aggregate('perType', Object.keys(TYPE_LABELS).map(type => ({ id: type, title: TYPE_LABELS[type] })));
  const totals = students.reduce((t, a) => ({ answered: t.answered + a.answered, correct: t.correct + a.correct, passed: t.passed + (a.passed ? 1 : 0), progress: t.progress + a.progress, decisions: t.decisions + a.decisions, goodDecisions: t.goodDecisions + a.goodDecisions }), { answered: 0, correct: 0, passed: 0, progress: 0, decisions: 0, goodDecisions: 0 });
  totals.students = students.length;
  totals.progress = students.length ? totals.progress / students.length : 0;
  const withData = fields.filter(f => f.answered >= 3);
  return { students, fields, types, totals, threshold, gradeFilter, best: withData.reduce((m, f) => !m || f.accuracy > m.accuracy ? f : m, null), worst: withData.reduce((m, f) => !m || f.accuracy < m.accuracy ? f : m, null) };
}
function seededRandom(seed) {
  return () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const DEMO_NAMES = ['Valeria Q.', 'Mateo R.', 'Luciana T.', 'Sebastián H.', 'Camila P.', 'Diego M.', 'Ariana C.', 'Joaquín L.', 'Fabiana S.', 'Thiago V.', 'Ximena A.', 'Adrián F.', 'Daniela G.', 'Gael N.', 'Mía O.', 'Santiago B.', 'Antonella D.', 'Emilio Z.', 'Alessandra U.', 'Nicolás E.', 'Kiara I.', 'Rodrigo J.', 'Brianna K.', 'Liam W.'];
const DEMO_LESSON_BIAS = { 'g3-1': .08, 'g3-2': -.05, 'g3-3': .05, 'g3-4': .02, 'g4-1': -.22, 'g4-2': -.08, 'g4-3': .1, 'g4-4': .03, 'g5-1': -.1, 'g5-2': -.06, 'g5-3': -.18, 'g5-4': -.02 };
const DEMO_TYPE_BIAS = { choice: .06, tf: .1, fill: -.1, order: -.14, match: -.04, classify: .02 };
function demoClass() {
  const rng = seededRandom(20260315);
  const dayOffset = n => { const date = new Date(); date.setDate(date.getDate() - n); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; };
  return DEMO_NAMES.map((alias, index) => {
    const grade = GRADE_IDS[index % GRADE_IDS.length];
    const ability = .42 + rng() * .55;
    const done = Math.max(1, Math.min(4, Math.round(ability * 4.6 - .9 + (rng() - .5))));
    const results = [], completed = {};
    lessons(grade).forEach((lesson, li) => {
      if (li > done) return;
      const partial = li === done;
      if (partial && rng() < .45) return;
      const day = dayOffset(Math.max(0, 13 - li * 3 - Math.floor(rng() * 3)));
      lesson.scenario.steps.forEach((step, si) => results.push({ k: 'd', g: grade, l: lesson.id, i: si, t: 'decision', c: rng() < ability + .1, d: day }));
      let correct = 0;
      lesson.exercises.slice(0, partial ? 3 : lesson.exercises.length).forEach((question, qi) => {
        const c = rng() < Math.min(.97, ability + (DEMO_LESSON_BIAS[lesson.id] || 0) + (DEMO_TYPE_BIAS[question.type] || 0));
        if (c) correct++;
        results.push({ k: 'e', g: grade, l: lesson.id, i: qi, t: question.type, c, d: day });
      });
      if (!partial) completed[lesson.id] = { best: correct, total: lesson.exercises.length, stars: getStars(correct, lesson.exercises.length), completedOn: day };
    });
    return sanitizeStudent({ alias, grade, grades: { [grade]: { completed, badges: [] } }, results, exportedAt: new Date().toISOString() }, `demo-${index}`, 'demo');
  }).filter(Boolean);
}
function importFiles(files) {
  const list = [...files].filter(file => file.size < 2000000).slice(0, 60);
  if (!list.length) { toast('Elige uno o más archivos .json de fichas.'); return; }
  let added = 0, rejected = 0, pending = list.length;
  const finish = () => { if (--pending > 0) return; teacher.students = teacher.students.slice(-200); saveTeacher(); renderApp(); toast(`${added} ${added === 1 ? 'ficha importada' : 'fichas importadas'}${rejected ? `; ${rejected} no válidas` : ''}.`); };
  list.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const student = data?.format === 'cuy-magico-ficha' ? sanitizeStudent(data, `imp-${Date.now()}-${index}`, 'import') : null;
        if (student) { teacher.students = teacher.students.filter(s => !(s.source === 'import' && s.alias === student.alias)); teacher.students.push(student); added++; } else rejected++;
      } catch (error) { rejected++; }
      finish();
    };
    reader.onerror = () => { rejected++; finish(); };
    reader.readAsText(file);
  });
}
function exportFicha() {
  if (!state.results.length) return;
  state.alias = sanitizeAlias(document.getElementById('alias-input')?.value);
  saveState();
  const payload = { format: 'cuy-magico-ficha', version: 1, alias: state.alias || 'Estudiante', grade: state.grade, exportedAt: new Date().toISOString(), grades: snapshotGrades(state), results: state.results };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `ficha-financuy-${(state.alias || 'estudiante').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'estudiante'}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  closeModal();
  toast('Ficha descargada. Envíala a tu docente para que la importe en el Modo docente.');
}
