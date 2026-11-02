// Vista: lección (teoría, escenario y herramientas de cálculo)
'use strict';

// El motor de lecciones consume los datos anteriores, sin servicios externos.
function renderLesson() {
  if (!run || !getLesson()) return renderRoute();
  const lesson = getLesson();
  const lessonIndex = lessons(run.grade).findIndex(item => item.id === lesson.id);
  const phaseIndex = ['theory', 'scenario', 'quiz'].indexOf(run.phase);
  const parts = ['Aprende', 'Decide', 'Practica'];
  const widths = [
    (run.slide + 1) / lesson.theory.length * 100,
    (run.scenarioStep + (run.scenarioChoice !== null ? 1 : 0)) / lesson.scenario.steps.length * 100,
    (run.questionIndex + (run.checked ? 1 : 0)) / lesson.exercises.length * 100
  ];
  return `<button class="back-link" data-action="navigate" data-view="learn">${icon('back')}Volver a mi ruta</button><div class="lesson-heading"><div class="eyebrow">${COURSE_DATA[run.grade].label} · Lección ${String(lessonIndex + 1).padStart(2, '0')}</div><h1>${lesson.title}</h1></div><div class="lesson-stepper" aria-label="Paso ${phaseIndex + 1} de 3">${parts.map((part, index) => `<div class="step-part ${index === phaseIndex ? 'active' : index < phaseIndex ? 'done' : ''}" ${index === phaseIndex ? 'aria-current="step"' : ''}><span>${index + 1}. ${part}</span><div class="step-bar" role="progressbar" aria-label="${part}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(index < phaseIndex ? 100 : index === phaseIndex ? widths[index] : 0)}"><span style="width:${index < phaseIndex ? 100 : index === phaseIndex ? widths[index] : 0}%"></span></div></div>`).join('')}</div><section class="study-content">${run.phase === 'theory' ? renderTheory(lesson) : run.phase === 'scenario' ? renderScenario(lesson) : renderQuiz(lesson)}</section>`;
}
function renderTheory(lesson) {
  const slide = lesson.theory[run.slide];
  const isLast = run.slide === lesson.theory.length - 1;
  return `<div class="study-kicker"><span>Cápsula ${run.slide + 1} de ${lesson.theory.length}</span><span class="slide-dots" aria-hidden="true">${lesson.theory.map((item, index) => `<span class="${index === run.slide ? 'active' : ''}"></span>`).join('')}</span></div><h2>${slide.title}</h2><p class="theory-text">${slide.text}</p>${slide.meme ? `<div class="meme-grid" aria-label="Un meme original del FinanCuy"><div class="meme-panel"><strong>${slide.meme.leftTitle}</strong>${mascot('thinking', '', { simple: true })}<p>“${slide.meme.left}”</p></div><div class="meme-panel"><strong>${slide.meme.rightTitle}</strong>${mascot('happy', '', { simple: true })}<p>“${slide.meme.right}”</p></div></div>` : ''}${slide.key ? `<div class="key-scene">${mascot('celebrating', '', { simple: true })}<p class="key-line"><small>Llévate este superpoder</small>${slide.key}</p></div>` : ''}<div class="lesson-actions">${run.slide > 0 ? `<button class="btn ghost" data-action="theory-prev">${icon('back')}Anterior</button>` : '<span class="exercise-help" style="margin:0">A tu ritmo, sin apuro.</span>'}<button class="btn primary" data-action="theory-next">${isLast ? 'Vamos a decidir' : 'Siguiente cápsula'}${icon('arrow')}</button></div>`;
}
function renderFeedback(correct, heading, explanation, extra = '') {
  return `<div class="feedback cuy-dialogue ${correct ? '' : 'wrong'}" role="status">${mascot(correct ? 'celebrating' : 'sad', '', { simple: true })}<div class="feedback-bubble"><strong>${heading}</strong><p>${explanation}</p>${extra ? `<p class="correct-answer">${extra}</p>` : ''}</div></div>`;
}
function renderScenario(lesson) {
  const scenario = lesson.scenario;
  const step = scenario.steps[run.scenarioStep];
  const selected = run.scenarioChoice !== null;
  const chosen = selected ? step.options[run.scenarioChoice] : null;
  const previous = run.scenarioHistory[run.scenarioStep];
  return `<div class="study-kicker"><span>Escenario · Decisión ${run.scenarioStep + 1} de ${scenario.steps.length}</span><span>Dinero simulado</span></div><h2>${scenario.title}</h2><p class="scenario-intro">${scenario.intro}</p><div class="balance-line">${icon('wallet')}<div><p class="balance-caption">Tu saldo disponible</p><p class="balance-value">${money(run.balance)}</p></div>${chosen ? `<div class="balance-change">${chosen.delta > 0 ? '+' : ''}${money(chosen.delta)}<small>Antes: ${money(previous.before)}</small></div>` : ''}</div><p class="question-prompt">${step.prompt}</p><div class="answer-list">${step.options.map((option, index) => `<button class="answer-option ${selected && index === run.scenarioChoice ? option.good ? 'correct' : 'incorrect' : ''}" data-action="scenario-choice" data-index="${index}" ${selected ? 'disabled' : ''}><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option.text}</span>${selected && index === run.scenarioChoice ? icon(option.good ? 'check' : 'info') : ''}</button>`).join('')}</div>${chosen ? renderFeedback(chosen.good, chosen.good ? '¡Bien ahí, futuro crack!' : 'Vamos a aprender de esta decisión', chosen.feedback) : '<p class="exercise-help" style="margin-top:14px">Explora sin miedo: este escenario no usa dinero real ni quita vidas.</p>'}${lesson.tool ? renderTool(lesson.tool) : ''}<div class="lesson-actions"><span class="exercise-help" style="margin:0">${selected ? 'Cada decisión deja una enseñanza.' : 'Elige una opción para continuar.'}</span><button class="btn primary" data-action="scenario-next" ${!selected ? 'disabled' : ''}>${run.scenarioStep === scenario.steps.length - 1 ? 'A practicar' : 'Siguiente decisión'}${icon('arrow')}</button></div>`;
}
function renderTool(type) {
  if (type === 'interest') {
    const values = toolState.interest;
    return `<section class="tool-area" aria-labelledby="interest-title"><h3 class="tool-heading" id="interest-title">${icon('calculator')}Tu calculadora de intereses</h3><p>Mueve los números y descubre qué cambia. La tasa es hipotética y anual.</p><div class="fields-grid"><label class="field"><span>Capital inicial (S/)</span><input type="number" inputmode="decimal" min="0" max="100000" step="1" data-tool="interest" data-field="capital" value="${esc(values.capital)}"></label><label class="field"><span>Tasa anual (%)</span><input type="number" inputmode="decimal" min="0" max="30" step="0.1" data-tool="interest" data-field="rate" value="${esc(values.rate)}"></label><label class="field"><span>Tiempo (años completos)</span><input type="number" inputmode="numeric" min="1" max="30" step="1" data-tool="interest" data-field="years" value="${esc(values.years)}"></label><label class="field"><span>Tipo de interés</span><select data-tool="interest" data-field="mode"><option value="simple" ${values.mode === 'simple' ? 'selected' : ''}>Simple</option><option value="compound" ${values.mode === 'compound' ? 'selected' : ''}>Compuesto anual</option></select></label></div><p class="form-error" id="tool-error" role="status"></p><div id="tool-result" aria-live="polite" aria-atomic="true"></div><p class="tool-note">Capital de S/0 a S/100 000; tasa de 0% a 30%; plazo de 1 a 30 años. Simulación sin comisiones, impuestos, aportes ni retiros. No es una oferta ni garantiza rendimientos.</p></section>`;
  }
  const values = toolState.business;
  return `<section class="tool-area" aria-labelledby="business-title"><h3 class="tool-heading" id="business-title">${icon('rocket')}El laboratorio de tu mini empresa</h3><p>Inventa un producto y cambia sus números. Calculamos al instante.</p><div class="fields-grid"><label class="field full"><span>¿Qué vas a vender?</span><input type="text" maxlength="40" data-tool="business" data-field="product" value="${esc(values.product)}" placeholder="Ej.: refrescos de maracuyá"></label><label class="field"><span>Costos fijos totales (S/)</span><input type="number" inputmode="decimal" min="0" max="100000" step="0.1" data-tool="business" data-field="fixed" value="${esc(values.fixed)}"></label><label class="field"><span>Costo variable por unidad (S/)</span><input type="number" inputmode="decimal" min="0" max="10000" step="0.1" data-tool="business" data-field="variable" value="${esc(values.variable)}"></label><label class="field"><span>Precio por unidad (S/)</span><input type="number" inputmode="decimal" min="0" max="10000" step="0.1" data-tool="business" data-field="price" value="${esc(values.price)}"></label><label class="field"><span>Unidades que vendes</span><input type="number" inputmode="numeric" min="0" max="10000" step="1" data-tool="business" data-field="quantity" value="${esc(values.quantity)}"></label></div><p class="form-error" id="tool-error" role="status"></p><div id="tool-result" aria-live="polite" aria-atomic="true"></div><p class="tool-note">Se asume que produces lo mismo que vendes. El modelo no incluye impuestos ni costos financieros. Máximo: S/100 000 en costos fijos, S/10 000 por unidad y 10 000 unidades.</p></section>`;
}
function interestCalculation(capital, rate, years, mode) {
  const total = mode === 'simple' ? capital * (1 + rate / 100 * years) : capital * Math.pow(1 + rate / 100, years);
  return { total, interest: total - capital };
}
function businessCalculation(fixed, variable, price, quantity) {
  const revenue = price * quantity;
  const cost = fixed + variable * quantity;
  const margin = price - variable;
  return { revenue, cost, profit: revenue - cost, margin, breakeven: margin > 0 ? Math.max(0, Math.ceil((fixed - 1e-9) / margin)) : null };
}
function updateToolResults() {
  const resultNode = document.getElementById('tool-result');
  const errorNode = document.getElementById('tool-error');
  if (!resultNode || !errorNode || !getLesson()) return;
  const type = getLesson().tool;
  const values = toolState[type];
  let error = '';
  if (type === 'interest') {
    const capital = Number(values.capital), rate = Number(values.rate), years = Number(values.years);
    if ([values.capital, values.rate, values.years].some(value => String(value).trim() === '') || ![capital, rate, years].every(Number.isFinite)) error = 'Completa los tres campos con números válidos.';
    else if (capital < 0 || capital > 100000 || rate < 0 || rate > 30 || !integer(years, 1, 30)) error = 'Usa un capital de S/0 a S/100 000, una tasa de 0% a 30% y de 1 a 30 años completos.';
    if (!error) {
      const result = interestCalculation(capital, rate, years, values.mode);
      const other = interestCalculation(capital, rate, years, values.mode === 'simple' ? 'compound' : 'simple');
      resultNode.innerHTML = `<div class="tool-result"><div class="result-item"><span>Monto final</span><strong>${money(result.total)}</strong></div><div class="result-item"><span>Intereses generados</span><strong>${money(result.interest)}</strong></div></div><p class="equilibrium">${values.mode === 'simple' ? 'Con interés compuesto anual' : 'Con interés simple'}: ${money(other.total)} al final.</p><p class="tool-note">${values.mode === 'simple' ? 'Monto = capital × (1 + tasa decimal × años).' : 'Monto = capital × (1 + tasa decimal) elevado al número de años.'} La tasa porcentual se divide entre 100.</p>`;
    }
  } else if (type === 'business') {
    const fixed = Number(values.fixed), variable = Number(values.variable), price = Number(values.price), quantity = Number(values.quantity);
    if (!String(values.product).trim()) error = 'Dale un nombre a tu producto para comenzar.';
    else if ([values.fixed, values.variable, values.price, values.quantity].some(value => String(value).trim() === '') || ![fixed, variable, price, quantity].every(Number.isFinite)) error = 'Completa costos, precio y ventas con números válidos.';
    else if (fixed < 0 || fixed > 100000 || variable < 0 || variable > 10000 || price < 0 || price > 10000 || !integer(quantity, 0, 10000)) error = 'No uses números negativos. Revisa los límites y escribe unidades completas.';
    if (!error) {
      const result = businessCalculation(fixed, variable, price, quantity);
      let equilibrium;
      if (result.margin > 0) equilibrium = `Punto de equilibrio: ${result.breakeven} ${result.breakeven === 1 ? 'unidad' : 'unidades'}. Cada venta aporta ${money(result.margin)} para cubrir costos fijos.`;
      else if (fixed === 0 && result.margin === 0) equilibrium = 'Ingresos y costos son iguales en cualquier volumen, pero la ganancia siempre es S/0. No hay margen por unidad.';
      else if (fixed === 0 && result.margin < 0) equilibrium = 'Con cero ventas no pierdes, pero cada unidad vendida genera pérdida. Revisa el precio y el costo variable.';
      else equilibrium = 'No alcanzas el punto de equilibrio con este precio: el margen por unidad no es positivo. Revisa precio y costos.';
      resultNode.innerHTML = `<p class="tool-note">Los números de <strong>${esc(values.product)}</strong></p><div class="tool-result"><div class="result-item"><span>Ingresos</span><strong>${money(result.revenue)}</strong></div><div class="result-item"><span>Costos totales</span><strong>${money(result.cost)}</strong></div><div class="result-item"><span>${result.profit < 0 ? 'Pérdida' : 'Ganancia'}</span><strong style="color:var(${result.profit < 0 ? '--red-ink' : '--blue'})">${money(result.profit)}</strong></div></div><p class="equilibrium">${equilibrium}</p><p class="tool-note">Ganancia = (precio × unidades) − (costos fijos + costo variable × unidades).</p>`;
    }
  }
  errorNode.textContent = error;
  if (error) resultNode.innerHTML = '<p class="tool-note">Corrige los datos para ver un resultado, sin cuentas incompletas.</p>';
}
