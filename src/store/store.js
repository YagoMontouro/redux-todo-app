// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import todosReducer from '../features/todos/todosSlice';
import rootSaga from './rootSaga';

// 1) cria o middleware do saga
const sagaMiddleware = createSagaMiddleware();

// 2) monta o store
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // getDefaultMiddleware JÁ inclui o redux-thunk.
  // Só precisamos ACRESCENTAR o saga.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// 3) liga o saga (SEMPRE depois de criar o store)
sagaMiddleware.run(rootSaga);

export default store;
