export const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  const time = `${dateObject.getHours()}:${dateObject.getMinutes()}`;
  const dateInfo = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
  return `${time} ${dateInfo}`;
};