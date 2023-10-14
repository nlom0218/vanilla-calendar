import Calendar from '../Calendar';

interface MonthClickEventListener {
  (evt: Event, calendar: Calendar, callback: () => void): void;
}

const handleShiftMonth: MonthClickEventListener = (
  event,
  calendar: Calendar,
  callback
) => {
  const button = event.target;

  if (!(button instanceof HTMLButtonElement)) return;

  const type = button.dataset.type as 'next' | 'prev' | 'today';

  calendar.shiftMonth(type);
  callback();
};

export default handleShiftMonth;
