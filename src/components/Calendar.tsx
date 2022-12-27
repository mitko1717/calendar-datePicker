import { FC } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { state } from "../features/counter/counterSlice";
import ModeSwitch from "../assets/images/ModeSwitcher";

type CalendarProps = {
  toggleTheme: any;
};

const Calendar: FC<CalendarProps> = ({ toggleTheme }) => {
  const { calendar, timeToSchedule } = useAppSelector(state);

  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div>
        <ModeSwitch />
      </div>
    </div>
  );
};

export default Calendar;
