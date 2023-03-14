import { createSlice } from "@reduxjs/toolkit";
const tempEvents = {
  title: "Cumpleaños de Camila",
  notes: "Hay que comprar la torta",
  start: new Date(),
  end: new Date(),
};
export const calendarSlice = createSlice({
  _id: new Date().getTime(),
  name: "calendar",
  initialState: {
    events: [tempEvents],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
