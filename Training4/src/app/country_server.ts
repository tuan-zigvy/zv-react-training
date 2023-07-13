import axios from 'axios';
import { COUNTRY_URL } from './config';

const countryService = axios.create({
  baseURL: COUNTRY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

countryService.interceptors.request.use(
  (request) =>
    // console.log('Start Request', request);
    request,
  (error) =>
    // console.log('REQUEST ERROR', { error });
    Promise.reject(error)
);

countryService.interceptors.response.use(
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

export default countryService;
