import format from '../utils/format';
import DatePickerCalendar from './DatePickerCalendar';
import { $ } from './dom';
import handleShiftMonth from './handler/handleShiftMonth';
import yearMonthTemplate from './template/yearMonthTemplate';

class DatePicker {
  #datePickerCalendar;
  #isOpenCalendar = false;

  constructor() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    this.#datePickerCalendar = new DatePickerCalendar(year, month);
  }

  initDatePicker = () => {
    this.#datePickerCalendar.init();
    this.#isOpenCalendar = false;
  };

  render = () => {
    const containerTemplate = `
			<h1 class="title">Date Picker Calendar</h1>
			<div class="date-picker-container">
				<div class="date-picker-input-layout"></div>
			</div>
    `;

    $('.calendar').innerHTML = containerTemplate;

    this.renderInput();
  };

  private renderInput = () => {
    const startDate = this.#datePickerCalendar.getStartDate();
    const endDate = this.#datePickerCalendar.getEndDate();

    const inputTemplate = `
			<div class="selected-date">
			${
        startDate
          ? `
            <span>${format.date(startDate, '-')}</span>
            <span>~</span>
            <span>${endDate ? format.date(endDate, '-') : ''}</span>
						`
          : '<span class="not-selected-date">시작일과 종료일을 선택해 주세요.</span>'
      }
			</div>
			<button class="date-picker-input-button">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" fill="none">
					<path
						d="M23.75 5H21.25V3.75C21.25 3.41848 21.1183 3.10054 20.8839 2.86612C20.6495 2.6317 20.3315 2.5 20 2.5C19.6685 2.5 19.3505 2.6317 19.1161 2.86612C18.8817 3.10054 18.75 3.41848 18.75 3.75V5H11.25V3.75C11.25 3.41848 11.1183 3.10054 10.8839 2.86612C10.6495 2.6317 10.3315 2.5 10 2.5C9.66848 2.5 9.35054 2.6317 9.11612 2.86612C8.8817 3.10054 8.75 3.41848 8.75 3.75V5H6.25C5.25544 5 4.30161 5.39509 3.59835 6.09835C2.89509 6.80161 2.5 7.75544 2.5 8.75V23.75C2.5 24.7446 2.89509 25.6984 3.59835 26.4017C4.30161 27.1049 5.25544 27.5 6.25 27.5H23.75C24.7446 27.5 25.6984 27.1049 26.4017 26.4017C27.1049 25.6984 27.5 24.7446 27.5 23.75V8.75C27.5 7.75544 27.1049 6.80161 26.4017 6.09835C25.6984 5.39509 24.7446 5 23.75 5ZM25 23.75C25 24.0815 24.8683 24.3995 24.6339 24.6339C24.3995 24.8683 24.0815 25 23.75 25H6.25C5.91848 25 5.60054 24.8683 5.36612 24.6339C5.1317 24.3995 5 24.0815 5 23.75V15H25V23.75ZM25 12.5H5V8.75C5 8.41848 5.1317 8.10054 5.36612 7.86612C5.60054 7.6317 5.91848 7.5 6.25 7.5H8.75V8.75C8.75 9.08152 8.8817 9.39946 9.11612 9.63388C9.35054 9.8683 9.66848 10 10 10C10.3315 10 10.6495 9.8683 10.8839 9.63388C11.1183 9.39946 11.25 9.08152 11.25 8.75V7.5H18.75V8.75C18.75 9.08152 18.8817 9.39946 19.1161 9.63388C19.3505 9.8683 19.6685 10 20 10C20.3315 10 20.6495 9.8683 20.8839 9.63388C21.1183 9.39946 21.25 9.08152 21.25 8.75V7.5H23.75C24.0815 7.5 24.3995 7.6317 24.6339 7.86612C24.8683 8.10054 25 8.41848 25 8.75V12.5Z"
						fill="rgb(80, 80, 80)"
					/>
				</svg>
			</button>
    `;

    $('.date-picker-input-layout').innerHTML = inputTemplate;

    this.registerDatePickerButtonEventListener();
  };

  private renderCalendarLayout = () => {
    const layoutTemplate = document.createElement('div');
    layoutTemplate.className = 'date-picker-calendar-layout';

    $('.date-picker-container').insertAdjacentElement(
      'beforeend',
      layoutTemplate
    );

    this.renderCalendar();
  };

  private renderCalendar = () => {
    const isSelected = (date: Date) => {
      return (
        this.#datePickerCalendar.isEqualStartDate(date) ||
        this.#datePickerCalendar.isEqualEndDate(date)
      );
    };

    const calendarTemplate = `
			<ul class="date-picker-calendar">
				${['일', '월', '화', '수', '목', '금', '토']
          .map(
            (dayOfWeek) =>
              `<div class="date-picker-day-of-week">${dayOfWeek}</div>`
          )
          .join('')}
				${this.#datePickerCalendar
          .getCalendarStorage()
          .map(
            ({ day, state, date }) =>
              `<li class="date-picker-calendar-day ${`${state}-month`} ${
                this.#datePickerCalendar.isToday(date) ? 'today' : ''
              } ${isSelected(date) ? 'selected' : ''} ${
                this.#datePickerCalendar.isIncludedDate(date) ? 'included' : ''
              }" data-date=${`${format.date(date, '-')}`}>${day}</li>`
          )
          .join('')}
			</ul>
		`;

    $('.date-picker-calendar-layout').innerHTML =
      yearMonthTemplate(
        'datePicker',
        this.#datePickerCalendar.getYear(),
        this.#datePickerCalendar.getMonth()
      ) + calendarTemplate;

    this.registerCalendarEventListener();
  };

  private handleOpenCalender = () => {
    if (this.#isOpenCalendar) {
      this.#isOpenCalendar = false;
      $('.date-picker-calendar-layout').remove();

      return;
    }

    this.#isOpenCalendar = true;
    this.renderCalendarLayout();
  };

  private handleSelectDate: EventListener = (event) => {
    const day = event.target;

    if (!(day instanceof HTMLLIElement)) return;

    const date = day.dataset.date as string;

    this.#datePickerCalendar.setDate(new Date(date));
    this.renderInput();
    this.renderCalendar();
  };

  private registerDatePickerButtonEventListener = () => {
    $('.date-picker-input-button').addEventListener(
      'click',
      this.handleOpenCalender
    );
  };

  private registerCalendarEventListener = () => {
    $('.date-picker-calendar').addEventListener('click', this.handleSelectDate);

    $('.shift-month-button-container').addEventListener('click', (event) =>
      handleShiftMonth(event, this.#datePickerCalendar, this.renderCalendar)
    );
  };
}

export default DatePicker;
