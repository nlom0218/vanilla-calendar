import Calendar from './Calendar';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

const month1 = new Calendar(year, month);
month1.getCalendarStorage(); // 오늘 기준 23년 10월 달력 정보

const month2 = new Calendar(2023, 7);
month2.getCalendarStorage(); // 23년 7월 달력 정보

const month3 = new Calendar(2023, 8);
month3.getCalendarStorage(); // 23년 8월 달력 정보
