// Arranque de la aplicación
'use strict';

state = loadState();
teacher = loadTeacher();
view = state.grade ? 'route' : 'welcome';
validateContent();
renderApp();
