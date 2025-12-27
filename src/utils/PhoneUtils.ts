import {
  parsePhoneNumberFromString,
  AsYouType,
  CountryCode,
} from 'libphonenumber-js/max';

export type FormatStyle = 'E.164' | 'INTERNATIONAL' | 'NATIONAL' | 'LOCAL';

export function normalizeRaw(phone?: string | null): string {
  if (!phone) return '';
  return phone.replace(/[\s-.()]/g, '').trim();
}

export function parsePhone(phone: string, country?: CountryCode | string) {
  if (!phone) return null;
  const raw = normalizeRaw(phone);
  try {
    const pn = parsePhoneNumberFromString(
      raw,
      (country as CountryCode) || undefined,
    );
    return pn || null;
  } catch (e) {
    return null;
  }
}

function stripLeadingPlus(s: string | null | undefined): string | null {
  if (!s) return null;
  return s.startsWith('+') ? s.slice(1) : s;
}

export function formatPhoneNumber(
  phone: string,
  {
    country,
    style = 'E.164',
    strict = false,
    noPlus = false,
  }: {
    country?: CountryCode | string;
    style?: FormatStyle;
    strict?: boolean;
    noPlus?: boolean;
  } = {},
): string | null {
  const pn = parsePhone(phone, country);
  if (!pn) return null;

  if (strict && !pn.isValid()) return null;

  switch (style) {
    case 'E.164': {
      const e164 = pn.number; // +84...
      return noPlus ? stripLeadingPlus(e164) : e164;
    }
    case 'INTERNATIONAL': {
      const intl = pn.formatInternational(); // e.g. +84 90 123 4567
      return noPlus ? stripLeadingPlus(intl) : intl;
    }
    case 'NATIONAL':
      return pn.formatNational(); // no leading plus anyway
    case 'LOCAL':
      return pn.nationalNumber;
    default: {
      const fallback = pn.number;
      return noPlus ? stripLeadingPlus(fallback) : fallback;
    }
  }
}

export function ensureLeadingZeroVN(phone?: string | null): string | null {
  if (!phone) return null;
  const raw = normalizeRaw(phone);

  if (raw.startsWith('+')) {
    if (raw.startsWith('+84')) return '0' + raw.slice(3);
    return raw; // giữ nguyên cho quốc tế khác
  }
  if (raw.startsWith('84') && raw.length > 2) {
    return '0' + raw.slice(2);
  }
  if (raw.startsWith('0')) return raw;
  // mặc định thêm 0
  return '0' + raw;
}

export function getCountryOfNumber(
  phone: string,
  country?: CountryCode | string,
): string | null {
  const pn = parsePhone(phone, country);
  return pn ? pn.country || null : null;
}

export function formatAsYouType(
  phone: string,
  country?: CountryCode | string,
): string {
  try {
    const out = new AsYouType((country as CountryCode) || undefined).input(
      phone,
    );
    return out;
  } catch {
    return phone;
  }
}

export function validatePhoneWithLib(phone: string, countryCode: string) {
  const pn = parsePhoneNumberFromString(phone, countryCode as any);
  if (!pn) return false;
  console.log(
    'country=',
    pn.country,
    'E164=',
    pn.number,
    'national=',
    pn.nationalNumber,
  );
  console.log(
    'isPossible=',
    pn.isPossible && pn.isPossible(),
    'isValid=',
    pn.isValid(),
  );
  return pn.isValid();
}

export function formatE164(phone: string, countryCode: string, noPlus = false) {
  try {
    const phoneNumber = parsePhoneNumberFromString(phone, countryCode as any);
    const e164 = phoneNumber ? phoneNumber.number : null; // E.164 (with +)
    return noPlus ? stripLeadingPlus(e164) : e164;
  } catch (e) {
    return null;
  }
}

export const maskSensitiveInfo = (input: any): string => {
  if (!input) return '';
  // Trường hợp email
  if (input.includes('@')) {
    const [name, domain] = input.split('@');
    if (name.length <= 2) {
      // email quá ngắn, ẩn toàn bộ phần tên
      return '*'.repeat(name.length) + '@' + domain;
    }
    // Giữ 2 ký tự đầu, ẩn phần còn lại trước dấu @
    return name.slice(0, 2) + '*'.repeat(name.length - 2) + '@' + domain;
  }

  // Trường hợp số điện thoại (chỉ chứa số)
  const phone = input.replace(/\D/g, '');
  if (/^\d+$/.test(phone)) {
    const masked = phone.replace(/(\d{3})\d{4}(\d+)/, '$1****$2');
    return '+' + masked; // 👉 Thêm dấu +
  }
  //Các chuỗi khác thì ẩn phần giữa (dự phòng)
  if (input.length > 6) {
    return (
      input.slice(0, 3) +
      '*'.repeat(Math.min(4, input.length - 6)) +
      input.slice(-3)
    );
  }

  return '*'.repeat(input.length);
};
