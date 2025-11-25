import { addHours, addWeeks, format, startOfWeek } from 'date-fns';
import { toast } from 'react-hot-toast';

const NEWLINE = '\r\n';

const formatDateTime = (date) => format(date, "yyyyMMdd'T'HHmmss");

const escapeICS = (text = '') =>
  text
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

const buildEvent = (session, start) => {
  const end = addHours(start, 1);
  const lines = [
    'BEGIN:VEVENT',
    `UID:${session.id}@reading-tracker`,
    `DTSTAMP:${formatDateTime(new Date())}`,
    `DTSTART:${formatDateTime(start)}`,
    `DTEND:${formatDateTime(end)}`,
    `SUMMARY:${escapeICS(`${session.book} — ${session.domain}`)}`,
    `DESCRIPTION:${escapeICS(session.details)}`,
    'END:VEVENT',
  ];
  return lines.join(NEWLINE);
};

export function exportPlanToICS(startDate, weeks) {
  if (!startDate) {
    toast.error('Set a start date first');
    return;
  }

  try {
    const planStart = startOfWeek(new Date(startDate), { weekStartsOn: 1 });
    const events = weeks.flatMap((week, weekIndex) =>
      week.sessions.map((session) => {
        const eventStart = addWeeks(planStart, weekIndex);
        eventStart.setHours(18, 0, 0, 0);
        return buildEvent(session, new Date(eventStart));
      }),
    );

    const payload = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'CALSCALE:GREGORIAN', 'PRODID:-//Reading Tracker//EN']
      .concat(events)
      .concat('END:VCALENDAR')
      .join(NEWLINE);

    const blob = new Blob([payload], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'reading-plan.ics';
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success('.ics exported');
  } catch (error) {
    console.error(error);
    toast.error('Calendar export failed');
  }
}
