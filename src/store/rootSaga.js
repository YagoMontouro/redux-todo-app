// src/store/rootSaga.js
import { all } from 'redux-saga/effects';
import { watchAddTodo } from '../features/todos/todosSaga';

export default function* rootSaga() {
  yield all([
    watchAddTodo(), // futuras sagas entram aqui
  ]);
}
