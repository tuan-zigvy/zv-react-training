import axios from 'axios';
import { JOKE_URL } from './config';

const jokeService = axios.create({
  baseURL: JOKE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

jokeService.interceptors.request.use(
  (request) =>
    // console.log('Start Request', request);
    request,
  (error) =>
    // console.log('REQUEST ERROR', { error });
    Promise.reject(error)
);

jokeService.interceptors.response.use(
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

export default jokeService;
