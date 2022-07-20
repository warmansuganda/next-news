import DateAdapter from '@date-io/date-fns';

const adapter = new DateAdapter();

function datePublished(date: Date) {
  if (date) {
    const now = new Date();
    const days = adapter.getDiff(now, date, 'days');
    const hours = adapter.getDiff(now, date, 'hours');
    const minutes = adapter.getDiff(now, date, 'minutes');

    if (days)
      return days <= 10
        ? `${days}d`
        : adapter.format(adapter.date(date), 'fullDate');
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;
  }

  return '-';
}

export default {
  ...adapter,
  datePublished,
};
