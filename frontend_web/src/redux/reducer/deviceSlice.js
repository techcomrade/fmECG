import { httpDeleteData, httpGetData, httpPostData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
    None: 0,
    Loading: 1,
    Success: 2,
    Failed: 3,
};

export const getDevice = createAsyncThunk(
  "/device",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData('/device');
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const createDevice = createAsyncThunk(
  "/create-device",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData('/device/create', params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const updateDevice = createAsyncThunk(
  "/update-device",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData(`/device/update/${params.id}`, params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const deleteDevice = createAsyncThunk(
  "/delete-device",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpDeleteData(`/device/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const deviceSlice = createSlice({
    name: 'device',
    initialState: {
      data: [],
      loadDataStatus: loadStatus.None,
      loadCreateDataStatus: loadStatus.None,
      loadUpdateDataStatus: loadStatus.None,
      loadDeleteDataStatus: loadStatus.None,
    },
    reducers: {
      resetLoadDataStatus: (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.None;
      },
      resetCreateDataStatus: (state, action) => {
        state.loadCreateDataStatus = loadStatus.None;
      },
      resetUpdateDataStatus: (state, action) => {
        state.loadUpdateDataStatus = loadStatus.None;
      },
      resetDeleteDataStatus: (state, action) => {
        state.loadDeleteDataStatus = loadStatus.None;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getDevice.pending, (state, action) => {
          state.loadDataStatus = loadStatus.Loading;
        })
        .addCase(getDevice.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loadDataStatus = loadStatus.Success;
        })
        .addCase(getDevice.rejected, (state, action) => {
          state.data = [];
          state.loadDataStatus = loadStatus.Failed;
        })
        .addCase(createDevice.pending, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Loading;
        })
        .addCase(createDevice.fulfilled, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Success;
        })
        .addCase(createDevice.rejected, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Failed;
        })
        .addCase(updateDevice.pending, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Loading;
        })
        .addCase(updateDevice.fulfilled, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Success;
        })
        .addCase(updateDevice.rejected, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Failed;
        })
        .addCase(deleteDevice.pending, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Loading;
        })
        .addCase(deleteDevice.fulfilled, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Success;
        })
        .addCase(deleteDevice.rejected, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Failed;
        })
    }
});

const { reducer: deviceReducer } = deviceSlice;
export default deviceReducer;