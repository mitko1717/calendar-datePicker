import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CALENDAR } from "../../assets/calendar";
import { ICounterState } from "./Interfaces";

const initialState: ICounterState = {
  calendar: CALENDAR,
  choosenHours: [],
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
    },
    deleteTime: (state, action) => {
      const { timeToDelete, choosenDayToChange } = action.payload;

      const existingItem = state.calendar[0].days.find(
        (item) => item.index === choosenDayToChange.index
      );

      let newObj = { ...existingItem };
      newObj.timeToSchedules[timeToDelete] = false;
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
  },
});

export const { addTime, deleteTime, addHour, deleteHour, deleteAllHours } =
  calendarSlice.actions;
export const state = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
