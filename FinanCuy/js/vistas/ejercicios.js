// Vista: ejercicios y reto de la lección
'use strict';

function currentQuestion() { return getLesson()?.exercises[run.questionIndex]; }
function optionsFor(question) { return question.type === 'tf' ? ['Verdadero', 'Falso'] : question.options; }
function answerIndex(question) { return question.type === 'tf' ? question.answer ? 0 : 1 : question.answer; }
function prepareQuestion() {
  const question = currentQuestion();
  run.checked = false;
  run.lastCorrect = null;
  run.response = { selected: null, text: '', choiceOrder: question.type === 'choice' ? shuffle(question.options.map((item, index) => index)) : [0, 1], order: question.items && question.type === 'order' ? shuffle(question.items.map((item, index) => index)) : [], pairs: {}, left: null, rightOrder: question.type === 'match' ? shuffle(question.pairs.map((pair, index) => index)) : [], groups: {} };
}
function responseReady() {
  if (!run || run.phase !== 'quiz' || run.checked) return false;
  const question = currentQuestion();
  const response = run.response;
  if (!question || !response) return false;
  if (question.type === 'choice' || question.type === 'tf') return response.selected !== null;
  if (question.type === 'fill') return normalize(response.text).length > 0;
  if (question.type === 'order') return response.order.length === question.items.length;
  if (question.type === 'match') return question.pairs.every((pair, index) => response.pairs[index] !== undefined);
  if (question.type === 'classify') return question.items.every((item, index) => response.groups[index] !== undefined);
  return false;
}
function isCorrect(question, response) {
  if (question.type === 'choice' || question.type === 'tf') return response.selected === answerIndex(question);
  if (question.type === 'fill') return normalize(response.text) === normalize(question.answer);
  if (question.type === 'order') return response.order.every((index, position) => index === position);
  if (question.type === 'match') return question.pairs.every((pair, index) => response.pairs[index] === index);
  if (question.type === 'classify') return question.items.every((item, index) => response.groups[index] === item.group);
  return false;
}
function correctAnswerText(question) {
  if (question.type === 'choice' || question.type === 'tf') return optionsFor(question)[answerIndex(question)];
  if (question.type === 'fill') return question.answer;
  if (question.type === 'order') return question.items.map((item, index) => `${index + 1}. ${item}`).join(' → ');
  if (question.type === 'match') return question.pairs.map(pair => `${pair[0]}: ${pair[1]}`).join(' · ');
  return question.items.map(item => `${item.text}: ${question.groups[item.group]}`).join(' · ');
}
function renderQuiz(lesson) {
  const question = currentQuestion();
  const total = lesson.exercises.length;
  const checked = run.checked;
  const outOfHearts = gradeProgress().hearts === 0;
  return `<div class="study-kicker"><span>${TYPE_LABELS[question.type]}</span><span>Reto ${run.questionIndex + 1} de ${total}</span></div><div class="quiz-progress" aria-label="${run.answers.length} de ${total} retos respondidos">${lesson.exercises.map((item, index) => `<span class="${run.answers[index] ? run.answers[index].correct ? 'right' : 'wrong' : index === run.questionIndex ? 'current' : ''}"></span>`).join('')}</div><h2>${question.prompt}</h2>${question.hint ? `<p class="exercise-help">${question.hint}</p>` : ''}${renderQuestionInput(question)}${checked ? renderFeedback(run.lastCorrect, run.lastCorrect ? ['¡La hiciste!', '¡Ese es tu superpoder!', '¡Bien ahí, crack!'][run.questionIndex % 3] : 'Un error también te hace aprender', question.explanation, !run.lastCorrect ? `Respuesta: ${correctAnswerText(question)}` : '') : ''}${outOfHearts ? '<p class="exercise-help" style="margin-top:15px">Tu Cuy necesita una pausa activa. Dos preguntas de repaso recuperan tus cinco vidas, sin esperar.</p>' : ''}<div class="lesson-actions"><span class="exercise-help" style="margin:0">${checked ? `${run.correct} ${run.correct === 1 ? 'acierto' : 'aciertos'} hasta ahora` : 'Piensa con calma. Tú puedes.'}</span>${outOfHearts ? `<button class="btn primary" data-action="recover">Recuperar mis vidas ${icon('heart')}</button>` : checked ? `<button class="btn primary" data-action="quiz-next">${run.questionIndex === total - 1 ? 'Ver mis logros' : 'Siguiente reto'}${icon('arrow')}</button>` : `<button class="btn blue" id="check-answer" data-action="check-answer" ${!responseReady() ? 'disabled' : ''}>Comprobar ${icon('check')}</button>`}</div>`;
}
function renderQuestionInput(question) {
  const response = run.response;
  const checked = run.checked;
  const disabled = checked ? 'disabled' : '';
  if (question.type === 'choice' || question.type === 'tf') {
    return `<div class="answer-list" role="group" aria-label="Elige una respuesta">${response.choiceOrder.map((index, displayIndex) => {
      const option = optionsFor(question)[index];
      const selected = response.selected === index;
      const status = checked ? index === answerIndex(question) ? 'correct' : selected ? 'incorrect' : '' : selected ? 'selected' : '';
      return `<button class="answer-option ${status}" data-action="select-answer" data-index="${index}" aria-pressed="${selected}" ${disabled}><span class="answer-letter">${String.fromCharCode(65 + displayIndex)}</span><span>${option}</span>${checked && (selected || index === answerIndex(question)) ? icon(index === answerIndex(question) ? 'check' : 'close') : ''}</button>`;
    }).join('')}</div>`;
  }
  if (question.type === 'fill') return `<label class="sr-only" for="fill-answer">Tu respuesta</label><input class="text-input" id="fill-answer" type="text" maxlength="60" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Escribe la palabra que falta…" value="${esc(response.text)}" ${disabled}><p class="exercise-help" style="margin-top:10px">Mayúsculas y tildes no afectan la comprobación.</p>`;
  if (question.type === 'order') {
    return `<p class="exercise-help">Usa las flechas para poner el primer paso arriba. Luego comprueba tu orden.</p><div class="order-list">${response.order.map((originalIndex, position) => `<div class="order-row"><span class="order-number">${position + 1}</span><p>${question.items[originalIndex]}</p><div class="order-controls"><button class="icon-button" data-action="move-order" data-index="${position}" data-direction="-1" aria-label="Subir: ${esc(question.items[originalIndex])}" ${checked || position === 0 ? 'disabled' : ''}>${icon('up')}</button><button class="icon-button" data-action="move-order" data-index="${position}" data-direction="1" aria-label="Bajar: ${esc(question.items[originalIndex])}" ${checked || position === response.order.length - 1 ? 'disabled' : ''}>${icon('down')}</button></div></div>`).join('')}</div>`;
  }
  if (question.type === 'match') {
    return `<p class="exercise-help">Toca un concepto de la izquierda y su significado a la derecha. Puedes cambiar las parejas antes de comprobar.</p><div class="pair-grid"><div class="pair-column">${question.pairs.map((pair, index) => `<button class="pair-button ${response.left === index ? 'selected' : response.pairs[index] !== undefined ? 'paired' : ''}" data-action="pair-left" data-index="${index}" aria-pressed="${response.left === index}" ${disabled}><span class="pair-number">${index + 1}</span>${pair[0]}</button>`).join('')}</div><div class="pair-column">${response.rightOrder.map(index => {
      const owner = Object.keys(response.pairs).find(key => response.pairs[key] === index);
      return `<button class="pair-button ${owner !== undefined ? 'paired' : ''}" data-action="pair-right" data-index="${index}" aria-label="${esc(question.pairs[index][1])}${owner !== undefined ? `. Unido al concepto ${Number(owner) + 1}` : ''}" ${disabled}>${owner !== undefined ? `<span class="pair-number">${Number(owner) + 1}</span>` : ''}${question.pairs[index][1]}</button>`;
    }).join('')}</div></div>`;
  }
  return `<p class="exercise-help">Elige un grupo para cada tarjeta. Una sola opción corresponde a cada caso.</p><div class="classify-list">${question.items.map((item, index) => `<div class="classify-row"><p id="classify-label-${index}">${item.text}</p><div class="classify-choices" role="group" aria-labelledby="classify-label-${index}">${question.groups.map((group, groupIndex) => {
    const selected = response.groups[index] === groupIndex;
    const status = checked ? groupIndex === item.group ? 'correct' : selected ? 'incorrect' : '' : selected ? 'selected' : '';
    return `<button class="classify-choice ${status}" data-action="classify" data-index="${index}" data-group="${groupIndex}" aria-pressed="${selected}" ${disabled}>${group}</button>`;
  }).join('')}</div></div>`).join('')}</div>`;
}
