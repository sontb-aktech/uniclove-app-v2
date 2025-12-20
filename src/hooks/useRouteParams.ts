import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'screens';

const useRouteParams = <T extends keyof RootStackParamList>(screenName: T) => {
  const params = useRoute<RouteProp<RootStackParamList, typeof screenName>>()
    .params as RootStackParamList[T] | undefined;
  return params;
};

export default useRouteParams;
