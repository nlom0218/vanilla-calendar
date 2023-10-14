import Calendar from './Calendar';
import { $ } from './dom';
import handleShiftMonth from './handler/handleShiftMonth';
import yearMonthTemplate from './template/yearMonthTemplate';

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

  remove = () => {
    $('.calendar').innerHTML = '';
    this.unregisterEventListener();
  };

  private renderCalendar = () => {
    const getDayOfWeekClassName = (dayOfWeek: number) => {
      if (dayOfWeek === 0) return 'sunday';

      if (dayOfWeek === 6) return 'saturday';

      return 'weekday';
    };

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

    $('.schedule-container').innerHTML =
      yearMonthTemplate(
        'schedule',
        this.#calendar.getYear(),
        this.#calendar.getMonth()
      ) + calendarTemplate;

    this.registerEventListener();
  };

  private registerEventListener = () => {
    $('.shift-month-button-container').addEventListener('click', (event) =>
      handleShiftMonth(event, this.#calendar, this.renderCalendar)
    );
  };

  private unregisterEventListener = () => {
    $('.shift-month-button-container').removeEventListener('click', (event) =>
      handleShiftMonth(event, this.#calendar, this.renderCalendar)
    );
  };
}

export default Schedule;
