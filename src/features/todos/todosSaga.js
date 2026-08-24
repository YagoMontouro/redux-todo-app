// src/features/todos/todosSaga.js
import { takeEvery, delay } from 'redux-saga/effects';
import { addTodo } from './todosSlice';

/* Worker: o que fazer quando addTodo acontecer */
function* logAddTodo(action) {
  console.log(
    `%c[SAGA] Tarefa adicionada com sucesso: "${action.payload}"`,
    'color: green; font-weight: bold;'
  );

  yield delay(500); // pausa 0,5s (efeito colateral controlado)
  console.log('[SAGA] Log finalizado.');
}

/* Watcher: fica ouvindo a action addTodo */
export function* watchAddTodo() {
  yield takeEvery(addTodo.type, logAddTodo);
}

// Erro comum: o import correto é 'redux-saga/effects'.
// Se você escrever 'redux-saga' sozinho aqui, o takeEvery vem undefined.
