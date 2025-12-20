import {RouteProp, useRoute} from '@react-navigation/core';
import {AsyncThunk, AsyncThunkAction, unwrapResult} from '@reduxjs/toolkit';
import {RootStackParamList} from 'screens';
import {useAppDispatch} from 'stores';
import CommonSlice, {
  showNotice as showNoticeSlice,
  showLoading as showLoadingSlice,
  showLoadingAds as showLoadingAdsSlice,
} from 'stores/CommonSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const useCommon = (disableNavigation?: boolean) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showNotice = (noticeType: NoticeType, textNotice: string) => {
    dispatch(showNoticeSlice({noticeType, textNotice}));
  };
  const closeNotice = () => {
    dispatch(CommonSlice.actions.closeNotice());
  };
  const showLoading = (timeout?: number) => {
    dispatch(showLoadingSlice(timeout));
  };
  const closeLoading = () => {
    dispatch(CommonSlice.actions.closeLoading());
  };

  const showLoadingAds = () => {
    dispatch(showLoadingAdsSlice());
  };
  const closeLoadingAds = () => {
    dispatch(CommonSlice.actions.closeLoadingAds());
  };

  const getResultDispatch = async <T, C>(fun: AsyncThunkAction<T, C, {}>) => {
    try {
      return unwrapResult(await dispatch(fun));
    } catch (err: any) {
      console.log(err);
    }
  };
  function navigate<
    RouteName extends keyof RootStackParamList,
    NestedRouteName extends keyof RootStackParamList,
  >(
    screenName: RouteName,
    params?: RootStackParamList[RouteName] & {
      screen?: NestedRouteName;
      params?: RootStackParamList[NestedRouteName];
    },
  ) {
    //@ts-ignore
    navigation.navigate(screenName, params as never);
  }
  function popTo<
    RouteName extends keyof RootStackParamList,
    NestedRouteName extends keyof RootStackParamList,
  >(
    screenName: RouteName,
    params?: RootStackParamList[RouteName] & {
      screen?: NestedRouteName;
      params?: RootStackParamList[NestedRouteName];
    },
  ) {
    //@ts-ignore
    navigation.popTo(screenName, params as never);
  }
  function push<RouteName extends keyof RootStackParamList>(
    screenName: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    //@ts-ignore
    navigation.push(screenName, params);
  }
  function pop() {
    navigation.pop();
  }
  function goBack() {
    navigation.goBack();
  }
  function replace<RouteName extends keyof RootStackParamList>(
    screenName: keyof RootStackParamList,
    params?: RootStackParamList[RouteName],
  ) {
    //@ts-ignore
    navigation.replace(screenName, params);
  }
  function reset<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName],
  ) {
    navigation?.reset({
      index: 1,
      routes: [{name: routeName, params}],
    });
  }
  return {
    dispatch,
    showNotice,
    showLoading,
    closeLoading,
    showLoadingAds,
    closeLoadingAds,
    closeNotice,
    getResultDispatch,
    navigate,
    replace,
    goBack,
    push,
    reset,
    pop,
    popTo,
  };
};

export default useCommon;
