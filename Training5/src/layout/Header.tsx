import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { authAction } from '../reducer/auth/authSlice';
import { useEffect } from 'react';
function Header() {
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handelClick = () => {
    if (isSignIn) {
      dispatch(authAction.signOutPending());
    }
  };

  useEffect(() => {
    if (!isSignIn) navigate('/');
  }, [isSignIn]);

  return (
    <div style={{ display: 'flex', columnGap: 14 }}>
      {isSignIn && <button onClick={handelClick}> Log Out</button>}
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/users')}>Users</button>
      <button onClick={() => navigate('/info')}>Info</button>
    </div>
  );
}

export default Header;
