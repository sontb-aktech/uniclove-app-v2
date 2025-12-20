// import CodePush from 'react-native-code-push';
// import {StoreType} from 'stores';
// import CodePushSlice from 'stores/CodePushSlice';
// import CommonSlice from 'stores/CommonSlice';

// const checkUpdate = async () => {
//   const store = require('stores').default as StoreType;
//   try {
//     if (!store.getState().codepush.checkingCodepush) {
//       store.dispatch(CodePushSlice.actions.setCheckingCodepush(true));
//       console.log('---- Codepush --- Checking for update...');

//       const remotePackage = await CodePush.checkForUpdate();
//       if (remotePackage) {
//         console.log('---- Codepush --- Dowloading update...');
//         const localPackage = await remotePackage?.download(
//           ({receivedBytes, totalBytes}) => {
//             const percent = Math.round((receivedBytes * 100) / totalBytes);
//             store.dispatch(CodePushSlice.actions.setPercentCodepush(percent));
//           },
//         );
//         console.log('---- Codepush --- Dowloading success');
//         store.dispatch(
//           CodePushSlice.actions.setShowPopupCodepush({
//             isShowPopup: true,
//             localCodepush: localPackage,
//           }),
//         );
//       } else {
//         console.log('---- Codepush --- Up to date');
//       }
//     }
//   } catch {
//     console.log('---- Codepush --- Unable to Check for update');
//   } finally {
//     store.dispatch(CodePushSlice.actions.setCheckingCodepush(false));
//   }
// };

// export default {
//   checkUpdate,
// };
