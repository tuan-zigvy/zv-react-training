import { call, fork, put, select, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { networkAction } from '../network/networkSlice';
import { ITaskPending } from '../../util/interface';
import { RootState } from '../../app/store';
import { taskAction } from '../task/taskSlice';

function* handleCreateTaskAtOnline() {
  if (!navigator.onLine) {
    yield put(taskAction.deleteTasksIsOffline());
  } else {
    const tasksPending: ITaskPending[] = yield select(
      (state: RootState) => state.task.tasksPending
    );
    const taskReady = tasksPending.filter((task) => task.status === 'Ready');

    if (taskReady.length > 0)
      yield put(taskAction.createTasksPending(taskReady.map((task) => task.name)));
  }
}

function* syncNetworkStatus(): any {
  const networkChannel = channel();
  const listener = (e: Event) => {
    networkChannel.put(networkAction.updateNetwork(e.type === 'online' ? true : false));
  };

  window.addEventListener('offline', listener);
  window.addEventListener('online', listener);

  while (true) {
    const action = yield take(networkChannel);

    yield call(handleCreateTaskAtOnline);

    yield put(action);
  }
}

export default function* networkSaga() {
  yield fork(syncNetworkStatus);
}
