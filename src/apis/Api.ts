import { safety_settings_gemini } from 'utils/Common';
import RequestHelper, { qerystring } from './RequestHelper';
import Configs from 'configs';

export const API_TYPESENSE = {
  host: {
    prod: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
    std: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
    test: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
  },
  searchUser: 'collections/Users/documents/search',
};

export const DEFAULT_API = {
  host: Configs.DEFAULT_API_URL,
  user_check_user_exists: '/services/uaa/public-api/v1/user/check-user-exists',
  login: '/oauth/login',
  unic_love_user: '/services/uaa/api/v1/unic-love-user',
  refresh_token: '/oauth/refresh-token',
  create_user: '/services/uaa/public-api/v1/user/create-user',
};

const Api = () => {
  const request = RequestHelper();

  const cancel = () => {
    request.cancelRequest();
  };

  return {
    cancel,
    user_check_user_exists: (params: CheckUserExistParams) => {
      return request.request({
        host: DEFAULT_API.host,
        url: DEFAULT_API.user_check_user_exists,
        query: params,
        options: { disableNoti: true, ignoreAccessToken: true },
      });
    },
    login: (params: LoginParams) => {
      return request.request({
        host: DEFAULT_API.host,
        url: DEFAULT_API.login,
        method: 'post',
        data: params,
        options: { ignoreAccessToken: true },
      });
    },
    unic_love_user: (id: string) => {
      return request.request({
        host: DEFAULT_API.host,
        url: DEFAULT_API.unic_love_user,
        query: { id },
      });
    },
    refresh_token: (refreshToken: string) => {
      return request.request({
        host: DEFAULT_API.host,
        url: DEFAULT_API.refresh_token,
        method: 'post',
        data: {
          refreshToken,
        },
      });
    },
    create_user: (params: CreateUserParams) => {
      return request.request({
        host: DEFAULT_API.host,
        url: DEFAULT_API.create_user,
        method: 'post',
        data: params,
      });
    },
  };
};

export default Api;
