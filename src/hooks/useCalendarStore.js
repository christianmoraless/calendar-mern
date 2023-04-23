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
      //actualizando
      try {
        await calendarApi.put(`events/${calendarEvent._id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      } catch (error) {
        Swal.fire("Ha ocurrido un error", `${error.message}`, "error");
      }
    } else {
      //creando
      try {
        const { data } = await calendarApi.post("events", calendarEvent);
        dispatch(
          onAddNewEvent({ ...calendarEvent, id: data.event.user.id, user })
        );
      } catch (error) {
        Swal.fire("Ha ocurrido un error", `${error.message}`, "error");
      }
    }
  };

  const startDeleteEvent = async () => {
    try {
      await calendarApi.delete(`events/${activeEvent._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      Swal.fire("Ha ocurrido un error", `${error.message}`, "error");
    }
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
