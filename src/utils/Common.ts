import Constants from './Constants';
//@ts-ignore
import en from 'moment/locale/en-gb';
//@ts-ignore
import es from 'moment/locale/es';
//@ts-ignore
import pt from 'moment/locale/pt';
//@ts-ignore
import pt_br from 'moment/locale/pt-br';

//@ts-ignore
import hi from 'moment/locale/hi';
//@ts-ignore
import ja from 'moment/locale/ja';
//@ts-ignore
import vi from 'moment/locale/vi';
//@ts-ignore
import af from 'moment/locale/af';
//@ts-ignore
import bn from 'moment/locale/bn';
//@ts-ignore
import de from 'moment/locale/de';
//@ts-ignore
import fr from 'moment/locale/fr';
//@ts-ignore
import id from 'moment/locale/id';
//@ts-ignore
import ko from 'moment/locale/ko';
//@ts-ignore
import ru from 'moment/locale/ru';
//@ts-ignore
import zh from 'moment/locale/zh-cn';

export const formatMentions = (input: string) => {
  if (input.includes('@loopie')) {
    return input.replace(/@loopie/g, '@[loopie](1)');
  }
  return input;
};

export const LIST_LANGUAGE: LangType[] = [
  {
    name: 'English',
    name_en: 'English',
    code: 'en',
    tag: 'en-US',
    country: 'United States',
    flag: require('assets/img_flag_en_us.png'),
    momentLocale: en,
  },
  {
    name: 'Español',
    name_en: 'Spanish',
    code: 'es',
    tag: 'es',
    country: 'Spain',
    flag: require('assets/img_flag_es.png'),
    momentLocale: es,
  },
  {
    name: 'Português',
    name_en: 'Portuguese',
    code: 'pt',
    tag: 'pt-PT',
    country: 'Portugal',
    flag: require('assets/img_flag_pt_pt.png'),
    momentLocale: pt,
  },
  {
    name: 'हिंदी',
    name_en: 'Hindi',
    code: 'hi',
    tag: 'hi',
    country: 'India',
    flag: require('assets/img_flag_hi.png'),
    momentLocale: hi,
  },
  {
    name: 'Deutsch',
    name_en: 'German',
    code: 'de',
    tag: 'de',
    country: 'Germany',
    flag: require('assets/img_flag_de.png'),
    momentLocale: de,
  },
  {
    name: '日本語',
    name_en: 'Japanese',
    code: 'ja',
    tag: 'ja',
    country: 'Japan',
    flag: require('assets/img_flag_ja.png'),
  },
  {
    name: 'Tiếng Việt',
    name_en: 'Vietnamese',
    code: 'vi',
    tag: 'vi',
    country: 'Vietnam',
    flag: require('assets/img_flag_vi.png'),
    momentLocale: vi,
  },
  {
    name: 'Français',
    name_en: 'French',
    code: 'fr',
    tag: 'fr',
    country: 'France',
    flag: require('assets/img_flag_fr.png'),
    momentLocale: fr,
  },
  {
    name: '中文',
    name_en: 'Chinese',
    code: 'zh',
    tag: 'zh',
    country: 'China',
    flag: require('assets/img_flag_zh.png'),
    momentLocale: zh,
  },
  {
    name: 'Русский',
    name_en: 'Russian',
    code: 'ru',
    tag: 'ru',
    country: 'Russia',
    flag: require('assets/img_flag_ru.png'),
    momentLocale: ru,
  },
  {
    name: 'Bahasa Indonesia',
    name_en: 'Indonesian',
    code: 'in',
    tag: 'in',
    country: 'Indonesia',
    flag: require('assets/img_flag_in.png'),
    momentLocale: id,
  },
  {
    name: 'English (Philippines)',
    name_en: 'English (Philippines)',
    code: 'en',
    tag: 'en-PH',
    country: 'Philippines',
    flag: require('assets/img_flag_en_ph.png'),
    momentLocale: en,
  },
  {
    name: 'বাংলা',
    name_en: 'Bengali',
    code: 'bn',
    tag: 'bn',
    country: 'Bangladesh',
    flag: require('assets/img_flag_bn.png'),
    momentLocale: bn,
  },
  {
    name: 'Português (Brasil)',
    name_en: 'Portuguese (Brazil)',
    code: 'pt',
    tag: 'pt-BR',
    country: 'Brazil',
    flag: require('assets/img_flag_pt_br.png'),
    momentLocale: pt_br,
  },
  {
    name: 'Afrikaans',
    name_en: 'Afrikaans',
    code: 'af',
    tag: 'af-ZA',
    country: 'South Africa',
    flag: require('assets/img_flag_af_za.png'),
    momentLocale: af,
  },
  {
    name: 'English (Canada)',
    name_en: 'English (Canada)',
    code: 'en',
    tag: 'en-CA',
    country: 'Canada',
    flag: require('assets/img_flag_en_ca.png'),
    momentLocale: en,
  },
  {
    name: 'English (UK)',
    name_en: 'English (United Kingdom)',
    code: 'en',
    tag: 'en-GB',
    country: 'United Kingdom',
    flag: require('assets/img_flag_en_gb.png'),
    momentLocale: en,
  },
  {
    name: '한국어',
    name_en: 'Korean',
    code: 'ko',
    tag: 'ko',
    country: 'South Korea',
    flag: require('assets/img_flag_ko.png'),
    momentLocale: ko,
  },
  // {
  //   name: 'Nederlands',
  //   code: 'nl',
  //   tag: 'nl',
  //   flag: require('assets/img_flag_nl.png'),
  //   momentLocale: nl
  // },
];

export const LIST_THEME = [
  {
    name: 'User_device',
    icon: {uri: 'ic_device_theme'},
    code: undefined,
  },
  {
    name: 'Dark_Mode',
    icon: {uri: 'ic_dark_mode'},
    code: 'dark',
  },
  {
    name: 'Light_Mode',
    icon: {uri: 'ic_light_mode'},
    code: 'light',
  },
];

export const safety_settings_gemini = [
  {
    threshold: 'BLOCK_NONE',
    category: 'HARM_CATEGORY_HARASSMENT',
  },
  {
    threshold: 'BLOCK_NONE',
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
  },
  {
    threshold: 'BLOCK_NONE',
    category: 'HARM_CATEGORY_HATE_SPEECH',
  },
  {
    threshold: 'BLOCK_NONE',
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
  },
];

export function removeUndefinedFields<T extends object>(obj: T): T {
  if (!obj) {
    return obj;
  }
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as T);
}

function escapeRegExp(string: string) {
  // The $& at the end means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function hideEmail(email?: string): string {
  if (!email) {
    return '';
  }
  const atIndex = email.indexOf('@');
  if (atIndex > 0) {
    const prefix = email.substring(0, Math.min(4, atIndex));
    const hiddenPart = '***';
    const domain = email.substring(atIndex);
    return prefix + hiddenPart + domain;
  }
  return email;
}
