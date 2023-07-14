import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchCreateTask,
  fetchCreateTasks,
  fetchDeleteTask,
  fetchGetTasks,
  fetchUpdateTask,
} from '../../app/apiTask';
import { IQueryTask, ITaskRes } from '../../util/interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { taskAction } from '../task/taskSlice';

function* handleGetTasks(action: PayloadAction<IQueryTask>) {
  try {
    const data: ITaskRes[] = yield call(fetchGetTasks, action.payload);

    if (data) {
      yield put(taskAction.getTasksSuccess(data));
    }
  } catch (error: any) {
    yield put(taskAction.getTasksError(error.message));
  }
}

function* handleCreateTask(action: PayloadAction<string>) {
  try {
    const data: ITaskRes = yield call(fetchCreateTask, action.payload);

    if (data) {
      yield put(taskAction.createTaskSuccess(data));
    }
  } catch (error: any) {
    yield put(taskAction.createTaskError(error.message));
  }
}

function* handleUpdateTask(action: PayloadAction<ITaskRes>) {
  try {
    const data: ITaskRes = yield call(fetchUpdateTask, action.payload);
    if (data) {
      yield put(taskAction.updateTaskSuccess(data));
    }
  } catch (error: any) {
    yield put(taskAction.updateTaskError(error.message));
  }
}

function* handleDeleteTask(action: PayloadAction<string>) {
  try {
    const data: string = yield call(fetchDeleteTask, action.payload);

    if (data) {
      yield put(taskAction.deleteTaskSuccess(action.payload));
    }
  } catch (error: any) {
    yield put(taskAction.deleteTaskError(error.message));
  }
}

function* handleCreateTasks(action: PayloadAction<string[]>) {
  try {
    const data: ITaskRes[] = yield call(fetchCreateTasks, action.payload);

    if (data) {
      yield put(taskAction.createTasksSuccess(data));
    }
  } catch (error: any) {
    yield put(taskAction.createTasksError(error.message));
  }
}

export default function* taskSaga() {
  yield takeLatest(taskAction.getTasksPending.toString(), handleGetTasks);
  yield takeLatest(taskAction.createTaskPending.toString(), handleCreateTask);
  yield takeLatest(taskAction.createTasksPending.toString(), handleCreateTasks);
  yield takeLatest(taskAction.updateTaskPending.toString(), handleUpdateTask);
  yield takeLatest(taskAction.deleteTaskPending.toString(), handleDeleteTask);
}
