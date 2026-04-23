import { addHours, format, parse, isAfter, setHours, setMinutes } from 'date-fns';

export type Frequency = 'once' | 'twice' | 'thrice' | 'four' | 'as_needed';

export interface DoseSchedule {
  time: string; // HH:mm
  label: string;
}

export function calculateSchedule(firstDoseTime: string, frequency: Frequency): DoseSchedule[] {
  const schedule: DoseSchedule[] = [];
  const baseDate = parse(firstDoseTime, 'HH:mm', new Date());

  switch (frequency) {
    case 'once':
      schedule.push({ time: firstDoseTime, label: 'Dose 1' });
      break;

    case 'twice':
      schedule.push({ time: firstDoseTime, label: 'Dose 1' });
      let secondDose = addHours(baseDate, 12);
      const limit = setMinutes(setHours(new Date(), 22), 0); // 10 PM

      if (isAfter(secondDose, limit)) {
        secondDose = limit;
      }
      schedule.push({ time: format(secondDose, 'HH:mm'), label: 'Dose 2' });
      break;

    case 'thrice':
      schedule.push({ time: firstDoseTime, label: 'Dose 1' });
      const secondDose3 = addHours(baseDate, 6);
      const thirdDose3 = addHours(baseDate, 12);
      schedule.push({ time: format(secondDose3, 'HH:mm'), label: 'Dose 2' });
      schedule.push({ time: format(thirdDose3, 'HH:mm'), label: 'Dose 3' });
      break;

    case 'four':
      schedule.push({ time: firstDoseTime, label: 'Dose 1' });
      for (let i = 1; i < 4; i++) {
        const nextDose = addHours(baseDate, i * 4); // 4 times a day, usually every 4 hours
        schedule.push({ time: format(nextDose, 'HH:mm'), label: `Dose ${i + 1}` });
      }
      break;

    case 'as_needed':
      // No fixed schedule
      break;
  }

  return schedule;
}

export function generateCalendarLink(medName: string, time: string, dose: string) {
  // Simple Google Calendar link generation for MVP
  // Ideally, this should be for a specific date, but since this is daily, 
  // we'll just use "today" or a generic reminder logic.
  const now = new Date();
  const dateStr = format(now, 'yyyyMMdd');
  const [hours, minutes] = time.split(':');
  
  const start = `${dateStr}T${hours}${minutes}00`;
  const end = `${dateStr}T${String(Number(hours) + 1).padStart(2, '0')}${minutes}00`;
  
  const title = encodeURIComponent(`Medication: ${medName} (${dose})`);
  const details = encodeURIComponent(`Time to take your ${medName}. Dose: ${dose}`);
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${start}/${end}`;
}
