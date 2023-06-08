import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    dashboardFilters: {
      quickFilter: "d",
      dateFrom: null,
      dateTo: null,
    },
  },
  reducers: {
    quickFilterChanged: (filters, action) => {
      filters.dashboardFilters.quickFilter = action.payload.quickFilter;
      filters.dashboardFilters.dateTo = null;
      filters.dashboardFilters.dateFrom = null;
    },
    dateToChanged: (filters, action) => {
      filters.dashboardFilters.dateTo = action.payload.dateTo;
      filters.dashboardFilters.quickFilter = null;
    },
    dateFromChanged: (filters, action) => {
      filters.dashboardFilters.dateFrom = action.payload.dateFrom;
      filters.dashboardFilters.quickFilter = null;
    },
  },
});

export const { quickFilterChanged, dateFromChanged, dateToChanged } =
  slice.actions;

export default slice.reducer;
