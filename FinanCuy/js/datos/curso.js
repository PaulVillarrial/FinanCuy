// Currículo: grados, unidades, lecciones y ejercicios (independiente de la interfaz)

// El currículo es independiente de la interfaz. Añade unidades a cada grado sin cambiar los ejercicios.
const COURSE_DATA = {
  "3": {
    label: "3.º de secundaria", level: "Explora", icon: "wallet",
    units: [{ id: "g3-u1", title: "Mis primeras finanzas", description: "Haz que cada sol cuente, desde hoy.", lessons: [
      {
        id: "g3-1", title: "El dinero y mis decisiones", subtitle: "Necesidades y deseos", icon: "wallet",
        theory: [
          { title: "Tus soles también toman decisiones", text: "Una necesidad es algo indispensable, como alimentarte o llegar al cole. Un deseo es un gusto que puede esperar. Ambos existen, pero tu dinero tiene un límite.", meme: { leftTitle: "Mi yo impulsivo", left: "Pulsera nueva. ¿Y el pasaje?", rightTitle: "Mi yo con superpoderes", right: "Primero el pasaje. Luego vemos, causa." } },
          { title: "Un gusto no es el villano", text: "Antes de gastar, pregúntate: ¿lo necesito ahora?, ¿me alcanza sin dejar algo importante? Decidir no es prohibirte todo: es elegir qué va primero.", key: "Primero mis necesidades; después, los gustos que sí puedo pagar." }
        ],
        scenario: { title: "Un día de cole, S/20 y tú", intro: "Recibes S/20 para el día. Debes cubrir el pasaje y comer algo. Lo que separes dejará de estar disponible.", initial: 20, steps: [
          { prompt: "El pasaje de ida y vuelta cuesta S/6. También viste una pulsera de S/12. ¿Qué haces primero?", options: [
            { text: "Separar S/6 para el pasaje", delta: -6, good: true, feedback: "¡Bien ahí! Aseguraste cómo volver a casa antes de pensar en un gusto." },
            { text: "Comprar la pulsera por S/12", delta: -12, good: false, feedback: "La pulsera está chévere, pero todavía faltan pasaje y comida. Ese gusto podía esperar." }
          ] },
          { prompt: "En el recreo tienes hambre y no trajiste comida. ¿Qué eliges con tu saldo disponible?", options: [
            { text: "Un sánguche de S/5", delta: -5, good: true, feedback: "Alimentarte es una necesidad. Revisa también si aún tienes separado el pasaje." },
            { text: "Stickers de S/6, aunque aún no he comido", delta: -6, good: false, feedback: "Los stickers no llenan la panza del cuy. Primero cubre la comida y el regreso." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Tienes poco dinero y debes ir al cole. ¿Qué priorizas?", options: ["Una pulsera de moda", "El pasaje de ida y vuelta", "Una mejora en un juego"], answer: 1, explanation: "El pasaje cubre una necesidad para asistir al cole." },
          { type: "tf", prompt: "Comprar algo que deseas siempre es una mala decisión.", answer: false, explanation: "Un gusto puede estar bien si ya cubriste tus necesidades y te alcanza." },
          { type: "fill", prompt: "Algo indispensable para tu bienestar es una ____.", hint: "Completa con: necesidad o deseo.", answer: "necesidad", explanation: "Una necesidad es algo indispensable, no solo algo que te gustaría tener." },
          { type: "order", prompt: "Ordena una decisión responsable de gasto.", items: ["Identificar mis necesidades", "Separar dinero para cubrirlas", "Ver si queda dinero para un gusto"], explanation: "Primero identificas lo importante, separas su dinero y recién evalúas los gustos." },
          { type: "match", prompt: "Une cada concepto con su ejemplo.", pairs: [["Necesidad", "Almorzar cuando no tienes comida"], ["Deseo", "Comprar una pulsera por moda"], ["Decisión", "Elegir qué comprar con un saldo limitado"]], explanation: "Distinguir lo indispensable de un gusto te ayuda a decidir." },
          { type: "classify", prompt: "Clasifica estas compras en su contexto.", groups: ["Necesidad", "Deseo"], items: [{ text: "Pasaje para llegar al cole", group: 0 }, { text: "Medicina recetada que necesitas", group: 0 }, { text: "Audífonos nuevos solo por moda", group: 1 }, { text: "Gaseosa cuando ya tienes agua", group: 1 }], explanation: "El contexto importa: pasaje y medicina son necesarios; los otros gustos pueden esperar." }
        ]
      },
      {
        id: "g3-2", title: "Mi primer presupuesto", subtitle: "Ingresos, gastos y un plan", icon: "calculator",
        theory: [
          { title: "Pon a tus soles en modo equipo", text: "Un presupuesto es un plan para tu dinero. Anota ingresos, gastos y ahorro. Un gasto fijo suele tener un monto acordado; uno variable cambia según lo que consumes.", meme: { leftTitle: "Sin presupuesto", left: "Tenía S/50. Se fueron de paseo.", rightTitle: "Con presupuesto", right: "Cada sol tiene su misión." } },
          { title: "Haz la cuenta antes, no después", text: "Si recibes S/50 y gastas S/30, quedan S/20. Puedes asignar una parte al ahorro. Si tus gastos superan tus ingresos, ajusta el plan.", key: "Mi presupuesto le da un trabajo a cada sol." }
        ],
        scenario: { title: "La kermés necesita un plan", intro: "Tu equipo recibe S/100 para preparar un puesto en la kermés. Tú organizas el dinero disponible.", initial: 100, steps: [
          { prompt: "¿Qué compra haces primero para poder vender?", options: [
            { text: "Materiales necesarios por S/50", delta: -50, good: true, feedback: "¡Ese es el plan! Primero los materiales que permiten hacer el producto." },
            { text: "Decoración llamativa por S/80", delta: -80, good: false, feedback: "El puesto se verá bonito, pero queda poco para producir. Lo esencial va primero." }
          ] },
          { prompt: "Antes de abrir, necesitas dar vuelto a tus clientes. ¿Qué haces?", options: [
            { text: "Separar S/20 para el vuelto", delta: -20, good: true, feedback: "No es una pérdida: lo reservaste para operar. Tu saldo disponible ya lo refleja." },
            { text: "Comprar adornos extra por S/15", delta: -15, good: false, feedback: "Esos adornos pueden esperar. Planificar el vuelto evita perder ventas." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Recibes S/50, gastas S/20 en pasajes y S/10 en comida. ¿Cuánto queda?", options: ["S/10", "S/20", "S/30"], answer: 1, explanation: "S/50 menos S/20 menos S/10 deja un saldo de S/20." },
          { type: "tf", prompt: "Un gasto variable puede cambiar según tu consumo.", answer: true, explanation: "Por ejemplo, tus recargas pueden variar según cuánto uses el celular." },
          { type: "fill", prompt: "El dinero que recibes es un ____.", hint: "Completa con: ingreso o gasto.", answer: "ingreso", explanation: "Un ingreso aumenta el dinero del que dispones." },
          { type: "order", prompt: "Arma el presupuesto del Cuy: empieza por anotar los ingresos.", items: ["Anotar mis ingresos", "Listar mis gastos", "Restar los gastos de los ingresos", "Ajustar el plan si no alcanza"], explanation: "En este método, primero anotas ingresos, luego gastos, calculas el saldo y ajustas." },
          { type: "match", prompt: "Une los conceptos de tu presupuesto.", pairs: [["Gasto fijo", "Monto periódico acordado"], ["Gasto variable", "Monto que cambia con el consumo"], ["Saldo", "Lo que queda tras restar gastos a ingresos"]], explanation: "Separar tipos de gasto facilita anticipar cuánto necesitarás." },
          { type: "classify", prompt: "¿Entra o sale dinero?", groups: ["Ingreso", "Gasto"], items: [{ text: "Recibes S/20 de propina", group: 0 }, { text: "Ganas S/15 vendiendo en la kermés", group: 0 }, { text: "Pagas S/6 de pasaje", group: 1 }, { text: "Recargas S/5 al celular", group: 1 }], explanation: "Propinas y ventas son entradas; pasajes y recargas son salidas." }
        ]
      },
      {
        id: "g3-3", title: "El poder de ahorrar", subtitle: "Metas y un plan B", icon: "seed",
        theory: [
          { title: "Tu yo del futuro te hace barra", text: "Ahorrar es separar dinero hoy para usarlo después. Una meta funciona mejor si tiene propósito, monto y plazo. Un fondo de emergencia cubre imprevistos necesarios, no antojos.", meme: { leftTitle: "Cómo empieza", left: "Solo puedo guardar S/5.", rightTitle: "Cómo continúa", right: "S/5 cada semana ya es un plan." } },
          { title: "Poquito, pero con constancia", text: "Para una meta de S/80, ahorrar S/20 por semana requiere cuatro semanas. Separa tu ahorro al recibir dinero y revisa tu avance.", key: "El ahorro se planea; no depende de lo que sobre." }
        ],
        scenario: { title: "La pelota no se compra sola", intro: "Tienes S/60 guardados para una pelota de S/120. Hoy recibiste S/30 adicionales: ese es tu saldo disponible.", initial: 30, steps: [
          { prompt: "¿Cómo usas parte de estos S/30?", options: [
            { text: "Guardar S/15 para la meta", delta: -15, good: true, feedback: "Tu ahorro para la pelota sube a S/75. Lo separado ya no está disponible para gastar." },
            { text: "Gastar S/25 en un gusto no planeado", delta: -25, good: false, feedback: "La meta no avanzó esta vez. Puedes retomar el plan sin castigarte." }
          ] },
          { prompt: "También quieres comenzar un pequeño fondo para imprevistos. ¿Qué eliges?", options: [
            { text: "Separar S/5 para emergencias", delta: -5, good: true, feedback: "¡Buen comienzo! Ese fondo es distinto del ahorro para tu pelota." },
            { text: "Comprar un antojo de S/4", delta: -4, good: false, feedback: "Un antojo no es una emergencia. Separar un poquito también cuenta." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Tu meta es S/80 y ahorras S/20 por semana desde cero. ¿Cuántas semanas necesitas?", options: ["2 semanas", "4 semanas", "8 semanas"], answer: 1, explanation: "S/80 dividido entre S/20 por semana da cuatro semanas." },
          { type: "tf", prompt: "El fondo de emergencia está pensado para estrenar zapatillas solo por moda.", answer: false, explanation: "Ese fondo atiende necesidades imprevistas, no gustos planeables." },
          { type: "fill", prompt: "Separar dinero hoy para usarlo después es ____.", hint: "Completa con: ahorrar o gastar.", answer: "ahorrar", explanation: "Ahorrar reserva recursos para una meta futura o un imprevisto." },
          { type: "order", prompt: "Ordena los pasos de tu meta de ahorro.", items: ["Definir qué quiero y cuánto cuesta", "Calcular cuánto me falta", "Fijar cuánto ahorraré por semana", "Revisar mi avance cada semana"], explanation: "Una meta concreta permite calcular el aporte y seguir el avance." },
          { type: "match", prompt: "Une cada idea con su significado.", pairs: [["Meta", "Objetivo con monto y plazo"], ["Ahorro", "Dinero que separas para después"], ["Fondo de emergencia", "Reserva para necesidades imprevistas"]], explanation: "Tu meta y tu fondo pueden convivir, pero tienen propósitos diferentes." },
          { type: "classify", prompt: "¿Es un imprevisto necesario o un gusto?", groups: ["Imprevisto necesario", "Gusto"], items: [{ text: "Medicina necesaria por una enfermedad inesperada", group: 0 }, { text: "Reparar tu única mochila que acaba de romperse", group: 0 }, { text: "Un helado por antojo", group: 1 }, { text: "Una entrada al cine por diversión", group: 1 }], explanation: "Una urgencia necesaria es diferente de una compra por diversión." }
        ]
      },
      {
        id: "g3-4", title: "Mi primera cuenta", subtitle: "Ahorro y pagos digitales seguros", icon: "shield",
        theory: [
          { title: "Digital no significa dinero infinito", text: "Una cuenta permite guardar dinero. Una tarjeta de débito usa tu saldo, no un préstamo. Herramientas como Yape y Plin facilitan pagos digitales: verifica siempre destinatario y monto.", meme: { leftTitle: "Expectativa", left: "¡Pago digital! ¿Soles infinitos?", rightTitle: "Realidad", right: "Mi saldo también tiene límites." } },
          { title: "Tus claves se quedan contigo", text: "No compartas claves ni códigos. Revisa movimientos. Para menores, el acceso y el acompañamiento adulto dependen de la entidad; consulten sus condiciones.", key: "Verifico antes de pagar y nunca comparto mis claves." }
        ],
        scenario: { title: "Un pago en la bodega", intro: "Tu billetera tiene S/45. Vas a pagar una compra de S/8 en una bodega del barrio. Es una simulación, sin dinero real.", initial: 45, steps: [
          { prompt: "Al pagar con una herramienta como Yape o Plin, ¿qué haces?", options: [
            { text: "Verificar el nombre y enviar los S/8", delta: -8, good: true, feedback: "Destinatario y monto revisados: un buen hábito antes de confirmar." },
            { text: "Apurarme: escribí S/16 y confirmé sin revisar", delta: -16, good: false, feedback: "Enviaste el doble. Detenerte unos segundos puede evitar un error costoso." }
          ] },
          { prompt: "Después, un desconocido dice que necesita tu código secreto para devolverte dinero.", options: [
            { text: "No compartirlo y consultar el canal oficial", delta: 0, good: true, feedback: "¡Tus claves no se prestan! Para recibir una devolución no debes revelar códigos secretos." },
            { text: "Compartir el código porque parece amable", delta: -20, good: false, feedback: "En esta simulación, pierdes S/20. La amabilidad no reemplaza verificar la identidad." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "¿De dónde sale el dinero al usar una tarjeta de débito?", options: ["De un préstamo automático", "Del saldo disponible de tu cuenta", "De un premio del banco"], answer: 1, explanation: "El débito utiliza tu propio saldo disponible." },
          { type: "tf", prompt: "Debes compartir tu clave secreta para recibir un pago.", answer: false, explanation: "Nunca compartas claves ni códigos de verificación con otra persona." },
          { type: "fill", prompt: "La tarjeta que utiliza tu propio saldo es de ____.", hint: "Completa con: débito o crédito.", answer: "débito", explanation: "Débito significa usar dinero que ya tienes en la cuenta." },
          { type: "order", prompt: "Sigue el pago seguro del Cuy: empieza verificando a quién pagarás.", items: ["Verificar el destinatario", "Revisar el monto a enviar", "Confirmar sin revelar mi clave", "Comprobar el movimiento en mi cuenta"], explanation: "Revisar antes y comprobar después reduce errores y engaños." },
          { type: "match", prompt: "Une cada herramienta con su uso básico.", pairs: [["Cuenta de ahorro", "Guardar dinero en una entidad"], ["Tarjeta de débito", "Pagar con el saldo de la cuenta"], ["Billetera digital", "Facilitar pagos y transferencias digitales"]], explanation: "Son herramientas relacionadas, pero no cumplen exactamente la misma función." },
          { type: "classify", prompt: "¿Qué verificas y qué mantienes secreto?", groups: ["Dato a verificar", "Dato secreto"], items: [{ text: "Nombre del destinatario", group: 0 }, { text: "Monto del pago", group: 0 }, { text: "Clave de acceso", group: 1 }, { text: "Código de verificación de un solo uso", group: 1 }], explanation: "Revisa nombre y monto; protege tu clave y tus códigos." }
        ]
      }
    ] }]
  },
  "4": {
    label: "4.º de secundaria", level: "Descubre", icon: "compass",
    units: [{ id: "g4-u1", title: "Decisiones inteligentes", description: "Decide con cabeza. Cuida lo que construyes.", lessons: [
      {
        id: "g4-1", title: "Interés simple y compuesto", subtitle: "Haz los números a tu manera", icon: "chart", tool: "interest",
        theory: [
          { title: "¿Tus intereses también trabajan?", text: "El interés simple se calcula sobre el capital inicial. El compuesto suma intereses al capital y calcula los siguientes sobre ese nuevo monto. El período de la tasa debe coincidir con el cálculo.", meme: { leftTitle: "Interés simple", left: "El capital trabaja solito.", rightTitle: "Interés compuesto", right: "Los intereses se suman al equipo." } },
          { title: "Compara sin promesas mágicas", text: "Con S/100 al 10% anual por dos años: simple, S/120; compuesto anual, S/121. Son ejemplos hipotéticos, sin costos ni retiros, no rendimientos garantizados.", key: "En el interés compuesto, los intereses también pueden generar intereses." }
        ],
        scenario: { title: "El pequeño laboratorio del ahorro", intro: "Comparas S/100 a una tasa hipotética del 10% anual durante dos años, sin aportes, retiros ni costos.", initial: 100, steps: [
          { prompt: "¿Qué modalidad quieres simular primero? Ambas son válidas para comparar.", options: [
            { text: "Interés simple: solo sobre el capital inicial", delta: 20, good: true, feedback: "S/10 por año durante dos años: ganas S/20. Ahora prueba otros valores abajo." },
            { text: "Interés compuesto: capitalización anual", delta: 21, good: true, feedback: "Primer año: S/110. Segundo: S/121. El segundo interés se calculó sobre S/110." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "¿Cuánto interés simple genera S/100 al 10% anual en un año, sin costos?", options: ["S/1", "S/10", "S/110"], answer: 1, explanation: "S/100 por 0,10 por un año da S/10 de interés, no el monto total." },
          { type: "tf", prompt: "En el interés compuesto, los intereses acumulados pueden generar nuevos intereses.", answer: true, explanation: "Al capitalizarse, se incorporan a la base del siguiente cálculo." },
          { type: "fill", prompt: "El interés simple se calcula sobre el ____ inicial.", hint: "Completa con: capital o premio.", answer: "capital", explanation: "La base del interés simple es el capital inicial, sin sumar intereses previos." },
          { type: "order", prompt: "Ordena un cálculo de interés.", items: ["Identificar capital y plazo", "Convertir la tasa del período a decimal", "Aplicar la fórmula de la modalidad", "Comparar el monto final y los costos"], explanation: "Primero identificas los datos, calculas y luego comparas el resultado completo." },
          { type: "match", prompt: "Une cada pieza del cálculo.", pairs: [["Capital", "Dinero inicial del cálculo"], ["Tasa", "Porcentaje aplicado por período"], ["Interés", "Monto generado sobre una base"]], explanation: "Capital, tasa y tiempo determinan el interés según la modalidad." },
          { type: "classify", prompt: "Sin costos ni retiros, ¿qué modalidad describe cada frase?", groups: ["Simple", "Compuesto anual"], items: [{ text: "No incorpora intereses a la base", group: 0 }, { text: "S/100 al 10% por 2 años termina en S/120", group: 0 }, { text: "Suma los intereses al capital cada año", group: 1 }, { text: "S/100 al 10% por 2 años termina en S/121", group: 1 }], explanation: "La diferencia aparece cuando los intereses se incorporan al capital." }
        ]
      },
      {
        id: "g4-2", title: "Crédito y deudas", subtitle: "Un préstamo también es un compromiso", icon: "wallet",
        theory: [
          { title: "Dinero prestado no es dinero regalado", text: "Un crédito se devuelve, normalmente con costos. A veces se dice “deuda buena” si financia una meta útil y es pagable; “deuda mala” si responde a impulsos o no puedes pagarla. Ninguna etiqueta elimina el riesgo.", meme: { leftTitle: "Yo al recibir crédito", left: "¡Mi saldo subió de nivel!", rightTitle: "Mi presupuesto", right: "Y tu compromiso también, causa." } },
          { title: "Mira la película completa", text: "Compara costo total, cuotas, plazo y condiciones. La TCEA ayuda a comparar el costo anual del crédito. Una cuota pequeña no significa necesariamente un crédito barato.", key: "Antes de endeudarme, compruebo cuánto pagaré y si me alcanza." }
        ],
        scenario: { title: "El puesto de la kermés tiene una deuda", intro: "Tu equipo dispone de S/80. Debe devolver S/30 de un préstamo usado para los materiales.", initial: 80, steps: [
          { prompt: "¿Qué haces antes de una nueva compra?", options: [
            { text: "Separar S/30 para el pago acordado", delta: -30, good: true, feedback: "¡Responsable! Cumples un compromiso que ya existía antes de gastar más." },
            { text: "Comprar audífonos de S/60 con el dinero del equipo", delta: -60, good: false, feedback: "Quedan menos soles de los que debes. Ese gasto personal pone en riesgo el pago." }
          ] },
          { prompt: "Para los próximos días, ¿qué decisión cuida más el presupuesto?", options: [
            { text: "Reservar S/10 para un imprevisto del puesto", delta: -10, good: true, feedback: "Un pequeño colchón ayuda a evitar nuevos préstamos por cualquier problema." },
            { text: "Asumir una nueva cuota de S/15 sin hacer cuentas", delta: -15, good: false, feedback: "Otra cuota reduce tu margen. Primero revisa todas tus obligaciones." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Antes de aceptar un crédito, ¿qué revisas?", options: ["Solo si te entregan rápido el dinero", "El costo total, las condiciones y tu capacidad de pago", "Solo el color de la tarjeta"], answer: 1, explanation: "Un crédito requiere conocer el costo completo y comprobar que podrás pagarlo." },
          { type: "tf", prompt: "Toda deuda llamada inversión se paga sola y sin riesgo.", answer: false, explanation: "Un negocio puede vender menos de lo esperado; la deuda sigue siendo un compromiso." },
          { type: "fill", prompt: "El dinero que recibes prestado bajo condiciones es un ____.", hint: "Completa con: crédito o regalo.", answer: "crédito", explanation: "El crédito implica devolver lo recibido según las condiciones acordadas." },
          { type: "order", prompt: "Sigue nuestro método: capacidad de pago, ofertas, contrato y decisión.", items: ["Calcular cuánto puedo pagar", "Comparar el costo total de las ofertas", "Leer las condiciones del contrato", "Aceptar solo si entiendo y puedo cumplir"], explanation: "En este método, el presupuesto va antes de comparar, y comprender el contrato va antes de aceptar." },
          { type: "match", prompt: "Relaciona estos términos.", pairs: [["Capital prestado", "Monto recibido en el préstamo"], ["Cuota", "Pago programado según el acuerdo"], ["TCEA", "Indicador anual para comparar el costo del crédito"]], explanation: "El monto recibido no siempre equivale al total que terminarás pagando." },
          { type: "classify", prompt: "¿Es una decisión prudente o una señal de riesgo?", groups: ["Decisión prudente", "Señal de riesgo"], items: [{ text: "Verificar que las cuotas caben en el presupuesto", group: 0 }, { text: "Leer el contrato antes de aceptar", group: 0 }, { text: "Pedir otro préstamo sin un plan para pagar", group: 1 }, { text: "Firmar sin conocer el costo total", group: 1 }], explanation: "Informarte y planificar ayuda; sumar compromisos a ciegas aumenta el riesgo." }
        ]
      },
      {
        id: "g4-3", title: "Misión antifraude", subtitle: "Que no te cuenten un cuy", icon: "shield",
        theory: [
          { title: "Ese premio viene con una trampa", text: "El phishing usa mensajes o páginas falsas para robar datos. La suplantación imita a una persona o entidad. Desconfía de urgencias, enlaces raros y pagos para liberar premios.", meme: { leftTitle: "El mensaje", left: "¡Ganaste! Paga para cobrar.", rightTitle: "El Cuy detective", right: "Si gané, ¿por qué tengo que pagar?" } },
          { title: "Pausa, verifica y protege", text: "No abras el enlace ni compartas códigos. Contacta al supuesto remitente por un canal oficial que tú busques. Bloquea y reporta. Si entregaste datos, avisa de inmediato a tu entidad.", key: "La urgencia del estafador no tiene que ser mi apuro." }
        ],
        scenario: { title: "Dos mensajes, una misión", intro: "Tienes S/60 en tu saldo simulado. Te llega un mensaje de un número desconocido: dice que ganaste un premio.", initial: 60, steps: [
          { prompt: "Te piden S/10 para activar el premio y te mandan un enlace. ¿Qué haces?", options: [
            { text: "No abrirlo y verificar por un canal oficial", delta: 0, good: true, feedback: "¡Radar encendido! Un premio inesperado con pago previo es una señal de alerta." },
            { text: "Pagar S/10 porque el premio vence hoy", delta: -10, good: false, feedback: "En esta simulación, el premio era falso. La urgencia buscaba impedir que pensaras." }
          ] },
          { prompt: "Otro número dice ser tu primo y pide S/20 urgente. ¿Cómo respondes?", options: [
            { text: "Llamar a mi primo al número que ya conozco", delta: 0, good: true, feedback: "Verificas por una vía independiente. Una foto conocida no prueba quién escribe." },
            { text: "Transferir S/20 solo porque tiene su foto", delta: -20, good: false, feedback: "En esta simulación, alguien suplantó a tu primo. Verifica antes de transferir." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Un mensaje te pide tu clave y amenaza con bloquear tu cuenta. ¿Qué haces?", options: ["Enviar la clave para evitar el bloqueo", "No compartirla y contactar al canal oficial", "Reenviar el enlace a tus amigos"], answer: 1, explanation: "Verificar por un canal independiente protege tus datos y tu dinero." },
          { type: "tf", prompt: "El candado de una página garantiza que la empresa detrás es legítima.", answer: false, explanation: "El candado indica una conexión cifrada; una página fraudulenta también puede tenerlo." },
          { type: "fill", prompt: "El engaño con mensajes o páginas falsas para robar datos se llama ____.", hint: "Completa con: phishing o ahorro.", answer: "phishing", explanation: "El phishing intenta que entregues información creyendo que hablas con alguien legítimo." },
          { type: "order", prompt: "Ordena tu respuesta a un mensaje sospechoso.", items: ["Detenerme antes de actuar", "Evitar abrir enlaces o compartir datos", "Verificar por un canal oficial independiente", "Bloquear y reportar el mensaje fraudulento"], explanation: "La pausa permite verificar sin exponerte; después puedes bloquear y reportar." },
          { type: "match", prompt: "Une cada riesgo con su descripción.", pairs: [["Phishing", "Engaño con mensajes o páginas para robar datos"], ["Suplantación", "Hacerse pasar por otra persona o entidad"], ["Código de un solo uso", "Verificación temporal que debes mantener privada"]], explanation: "Reconocer la técnica ayuda a proteger los datos que el atacante busca." },
          { type: "classify", prompt: "Entrena tu radar antifraude.", groups: ["Señal de estafa", "Buena práctica"], items: [{ text: "Te presionan a actuar en secreto", group: 0 }, { text: "Te cobran para activar un premio inesperado", group: 0 }, { text: "Llamas al número oficial que tú verificaste", group: 1 }, { text: "Revisas los movimientos de tu cuenta", group: 1 }], explanation: "La presión y los premios con pago alertan; verificar y revisar te protege." }
        ]
      },
      {
        id: "g4-4", title: "Consumo responsable", subtitle: "Tú decides, no la oferta", icon: "compass",
        theory: [
          { title: "Oferta no significa obligación", text: "Comprar por impulso es decidir sin pensar en tu necesidad o presupuesto. Un descuento no es ahorro si compras algo que no necesitabas. Pausar ayuda a elegir mejor.", meme: { leftTitle: "La oferta", left: "¡Última oportunidad!", rightTitle: "Mi Cuy interior", right: "Mi presupuesto también tiene opinión." } },
          { title: "Mira el precio y lo que dura", text: "Compara el precio final, la utilidad y la duración. Reparar, reutilizar o llevar tu propia bolsa también puede cuidar tu dinero y reducir residuos.", key: "La mejor compra es la que tiene sentido para mí y mi presupuesto." }
        ],
        scenario: { title: "Una compra antes de volver a casa", intro: "Tienes S/50 y planeaste comprar un libro que necesitas para el cole. Compara antes de pagar.", initial: 50, steps: [
          { prompt: "Encuentras el mismo libro en dos puestos. ¿Qué eliges?", options: [
            { text: "Verificar su estado y comprarlo a S/20", delta: -20, good: true, feedback: "Comparaste el precio final y revisaste el producto. ¡Compra con sentido!" },
            { text: "Pagar S/35 donde dice 'ofertón', sin comparar", delta: -35, good: false, feedback: "La palabra oferta no garantiza el mejor precio. Comparar te habría dejado más saldo." }
          ] },
          { prompt: "Tienes una mochila con espacio. Te ofrecen una bolsa especial por S/10.", options: [
            { text: "Guardar el libro en mi mochila", delta: 0, good: true, feedback: "Usaste lo que ya tenías. Cuidas tus soles y evitas un residuo innecesario." },
            { text: "Pagar S/10 por la bolsa solo porque está de moda", delta: -10, good: false, feedback: "La bolsa puede gustarte, pero no era necesaria. Dale una pausa al impulso." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Ves una oferta de algo que no planeabas comprar. ¿Cuál es el mejor primer paso?", options: ["Comprar antes de que se agote", "Pausar y revisar necesidad y presupuesto", "Pedir dinero prestado de inmediato"], answer: 1, explanation: "Una pausa permite decidir por tus prioridades y no por la presión de la oferta." },
          { type: "tf", prompt: "Todo descuento representa un ahorro, aunque no necesites el producto.", answer: false, explanation: "Gastar en algo innecesario sigue reduciendo tu dinero, incluso con descuento." },
          { type: "fill", prompt: "Antes de comprar, revisa si el gasto cabe en tu ____.", hint: "Completa con: presupuesto o antojo.", answer: "presupuesto", explanation: "El presupuesto muestra si puedes comprar sin dejar otras prioridades." },
          { type: "order", prompt: "Ordena este método de compra: necesidad, presupuesto, comparación y decisión.", items: ["Preguntarme si lo necesito", "Revisar mi presupuesto", "Comparar el precio final y la calidad", "Decidir sin apuro"], explanation: "La necesidad y tu plan van antes de buscar ofertas y tomar la decisión." },
          { type: "match", prompt: "Une cada concepto con su significado.", pairs: [["Compra impulsiva", "Compra sin evaluar el plan ni la necesidad"], ["Durabilidad", "Tiempo durante el que un producto puede servir"], ["Precio final", "Total a pagar, incluidos cargos aplicables"]], explanation: "No mires solo la etiqueta: evalúa utilidad, duración y costo completo." },
          { type: "classify", prompt: "¿La decisión fue planificada o impulsiva?", groups: ["Planificada", "Impulsiva"], items: [{ text: "Reemplazar zapatos rotos con dinero presupuestado", group: 0 }, { text: "Comprar el libro que anotaste en tu plan", group: 0 }, { text: "Llevar audífonos que no necesitas por una tendencia", group: 1 }, { text: "Comprar por un contador sin revisar nada", group: 1 }], explanation: "Una compra planificada responde a una necesidad y a recursos previstos." }
        ]
      }
    ] }]
  },
  "5": {
    label: "5.º de secundaria", level: "Despega", icon: "rocket",
    units: [{ id: "g5-u1", title: "Futuro y emprendimiento", description: "Convierte tus ideas de hoy en posibilidades para mañana.", lessons: [
      {
        id: "g5-1", title: "Invertir: riesgo y rendimiento", subtitle: "Crecer sin creer en milagros", icon: "chart",
        theory: [
          { title: "Invertir no es una varita mágica", text: "Invertir busca un rendimiento, pero implica riesgo: puedes perder dinero. Define tu meta, plazo y cuánto riesgo entiendes. No uses dinero necesario para gastos básicos o emergencias.", meme: { leftTitle: "Promesa sospechosa", left: "¡Duplica tus soles sin riesgo!", rightTitle: "Cuy con criterio", right: "Mi detector de cuentos está sonando." } },
          { title: "No pongas todo en una sola canasta", text: "Diversificar reparte tu exposición, pero no elimina el riesgo. Compara costos, liquidez y condiciones. Verifica la entidad y desconfía de rendimientos altos garantizados.", key: "Si no entiendo el riesgo, primero aprendo y verifico." }
        ],
        scenario: { title: "Tu primera simulación de inversión", intro: "Ya separaste necesidades y emergencias. Usas S/80 ficticios para aprender. No es una recomendación de inversión real.", initial: 80, steps: [
          { prompt: "Te ofrecen 'duplicar tu dinero sin riesgo' pagando S/20 de entrada.", options: [
            { text: "No pagar y verificar la entidad y los riesgos", delta: 0, good: true, feedback: "¡Bien leído! Un rendimiento alto garantizado sin riesgo es una señal de alerta." },
            { text: "Pagar S/20 sin comprobar nada", delta: -20, good: false, feedback: "La promesa resultó falsa en esta simulación. Ningún entusiasmo reemplaza verificar." }
          ] },
          { prompt: "En otro ejercicio, un valor simulado baja. ¿Qué haces antes de decidir?", options: [
            { text: "Revisar la meta, el plazo y el riesgo", delta: 0, good: true, feedback: "Decidir con información es distinto de actuar por presión. Eso no elimina el riesgo." },
            { text: "Vender por presión sin revisar; asumir S/12 de pérdida simulada", delta: -12, good: false, feedback: "La pérdida quedó registrada. El problema es decidir a ciegas, no que vender sea siempre malo." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Una oferta promete una ganancia enorme, garantizada y sin riesgo. ¿Qué corresponde?", options: ["Creer porque suena profesional", "Desconfiar y verificar la entidad y condiciones", "Enviar primero dinero para no perder el cupo"], answer: 1, explanation: "Las promesas extraordinarias sin riesgo merecen especial desconfianza y verificación." },
          { type: "tf", prompt: "Diversificar elimina por completo la posibilidad de perder dinero.", answer: false, explanation: "Diversificar reparte la exposición, pero no elimina todos los riesgos." },
          { type: "fill", prompt: "Repartir la exposición entre distintas alternativas es ____.", hint: "Completa con: diversificar o garantizar.", answer: "diversificar", explanation: "Diversificar evita depender de una sola alternativa, sin prometer ganancias." },
          { type: "order", prompt: "Sigue el método del Cuy: meta, base protegida, riesgos y comparación.", items: ["Definir mi meta y plazo", "Separar necesidades y fondo de emergencia", "Comprender riesgos, liquidez y costos", "Comparar alternativas y verificar la entidad"], explanation: "Una meta y una base protegida van antes de evaluar opciones con información." },
          { type: "match", prompt: "Une los conceptos de inversión.", pairs: [["Riesgo", "Posibilidad de que el resultado sea desfavorable"], ["Rendimiento", "Resultado de una inversión: puede ser ganancia o pérdida"], ["Liquidez", "Facilidad para convertir algo en dinero disponible"]], explanation: "El rendimiento no basta: importa el riesgo y cuándo podrás disponer del dinero." },
          { type: "classify", prompt: "Distingue riesgos reales de promesas engañosas.", groups: ["Riesgo reconocido", "Promesa engañosa"], items: [{ text: "El valor puede bajar", group: 0 }, { text: "El rendimiento no está garantizado", group: 0 }, { text: "Duplica tu dinero sin ningún riesgo", group: 1 }, { text: "Ganancia enorme y segura en 24 horas", group: 1 }], explanation: "Reconocer incertidumbre es honesto; prometer ganancias enormes sin riesgo es una alerta." }
        ]
      },
      {
        id: "g5-2", title: "Seguros y pensiones", subtitle: "Cuidarte hoy y pensar en mañana", icon: "shield",
        theory: [
          { title: "Tu futuro también necesita un plan B", text: "Un seguro protege frente a riesgos definidos en un contrato. Pagas una prima y debes conocer cobertura, exclusiones y condiciones. No cubre automáticamente cualquier pérdida.", meme: { leftTitle: "Expectativa", left: "Mi seguro cubre hasta perder la tarea.", rightTitle: "Realidad", right: "Primero leamos qué cubre, causa." } },
          { title: "Dos propósitos diferentes", text: "Una pensión busca dar ingresos en la jubilación según el sistema y sus reglas. Conocer aportes y condiciones ayuda a planificar. Un seguro y una pensión no son lo mismo.", key: "Entender cómo me protejo hoy también cuida mi mañana." }
        ],
        scenario: { title: "Decisiones para proteger el puesto", intro: "En una simulación familiar, tienes S/70 para evaluar protección y otros gastos. Los montos no son cotizaciones reales.", initial: 70, steps: [
          { prompt: "Ya verificaste un seguro simulado que cubre un riesgo importante del puesto. ¿Qué priorizas?", options: [
            { text: "Destinar S/20 a la prima prevista", delta: -20, good: true, feedback: "La protección tiene un costo y condiciones. Elegiste después de revisar la cobertura." },
            { text: "Gastar S/40 en un adorno y no revisar la protección", delta: -40, good: false, feedback: "El adorno no protege ante riesgos. Conviene evaluar lo importante antes del gusto." }
          ] },
          { prompt: "Un contacto desconocido ofrece ampliar todo por S/10 sin contrato.", options: [
            { text: "Consultar al canal oficial antes de pagar", delta: 0, good: true, feedback: "¡Eso! Las coberturas se comprueban en condiciones verificables, no en una promesa." },
            { text: "Pagar S/10 sin pedir condiciones", delta: -10, good: false, feedback: "En esta simulación, la oferta no era válida. Verifica a quién pagas y qué estás contratando." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "¿Qué hace un seguro, de manera general?", options: ["Cubre todos los problemas sin condiciones", "Protege frente a riesgos definidos en un contrato", "Garantiza que nunca tendrás un accidente"], answer: 1, explanation: "La protección depende de coberturas, exclusiones y condiciones del contrato." },
          { type: "tf", prompt: "Todo seguro cubre cualquier pérdida sin que revises el contrato.", answer: false, explanation: "Cada seguro tiene límites y exclusiones que debes conocer." },
          { type: "fill", prompt: "El pago por la protección de un seguro se llama ____.", hint: "Completa con: prima o propina.", answer: "prima", explanation: "La prima es el precio del seguro según las condiciones acordadas." },
          { type: "order", prompt: "Ordena la evaluación de un seguro.", items: ["Identificar el riesgo que quiero cubrir", "Comparar coberturas y exclusiones", "Verificar costos, condiciones y entidad", "Elegir una opción que entiendo y puedo pagar"], explanation: "El riesgo define qué buscar; luego comparas y verificas antes de contratar." },
          { type: "match", prompt: "Une cada término con su significado.", pairs: [["Prima", "Pago por la protección del seguro"], ["Cobertura", "Riesgos protegidos según el contrato"], ["Pensión", "Ingreso orientado a la jubilación según sus reglas"]], explanation: "Prima y cobertura pertenecen al seguro; la pensión tiene un objetivo de largo plazo." },
          { type: "classify", prompt: "¿Qué propósito tiene cada acción?", groups: ["Protección ante riesgos", "Preparación para jubilación"], items: [{ text: "Revisar un seguro contra un riesgo", group: 0 }, { text: "Conocer exclusiones de una póliza", group: 0 }, { text: "Informarte sobre aportes para el retiro", group: 1 }, { text: "Revisar tu registro de aportes previsionales", group: 1 }], explanation: "Seguros y pensiones atienden necesidades diferentes de protección y planificación." }
        ]
      },
      {
        id: "g5-3", title: "Impuestos y formalización", subtitle: "Un negocio que hace las cosas bien", icon: "receipt",
        theory: [
          { title: "Tu emprendimiento entra a la cancha", text: "Formalizar implica cumplir requisitos según tu actividad. La SUNAT orienta sobre RUC, comprobantes y obligaciones tributarias. Los impuestos contribuyen a financiar servicios públicos.", meme: { leftTitle: "Mi negocio soñador", left: "Solo vendo y listo, ¿no?", rightTitle: "Mi negocio preparado", right: "Registro, comprobantes y cuentas claras." } },
          { title: "Pregunta antes de improvisar", text: "Las obligaciones dependen de tu actividad y régimen. No todos los negocios tienen las mismas reglas. Si eres menor, consulta los requisitos y el acompañamiento de una persona adulta responsable.", key: "Formalizar también es informarme y cumplir lo que me corresponde." }
        ],
        scenario: { title: "Las cuentas del emprendimiento local", intro: "Tu equipo recibió S/90 por ventas en una actividad escolar. Debe registrar ingresos y separar lo necesario para seguir produciendo.", initial: 90, steps: [
          { prompt: "Los materiales de la siguiente producción cuestan S/50. ¿Qué haces?", options: [
            { text: "Registrar la venta y separar S/50 para materiales", delta: -50, good: true, feedback: "Una venta no es toda ganancia. Registrar y separar costos ordena tu negocio." },
            { text: "Gastar S/60 en gustos sin registrar la venta", delta: -60, good: false, feedback: "Ahora no alcanza para los materiales previstos. Las cuentas claras evitan sorpresas." }
          ] },
          { prompt: "Quieres entender qué requisitos aplican a un negocio real. ¿Qué prefieres?", options: [
            { text: "Consultar información oficial con un adulto y reservar S/10 para gastos previstos", delta: -10, good: true, feedback: "Reservar no significa pagar un impuesto fijo: los requisitos y montos dependen del caso." },
            { text: "Pagar S/20 a un desconocido que promete evitar todas las obligaciones", delta: -20, good: false, feedback: "En esta simulación, la promesa era falsa. Nadie debería reemplazar la información oficial con un atajo dudoso." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "¿Dónde verificas las obligaciones tributarias que corresponden a un negocio?", options: ["En una cadena anónima de mensajes", "En información oficial de SUNAT y orientación pertinente", "Solo preguntando a alguien que vende algo distinto"], answer: 1, explanation: "Las fuentes oficiales permiten revisar requisitos según actividad y régimen." },
          { type: "tf", prompt: "No registrar tus ventas hace que desaparezcan las obligaciones que te correspondan.", answer: false, explanation: "No llevar registros no elimina las obligaciones aplicables y dificulta conocer tus cuentas." },
          { type: "fill", prompt: "El Registro Único de Contribuyentes se conoce como ____.", hint: "Escribe la sigla: RUC o PIN.", answer: "RUC", explanation: "RUC identifica el Registro Único de Contribuyentes." },
          { type: "order", prompt: "Ordena la preparación de un negocio formal.", items: ["Definir la actividad que realizaré", "Consultar requisitos oficiales y acompañamiento adulto si corresponde", "Realizar los registros y trámites aplicables", "Emitir comprobantes y cumplir las obligaciones correspondientes"], explanation: "Primero defines y consultas; luego formalizas y cumples de manera continua." },
          { type: "match", prompt: "Une los conceptos básicos.", pairs: [["RUC", "Registro Único de Contribuyentes"], ["Comprobante", "Documento que respalda una operación"], ["Impuesto", "Tributo que contribuye al financiamiento público"]], explanation: "La identificación, los comprobantes y los tributos cumplen funciones distintas." },
          { type: "classify", prompt: "¿Qué práctica cuida la formalidad?", groups: ["Práctica formal", "Práctica riesgosa"], items: [{ text: "Emitir el comprobante que corresponde", group: 0 }, { text: "Conservar registros de compras y ventas", group: 0 }, { text: "Ocultar ventas para evitar obligaciones", group: 1 }, { text: "Pagar a un tramitador desconocido sin verificar", group: 1 }], explanation: "Los registros y comprobantes dan claridad; ocultar o pagar sin verificar agrega riesgos." }
        ]
      },
      {
        id: "g5-4", title: "Mi mini empresa", subtitle: "De la idea a tus primeros números", icon: "rocket", tool: "business",
        theory: [
          { title: "Vender bastante no es ganar bastante", text: "Ingresos es precio por unidades vendidas. Ganancia es ingresos menos costos. Los costos fijos no cambian por cada unidad; los variables crecen al producir más, dentro del escenario analizado.", meme: { leftTitle: "Yo viendo las ventas", left: "¡Todo es ganancia!", rightTitle: "Los ingredientes", right: "Oe, nosotros también costamos." } },
          { title: "Encuentra tu punto de equilibrio", text: "El punto de equilibrio cubre costos sin ganar ni perder. Si el precio supera el costo variable unitario, divide costos fijos entre esa diferencia y redondea unidades hacia arriba.", key: "Mi negocio necesita cubrir sus costos, no solo hacer ventas." }
        ],
        scenario: { title: "Tu puesto, tus decisiones", intro: "Tienes S/100 para preparar un puesto de refrescos en la kermés. Después podrás probar tu propio producto en el simulador.", initial: 100, steps: [
          { prompt: "¿Cómo comienzas a usar tu presupuesto?", options: [
            { text: "Comprar ingredientes necesarios por S/40", delta: -40, good: true, feedback: "Primero aseguras lo necesario para producir. Anota ese costo en tus cuentas." },
            { text: "Comprar empaques de lujo por S/70 sin calcular costos", delta: -70, good: false, feedback: "El empaque no reemplaza los ingredientes. Un costo alto puede comerse el margen." }
          ] },
          { prompt: "Debes llevar el pedido al colegio. ¿Qué decides?", options: [
            { text: "Separar S/10 para el traslado en mototaxi", delta: -10, good: true, feedback: "Incluiste el traslado en tus costos. La ganancia se calcula con todos los gastos del escenario." },
            { text: "Gastar S/20 en promoción sin planear el traslado", delta: -20, good: false, feedback: "Promocionar puede servir, pero sin entrega no hay venta cumplida. Ordena tus prioridades." }
          ] }
        ] },
        exercises: [
          { type: "choice", prompt: "Costo fijo S/12, costo variable S/2 por unidad y precio S/5. ¿Cuántas unidades cubren los costos?", options: ["2 unidades", "4 unidades", "6 unidades"], answer: 1, explanation: "Cada unidad aporta S/3: S/12 dividido entre S/3 da cuatro unidades." },
          { type: "tf", prompt: "Los ingresos de las ventas son siempre iguales a la ganancia.", answer: false, explanation: "Debes restar todos los costos del escenario para conocer la ganancia." },
          { type: "fill", prompt: "Si los ingresos superan los costos, la diferencia positiva es la ____.", hint: "Completa con: ganancia o deuda.", answer: "ganancia", explanation: "La ganancia es lo que queda después de cubrir los costos." },
          { type: "order", prompt: "Ordena el lanzamiento de una mini empresa.", items: ["Preguntar qué necesitan mis posibles clientes", "Calcular los costos del producto", "Fijar un precio y evaluar si es viable", "Registrar ventas y evaluar resultados"], explanation: "Empiezas con la necesidad del cliente, haces números y luego mides el resultado." },
          { type: "match", prompt: "Une las piezas de tu negocio.", pairs: [["Costo fijo", "No cambia por cada unidad dentro del escenario"], ["Costo variable", "Aumenta con cada unidad producida"], ["Punto de equilibrio", "Nivel donde ingresos cubren los costos"]], explanation: "Separar costos permite calcular cuánto necesitas vender para cubrirlos." },
          { type: "classify", prompt: "Para una sola kermés, clasifica estos costos.", groups: ["Costo fijo", "Variable por unidad"], items: [{ text: "Alquiler del puesto por toda la feria", group: 0 }, { text: "Un solo letrero para el puesto", group: 0 }, { text: "Fruta usada en cada vaso", group: 1 }, { text: "El vaso de cada refresco vendido", group: 1 }], explanation: "Puesto y letrero no aumentan por vaso; la fruta y el envase sí." }
        ]
      }
    ] }]
  }
};
