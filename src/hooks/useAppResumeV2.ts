// import {useFocusEffect} from '@react-navigation/native';
// import {useCallback, useEffect, useRef, useState} from 'react';
// import {AppStateStatus} from 'react-native';
// import {AppLifecycle} from 'react-native-applifecycle';

// const useAppResume = (fun: () => (() => void) | void, args: unknown[]) => {
//   const appState = useRef(AppLifecycle.currentState);

//   // const [isMounting, setIsMounting] = useState(true);
//   // const isMountingRef = useRef(true);
//   const _handleAppStateChange = (nextAppState: AppStateStatus) => {
//     // console.log('--- nextAppState', nextAppState);
//     if (
//       appState.current.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       fun();
//     }
//     appState.current = nextAppState;
//   };

//   useEffect(() => {
//     const listener = AppLifecycle.addEventListener(
//       'change',
//       _handleAppStateChange,
//     );
//     // console.log('--- addEventListener', '');

//     return () => {
//       listener.remove();
//     };
//   }, [...args]);
// };

// export default useAppResume;
