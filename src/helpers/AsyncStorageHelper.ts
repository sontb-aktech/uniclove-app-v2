import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageType = {
  getProerty: (property: string) => any;
};

const AsyncStorageHelper = (name: string) => {
  const persistPromise = AsyncStorage.getItem(`persist:${name}`);
  return {
    get: async () => {
      try {
        const persist = await persistPromise;
        const data = persist ? JSON.parse(persist) : undefined;
        return {
          getProerty: (property: string) => {
            try {
              return data?.[property] ? JSON.parse(data[property]) : undefined;
            } catch {}
          },
          data,
        } as StorageType;
      } catch {}
    },
  };
};

export default AsyncStorageHelper;
