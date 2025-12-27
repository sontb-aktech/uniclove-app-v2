import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import { StoreType } from 'stores';
import { refreshToken } from 'stores/UserSlice';
import { DEFAULT_API } from './Api';

let retryUrls: string[] = [];
let isRefreshingToken = false;
let countRetry = 0;

axios.interceptors.response.use(
  response => {
    if (retryUrls.length > 0) {
      const url = response?.request?._url;
      retryUrls = retryUrls.filter(item => item != url);
    }
    return response;
  },
  async error => {
    const url: string = error?.config?.url;
    try {
      const store = require('stores').default as StoreType;
      const countRetry = retryUrls.filter(item => item == url).length;
      if (
        error?.response?.status === 401 &&
        countRetry < 2 &&
        !url.includes(DEFAULT_API.login) &&
        !url.includes(DEFAULT_API.refresh_token)
      ) {
        console.log('---- url error:', error?.config?.url);
        retryUrls.push(url);
        const result = unwrapResult(await store.dispatch(refreshToken()));
        if (result?.accessToken) {
          let config = error.config;
          config.headers['authorization'] = `Bearer ${result?.accessToken}`;
          return new Promise(resolve => {
            resolve(axios(config));
          });
        }
      }
    } catch {}
    retryUrls = retryUrls.filter(item => item != url);
    return Promise.reject(error);
  },
);
