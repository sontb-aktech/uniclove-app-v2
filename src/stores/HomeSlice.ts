import {createSlice} from '@reduxjs/toolkit';
import {createCustomAyncThunk} from './ReduxUtils';

const initialState = {
  listThreads: [],
};

export const getListThreads = createCustomAyncThunk(
  'home/getListThreads',
  async (
    params: {lastThreadId?: string; limit?: number} | undefined,
    {rootState},
  ) => {},
);

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListThreads.fulfilled, (state, action) => {});
  },
});

// store.dispatch(ExampleSlice.actions.up({value: 10}))

export default HomeSlice;
