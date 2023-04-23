import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";
import { calendarApi } from "../api";
import Swal from "sweetalert2";
import { convertDates } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  // methods
  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("events");
      const events = convertDates(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      Swal.fire("Ha ocurrido un error", `${error.message}`, "error");
    }
  };

  const setActiveElement = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      try {
        const { data } = await calendarApi.post("events", calendarEvent);
        dispatch(
          onAddNewEvent({ ...calendarEvent, _id: data.event.user._id, user })
        );
      } catch (error) {
        Swal.fire("Ha ocurrido un error", `${error.message}`, "error");
      }
    }
  };

  const startDeleteEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveElement,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents,
  };
};
