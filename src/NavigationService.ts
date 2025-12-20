// import { StackActions, NavigationActions } from 'react-navigation';
import {
  createNavigationContainerRef,
  DrawerActions,
  StackActions,
  ParamListBase,
} from '@react-navigation/native';
import {RootStackParamList} from 'screens';
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

function navigate<
  RouteName extends keyof RootStackParamList,
  NestedRouteName extends keyof RootStackParamList,
>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName] & {
    screen?: NestedRouteName;
    params?: RootStackParamList[NestedRouteName];
  },
) {
  navigationRef.current?.navigate(
    routeName as keyof RootStackParamList,
    params,
  );
}

function back() {
  navigationRef.current?.goBack();
}

function replace<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

function reset<RouteName extends keyof RootStackParamList>(
  routeName: RouteName,
  params?: RootStackParamList[RouteName],
) {
  navigationRef.current?.reset({
    index: 1,
    routes: [{name: routeName, params}],
  });
}

function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  back,
  reset,
  replace,
  toggleDrawer,
};
