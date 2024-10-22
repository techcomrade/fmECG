import { createSlice } from "@reduxjs/toolkit";
import { DeviceRequest, DeviceResponse } from "../../api/api-generated";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { Service } from "../../api";

interface IDeviceState {
  data: DeviceResponse[];
  deviceData: DeviceResponse;
  loadDataStatus: ApiLoadingStatus;
  loadGetDeviceByIdStatus: ApiLoadingStatus;
  loadAddDataStatus: ApiLoadingStatus;
  loadUpdateDataStatus: ApiLoadingStatus;
  loadDeleteDataStatus: ApiLoadingStatus;
}

const initialState: IDeviceState = {
  data: [],
  deviceData: {} as DeviceResponse,
  loadDataStatus: ApiLoadingStatus.None,
  loadGetDeviceByIdStatus: ApiLoadingStatus.None,
  loadAddDataStatus: ApiLoadingStatus.None,
  loadUpdateDataStatus: ApiLoadingStatus.None,
  loadDeleteDataStatus: ApiLoadingStatus.None,
};

export const getAllDevices = createAsyncThunkWrap("/devices", async () => {
  return await Service.deviceService.getAllData();
});

export const getDeviceById = createAsyncThunkWrap(
  "/devices/id",
  async (id: string) => {
    return await Service.deviceService.getDeviceById(id);
  }
);

export const addDevice = createAsyncThunkWrap(
  "/add",
  async (device: DeviceRequest) => {
    return await Service.deviceService.add(device);
  }
);
export const updateDeviceById = createAsyncThunkWrap(
  "/update",
  async (device: DeviceRequest) => {
    return await Service.deviceService.updateDeviceById(device);
  }
);
export const deleteDeviceById = createAsyncThunkWrap(
  "/delete",
  async (id: string) => {
    return await Service.deviceService.deleteDeviceById(id);
  }
);
export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    resetLoadDataStatus: (state) => {
      state.loadDataStatus = ApiLoadingStatus.None;
    },
    resetLoadAddDataStatus: (state) => {
      state.loadAddDataStatus = ApiLoadingStatus.None;
    },
    resetLoadGetDeviceByIdStatus: (state) => {
      state.loadGetDeviceByIdStatus = ApiLoadingStatus.None;
    },
    resetLoadUpdateDataStatus: (state) => {
      state.loadUpdateDataStatus = ApiLoadingStatus.None;
    },
    resetLoadDeleteDataStatus: (state) => {
      state.loadDeleteDataStatus = ApiLoadingStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDevices.pending, (state, action) => {
        state.loadDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllDevices.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(getAllDevices.rejected, (state, action) => {
        state.deviceData = {} as DeviceResponse;
        state.loadDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(getDeviceById.pending, (state, action) => {
        state.loadGetDeviceByIdStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getDeviceById.fulfilled, (state, action) => {
        state.deviceData = action.payload;
        state.loadGetDeviceByIdStatus = ApiLoadingStatus.Success;
      })
      .addCase(getDeviceById.rejected, (state, action) => {
        state.loadGetDeviceByIdStatus = ApiLoadingStatus.Failed;
      })
      .addCase(addDevice.pending, (state, action) => {
        state.loadAddDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        state.loadAddDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.loadAddDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(updateDeviceById.pending, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(updateDeviceById.fulfilled, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(updateDeviceById.rejected, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(deleteDeviceById.pending, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(deleteDeviceById.fulfilled, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(deleteDeviceById.rejected, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const {
  resetLoadDataStatus,
  resetLoadAddDataStatus,
  resetLoadGetDeviceByIdStatus,
  resetLoadUpdateDataStatus,
  resetLoadDeleteDataStatus,
} = deviceSlice.actions;
export default deviceSlice.reducer;
