import {URLS} from './config';
import axios from 'axios';

const instance = axios.create({
  timeout: 30000,
});

const responseBody = (response: object) => response;

const errorBody = (err: {
  response: {data: {message: string}; status: number};
  request: object;
  message: string;
}) => {
  console.log('err---', err);
  if (err.response) {
    // Request made and server responded
    console.log('err.response', err.response);
    return {
      message: err.response.data.message,
      statusCode: err.response.status,
    };
  } else if (err.request) {
    // The request was made but no response was received
    console.log('err.request', err.request);
    return 'Network Failiure, Please Check your network connection!';
  } else {
    // Something happened in setting up the request that triggered an err
    console.log('err', err.message);
    return err.message;
  }
};

const requests = {
  get: (url: string, headers?: any) =>
    instance.get(url, {headers}).then(responseBody).catch(errorBody),
  post: (url: string, body: any, headers?: any) =>
    instance.post(url, body, {headers}).then(responseBody).catch(errorBody),

  put: (url: string, body: any, headers?: any) =>
    instance.put(url, body, {headers}).then(responseBody).catch(errorBody),
};

export const usersMain = {
  getUsers: async (limit: number) =>
    requests.get(`${URLS.GET_USERS}?per_page=${limit}`),
};
