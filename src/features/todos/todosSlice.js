// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* ------------------------------------------------------------------
   THUNK: fetchTodos
   Simula a busca de tarefas numa API externa. O setTimeout dentro da
   Promise cria um atraso de 1,5s de propósito, para que o aluno
   consiga VER a mensagem "Carregando...".
------------------------------------------------------------------- */
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos', // nome único da action
  async () => {
    const dadosFalsos = [
      { id: 1001, title: 'Estudar Redux Toolkit', status: 'pendente' },
      { id: 1002, title: 'Praticar thunks', status: 'concluida' },
      { id: 1003, title: 'Entender sagas', status: 'pendente' },
    ];

    // "await" espera a Promise terminar antes de continuar
    const resposta = await new Promise((resolve) => {
      setTimeout(() => resolve(dadosFalsos), 1500);
    });

    return resposta; // vira o "action.payload" no fulfilled
  }
);

/* ------------------------------------------------------------------
   SLICE: estado inicial + reducers síncronos
------------------------------------------------------------------- */
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    list: [],       // array de tarefas
    loading: false, // controla o "Carregando..."
    error: null,    // guarda mensagem de erro
  },
  reducers: {
    // ACTION 1: adicionar tarefa
    addTodo: (state, action) => {
      state.list.push({
        id: Date.now(),
        title: action.payload,
        status: 'pendente',
      });
    },

    // ACTION 2: remover tarefa pelo ID
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },

    // ACTION 3 (bônus): alternar status
    toggleTodo: (state, action) => {
      const todo = state.list.find((t) => t.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'pendente' ? 'concluida' : 'pendente';
      }
    },
  },

  /* extraReducers: reage às fases automáticas do thunk */
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;

// Por que posso usar state.list.push? O RTK usa a biblioteca Immer por baixo:
// você "parece" mutar o estado, mas ele gera uma cópia nova automaticamente.
// Isso só vale DENTRO de um slice.
