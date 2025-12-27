type CheckUserExistParams = {
  identity: string;
  linkAccountType?: string;
};
interface LoginParams {
  username: string;
  password: string;
  deviceInfo?: any;
}

type TokenResponseType = {
  accessToken: string;
  refreshToken: string;
};

type UserInfoType = {
  id: number;
  code: string;
  name: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  // coupleServiceType: 'SINGLE_DATING'|;
  // actorTypes: string[];
  phoneNumber: string;
  email: any;
  // password: string;
  // position: any;
  // roles: any[];
  // isActive: boolean;
  // userType: any;
  // profileCompletionRate: number;
  // featurePacks: FeaturePack[];
  userProfileDto: UserProfileDto;
};

interface FeaturePack {
  id: number;
  code: string;
  name: string;
  packageType: string;
  categoryType: string;
  createdAt: string;
  trialPeriodValue: number;
  trialPeriodType: string;
  state: string;
  isActive: boolean;
}

interface UserProfileDto {
  // id: number;
  // userId: number;
  // name: string;
  // birthday: string;
  // gender: string;
  avatarImages: ProfileAvatarType[];
  bioDescription: string;
  relProvince: string;
  // relWard: string;
  relLongitude: string;
  relLatitude: string;
  // height: number;
  // weight: number;
  // hometownProvince: HometownProvince | null;
  // hometownWard: HometownWard | null;
  // livingProvince: LivingProvince | null;
  // livingWard: LivingWard | null;
  targetGender: 'EVERYONE' | 'MALE' | 'FEMALE' | 'OTHER';
  // sexualOrientation: string;
  // preferredDistanceKm: number;
  // position: string;
  // company: string;
  // weightAboutMe: number;
  // isImportantAboutMe: boolean;
  // weightImages: number;
  // isImportantImages: boolean;
  // userProfileAttribute: UserProfileAttribute[];
}

type ProfileAvatarType = {
  name: string | null;
  url: string;
  relativeUrl: string | null;
};

interface HometownProvince {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeUnitId: string;
}

interface HometownWard {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  provinceCode: string;
  administrativeUnitId: string;
}
interface LivingProvince {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeUnitId: string;
}

interface LivingWard {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  provinceCode: string;
  administrativeUnitId: string;
}

interface UserProfileAttribute {
  parentId: any;
  category: CategoryUserProfile;
}

interface CategoryUserProfile {
  id: number;
  code: string;
  name: string;
  description?: string;
  isDisplay: boolean;
  surveyType?: string;
  isRequired: boolean;
  createdAt: string;
  isActive: boolean;
  sequence: number;
  attributeGroups: AttributeGroupUserProfile[];
  isDefault?: boolean;
  isImportant?: boolean;
  weight?: number;
}

interface AttributeGroupUserProfile {
  id: number;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  isRequired: boolean;
  isActive: boolean;
  sequence: number;
  isMultipleSelect: boolean;
  attributes: Attribute[];
}

interface Attribute {
  id: number;
  code: string;
  name: string;
  description: any;
  createdAt: string;
  isActive: boolean;
  sequence: number;
  logoImage?: LogoImage;
}

interface LogoImage {
  name?: string;
  url: string;
  relativeUrl: string;
}

type CreateUserParams = {
  phoneNumber: string;
  codePhoneNumber?: string;
  password: string;
  actorTypes?: string[];
  name: string;
  birthday: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  userProfileRequest?: any;
};
