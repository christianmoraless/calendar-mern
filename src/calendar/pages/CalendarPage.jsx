// React
import { useState } from "react";
// Calendar
import { Calendar } from "react-big-calendar";
// Components
import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../";
// Hooks
import { useUiStore, useCalendarStore } from "../../hooks";
// Calendar and dates
import { getMessagesES, localizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const CalendarPage = () => {
  const { onOpenModal } = useUiStore();
  const { events, setActiveElement } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastview") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {};
  const onDoubleClick = (event) => {
    onOpenModal();
  };
  const onSelectEvent = (event) => {
    setActiveElement(event);
  };
  const onViewChange = (event) => {
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={"month"}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
    </>
  );
};
