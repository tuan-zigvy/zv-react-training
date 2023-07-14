import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStatusRedux } from '../../util/enum';
import { IQueryTodo, ITodoRes } from '../../util/interface';

interface ITodoRedux {
  status: EStatusRedux;
  todos: ITodoRes[];
  errorMessageCreate: string;
  errorMessage: string;
}
const initialState: ITodoRedux = {
  status: EStatusRedux.idle,
  todos: [],
  errorMessageCreate: '',
  errorMessage: '',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getTodosPending: (state, _action: PayloadAction<IQueryTodo | undefined>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    createTodoPending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    updateTodoPending: (state, _action: PayloadAction<ITodoRes>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },
    deleteTodoPending: (state, _action: PayloadAction<string>) => {
      state.status = EStatusRedux.pending;
      state.errorMessage = '';
    },

    getTodosSuccess: (state, action: PayloadAction<ITodoRes[]>) => {
      state.status = EStatusRedux.succeeded;
      state.todos = action.payload;
    },
    createTodoSuccess: (state, action: PayloadAction<ITodoRes>) => {
      state.status = EStatusRedux.succeeded;
      state.todos.push(action.payload);
    },
    updateTodoSuccess: (state, action: PayloadAction<ITodoRes>) => {
      state.status = EStatusRedux.succeeded;
      const updateTodo = action.payload;
      state.todos.forEach((todo, index) => {
        if (todo.id === updateTodo.id) {
          state.todos[index] = updateTodo;
        }
      });
    },
    deleteTodoSuccess: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.succeeded;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    getTodosError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    createTodoError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    updateTodoError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
    deleteTodoError: (state, action: PayloadAction<string>) => {
      state.status = EStatusRedux.error;
      state.errorMessage = action.payload || 'Something wrong';
    },
  },
});

export const todoAction = todoSlice.actions;

export default todoSlice.reducer;
