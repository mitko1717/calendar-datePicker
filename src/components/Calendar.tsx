import { FC, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  state,
  addTime,
  deleteTime,
  addHour,
  deleteHour,
  deleteAllHours,
} from "../features/calendar/calendarSlice";
import ModeSwitch from "../assets/images/ModeSwitcher";
import DelBtn from "../assets/images/DelBtn";
import Modal from "./ModalConfirm";
import styled from "styled-components";
import { IDay, ITimeToSchedule } from "../features/calendar/Interfaces";

type CalendarProps = {
  toggleTheme: any;
};

let timeToSchedules = {
  "10:00": false,
  "12:00": false,
  "14:00": false,
  "16:00": false,
};

const Calendar: FC<CalendarProps> = ({ toggleTheme }) => {
  const { calendar, choosenHours } = useAppSelector(state);
  const [choosenDay, setChoosenDay] = useState("");
  const [choosenDayToChange, setChoosenDayToChange] = useState<IDay>();
  const [schedule, setSchedule] = useState<any>(timeToSchedules);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [timeToDelete, setTimeToDelete] = useState("");

  const week = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const dispatch = useAppDispatch();

  const addTimeToDay = () => {
    if (choosenHours && choosenDayToChange)
      dispatch(addTime({ choosenHours, choosenDayToChange }));
  };

  const handleAddTime = (item: string) => {
    if (choosenDay) {
      let isHourAdded = choosenHours.some((hour) => hour === item);
      !isHourAdded && dispatch(addHour(item));
    }
  };

  const clickOnDate = (
    day: string,
    timeToSchedules: ITimeToSchedule,
    dayInfo: IDay
  ) => {
    console.log("choosenHours", choosenHours);

    setChoosenDay(day);
    dispatch(deleteAllHours());
    setSchedule(timeToSchedules);
    setChoosenDayToChange(dayInfo);
  };

  const toggleModalHandler = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleConfirm = (result: string) => {
    if (result) {
      dispatch(deleteTime({ timeToDelete, choosenDayToChange }));
      dispatch(deleteHour(timeToDelete));
      console.log("choosenHours", choosenHours);
      console.log("calendar", calendar);
    }

    toggleModalHandler();
  };

  const handleDelete = (time: string, e: any) => {
    e.stopPropagation();
    e.preventDefault();

    setTimeToDelete(time);
    toggleModalHandler();
  };

  return (
    <Container>
      <Modal open={isOpenModal} handleConfirm={handleConfirm} />

      <div onClick={toggleTheme}>
        <ModeSwitch />
      </div>
      <H_3>{calendar[0].month}</H_3>
      <CalendarBox>
        <DaysList>
          {week.map((item) => (
            <Day key={item}>
              <span>{item}</span>
            </Day>
          ))}
        </DaysList>

        <NumbersList>
          {calendar[0].days.map((item: any) => {
            let day = item.day.toString();

            return (
              <Number
                key={item.day}
                onClick={() => clickOnDate(day, item.timeToSchedules, item)}
                style={
                  choosenDay === day
                    ? { background: "orange", color: "#FFFFFF" }
                    : {}
                }
              >
                <span>{item.day}</span>
              </Number>
            );
          })}
        </NumbersList>
      </CalendarBox>

      <TimeBox>
        {Object.keys(schedule).map((item) => {
          let isChoosenHoursContainsTime = choosenHours.some((i) => i === item);

          return (
            <Time
              key={item}
              onClick={() => handleAddTime(item)}
              style={
                schedule[item] || isChoosenHoursContainsTime
                  ? { background: "#70C05B", color: "#FFFFFF" }
                  : {}
              }
            >
              {item}

              {(schedule[item] || isChoosenHoursContainsTime) && (
                <SpamForDeleteBtn onClick={(e) => handleDelete(item, e)}>
                  <DelBtn></DelBtn>
                </SpamForDeleteBtn>
              )}
            </Time>
          );
        })}
      </TimeBox>

      {choosenDay && choosenHours && (
        <Message>
          {choosenDay} {calendar[0].month}
          {choosenHours[choosenHours.length - 1]}
        </Message>
      )}

      <Button onClick={addTimeToDay}>Підтвердити</Button>
    </Container>
  );
};

export default Calendar;

const Container = styled.div`
  height: 613px;
  width: 366px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
`;

const DaysList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 7px;
  grid-row-gap: 0px;
  padding-left: 2px;
`;

const NumbersList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 2px;
`;

const Day = styled.div`
  width: 40px;
  height: 27px;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const Number = styled.div`
  width: 40px;
  height: 40px;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #8f8f8f;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`;

const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;
  width: 326px;
  height: 262px;
`;

const TimeBox = styled.div`
  width: 100%;
  height: 100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 5px;
  margin-bottom: 1rem;
`;

const Time = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 158px;
  height: 40px;
  background: #f3f2f1;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 5px 0;
  cursor: pointer;
  color: #606060;
  position: relative;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  height: 40px;
  background: #ff6633;
  border-radius: 4px;
  border: none;
  color: white;
  font-weight: 500;
  box-sizing: border-box;
  margin-top: 1rem;
`;

const Message = styled.p`
  display: flex;
  margin: 0 auto;
`;

const SpamForDeleteBtn = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
`;

const H_3 = styled.h3`
  margin: 1rem 0;
`;
