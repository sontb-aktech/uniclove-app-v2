import axios, { Method } from 'axios';
import moment from 'moment';
// import RNFetchBlob from 'rn-fetch-blob';
import { StoreType } from 'stores';
import CommonSlice, { showNotice } from 'stores/CommonSlice';
import Configs from 'configs';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Platform } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const RequestHelper = () => {
  const source = axios.CancelToken.source();

  const request = async (params: {
    host: string;
    method?: Method;
    url: string;
    headers?: { [key: string]: string };
    query?: { [key: string]: any };
    data?: { [key: string]: any };
    files?: { [key: string]: ImageType[] };
    options?: {
      disableNoti?: boolean;
      ignoreAccessToken?: boolean;
    };
  }) => {
    const store = require('stores').default as StoreType;

    try {
      let urlFull = getFulUrl(params.host, params.url, params.query);
      console.log('RequestHelper url = ' + urlFull);
      let data = undefined as any;
      if (params.files) {
        data = new FormData();
        for (var key in params.data) {
          if (params.data[key]) {
            data.append(key, params.data[key]);
            console.log(`${key}:${params.data[key]}`);
          }
        }
        for (var key in params.files) {
          params.files[key].forEach(item => {
            data.append(key, item);
            console.log(`${key}:${item}`);
          });
        }
      } else {
        data = params.data;
      }
      const accessToken = store.getState().user.accessToken;

      let res: any = await axios({
        method: params.method ?? 'get',
        url: urlFull,
        cancelToken: source.token,
        data,
        headers: {
          'Content-Type': 'application/json',
          ...(!params.options?.ignoreAccessToken && accessToken
            ? { authorization: `Bearer ${accessToken}` }
            : undefined),
          ...params.headers,
        },
      });

      console.log(res, params.url);
      if (res.status.toString().startsWith('2')) {
        return res.data;
      }
      console.log(res, 'error ' + params.url);
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + params.url);
      handleError(err, store, params.options?.disableNoti);
      throw err;
    }
  };

  const cancelRequest = () => {
    try {
      if (source) {
        source.cancel();
      }
    } catch (err: any) {
      console.log(err.toString());
    }
  };

  const getFulUrl = (host?: string, url?: string, params?: any) => {
    return `${host ? host : ''}${url}${params ? '?' + qerystring(params) : ''}`;
  };

  const getFromFullUrl = async (url: string, disableLoading?: boolean) => {
    const store = require('stores').default as StoreType;
    try {
      // !disableLoading && store.dispatch(CommonSlice.actions.showLoading());
      console.log('RequestHelper url = ' + url);
      let res: any = await axios({
        method: 'get',
        url,
        cancelToken: source.token,
      });

      console.log(res, url);
      if (res.status == 200) {
        return res.data;
      }
      throw res;
    } catch (err: any) {
      throw err;
    } finally {
      // !disableLoading && store.dispatch(CommonSlice.actions.closeLoading());
    }
  };

  const downloadFile = async (url: string) => {
    try {
      let dirs = ReactNativeBlobUtil.fs.dirs;
      const imageName = `HeyAI_${moment().format('YYYYMMDD_HHmmss')}.jpeg`;
      const path =
        Platform.OS === 'android'
          ? `${dirs.PictureDir}/${imageName}`
          : `${dirs.DocumentDir}/${imageName}`;
      const result = await ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'jpeg',
        indicator: true,
        IOSBackgroundTask: true,
        path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path,
          description: 'Image',
        },
      }).fetch('GET', url);
      console.log('--- downloadFile ', result.path());

      if (Platform.OS == 'ios') {
        await CameraRoll.saveAsset(result.path());
      } else if (Platform.OS === 'android') {
        let pathnew = await ReactNativeBlobUtil.MediaCollection.createMediafile(
          { name: imageName, parentFolder: '', mimeType: 'image/jpeg' },
          'Image',
        );
        await ReactNativeBlobUtil.MediaCollection.writeToMediafile(
          pathnew,
          result.path(),
        );
      }
      return true;
    } catch (e) {
      console.log('--- err downloadFile', e);
    }
    return false;
  };

  const saveBaseToDevice = async (base64: string) => {
    try {
      let dirs = ReactNativeBlobUtil.fs.dirs;
      const imageName = `/${moment().format('YYYYMMDD_HHmmss')}.jpeg`;
      const path =
        Platform.OS == 'android'
          ? dirs.PictureDir
          : dirs.DocumentDir + imageName;
      await ReactNativeBlobUtil.fs.writeFile(path, base64, 'base64');

      return path.indexOf('file://') !== 0 ? `file://${path}` : path;
    } catch (e) {
      console.log('--- err saveBaseToDevice', e);
    }
  };

  const getImagePath = async (url: string) => {
    try {
      let dirs = ReactNativeBlobUtil.fs.dirs;
      const imageName = `/${moment().format('YYYYMMDD_HHmmss')}.jpeg`;
      const result = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: dirs.CacheDir + '/files' + imageName,
      }).fetch('GET', url);
      console.log('--- result.path', result.path());
      // const base64 = await RNFS.readFile(result.path(), 'base64');
      // console.log('--- base64', base64);
      const path = result.path();
      return path.indexOf('file://') !== 0 ? `file://${path}` : path;
    } catch {}

    // the image is now dowloaded to device's storage
  };

  const convertImageUrlToBase64 = async (imageUrl: string) => {
    try {
      // Tải hình ảnh về bộ nhớ tạm thời
      const downloadDest = `${RNFS.TemporaryDirectoryPath}/temp.jpg`;
      const { promise } = RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadDest,
      });
      await promise;
      const resizeResonse = await ImageResizer.createResizedImage(
        downloadDest,
        512,
        512,
        'JPEG',
        100,
        undefined,
        undefined,
        undefined,
        { onlyScaleDown: true },
      );
      // Đọc file dưới dạng base64
      const base64String = await RNFS.readFile(resizeResonse.path, 'base64');

      return base64String;
    } catch (error) {
      console.error('Lỗi khi chuyển URL sang base64:', error);
    }
  };

  const convertUriToBase64 = async (uri: string) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      return base64String;
    } catch (err) {
      console.error('Lỗi khi chuyển uri sang base64:', err);
    }
  };

  return {
    request,
    cancelRequest,
    getFulUrl,
    // getHost,
    getFromFullUrl,
    downloadFile,
    getImagePath,
    convertImageUrlToBase64,
    saveBaseToDevice,
    convertUriToBase64,
  };
};

