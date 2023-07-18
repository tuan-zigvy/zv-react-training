import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import userService from '../app/user_server';
import { JwtPayloadUser } from './interface';

const decoded = (token: string | undefined) => {
  if (!token) {
    return null;
  }
  const decode = jwtDecode<JwtPayloadUser>(token);

  const currentTime = Date.now() / 1000;
  if (decode.exp && currentTime > decode.exp) return null;

  return decode;
};

const setHeaders = (isDelete = false, token = '') => {
  if (!isDelete) {
    userService.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete userService.defaults.headers['Authorization'];
  }
};

const setAllCookie = (
  isDelete: boolean,

  token = ''
) => {
  const option: Cookies.CookieAttributes = {
    httpOnly: false,
    secure: false,
    path: '/',
    sameSite: 'strict',
    expires: new Date(new Date().getTime() + 86400000),
  };
  if (!isDelete) {
    Cookie.set('token', token, option);
  } else {
    Cookie.remove('token');
  }
};

export { setHeaders, setAllCookie, decoded };
