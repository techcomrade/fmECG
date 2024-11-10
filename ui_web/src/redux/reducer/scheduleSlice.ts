import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { ScheduleRequest, ScheduleResponse, Service } from "../../api";

interface IScheduleState {
  data: ScheduleResponse[];
  availableSchedule: any;
  loadDataStatus: ApiLoadingStatus;
  loadCreateScheduleByDoctorStatus: ApiLoadingStatus;
  loadCreateScheduleWithSelectedDoctor: ApiLoadingStatus;
  loadGetAvailableScheduleByDoctorId: ApiLoadingStatus;
}

const initialState: IScheduleState = {
  data: [],
  availableSchedule: [],
  loadDataStatus: ApiLoadingStatus.None,
  loadCreateScheduleByDoctorStatus: ApiLoadingStatus.None,
  loadCreateScheduleWithSelectedDoctor: ApiLoadingStatus.None,
  loadGetAvailableScheduleByDoctorId: ApiLoadingStatus.None,
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

export const createScheduleWithSelectedDoctor = createAsyncThunkWrap(
  "/create-doctor",
  async (schedule: ScheduleRequest) => {
    return await Service.scheduleService.createScheduleWithSelectedDoctor(
      schedule
    );
  }
);

export const getAvailableScheduleByDoctorId = createAsyncThunkWrap(
  "/available-schedule",
  async (doctor_id: string) => {
    return await Service.scheduleService.getAvailableScheduleByDoctorId(
      doctor_id
    );
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
    resetLoadCreateScheduleWithSelectedDoctor: (state) => {
      state.loadCreateScheduleWithSelectedDoctor = ApiLoadingStatus.None;
    },
    resetLoadGetAvailableScheduleByDoctorId: (state) => {
      state.loadGetAvailableScheduleByDoctorId = ApiLoadingStatus.None;
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
      })
      .addCase(createScheduleWithSelectedDoctor.pending, (state, action) => {
        state.loadCreateScheduleWithSelectedDoctor = ApiLoadingStatus.Loading;
      })
      .addCase(createScheduleWithSelectedDoctor.fulfilled, (state, action) => {
        state.loadCreateScheduleWithSelectedDoctor = ApiLoadingStatus.Success;
      })
      .addCase(createScheduleWithSelectedDoctor.rejected, (state, action) => {
        state.loadCreateScheduleWithSelectedDoctor = ApiLoadingStatus.Failed;
      })
      .addCase(getAvailableScheduleByDoctorId.pending, (state, action) => {
        state.loadGetAvailableScheduleByDoctorId = ApiLoadingStatus.Loading;
      })
      .addCase(getAvailableScheduleByDoctorId.fulfilled, (state, action) => {
        state.availableSchedule = action.payload;
        state.loadGetAvailableScheduleByDoctorId = ApiLoadingStatus.Success;
      })
      .addCase(getAvailableScheduleByDoctorId.rejected, (state, action) => {
        state.availableSchedule = [];
        state.loadGetAvailableScheduleByDoctorId = ApiLoadingStatus.Failed;
      });
  },
});

export const {
  resetLoadDataStatus,
  resetLoadCreateScheduleByDoctorStatus,
  resetLoadCreateScheduleWithSelectedDoctor,
  resetLoadGetAvailableScheduleByDoctorId,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
