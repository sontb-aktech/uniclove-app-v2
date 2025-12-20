import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// import Api from 'apis/Api';
// import Api from 'apis/Api';
import CommonHelper from 'helpers/CommonHelper';
// import {LocalPackage} from 'react-native-code-push';
import {RootState} from 'stores';

type LangCode = 'vi' | 'en';

const initialState = {
  // localCodepush: undefined as LocalPackage | undefined,
  checkingCodepush: false,
  showPopupCodepush: false,
  percentCodepush: 0,
};

const CodePushSlice = createSlice({
  name: 'codepush',
  initialState,
  reducers: {
    setCheckingCodepush: (state, action: PayloadAction<boolean>) => {
      state.checkingCodepush = action.payload;
      state.percentCodepush = 0;
    },
    setPercentCodepush: (state, action: PayloadAction<number>) => {
      state.percentCodepush = action.payload;
    },
    // setShowPopupCodepush: (
    //   state,
    //   action: PayloadAction<{
    //     isShowPopup: boolean;
    //     localCodepush?: LocalPackage;
    //   }>,
    // ) => {
    //   state.showPopupCodepush = action.payload.isShowPopup;
    //   state.localCodepush = action.payload.localCodepush;
    // },
  },
  extraReducers: builder => {},
});

export default CodePushSlice;
