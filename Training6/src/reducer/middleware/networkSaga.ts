import { fork, put, take } from 'redux-saga/effects';
import { channel } from 'redux-saga';
import { networkAction } from '../network/networkSlice';

function* syncNetworkStatus(): any {
  const networkChannel = channel();
  const listener = (e: Event) => {
    networkChannel.put(networkAction.updateNetwork(e.type === 'online' ? true : false));

    return () => {
      window.removeEventListener('offline', listener);
      window.removeEventListener('online', listener);
    };
  };

  window.addEventListener('offline', listener);
  window.addEventListener('online', listener);

  while (true) {
    const action = yield take(networkChannel);
    yield put(action);
  }
}

export default function* networkSaga() {
  yield fork(syncNetworkStatus);
}
