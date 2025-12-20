import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import Api from 'apis/Api';
// import Api from 'apis/Api';
import CommonHelper from 'helpers/CommonHelper';
import moment from 'moment';

// type LangCode = 'vi' | 'en';

const initialState = {
  loading: false,
  loadingAds: false,
  showNotice: false,
  noticeType: 'success',
  textNotice: '',
  theme: undefined as ThemeType,
  isShowingInterstitial: false,
  isShowingAppOpenAds: false,
  impressionTimeAppOpenAd: 0,
  // timeShowedAppOpenAds: 0,
  // timeShowedInterAds: 0,
};

type PayloadType = {
  noticeType: NoticeType;
  textNotice: string;
  longDisplay?: boolean;
};

const timeout = CommonHelper.timeout(3000);
const timeoutLoading = CommonHelper.timeout(20000);
export const showNotice = createAsyncThunk(
  'common/startNotice',
  async (notice: PayloadType, thunkAPI) => {
    thunkAPI.dispatch(CommonSlice.actions.showNotice(notice));
    if (notice.longDisplay) {
      timeoutLoading.cancel();
      await timeoutLoading.run();
    } else {
      timeout.cancel();
      await timeout.run();
    }

    thunkAPI.dispatch(CommonSlice.actions.closeNotice());
  },
);

export const showLoading = createAsyncThunk(
  'common/showLoading',
  async (timeout: number | undefined, thunkAPI) => {
    thunkAPI.dispatch(CommonSlice.actions.showLoading());
    timeoutLoading.cancel();
    await timeoutLoading.run(timeout);
    thunkAPI.dispatch(CommonSlice.actions.closeLoading());
  },
);

export const showLoadingAds = createAsyncThunk(
  'common/showLoadingAds',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(CommonSlice.actions.showLoadingAds());
    timeoutLoading.cancel();
    await timeoutLoading.run();
    thunkAPI.dispatch(CommonSlice.actions.closeLoadingAds());
  },
);

const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showLoading: state => {
      state.loading = true;
    },
    closeLoading: state => {
      state.loading = false;
    },
    showLoadingAds: state => {
      state.loadingAds = true;
    },
    closeLoadingAds: state => {
      state.loadingAds = false;
    },
    showNotice: (state, action: PayloadAction<PayloadType>) => {
      state.showNotice = true;
      state.noticeType = action.payload.noticeType;
      state.textNotice = action.payload.textNotice;
    },
    closeNotice: state => {
      state.showNotice = false;
    },
    setTheme: (state, action: PayloadAction<ThemeType | undefined>) => {
      state.theme = action.payload;
    },

    setIsShowingAppOpenAds: (state, action: PayloadAction<boolean>) => {
      state.isShowingAppOpenAds = action.payload;
    },

    setImpressionTimeAppOpenAd: state => {
      state.impressionTimeAppOpenAd = moment().unix();
    },
    // setTimeShowedAppOpenAds: (state, action: PayloadAction<number>) => {
    //   state.timeShowedAppOpenAds = action.payload;
    // },
    // setTimeShowedInterAds: (state, action: PayloadAction<number>) => {
    //   state.timeShowedInterAds = action.payload;
    // },
  },
  extraReducers: builder => {},
});

export default CommonSlice;
