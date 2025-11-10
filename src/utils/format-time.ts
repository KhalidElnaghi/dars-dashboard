import { format, getTime, addMinutes, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy-MM-dd';
  return date ? format(new Date(date), fm) : '';
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function isBetween(inputDate: Date | string | number, startDate: Date, endDate: Date) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}


export function generateTimeSlots(period: number): string[][] {
  const startTime = new Date(); // Get current date and time
  startTime.setHours(12, 0, 0, 0); // Set time to 12:00 pm

  const endTime = new Date(); // Get current date and time
  endTime.setHours(23, 30, 0, 0); // Set time to 11:30 pm

  const timeSlots: string[][] = [];
  let currentTime = startTime;
  let currentSlot: string[] = [];

  while (currentTime <= endTime) {
      currentSlot.push(format(currentTime, 'hh:mm a'));
      if (currentSlot.length === period / 30) {
          timeSlots.push(currentSlot);
          currentSlot = [];
      }
      currentTime = addMinutes(currentTime, 30);
  }

  return timeSlots;
}
