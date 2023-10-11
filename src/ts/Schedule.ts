import Calendar from './Calendar';
import { $ } from './dom';

class Schedule {
  #calendar;

  constructor() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    this.#calendar = new Calendar(year, month);
  }

  render = () => {
    const containerTemplate = `
      <h1 class="title">Schedule Calendar</h1>
      <div class="schedule-container"></div>
    `;

    $('.calendar').innerHTML = containerTemplate;

    this.renderCalendar();
  };

  private renderCalendar = () => {
    const getDayOfWeekClassName = (dayOfWeek: number) => {
      if (dayOfWeek === 0) return 'sunday';

      if (dayOfWeek === 6) return 'saturday';

      return 'weekday';
    };

    const yearMonthTemplate = `
      <div class="schedule-year-month">
        ${this.#calendar.getYear()}년 ${this.#calendar.getMonth()}월
      </div>
    `;

    const calendarTemplate = `
      <ul class="schedule-day-of-weeks">
      ${['일', '월', '화', '수', '목', '금', '토']
        .map(
          (dayOfWeek, index) =>
            `<div class="schedule-day-of-week ${getDayOfWeekClassName(
              index
            )}">${dayOfWeek}</div>`
        )
        .join('')}
      </ul>
      <ul class="schedule-calendar">
        ${this.#calendar
          .getCalendarStorage()
          .map(
            ({ day, state, date, dayOfWeek }) =>
              `<li class="schedule-calendar-item">
              <span class="schedule-calendar-day ${`${state}-month`} ${getDayOfWeekClassName(
                dayOfWeek
              )} ${this.#calendar.isToday(date) && 'today'}">${day}</span>
              </li>`
          )
          .join('')}
      </ul>
    `;

    $('.schedule-container').innerHTML = yearMonthTemplate + calendarTemplate;
  };
}

export default Schedule;
