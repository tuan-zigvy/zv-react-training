import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/store';
import { shallowEqual } from 'react-redux';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import { decoded, setHeaders } from '../util/jwt';
import { userAction } from '../reducer/user/userSlice';
import { authAction } from '../reducer/auth/authSlice';

function AuthRequire({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { isSignIn, isInitialState, token } = useAppSelector(
    (state) => ({
      isSignIn: state.auth.isSignIn,
      isInitialState: state.auth.isInitialState,
      token: state.auth.token,
    }),
    shallowEqual
  );

  const location = useLocation();
  const dispatch = useAppDispatch();
  const payLoadToken = decoded(token);

  useEffect(() => {
    if (payLoadToken) {
      setHeaders(false, token);
      dispatch(userAction.getMePending(payLoadToken.id));
    } else {
      dispatch(authAction.signOutPending());
    }
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isSignIn && payLoadToken) {
      timeout = setTimeout(() => {
        dispatch(authAction.signOutPending());
      }, Math.round((payLoadToken.exp as number) * 1000 - Date.now()));
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isSignIn]);

  if (!isInitialState)
    return (
      <>
        <Loading />
      </>
    );

  if (!isSignIn) return <Navigate to='/login' state={{ from: location }} replace />;

  return <>{children}</>;
}

export default AuthRequire;
