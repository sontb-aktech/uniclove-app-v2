import {safety_settings_gemini} from 'utils/Common';
import RequestHelper, {qerystring} from './RequestHelper';

export const API_TYPESENSE = {
  host: {
    prod: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
    std: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
    test: 'https://c0ieaqfog9k6n85vp-1.a1.typesense.net/',
  },
  searchUser: 'collections/Users/documents/search',
};

const Api = () => {
  const request = RequestHelper();

  const cancel = () => {
    request.cancelRequest();
  };

  return {
    cancel,
    searchUser: (keyword: string) => {
      return request.get(
        API_TYPESENSE.host,
        API_TYPESENSE.searchUser,
        {
          q: keyword,
          query_by: 'name,email',
          page: 0,
          per_page: 20,
        },
        undefined,
        {'X-TYPESENSE-API-KEY': 'rfsZxJndOxtr3qd7F1ra6j9S5WXU614J'},
      );
    },
  };
};

export default Api;
