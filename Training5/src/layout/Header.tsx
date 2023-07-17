import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/store';
import { authAction } from '../reducer/auth/authSlice';
import { useEffect } from 'react';
function Header() {
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (isSignIn) {
      dispatch(authAction.signOutPending());
    }
  };

  useEffect(() => {
    if (!isSignIn) navigate('/');
  }, [isSignIn]);

  const handleNavigate = (value: string) => {
    navigate(value);
  };

  return (
    <div style={{ display: 'flex', columnGap: 10 }}>
      {isSignIn && <button onClick={handleClick}> Log Out</button>}
      <button onClick={() => handleNavigate('/')}>Home</button>
      <button onClick={() => handleNavigate('/users')}>Users</button>
      <button onClick={() => handleNavigate('/info')}>Info</button>
    </div>
  );
}

export default Header;
