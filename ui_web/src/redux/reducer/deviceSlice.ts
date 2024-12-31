import { createSlice } from "@reduxjs/toolkit";
import {
  DeviceDetailRequest,
  DeviceRequest,
  DeviceResponse,
} from "../../api/api-generated";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { Service } from "../../api";

interface IDeviceState {
  data: DeviceResponse[];
  deviceData: DeviceResponse;
  loadDataStatus: ApiLoadingStatus;
  loadGetDeviceByIdStatus: ApiLoadingStatus;
  loadAddDataStatus: ApiLoadingStatus;
  loadAddDetailDataStatus: ApiLoadingStatus;
  loadUpdateDataStatus: ApiLoadingStatus;
  loadDeleteDataStatus: ApiLoadingStatus;
  loadDeleteDetailDataStatus: ApiLoadingStatus;
  errorMessage: string | undefined;
}

const initialState: IDeviceState = {
  data: [],
  deviceData: {} as DeviceResponse,
  loadDataStatus: ApiLoadingStatus.None,
  loadGetDeviceByIdStatus: ApiLoadingStatus.None,
  loadAddDataStatus: ApiLoadingStatus.None,
  loadAddDetailDataStatus: ApiLoadingStatus.None,
  loadUpdateDataStatus: ApiLoadingStatus.None,
  loadDeleteDataStatus: ApiLoadingStatus.None,
  loadDeleteDetailDataStatus: ApiLoadingStatus.None,
  errorMessage: undefined,
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

export const getDeviceByDoctorId = createAsyncThunkWrap(
  "/devices/data/doctor-id",
  async () => {
    return await Service.deviceService.getDeviceByDoctorId();
  }
);

export const addDevice = createAsyncThunkWrap(
  "/devices/add",
  async (device: DeviceRequest) => {
    return await Service.deviceService.add(device);
  }
);

export const addDeviceDetail = createAsyncThunkWrap(
  "/devices/add-detail",
  async (detail: DeviceDetailRequest) => {
    return await Service.deviceDetailService.addDetail(detail);
  }
);

export const updateDeviceById = createAsyncThunkWrap(
  "/devices/update",
  async (device: DeviceRequest) => {
    return await Service.deviceService.updateDeviceById(device);
  }
);

export const updateDeviceDetailById = createAsyncThunkWrap(
  "/devices/add-detail",
  async (detail: DeviceDetailRequest) => {
    return await Service.deviceDetailService.updateDetailById(detail);
  }
);

export const deleteDeviceById = createAsyncThunkWrap(
  "/devices/delete",
  async (id: string) => {
    return await Service.deviceService.deleteDeviceById(id);
  }
);

export const deleteDeviceDetailById = createAsyncThunkWrap(
  "/devices/delete-detail",
  async (id: string) => {
    return await Service.deviceDetailService.deleteDeviceDetailById(id);
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
    resetLoadAddDetailDataStatus: (state) => {
      state.loadAddDetailDataStatus = ApiLoadingStatus.None;
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
    resetLoadDeleteDetailDataStatus: (state) => {
      state.loadDeleteDetailDataStatus = ApiLoadingStatus.None;
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
        state.errorMessage = (<any>action.payload)?.message;
        state.loadDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(getDeviceByDoctorId.pending, (state, action) => {
        state.loadDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getDeviceByDoctorId.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(getDeviceByDoctorId.rejected, (state, action) => {
        state.deviceData = {} as DeviceResponse;
        state.errorMessage = (<any>action.payload)?.message;
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
        state.errorMessage = (<any>action.payload)?.message;
        state.loadGetDeviceByIdStatus = ApiLoadingStatus.Failed;
      })
      .addCase(addDevice.pending, (state, action) => {
        state.loadAddDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(addDevice.fulfilled, (state, action) => {
        state.loadAddDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(addDevice.rejected, (state, action) => {
        state.errorMessage = (<any>action.payload).message;
        state.loadAddDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(addDeviceDetail.pending, (state, action) => {
        state.loadAddDetailDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(addDeviceDetail.fulfilled, (state, action) => {
        state.loadAddDetailDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(addDeviceDetail.rejected, (state, action) => {
        state.errorMessage = (<any>action.payload).message;
        state.loadAddDetailDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(updateDeviceById.pending, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(updateDeviceById.fulfilled, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(updateDeviceById.rejected, (state, action) => {
        state.errorMessage = (<any>action.payload).message;
        state.loadUpdateDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(deleteDeviceById.pending, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(deleteDeviceById.fulfilled, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(deleteDeviceById.rejected, (state, action) => {
        state.errorMessage = (<any>action.payload).message;
        state.loadDeleteDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(deleteDeviceDetailById.pending, (state, action) => {
        state.loadDeleteDetailDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(deleteDeviceDetailById.fulfilled, (state, action) => {
        state.loadDeleteDetailDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(deleteDeviceDetailById.rejected, (state, action) => {
        state.errorMessage = (<any>action.payload).message;
        state.loadDeleteDetailDataStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const {
  resetLoadDataStatus,
  resetLoadAddDataStatus,
  resetLoadAddDetailDataStatus,
  resetLoadGetDeviceByIdStatus,
  resetLoadUpdateDataStatus,
  resetLoadDeleteDataStatus,
  resetLoadDeleteDetailDataStatus,
} = deviceSlice.actions;
export default deviceSlice.reducer;
