import {createSlice} from '@reduxjs/toolkit';
// import Api from 'apis/Api';
// import FirebaseFirestoreHelper from 'helpers/FirebaseFirestoreHelper';
import FirebaseConfigHelper from 'helpers/FirebaseConfigHelper';
import {createCustomAyncThunk} from './ReduxUtils';

const initialState = {
  userInfo: undefined as UserInfoType | undefined,
  firstInstall: true,
};

export const getUserInfo = createCustomAyncThunk(
  'user/getUserInfo',
  async (_, {rootState, dispatch}) => {
    const userInfo = rootState.user.userInfo;
    if (userInfo?.id) {
    }
  },
  false,
);

export const login = createCustomAyncThunk(
  'user/login',
  async (
    params: {type: 'apple' | 'google'} | undefined,
    {dispatch, rootState},
  ) => {
    try {
    } catch {
    } finally {
    }
  },
  true,
);

export const getConfig = createCustomAyncThunk(
  'user/getConfig',
  async () => {
    const config = await FirebaseConfigHelper.getConfig();
    return config as ConfigType;
  },
  true,
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {});
    builder.addCase(login.fulfilled, (state, action) => {});
  },
});

export default UserSlice;
