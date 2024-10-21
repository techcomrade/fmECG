import { createSlice } from "@reduxjs/toolkit";
import { DeviceResponse } from "../../api/api-generated";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { Service } from "../../api";

interface IDeviceState {
  data: DeviceResponse[];
  dataLoadingStatus: ApiLoadingStatus;
}

const initialState: IDeviceState = {
  data: [],
  dataLoadingStatus: ApiLoadingStatus.None,
};

export const getAllDevices = createAsyncThunkWrap("/devices", async () => {
  return await Service.deviceService.getAllData();
});

export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    resetDataLoadingStatus: (state) => {
      state.dataLoadingStatus = ApiLoadingStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDevices.pending, (state, action) => {
        state.dataLoadingStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllDevices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.dataLoadingStatus = ApiLoadingStatus.Success;
      })
      .addCase(getAllDevices.rejected, (state, action) => {
        state.data = [];
        state.dataLoadingStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const { resetDataLoadingStatus } = deviceSlice.actions;
export default deviceSlice.reducer;
