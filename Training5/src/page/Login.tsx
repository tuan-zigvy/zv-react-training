import React from 'react';
import { MdVisibilityOff, MdVisibility } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../app/store';
import { z } from 'zod';
import { authAction } from '../reducer/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { decoded } from '../util/jwt';
import Cookies from 'js-cookie';
const validDate = z.object({
  email: z.string().email(),
  password: z.string(),
});
function Login() {
  const [inputEmail, setInputEmail] = React.useState<string>('tuan@yahoo.com');
  const [inputPassword, setInputPassword] = React.useState<string>('zigvy123');
  const [isShowPw, setIsShowPw] = React.useState<boolean>(false);
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const login = validDate.parse({ email: inputEmail, password: inputPassword });
    dispatch(authAction.signInPending(login));
  };

  React.useEffect(() => {
    const token = decoded(Cookies.get('token'));
    if (isSignIn || token) navigate('/');
  }, [isSignIn]);

  const handleChangePw = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(event.target.value);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(event.target.value);

  return (
    <div
      style={{
        width: '100%',
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
        <input name='email' type='text' value={inputEmail} onChange={handleChangeEmail} />
        <div style={{ position: 'relative' }}>
          <div
            onClick={() => setIsShowPw(!isShowPw)}
            style={{ position: 'absolute', zIndex: 10, right: 5, top: 1 }}
          >
            {isShowPw ? <MdVisibility /> : <MdVisibilityOff />}
          </div>
          <input
            name='password'
            type={isShowPw ? 'text' : 'password'}
            value={inputPassword}
            onChange={handleChangePw}
          />
        </div>
        <button type='submit'> Login</button>
      </form>
      <p> email: "john@doe.com"</p>
      <p>password: "zigvy123",</p>
      <p>role : USER</p>
    </div>
  );
}

export default Login;
