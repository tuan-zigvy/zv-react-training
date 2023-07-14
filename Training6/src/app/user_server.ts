import axios from 'axios';
import { USER_URL } from './config';

const userService = axios.create({
  baseURL: USER_URL,
});

userService.interceptors.request.use(
  (request) =>
    // console.log('Start Request', request);
    request,
  (error) =>
    // console.log('REQUEST ERROR', { error });
    Promise.reject(error)
);

userService.interceptors.response.use(
  (response) =>
    // console.log('Response', response);
    response,
  (error) => {
    // console.log('RESPONSE ERROR', { error });
    const message = error.response?.data?.errors?.message || 'Unknown Error';
    const newError = new Error(message);
    return Promise.reject(newError);
  }
);

export default userService;
