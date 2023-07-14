import React from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../app/store';
import { shallowEqual } from 'react-redux';
import Loading from '../components/Loading';
import { Navigate, useLocation } from 'react-router-dom';
import { decoded, setHeaders } from '../util/jwt';
import { userAction } from '../reducer/user/userSlice';
import { authAction } from '../reducer/auth/authSlice';

function AuthRequire({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const { isSignIn, isInitialState } = useAppSelector(
    (state) => ({
      isSignIn: state.auth.isSignIn,
      isInitialState: state.auth.isInitialState,
    }),
    shallowEqual
  );
  const location = useLocation();
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const payLoadToken = decoded(Cookies.get('token'));
    if (payLoadToken) {
      setHeaders();
      dispatch(userAction.getMePending(payLoadToken.id));
    } else {
      dispatch(authAction.setIsInitialState());
    }
  }, []);

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
