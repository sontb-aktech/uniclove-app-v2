import {useEffect, useState} from 'react';
// import codepush from 'react-native-code-push';
import device from 'react-native-device-info';

const useVersion = () => {
  const [version, setVersion] = useState<string>('');
  useEffect(() => {
    async function asyncFun() {
      // const metadata = await codepush.getUpdateMetadata();
      const version = await device.getVersion();

      // if (metadata) {
      //   setVersion(metadata.appVersion + ' - ' + metadata.label);
      // } else {
      setVersion(version);
      // }
    }
    asyncFun();
  }, []);
  return version;
};

export default useVersion;
