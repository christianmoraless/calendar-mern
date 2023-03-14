import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onSetActiveEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  // methods
  const setActiveElement = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };
  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };
  return { events, activeEvent, setActiveElement, startSavingEvent };
};
