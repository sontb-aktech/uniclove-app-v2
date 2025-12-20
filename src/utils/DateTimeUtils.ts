import moment from 'moment';
//@ts-ignore
import es from 'moment/locale/es';
moment.updateLocale('es', es);

export const unixToMoment = (dateTime: number) => {
  return moment.unix(dateTime);
};

export const unixToDateCreate = (dateTime: number) => {
  return moment.unix(dateTime).format('DD MMM HH:mm');
};

export const milisecondToMoment = (dateTime: number) => {
  return moment(dateTime);
};

export const ddMMtoddMMM = (date: string) => {
  return moment(date, 'DD/MM').format('DD MMM');
};
