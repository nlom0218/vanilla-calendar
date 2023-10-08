import Calendar from './Calendar';

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;

const month1 = new Calendar(year, month); // 오늘 기준 23년 10월 달력
const month2 = new Calendar(2023, 7); // 23년 7월 달력
const month3 = new Calendar(2023, 8); // 23년 8월 달력
