import dayjs from 'dayjs';
// 获取最近七天的日期
export const getLastDays = (day: number) => {
  let days = [];
  for (let i = day; i > 0; i--) {
    days.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD')); // 格式化为MM-DD
  }
  return days;
};
