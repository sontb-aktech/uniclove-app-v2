import {AnyAction, createAsyncThunk, ThunkDispatch} from '@reduxjs/toolkit';
import {RootState} from 'stores';
import CommonSlice from './CommonSlice';

export function createCustomAyncThunk<ReturnType, ParamsType = void>(
  typePrefix: string,
  payloadCreator: (
    params: ParamsType,
    thunkApi: {
      rootState: RootState;
      dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
    },
  ) => Promise<ReturnType>,
  disableLoading?: boolean,
) {
  const action = createAsyncThunk<ReturnType, ParamsType>(
    typePrefix,
    async (params, {getState, dispatch}) => {
      // const a= await Api().getListProvince()
      !disableLoading && dispatch(CommonSlice.actions.showLoading());
      try {
        const rootState = getState() as RootState;
        const result = await payloadCreator(params, {rootState, dispatch});
        return result;
      } catch (err) {
        throw err;
      } finally {
        !disableLoading && dispatch(CommonSlice.actions.closeLoading());
      }
    },
  );
  return action;
}
