import { createSlice, current } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CALENDAR } from "../../assets/calendar";
import { ICounterState } from "./Interfaces";

const calendar =
  typeof window !== "undefined" && localStorage.getItem("calendar")
    ? JSON.parse(localStorage.getItem("calendar") || "")
    : [];

const initialState: ICounterState = {
  calendar: calendar.length > 0 ? calendar : CALENDAR,
  choosenHours: [],
  dayToSchedule: {
    "10:00": false,
    "12:00": false,
    "14:00": false,
    "16:00": false,
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addTime: (state, action) => {
      const { choosenHours, choosenDayToChange } = action.payload;
      const existingItem = state.calendar[0].days.find(
        (item) => item.index === choosenDayToChange.index
      );
      let newObj = { ...existingItem };

      choosenHours.forEach((hour: string) => {
        newObj.timeToSchedules[hour] = true;
      });

      localStorage.setItem("calendar", JSON.stringify(state.calendar));
    },
    deleteTime: (state, action) => {
      const { timeToDelete, choosenDayToChange } = action.payload;

      const existingItem = state.calendar[0].days.find(
        (item) => item.index === choosenDayToChange.index
      );

      let newObj = { ...existingItem };
      newObj.timeToSchedules[timeToDelete] = false;

      localStorage.setItem("calendar", JSON.stringify(state.calendar));
    },
    addHour: (state, action) => {
      state.choosenHours.push(action.payload);
    },
    deleteHour: (state, action) => {
      state.choosenHours = state.choosenHours.filter(
        (hour) => hour !== action.payload
      );
    },
    deleteAllHours: (state) => {
      state.choosenHours = [];
    },
    setDayToSchedule: (state, action) => {
      const existingItem = state.calendar[0].days.find(
        (item) => item.index === action.payload.index
      );

      state.dayToSchedule = existingItem?.timeToSchedules;
    },
  },
});

export const {
  addTime,
  deleteTime,
  addHour,
  deleteHour,
  deleteAllHours,
  setDayToSchedule,
} = calendarSlice.actions;
export const state = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
