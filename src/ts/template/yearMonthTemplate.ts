const yearMonthTemplate = (
  calendar: 'schedule' | 'datePicker',
  year: number,
  month: number
) => `
    <div class=${
      calendar === 'schedule' ? 'schedule-year-month' : 'date-picker-year-month'
    }>
        <div>
          <span>${year}년 ${month}월</span>
          ${
            calendar === 'schedule' &&
            `<button class="schedule-navigation-button">▼</button>`
          }
        </div>
        <div class="shift-month-button-container">
            <button class="shift-month-button shift-mont-today-button" data-type="today">TODAY</button>
            <button class="shift-month-button shift-mont-arrow-button" data-type="prev">◀︎</button>
            <button class="shift-month-button shift-mont-arrow-button" data-type="next">▶︎</button>
        </div>
    </div>
`;

export default yearMonthTemplate;
