import axios from 'axios';
import moment from 'moment';
// import RNFetchBlob from 'rn-fetch-blob';
import {StoreType} from 'stores';
import CommonSlice, {showNotice} from 'stores/CommonSlice';
import Configs from 'configs';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const RequestHelper = () => {
  const source = axios.CancelToken.source();

  const get = async (
    host: HostType,
    url: string,
    paramsObj?: any,
    disableNoti?: boolean,
    header?: {[key: string]: string},
  ) => {
    const store = require('stores').default as StoreType;

    try {
      let urlFull = getFulUrl(host, url, paramsObj);
      console.log('RequestHelper url = ' + urlFull);

      let res: any = await axios({
        method: 'get',
        url: urlFull,
        cancelToken: source.token,
        // headers: {
        //   'X-TYPESENSE-API-KEY': 'rfsZxJndOxtr3qd7F1ra6j9S5WXU614J',
        // },
        headers: {
          'Content-Type': 'application/json',
          // accept: 'application/json',
          ...header,
          // 'X-Goog-Api-Key': token,
        },
      });

      console.log(res, url);
      if (res.status.toString().startsWith('2')) {
        return res.data;
      }
      console.log(res, 'error ' + url);
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + url);
      handleError(err, store, disableNoti);
      throw err;
    }
  };

  const post = async (
    host: HostType,
    url: string,
    objectPrams: any,
    token?: string,
    header?: {[key: string]: string},
    timeout?: number,
  ) => {
    const store = require('stores').default as StoreType;
    try {
      // !disableLoading && store.dispatch(CommonSlice.actions.showLoading());
      let urlFull = `${getHost(host)}${url}`;
      console.log('RequestHelper post url = ' + urlFull);
      console.log(JSON.stringify(objectPrams));
      let res: any = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
          ...header,
          // 'X-Goog-Api-Key': token,
        },
        data: objectPrams,
        url: urlFull,
        cancelToken: source.token,
        timeout,
      });
      // console.log(res, url);
      if (res.status == 200) {
        return res.data;
      }
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + url);
      handleError(err, store, false);
      throw err;
    } finally {
      // !disableLoading && store.dispatch(CommonSlice.actions.closeLoading());
    }
  };

  const postFormData = async (
    host: HostType,
    url: string,
    objectPrams: any,
    token?: string,
    header?: {[key: string]: string},
  ) => {
    const store = require('stores').default as StoreType;
    try {
      // !disableLoading && store.dispatch(CommonSlice.actions.showLoading());
      let urlFull = `${getHost(host)}${url}`;
      console.log('RequestHelper postFormData url = ' + urlFull);
      var bodyFormData = new FormData();
      for (var key in objectPrams) {
        if (objectPrams[key]) {
          console.log(`${key}:${objectPrams[key]}`);
          bodyFormData.append(key, objectPrams[key]);
        }
      }

      let res: any = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : undefined,
          ...header,
          // 'X-Goog-Api-Key': token,
        },
        data: bodyFormData,
        url: urlFull,
        cancelToken: source.token,
      });
      // console.log(res, url);
      if (res.status == 200) {
        return res.data;
      }
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + url);
      handleError(err, store, true);
      throw err;
    } finally {
      // !disableLoading && store.dispatch(CommonSlice.actions.closeLoading());
    }
  };

  const put = async (
    host: HostType,
    url: string,
    objectPrams: any,
    disableLoading?: boolean,
    disableNoti?: boolean,
    headers?: any,
  ) => {
    const store = require('stores').default as StoreType;
    try {
      // !disableLoading && store.dispatch(CommonSlice.actions.showLoading());
      let urlFull = `${getHost(host)}${url}`;
      console.log('RequestHelper put url = ' + urlFull);
      console.log(JSON.stringify(objectPrams));
      let res: any = await axios({
        method: 'PUT',
        headers: headers
          ? headers
          : {
              'Content-Type': 'application/json',
            },
        data: objectPrams,
        url: urlFull,
        cancelToken: source.token,
      });
      console.log(res, url);
      if (res.status == 200) {
        return res.data;
      }
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + url);
      handleError(err, store, disableNoti);
      throw err;
    } finally {
      // !disableLoading && store.dispatch(CommonSlice.actions.closeLoading());
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

  const getFulUrl = (host?: HostType, url?: string, params?: any) => {
    return `${host ? getHost(host) : ''}${url}${
      params ? '?' + qerystring(params) : ''
    }`;
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

  const remove = async (
    host: HostType,
    url: string,
    objectPrams?: any,
    disableLoading?: boolean,
    disableNoti?: boolean,
  ) => {
    const store = require('stores').default as StoreType;
    try {
      // !disableLoading && store.dispatch(CommonSlice.actions.showLoading());
      let urlFull = `${getHost(host)}${url}`;
      console.log('RequestHelper post url = ' + urlFull);
      // console.log(JSON.stringify(objectPrams));
      let res: any = await axios({
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        data: objectPrams,
        url: urlFull,
        cancelToken: source.token,
        // timeout: 7000,
      });
      console.log(res, url);
      if (res.status == 200) {
        return res.data;
      }
      throw res;
    } catch (err: any) {
      console.log(err, 'error ' + url);
      handleError(err, store, disableNoti);
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
          {name: imageName, parentFolder: '', mimeType: 'image/jpeg'},
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

  const downloadAudio = async (
    host: HostType,
    url: string,
    params: any,
    token?: string,
    headers?: any,
  ) => {
    let dirs = `${RNFS.CachesDirectoryPath}/${moment().valueOf()}.mp3`;
    let urlFull = `${getHost(host)}${url}`;
    const result = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: dirs,
    }).fetch(
      'POST',
      urlFull,
      {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...headers,
        // 'X-Goog-Api-Key': token,
      },
      JSON.stringify(params),
    );
    return result.path();
  };

  const convertImageUrlToBase64 = async (imageUrl: string) => {
    try {
      // Tải hình ảnh về bộ nhớ tạm thời
      const downloadDest = `${RNFS.TemporaryDirectoryPath}/temp.jpg`;
      const {promise} = RNFS.downloadFile({
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
        {onlyScaleDown: true},
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
    get,
    post,
    put,
    cancelRequest,
    getFulUrl,
    getHost,
    getFromFullUrl,
    remove,
    downloadFile,
    getImagePath,
    downloadAudio,
    postFormData,
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

const getHost = (host: HostType) => {
  switch (Configs.ENV) {
    case 'DEV':
      return host.test;
    case 'STD':
      return host.std;
    case 'PROD':
      return host.prod;
    default:
      return host.test;
  }
};

const handleError = (err: any, store: StoreType, disableNoti?: boolean) => {
  try {
    let message = err?.response?.data?.message;
    if (message) {
      !disableNoti &&
        store.dispatch(
          showNotice({noticeType: 'warning', textNotice: message}),
        );
    } else if (err?.response?.data) {
      !disableNoti &&
        store.dispatch(
          showNotice({
            noticeType: 'warning',
            textNotice: JSON.stringify(err?.response?.data),
          }),
        );
    } else {
      !disableNoti &&
        store.dispatch(
          showNotice({noticeType: 'warning', textNotice: err.message}),
        );
    }
  } catch {}
};

export default RequestHelper;
