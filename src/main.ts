import DatePicker from './ts/DatePicker';
import Schedule from './ts/Schedule';
import { $ } from './ts/dom';

class App {
  schedule;
  datePicker;

  constructor() {
    this.schedule = new Schedule();
    this.datePicker = new DatePicker();
  }

  init() {
    this.schedule.render();
    this.registerEventListener();
  }

  renderScheduleCalendar = () => this.schedule.render();

  renderDatePickerCalendar = () => {
    this.datePicker.initDatePicker();
    this.datePicker.render();
  };

  registerEventListener = () => {
    $('.schedule-button').addEventListener(
      'click',
      this.renderScheduleCalendar
    );

    $('.date-picker-button').addEventListener(
      'click',
      this.renderDatePickerCalendar
    );
  };
}

const app = new App();
app.init();
