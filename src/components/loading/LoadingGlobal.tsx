import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'stores';
import LottieView from 'lottie-react-native';
import useTheme from 'hooks/useTheme';
import { GlobalStyles } from 'utils/GlobalStyles';

const LoadingGlobal = () => {
  const { themeStyle } = useTheme();
  const common = useAppSelector(state => state.common);
  if (common.loading)
    return (
      <View style={styles.loadingPage}>
        <View
          style={[
            styles.loadingPage_inner,
            { backgroundColor: themeStyle.surface },
            GlobalStyles.shadow,
          ]}
        >
          <ActivityIndicator color={themeStyle.primary} animating />
        </View>
      </View>
    );
  else return null;
};

export default LoadingGlobal;

const styles = StyleSheet.create({
  loadingPage: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingPage_inner: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    borderRadius: 16,
  },
});
