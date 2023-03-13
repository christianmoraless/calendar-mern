// React
import { useState } from "react";
// Calendar
import { Calendar } from "react-big-calendar";
// Components
import { Navbar, CalendarEvent, CalendarModal } from "../";
// Calendar and dates
import { getMessagesES, localizer } from "../../helpers";
import "react-big-calendar/lib/css/react-big-calendar.css";

const events = [
  {
    title: "Cumpleaños de Camila",
    notes: "Hay que comprar la torta",
    start: new Date(),
    end: new Date(),
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastview") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {};
  const onDoubleClick = (event) => {
    console.log({ dobleClick: event });
  };
  const onSelectEvent = (event) => {
    console.log({ click: event });
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
    </>
  );
};
