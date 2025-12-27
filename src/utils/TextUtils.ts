import moment from 'moment';

const verifyUserName = (userName: string): boolean => {
  var usernameRegex = /^[a-zA-Z0-9]+$/;

  return usernameRegex.test(userName);
};

const verifyFullName = (fullName?: string): boolean => {
  if (!fullName) return false;

  const nameRegex = /^[\p{L} ,.'-]{3,}$/u;
  return nameRegex.test(fullName);
};

const verifyEmail = (email?: string): boolean => {
  if (!email) return false;
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const verifyPhone = (phone?: string): boolean => {
  if (!phone) return false;
  if (phone.length != 10) return false;
  var phoneExp = /(0[0-9])+([0-9]{8})\b/g;
  return phoneExp.test(phone) && !phone.startsWith('00');
};

const verifyPass = (pass: string): boolean => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return pattern.test(pass);
};

const moneyFormat = (num?: string) => {
  try {
    if (!num) return '';
    let newNum = num;
    newNum = newNum.replace(/\D+/g, '');
    let _dot = '.';
    let parts = newNum.toString().split(_dot);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, _dot);
    let foo = parts.join(_dot);
    return foo;
  } catch {
    return '';
  }
};

const moneyToText = (num?: string) => {
  if (!num) return '';
  return num.replace(/\./g, '');
};

const moneyToNumber = (money?: string): number => {
  if (!money) return 0;
  try {
    return Number(moneyToText(money));
  } catch {}
  return 0;
};

const numberFormat = (num?: string) => {
  if (!num) return '';
  return num.replace(/\D+/g, '');
};

const normalizeText = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/ð/g, 'd')
    .replace(/Ð/g, 'D')
    .replace(/Đ/g, 'D')
    .toLowerCase();
};

const search = (text: string, keyword?: string) => {
  if (!keyword) return true;
  return normalizeText(text).includes(normalizeText(keyword));
};

const docSo3ChuSo = (baso: number) => {
  const ChuSo = new Array(
    ' không ',
    ' một ',
    ' hai ',
    ' ba ',
    ' bốn ',
    ' năm ',
    ' sáu ',
    ' bảy ',
    ' tám ',
    ' chín ',
  );
  var tram;
  var chuc;
  var donvi;
  var KetQua = '';
  tram = parseInt((baso / 100).toString());
  chuc = parseInt(((baso % 100) / 10).toString());
  donvi = baso % 10;
  if (tram == 0 && chuc == 0 && donvi == 0) return '';
  if (tram != 0) {
    KetQua += ChuSo[tram] + ' trăm ';
    if (chuc == 0 && donvi != 0) KetQua += ' linh ';
  }
  if (chuc != 0 && chuc != 1) {
    KetQua += ChuSo[chuc] + ' mươi';
    if (chuc == 0 && donvi != 0) KetQua = KetQua + ' linh ';
  }
  if (chuc == 1) KetQua += ' mười ';
  switch (donvi) {
    case 1:
      if (chuc != 0 && chuc != 1) {
        KetQua += ' mốt ';
      } else {
        KetQua += ChuSo[donvi];
      }
      break;
    case 5:
      if (chuc == 0) {
        KetQua += ChuSo[donvi];
      } else {
        KetQua += ' lăm ';
      }
      break;
    default:
      if (donvi != 0) {
        KetQua += ChuSo[donvi];
      }
      break;
  }
  return KetQua;
};

const readMoneyVND = (SoTien: number) => {
  const Tien = new Array(
    '',
    ' nghìn',
    ' triệu',
    ' tỷ',
    ' nghìn tỷ',
    ' triệu tỷ',
  );
  var lan = 0;
  var i = 0;
  var so = 0;
  var KetQua = '';
  var tmp = '';
  var soAm = false;
  var ViTri = new Array();
  if (SoTien < 0) soAm = true; //return "Số tiền âm !";
  if (SoTien == 0) return 'Không đồng'; //"Không đồng !";
  if (SoTien > 0) {
    so = SoTien;
  } else {
    so = -SoTien;
  }
  if (SoTien > 8999999999999999) {
    //SoTien = 0;
    return ''; //"Số quá lớn!";
  }
  ViTri[5] = Math.floor(so / 1000000000000000);
  if (isNaN(ViTri[5])) ViTri[5] = '0';
  so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
  ViTri[4] = Math.floor(so / 1000000000000);
  if (isNaN(ViTri[4])) ViTri[4] = '0';
  so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
  ViTri[3] = Math.floor(so / 1000000000);
  if (isNaN(ViTri[3])) ViTri[3] = '0';
  so = so - parseFloat(ViTri[3].toString()) * 1000000000;
  ViTri[2] = parseInt((so / 1000000).toString());
  if (isNaN(ViTri[2])) ViTri[2] = '0';
  ViTri[1] = parseInt(((so % 1000000) / 1000).toString());
  if (isNaN(ViTri[1])) ViTri[1] = '0';
  ViTri[0] = parseInt((so % 1000).toString());
  if (isNaN(ViTri[0])) ViTri[0] = '0';
  if (ViTri[5] > 0) {
    lan = 5;
  } else if (ViTri[4] > 0) {
    lan = 4;
  } else if (ViTri[3] > 0) {
    lan = 3;
  } else if (ViTri[2] > 0) {
    lan = 2;
  } else if (ViTri[1] > 0) {
    lan = 1;
  } else {
    lan = 0;
  }
  for (i = lan; i >= 0; i--) {
    tmp = docSo3ChuSo(ViTri[i]);
    KetQua += tmp;
    if (ViTri[i] > 0) KetQua += Tien[i];
    if (i > 0 && tmp.length > 0) KetQua += ''; //',';//&& (!string.IsNullOrEmpty(tmp))
  }
  if (KetQua.substring(KetQua.length - 1) == ',') {
    KetQua = KetQua.substring(0, KetQua.length - 1);
  }
  KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
  if (soAm) {
    return 'Âm ' + KetQua + ' đồng'; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  } else {
    return KetQua + ' đồng'; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
  }
};

const phoneFormat = (phone: string) => {
  return `${phone.substring(0, 4)}.${phone.substring(4, 7)}.${phone.substring(
    7,
    10,
  )}`;
};

const secondFormat = (time: number) => {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }
  ret += '' + (mins < 10 ? `0${mins}` : mins) + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};

const formatAccountBalance = (accountBalance?: number): string => {
  if (!accountBalance || accountBalance == 0) {
    return '0VNĐ';
  } else {
    return `${accountBalance}VNĐ`;
  }
};

const protectPhone = (phone?: string) => {
  if (!phone) return '';
  try {
    return phone.replace(phone.substring(0, 6), '*');
  } catch {}
  return '';
};

const removeUnicodeChar = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)
  return str;
};

export default {
  verifyPass,
  verifyUserName,
  verifyFullName,
  verifyEmail,
  verifyPhone,
  moneyFormat,
  normalizeText,
  search,
  numberFormat,
  moneyToNumber,
  readMoneyVND,
  phoneFormat,
  secondFormat,
  formatAccountBalance,
  protectPhone,
  removeUnicodeChar,
};
