import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import todoSaga from './todoSaga';

export default function* rootSaga() {
  console.log('run saga');
  yield all([userSaga(), todoSaga()]);
}
