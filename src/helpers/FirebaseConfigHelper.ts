import remoteConfig from '@react-native-firebase/remote-config';

const getConfig = async () => {
  try {
    // await remoteConfig().fetch();
    await remoteConfig().fetchAndActivate();
    const config = remoteConfig();
    const parameters = config.getAll();
    let result = {} as { [key: string]: any };
    Object.entries(parameters).forEach($ => {
      const [key, entry] = $;
      result[key] = convertValue(entry.asString());
      // console.log(`${key}:${entry.asString()} `);
    });
    console.log('--- getFirebaseConfig', result);

    return result;
  } catch {}
};

function convertValue(value: string) {
  // Chuyển thành boolean nếu là "true" hoặc "false"
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;

  // Chuyển thành number nếu có thể
  if (!isNaN(Number(value))) return Number(value);

  // Chuyển thành object nếu có thể parse JSON
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed;
    }
  } catch (e) {
    // Không làm gì nếu JSON.parse thất bại
  }

  return value; // Trả về giá trị ban đầu nếu không phù hợp với kiểu nào
}

export default {
  getConfig,
};
