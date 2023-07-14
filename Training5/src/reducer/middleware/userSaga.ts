import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { ILogin, IUserRes } from '../../util/interface';
import { decoded, setAllCookie, setHeaders } from '../../util/jwt';
import { fetchGetMe, fetchGetUsers, fetchLogin } from '../../app/apiUser';
import { userAction } from '../user/userSlice';
import { authAction } from '../auth/authSlice';
import Cookies from 'js-cookie';

function* handleSignIn(action: PayloadAction<ILogin>) {
  try {
    const data: string = yield call(fetchLogin, action.payload);

    const payloadToken = decoded(data);
    if (data && payloadToken) {
      setAllCookie(false, data);

      setHeaders();
      yield put(userAction.getMeSuccess(payloadToken));
      yield put(authAction.signInSuccess());
    }
  } catch (error: any) {
    yield put(authAction.signInError(error.message));
  }
}

function* handleSignOut() {
  try {
    setHeaders(true); // remove all token in header
    setAllCookie(true); // remove all token in cookie
    yield put(authAction.signOutSuccess());
    yield put(userAction.restart());
  } catch (error: any) {
    yield put(authAction.signOutError(error.message));
  }
}

function* handleGetMe(action: PayloadAction<string>) {
  try {
    const data: IUserRes = yield call(fetchGetMe, action.payload);
    if (data) {
      yield put(authAction.signInSuccess());
      yield put(userAction.getMeSuccess(data));
    }
  } catch (error: any) {
    yield put(userAction.getMeError(error.message));
  }
}

function* handleGetUsers() {
  try {
    const data: IUserRes[] = yield call(fetchGetUsers);
    if (data) {
      yield put(userAction.getUsersSuccess(data));
    }
  } catch (error: any) {
    yield put(userAction.getUsersError(error.message));
  }
}

function* watchSignInFlow() {
  while (true) {
    const payloadToken = decoded(Cookies.get('token'));

    if (!payloadToken) {
      const action: PayloadAction<ILogin> = yield take(authAction.signInPending.type);
      yield call(handleSignIn, action);
    }

    yield take(authAction.signOutPending.type);

    yield call(handleSignOut);
  }
}

export default function* userSaga() {
  yield fork(watchSignInFlow);
  yield takeLatest(userAction.getMePending.toString(), handleGetMe);
  yield takeLatest(userAction.getUsersPending.toString(), handleGetUsers);
}
