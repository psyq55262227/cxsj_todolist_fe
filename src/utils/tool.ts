export const timeFormatter = (time: number) => {
  const zero = (num: number) => (num < 10 ? `0${num}` : `${num}`);
  const date = new Date(time);
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  return `${year}-${zero(month)}-${zero(day)} ${zero(hour)}:${zero(min)}:${zero(
    sec
  )}`;
};