export const qerystring = (paramsObj: any) => {
  var str = Object.keys(paramsObj)
    .filter(key => paramsObj[key] != undefined)
    .map(function (key) {
      return key + '=' + paramsObj[key];
    })
    .join('&');
  return str;
};

// const getHost = (host: HostType) => {
//   switch (Configs.ENV) {
//     case 'DEV':
//       return host.test;
//     case 'STD':
//       return host.std;
//     case 'PROD':
//       return host.prod;
//     default:
//       return host.test;
//   }
// };

export const handleError = (
  err: any,
  store: StoreType,
  disableNoti?: boolean,
) => {
  try {
    if (disableNoti) {
      return;
    }
    let message = err?.response?.data?.error?.message;
    if (message) {
      store.dispatch(
        showNotice({ noticeType: 'warning', textNotice: message }),
      );
    } else if (err?.response?.data) {
      if (typeof err?.response?.data == 'string') {
        store.dispatch(
          showNotice({
            noticeType: 'warning',
            textNotice: err?.response?.data,
          }),
        );
      } else {
        store.dispatch(
          showNotice({
            noticeType: 'warning',
            textNotice: JSON.stringify(err?.response?.data),
          }),
        );
      }
    } else {
      store.dispatch(
        showNotice({ noticeType: 'warning', textNotice: err.message }),
      );
    }
  } catch {}
};

export default RequestHelper;
