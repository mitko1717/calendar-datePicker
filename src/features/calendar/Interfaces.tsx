export interface ICounterState {
  calendar: ICalendar[];
  choosenHours: string[];
  dayToSchedule: ITimeToSchedule;
}

export interface IDay {
  day: number;
  timeToSchedules: any;
  index: number;
}

export interface ICalendar {
  month: string;
  days: IDay[];
  index: number;
}

export interface ITimeToSchedule {
  "10:00": boolean;
  "12:00": boolean;
  "14:00": boolean;
  "16:00": boolean;
}
