"use client";
import { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import {
  today,
  getLocalTimeZone,
  DateValue,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}
function RenderCalender({ availability }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [date, setDate] = useState(() => {
    const dateParam = searchParams.get("date");
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });

  useEffect(()=>{
const dateParam = searchParams.get('date')
if(dateParam){
    setDate(parseDate(dateParam))
}
  },[searchParams])
  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);

    url.searchParams.set("date", date.toString());

    router.push(url.toString())
  };

  const isDateUnavailable = (date: DateValue) => {
    const dayofWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustedIndex = dayofWeek == 0 ? 6 : dayofWeek - 1;
    return !availability[adjustedIndex].isActive;
  };
  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    ></Calendar>
  );
}

export default RenderCalender;
