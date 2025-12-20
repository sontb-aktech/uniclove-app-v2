import {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useAppResume = (fun: () => void, deps: unknown[] = []) => {
  const appState = useRef(AppState.currentState);
  const isMountingRef = useRef(true);
  const lastBackgroundTime = useRef<number | null>(null);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    // Khi app từ background/inactive quay lại active
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const now = Date.now();

      // Chỉ gọi nếu không phải mới mở popup nhanh (VD: Google Sign-In)
      if (
        !isMountingRef.current &&
        lastBackgroundTime.current &&
        now - lastBackgroundTime.current > 3000 // > 1 giây
      ) {
        fun();
      }
    }

    // Ghi nhận thời điểm khi app đi background
    if (nextAppState.match(/inactive|background/)) {
      lastBackgroundTime.current = Date.now();
    }

    appState.current = nextAppState;
  };

  // Chỉ set mount flag 1 lần khi mở app
  useEffect(() => {
    isMountingRef.current = true;
    const timer = setTimeout(() => {
      isMountingRef.current = false;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Listener chỉ cần tạo lại khi deps thay đổi
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, deps);
};

export default useAppResume;
