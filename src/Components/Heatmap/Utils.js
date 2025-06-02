export function getMonthDays(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  const startDay = date.getDay();

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}