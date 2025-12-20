import InAppReview from 'react-native-in-app-review';

export default {
  requestInAppReview: async () => {
    try {
      const finished = await InAppReview.RequestInAppReview();
      return finished;
    } catch {}
    return false;
  },
};
