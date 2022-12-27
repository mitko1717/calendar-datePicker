import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CALENDAR, timeToSchedule } from "../../assets/calendar";

export interface ICounterState {
  calendar: ICalendar[];
  timeToSchedule: string[];
}

export interface ITimeToSchedule {
  "10:00": boolean;
  "12:00": boolean;
  "14:00": boolean;
  "16:00": boolean;
}

export interface IDay {
  day: number;
  timeToSchedules: ITimeToSchedule;
  index: number;
}

export interface ICalendar {
  month: string;
  days: IDay[];
  index: number;
}

const initialState: ICounterState = {
  calendar: CALENDAR,
  timeToSchedule,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    increment: (state) => {},
  },

  extraReducers: (builder) => {},
});

export const { increment } = calendarSlice.actions;
export const state = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
