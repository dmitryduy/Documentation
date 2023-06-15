const addLeadingZeros = (value: any) => value.toString().padStart(2, '0');

export const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  const time = `${dateObject.getHours()}:${addLeadingZeros(dateObject.getMinutes())}`;
  const dateInfo = `${dateObject.getDate()}/${addLeadingZeros(dateObject.getMonth() + 1)}/${dateObject.getFullYear()}`;
  return `${time} ${dateInfo}`;
};