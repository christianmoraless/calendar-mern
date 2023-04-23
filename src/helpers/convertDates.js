import { parseISO } from "date-fns";

export const convertDates = (events = []) => {
  return events.map((event) => {
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);
    return event;
  });
};
