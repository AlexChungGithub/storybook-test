"use client";

import * as React from "react";

import { Calendar } from "../../../components/ui/calendar";
import { DayPickerSingleProps } from "react-day-picker";

export function CalendarDemo(props: DayPickerSingleProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return <Calendar selected={date} onSelect={setDate} {...props} />;
}
