import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createCustomAyncThunk} from './ReduxUtils';

const initialState = {listFund: [], count: 0};

export const getListFundAction = createCustomAyncThunk(
  'fund/getListFund',
  async ({page, size}: {page: number; size: number}) => {
    // const a= await Api().getListProvince()
    return {
      // a
    };
  },
);

const ExampleSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    up: (state, action: PayloadAction<{value: number}>) => {
      state.count = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder.addCase(getListFundAction.fulfilled, (state, action) => {
      // state.listFund = action.payload.a
    });
  },
});

// store.dispatch(ExampleSlice.actions.up({value: 10}))

export default ExampleSlice;
