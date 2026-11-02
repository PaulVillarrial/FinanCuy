// Verificaciones locales del contenido (esquema, respuestas y fórmulas)
'use strict';

// Verificaciones locales: esquema, cápsulas, respuestas y fórmulas. No necesitan librerías.
function validateContent() {
  const errors = [];
  const assert = (condition, message) => { if (!condition) errors.push(message); };
  const strings = value => typeof value === 'string' ? [value] : Array.isArray(value) ? value.flatMap(strings) : isObject(value) ? Object.values(value).flatMap(strings) : [];
  const ids = new Set();
  let exerciseCount = 0;
  for (const grade of GRADE_IDS) {
    assert(lessons(grade).length >= 4, `Contenido insuficiente en ${grade}`);
    const availableSeeds = lessons(grade).reduce((sum, lesson) => sum + 10 + lesson.exercises.length * 2, 0);
    assert(SHOP_DATA.reduce((sum, item) => sum + item.cost, 0) <= availableSeeds, `Accesorios inalcanzables en ${grade}`);
    for (const lesson of lessons(grade)) {
      exerciseCount += lesson.exercises.length;
      assert(!ids.has(lesson.id), `Identificador repetido: ${lesson.id}`);
      ids.add(lesson.id);
      assert(strings(lesson.theory).join(' ').split(/\s+/).length <= 120, `Cápsula demasiado larga: ${lesson.id}`);
      assert(Boolean(lesson.theory[lesson.theory.length - 1].key), `Falta frase clave: ${lesson.id}`);
      assert(lesson.exercises.length >= 5 && lesson.exercises.length <= 8, `Cantidad de ejercicios: ${lesson.id}`);
      assert(new Set(lesson.exercises.map(question => question.type)).size === 6, `Falta variedad: ${lesson.id}`);
      assert(!lesson.tool || ['interest', 'business'].includes(lesson.tool), `Herramienta desconocida: ${lesson.id}`);
      let balances = [lesson.scenario.initial];
      for (const step of lesson.scenario.steps) {
        assert(step.options.length >= 2, `Faltan decisiones: ${lesson.id}`);
        for (const option of step.options) assert(Number.isFinite(option.delta) && typeof option.good === 'boolean' && Boolean(option.feedback), `Opción inválida: ${lesson.id}`);
        balances = balances.flatMap(balance => step.options.map(option => balance + option.delta));
        assert(balances.every(balance => balance >= 0 && Number.isFinite(balance)), `Saldo no previsto: ${lesson.id}`);
      }
      for (const question of lesson.exercises) {
        assert(Boolean(TYPE_LABELS[question.type]) && Boolean(question.explanation), `Ejercicio sin explicación: ${lesson.id}`);
        const response = { selected: answerIndex(question), text: question.answer, order: [], pairs: {}, groups: {} };
        if (question.type === 'choice') assert(integer(question.answer, 0, question.options.length - 1) && new Set(question.options).size === question.options.length, `Opciones inválidas: ${lesson.id}`);
        if (question.type === 'tf') assert(typeof question.answer === 'boolean', `Booleano inválido: ${lesson.id}`);
        if (question.type === 'fill') assert(typeof question.answer === 'string' && normalize(question.answer).length > 0, `Palabra inválida: ${lesson.id}`);
        if (question.type === 'order') {
          response.order = question.items.map((item, index) => index);
          assert(new Set(question.items).size === question.items.length, `Orden ambiguo: ${lesson.id}`);
        }
        if (question.type === 'match') {
          response.pairs = Object.fromEntries(question.pairs.map((pair, index) => [index, index]));
          assert(new Set(question.pairs.map(pair => pair[1])).size === question.pairs.length, `Parejas ambiguas: ${lesson.id}`);
        }
        if (question.type === 'classify') {
          response.groups = Object.fromEntries(question.items.map((item, index) => [index, item.group]));
          assert(question.groups.length === 2 && question.items.every(item => integer(item.group, 0, 1)), `Grupos inválidos: ${lesson.id}`);
        }
        assert(isCorrect(question, response), `Comprobación incorrecta: ${lesson.id}, ${question.type}`);
        const wrong = { ...response, selected: -1, text: 'respuesta no válida', order: [...response.order].reverse(), pairs: {}, groups: {} };
        assert(!isCorrect(question, wrong), `Falso positivo: ${lesson.id}, ${question.type}`);
      }
    }
  }
  assert(Math.abs(interestCalculation(100, 10, 2, 'simple').total - 120) < .00001, 'Fórmula de interés simple');
  assert(Math.abs(interestCalculation(100, 10, 2, 'compound').total - 121) < .00001, 'Fórmula de interés compuesto');
  assert(businessCalculation(12, 2, 5, 4).profit === 0 && businessCalculation(12, 2, 5, 4).breakeven === 4, 'Fórmula de equilibrio');
  assert(businessCalculation(20, 5, 5, 10).breakeven === null, 'Margen cero');
  assert(getStars(0, 6) === 1 && getStars(3, 6) === 2 && getStars(5, 6) === 3, 'Cálculo de estrellas');
  assert(normalize(' DÉBITO ') === 'debito', 'Normalización de respuestas');
  assert(dateNumber('2026-03-01') - dateNumber('2026-02-28') === 1, 'Cómputo de fechas');
  if (errors.length) console.error('Revisión del currículo:', errors);
  else console.info(`FinanCuy: ${ids.size} lecciones y ${exerciseCount} respuestas verificadas; fórmulas, economía y fechas coherentes.`);
  return errors;
}
