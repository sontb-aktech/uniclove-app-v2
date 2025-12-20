import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

const useBackAndroidHandler = (
  callback: () => boolean | null | undefined,
  defs: any[],
) => {
  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        callback,
      );

      return () => backHandler?.remove();
    }, [defs]),
  );
};

export default useBackAndroidHandler;
