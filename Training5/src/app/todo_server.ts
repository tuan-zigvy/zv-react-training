import axios from 'axios';
import { TODO_URL } from './config';

const todoService = axios.create({
  baseURL: TODO_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

todoService.interceptors.request.use(
  (request) =>
    // console.log('Start Request', request);
    request,
  (error) =>
    // console.log('REQUEST ERROR', { error });
    Promise.reject(error)
);

todoService.interceptors.response.use(
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

export default todoService;
