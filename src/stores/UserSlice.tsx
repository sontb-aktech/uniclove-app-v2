import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import Api from 'apis/Api';
// import FirebaseFirestoreHelper from 'helpers/FirebaseFirestoreHelper';
import FirebaseConfigHelper from 'helpers/FirebaseConfigHelper';
import { createCustomAyncThunk } from './ReduxUtils';
import Api from 'apis/Api';
import CommonHelper from 'helpers/CommonHelper';
import { showNotice } from './CommonSlice';
import { handleError } from 'apis/RequestHelper';
import { StoreType } from 'stores';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  userInfo: undefined as UserInfoType | undefined,
  firstInstall: true,
  accessToken: undefined as string | undefined,
  refreshToken: undefined as string | undefined,
};

export const checkUserExistThunk = createCustomAyncThunk(
  'user/checkUserExistThunk',
  async (params: CheckUserExistParams, { rootState, dispatch }) => {
    try {
      const result = await Api().user_check_user_exists(params);
      if (result.success) {
        return false;
      }
    } catch (error: any) {
      if (error.status == 409) {
        return true;
      }
      const store = require('stores').default as StoreType;
      handleError(error, store);
    }
  },
);

export const getUserInfo = createCustomAyncThunk(
  'user/getUserInfo',
  async (_, { rootState, dispatch }) => {
    const accessToken = rootState.user.accessToken;
    if (accessToken) {
      const decoded = jwtDecode<any>(accessToken);
      if (decoded.user_id) {
        const result = await Api().unic_love_user(decoded.user_id);
        if (result.success) {
          return result.data as UserInfoType;
        }
      }
    }
  },
);

export const login = createCustomAyncThunk(
  'user/login',
  async (params: LoginParams, { dispatch, rootState }) => {
    const deviceId = await CommonHelper.getDeviceUniqueId();
    const result = await Api().login({ ...params, deviceInfo: deviceId });
    if (result.success) {
      return result.data as TokenResponseType;
    }
    console.log('--- login', result);
  },
);

export const logout = createCustomAyncThunk(
  'user/logout',
  async (_, { dispatch, rootState }) => {
    return;
  },
);

export const getConfig = createCustomAyncThunk(
  'user/getConfig',
  async () => {
    const config = await FirebaseConfigHelper.getConfig();
    return config as ConfigType;
  },
  true,
);

export const refreshToken = createCustomAyncThunk(
  'user/refreshToken',
  async (_, { rootState }) => {
    const refreshToken = rootState.user.refreshToken;
    if (refreshToken) {
      const result = await Api().refresh_token(refreshToken);
      if (result.success) {
        return result.data as TokenResponseType;
      }
    }
  },
  true,
);

export const createUser = createCustomAyncThunk(
  'user/createUser',
  async (params: CreateUserParams, { rootState }) => {
    const paramsOk: CreateUserParams = {
      ...params,
      actorTypes: ['USER'],
      codePhoneNumber: 'VN',
      userProfileRequest: {},
    };
    const result = await Api().create_user(paramsOk);
    if (result.success) {
      return result.data as TokenResponseType;
    }
  },
  true,
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstInstall: (state, action: PayloadAction<boolean>) => {
      state.firstInstall = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
      }
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      } else {
        state.accessToken = undefined;
        state.refreshToken = undefined;
      }
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.userInfo = undefined;
    });
  },
});

export default UserSlice;
