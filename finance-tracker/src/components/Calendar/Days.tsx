import { DayModel } from "../../models/DayModel";
import { DayCard } from "./DayCard";

interface DaysProps {
  days: DayModel[];
  onSelectDate: (date: Date) => void;
}

export const Days = (props: DaysProps) => {
  if (props.days.length == 0) {
    let dayCards: number[] = [];

    for (let i = 0; i < 42; ++i) {
      dayCards.push(i);
    }
  }

  return props.days.map((day) => (
    <DayCard key={day.dateZ} day={day} onSelectDate={props.onSelectDate} />
  ));
};