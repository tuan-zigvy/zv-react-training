import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchGetTodos,
  fetchUpdateTodo,
} from '../../app/apiTodo';
import { IQueryTodo, ITodo, ITodoRes } from '../../util/interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { todoAction } from '../todo/todoSlice';

function* handleGetToDos(action: PayloadAction<IQueryTodo>) {
  try {
    const data: ITodoRes[] = yield call(fetchGetTodos, action.payload);

    if (data) {
      yield put(todoAction.getTodosSuccess(data));
    }
  } catch (error: any) {
    yield put(todoAction.getTodosError(error.message));
  }
}

function* handleCreateTodo(action: PayloadAction<string>) {
  try {
    const data: ITodoRes = yield call(fetchCreateTodo, action.payload);

    if (data) {
      yield put(todoAction.createTodoSuccess(data));
    }
  } catch (error: any) {
    yield put(todoAction.createTodoError(error.message));
  }
}

function* handleUpdateTodo(action: PayloadAction<ITodoRes>) {
  try {
    const data: string = yield call(fetchUpdateTodo, action.payload);

    if (data) {
      yield put(todoAction.updateTodoSuccess(action.payload));
    }
  } catch (error: any) {
    yield put(todoAction.updateTodoError(error.message));
  }
}

function* handleDeleteTodo(action: PayloadAction<string>) {
  try {
    const data: string = yield call(fetchDeleteTodo, action.payload);

    if (data) {
      yield put(todoAction.deleteTodoSuccess(action.payload));
    }
  } catch (error: any) {
    yield put(todoAction.deleteTodoError(error.message));
  }
}

export default function* todoSaga() {
  yield takeLatest(todoAction.getTodosPending.toString(), handleGetToDos);
  yield takeLatest(todoAction.createTodoPending.toString(), handleCreateTodo);
  yield takeLatest(todoAction.updateTodoPending.toString(), handleUpdateTodo);
  yield takeLatest(todoAction.deleteTodoPending.toString(), handleDeleteTodo);
}
