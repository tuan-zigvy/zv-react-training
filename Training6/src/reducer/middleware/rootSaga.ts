import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import todoSaga from './taskSaga';
import networkSaga from './networkSaga';

export default function* rootSaga() {
  console.log('run saga');
  yield all([userSaga(), todoSaga(), networkSaga()]);
}
