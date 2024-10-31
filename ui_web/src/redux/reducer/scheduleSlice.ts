import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { ScheduleRequest, ScheduleResponse, Service } from "../../api";

interface IScheduleState {
  data: ScheduleResponse[];
  loadDataStatus: ApiLoadingStatus;
  loadCreateScheduleByDoctorStatus: ApiLoadingStatus;
}

const initialState: IScheduleState = {
  data: [],
  loadDataStatus: ApiLoadingStatus.None,
  loadCreateScheduleByDoctorStatus: ApiLoadingStatus.None,
};

export const getAllSchedules = createAsyncThunkWrap("/", async () => {
  return await Service.scheduleService.getAllSchedules();
});

export const createScheduleByDoctor = createAsyncThunkWrap(
  "/create",
  async (schedule: ScheduleRequest) => {
    return await Service.scheduleService.createScheduleByDoctor(schedule);
  }
);

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    resetLoadDataStatus: (state) => {
      state.loadDataStatus = ApiLoadingStatus.None;
    },
    resetLoadCreateScheduleByDoctorStatus: (state) => {
      state.loadCreateScheduleByDoctorStatus = ApiLoadingStatus.None;
    },
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
      })
      .addCase(createScheduleByDoctor.pending, (state, action) => {
        state.loadCreateScheduleByDoctorStatus = ApiLoadingStatus.Loading;
      })
      .addCase(createScheduleByDoctor.fulfilled, (state, action) => {
        state.loadCreateScheduleByDoctorStatus = ApiLoadingStatus.Success;
      })
      .addCase(createScheduleByDoctor.rejected, (state, action) => {
        state.loadCreateScheduleByDoctorStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const { resetLoadDataStatus, resetLoadCreateScheduleByDoctorStatus } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
