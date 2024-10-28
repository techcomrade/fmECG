import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { ScheduleResponse, Service } from "../../api";

interface IScheduleState {
  data: ScheduleResponse[];
  loadDataStatus: ApiLoadingStatus;
}

const initialState: IScheduleState = {
  data: [],
  loadDataStatus: ApiLoadingStatus.None,
};

export const getAllSchedules = createAsyncThunkWrap("/", async () => {
  return await Service.scheduleService.getAllSchedules();
});

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetLoadDataStatus: (state) => {
      state.loadDataStatus = ApiLoadingStatus.None;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchedules.pending, (state, action) => {
        state.loadDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllSchedules.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(getAllSchedules.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const {
  resetLoadDataStatus,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
