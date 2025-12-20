import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {Alert, Platform} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';

// import firebase from 'react-native-firebase';

// Calling this function will open Google for login.
const configure = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'android'
          ? '904842608857-54umjclm3m5qmf6lkon9ct2h3st8qttf.apps.googleusercontent.com'
          : '904842608857-vo1vfn9fkcu60qbpaq4kfgkrvm07s9jo.apps.googleusercontent.com',
    });
  } catch (err) {
    console.log('---- err GoogleSignin.configure', err);
  }
};

const signInGoogle = async () => {
  try {
    let userSignIn = await GoogleSignin.signIn();
    const userInfo = userSignIn.data;
    if (userInfo) {
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      console.log('--- signIn', userInfo.user);
      const userF = await auth().signInWithCredential(googleCredential);

      console.log('--- auth', userF.user);
      return {
        id: userF.user.uid,
        // id: userInfo.user.id,

        oldId: userInfo.user.id,
        email: userInfo.user.email,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      } as UserInfoType;
    }
  } catch (error: any) {
    console.log('GoogleHelper signin error', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

const signInApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    if (!appleAuthRequestResponse.identityToken) {
      // Alert.alert(
      //   'appleAuthRequestResponse',
      //   appleAuthRequestResponse.email ?? '',
      // );
      return;
    }
    console.log('--- appleAuthRequestResponse', appleAuthRequestResponse);
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    const userF = await auth().signInWithCredential(appleCredential);
    console.log('--- auth', userF.user);

    return {
      id: userF.user.uid,
      oldId: userF.user.uid,
      email: userF.user.email,
      name:
        appleAuthRequestResponse.fullName?.givenName ||
        appleAuthRequestResponse.fullName?.familyName
          ? `${appleAuthRequestResponse.fullName?.givenName ?? ''} ${
              appleAuthRequestResponse.fullName?.familyName ?? ''
            }`
          : userF.user.email?.split('@')[0],
      photo: userF.user.photoURL,
    } as UserInfoType;
  } catch (error: any) {
    console.log('GoogleHelper signin error', error);
    // Alert.alert('appleAuthRequestResponse', error?.message ?? '');
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

const signOut = async (type?: 'apple' | 'google') => {
  try {
    console.log('---- currentUser', auth().currentUser);
    if (type == 'google') {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    // if (type == 'apple') {
    //   await appleAuth.performRequest({
    //     user: auth().currentUser?.providerData.find(
    //       item => item.providerId == 'apple.com',
    //     )?.uid,
    //     requestedOperation: appleAuth.Operation.LOGOUT,
    //   });
    // }

    await auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async () => {
  try {
    const curentUser = auth().currentUser;
    console.log('---- curentUser', curentUser);
    await curentUser?.delete();
  } catch (err) {
    console.log('--- err deleteUser', err);
  }
};

const getCurrentUser = () => {
  return auth().currentUser;
};

export default {
  signInGoogle,
  signInApple,
  signOut,
  configure,
  deleteUser,
  getCurrentUser,
};
