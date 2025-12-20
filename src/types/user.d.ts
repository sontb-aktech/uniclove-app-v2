type UserInfoType = {
  id?: string;
  oldId?: string;
  name?: string | null;
  email?: string;
  photo?: string | null;
  createAt?: number;
  updateAt?: number;
  status?: number;
  fcmToken?: string;
  fcmTokens?: string[];
  fcmDeviceTokens?: {[key: string]: string};
  // threadsPin?: string[];
  suggestionsPin?: string[];
  isGuest?: boolean;
  favoriteImages?: string[];
  isDeleted?: boolean;
  namesForSearch?: string[];
};
