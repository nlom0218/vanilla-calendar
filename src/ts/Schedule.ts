import Calendar from './Calendar';
import { $ } from './dom';
import handleShiftMonth from './handler/handleShiftMonth';
import yearMonthTemplate from './template/yearMonthTemplate';

class Schedule {
  #calendar;
  #isOpenNavigation = false;

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
    if (this.#isOpenNavigation) {
      this.#isOpenNavigation = false;
    }

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

  private renderNavigation = () => {
    const navigationYear = this.#calendar.getNavigationYear();
    const year = this.#calendar.getYear();

    const isScheduleMonth = (month: number) => {
      if (navigationYear !== year) return false;

      return this.#calendar.getNavigationMonth() === month;
    };

    const navigationTemplate = `
      <div class="schedule-navigation">
        <div class="schedule-navigation-year">
          <span>${navigationYear}</span>
          <div class="schedule-navigation-year-buttons">
            <button class="schedule-navigation-year-button" data-type="prev">◀︎</button>
            <button class="schedule-navigation-year-button" data-type="next">▶︎</button>
          </div>
        </div>
        <ul class="schedule-navigation-month-list">
          ${Array.from({ length: 12 })
            .map(
              (_, index) =>
                `<li class="schedule-navigation-month-item ${
                  isScheduleMonth(index + 1) ? 'schedule-month' : ''
                }" data-month="${index + 1}">${index + 1}월</li>`
            )
            .join('')}
        </ul>
      </div>
    `;

    $('.schedule-year-month').insertAdjacentHTML(
      'beforeend',
      navigationTemplate
    );

    this.registerNavigationEventListener();
  };

  private handleOpenNavigation = () => {
    if (this.#isOpenNavigation) {
      this.#isOpenNavigation = false;
      $('.schedule-navigation').remove();

      return;
    }

    this.#isOpenNavigation = true;
    this.renderNavigation();
  };

  private handleNavigateYear: EventListener = (event) => {
    const button = event.target;

    if (!(button instanceof HTMLButtonElement)) return;

    const type = button.dataset.type as 'next' | 'prev';
    const newNavigationYear =
      this.#calendar.getNavigationYear() + (type === 'next' ? +1 : -1);

    this.#calendar.navigateYear(newNavigationYear);

    $('.schedule-navigation').remove();
    this.renderNavigation();
  };

  private handleNavigateCalendar: EventListener = (event) => {
    const monthElement = event.target;

    if (!(monthElement instanceof HTMLLIElement)) return;

    const month = monthElement.dataset.month as string;

    this.#calendar.navigateMonth(Number(month));
    this.#calendar.navigate();

    $('.schedule-navigation').remove();
    this.renderCalendar();
  };

  private registerEventListener = () => {
    $('.shift-month-button-container').addEventListener('click', (event) =>
      handleShiftMonth(event, this.#calendar, this.renderCalendar)
    );

    $('.schedule-navigation-button').addEventListener(
      'click',
      this.handleOpenNavigation
    );
  };

  private registerNavigationEventListener = () => {
    $('.schedule-navigation-year-buttons').addEventListener('click', (event) =>
      this.handleNavigateYear(event)
    );

    $('.schedule-navigation-month-list').addEventListener('click', (event) =>
      this.handleNavigateCalendar(event)
    );
  };
}

export default Schedule;
