// src/App.jsx
import { Provider } from 'react-redux';
import store from './store/store';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}
