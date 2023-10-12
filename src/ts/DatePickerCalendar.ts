import format from '../utils/format';
import Calendar from './Calendar';

class DatePickerCalendar extends Calendar {
  #startDate: Date | null = null;
  #endDate: Date | null = null;

  constructor(year: number, month: number) {
    super(year, month);
  }

  init = () => {
    this.#startDate = null;
    this.#endDate = null;
  };

  setDate = (date: Date) => {
    if (!this.#startDate) {
      this.#startDate = date;

      return;
    }

    if (!this.#endDate && date > this.#startDate) {
      this.#endDate = date;

      return;
    }

    if (!this.#endDate) {
      this.#endDate = this.#startDate;
      this.#startDate = date;

      return;
    }

    if (this.#startDate && this.#endDate) {
      this.#startDate = date;
      this.#endDate = null;

      return;
    }
  };

  getStartDate = () => this.#startDate;

  getEndDate = () => this.#endDate;

  isEqualStartDate = (date: Date) => {
    if (!this.#startDate) return false;

    const startDate = format.date(this.#startDate);
    const inputDate = format.date(date);

    return startDate === inputDate;
  };

  isEqualEndDate = (date: Date) => {
    if (!this.#endDate) return false;

    const endDate = format.date(this.#endDate);
    const inputDate = format.date(date);

    return endDate === inputDate;
  };

  isIncludedDate = (date: Date) => {
    if (!this.#startDate || !this.#endDate) return;

    return date < this.#endDate && date > this.#startDate;
  };
}

export default DatePickerCalendar;
