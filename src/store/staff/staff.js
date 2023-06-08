import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";
import configData from "./../../config.json";

const baseURL = configData.url.baseURL;
const operatorsSummary = configData.url.getOperatorsStat;
const url = `${baseURL}${operatorsSummary}`;

const apiKey = configData.api["api-key"];
const apiSecret = configData.api["api-secret"];

const headers = {
  "x-auth-api-key": apiKey,
  "x-auth-api-secret": apiSecret,
};

const slice = createSlice({
  name: "staff",
  initialState: {
    list: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    staffListRequested: (staffs, action) => {
      staffs.loading = true;
      staffs.error = false;
      staffs.errorMessage = "";
    },
    staffListReceived: (staffs, action) => {
      staffs.list = action.payload.data;
      staffs.loading = false;
      staffs.error = false;
      staffs.errorMessage = "";
    },
    staffListRequestFailed: (staffs, action) => {
      staffs.loading = false;
      staffs.error = true;
      staffs.errorMessage = action.payload.message;
    },
  },
});

const { staffListRequested, staffListReceived, staffListRequestFailed } =
  slice.actions;

export const loadStaffSummary = (queryParams) =>
  apiCallBegan({
    url: `${url}?quick-filter=${queryParams.quickFilter}&date-from=${queryParams.dateFrom}&date-to=${queryParams.dateTo}`,
    method: "get",
    headers,
    onStart: staffListRequested.type,
    onError: staffListRequestFailed.type,
    onSuccess: staffListReceived.type,
  });

export default slice.reducer;
