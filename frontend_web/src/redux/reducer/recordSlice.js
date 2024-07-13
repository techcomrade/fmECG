import {
  httpDeleteData,
  httpGetData,
  httpPostData,
} from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../configs/config";
export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getRecord = createAsyncThunk(
  "/record",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/record", params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const createRecord = createAsyncThunk(
  "/create-record",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData("/record", params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const checkRecordFile = createAsyncThunk(
  "/check-record-file",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData(`/record/check-file/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const updateRecord = createAsyncThunk(
  "/update-record",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData(`/record/update`, params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "/delete-record",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpDeleteData(`/record/${params.id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getRecordByUser = createAsyncThunk(
  "/get-record-by-user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData(`/record/user/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const downloadRecordFile = (id) => {
  const downloadPath = `${API_URL}/record/download/${id}`;
  if (downloadPath) {
    window.open(downloadPath);
  }
};

export const getRecordById = createAsyncThunk(
  "/record/id",
  async (params, { rejectWithValue }) => {
    try {
      const device_id = params;
      const response = await httpGetData(`/record/id/${device_id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getRecordByDoctorId = createAsyncThunk(
  "/record/doctorid",
  async (params, { rejectWithValue }) => {
    try {
      const device_id = params;
      const response = await httpGetData(`/record/doctor/${device_id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getDataRecordById = createAsyncThunk(
  "/record/getData", 
  async (params, {rejectWithValue }) => {
    try {
      const response = await httpGetData(`/record/getData/${params}`);
      return response;
    }  catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const recordSlice = createSlice({
  name: "record",
  initialState: {
    data: [],
    recordData: {},
    recordChartData: {},
    loadDataStatus: loadStatus.None,
    loadCreateDataStatus: loadStatus.None,
    loadUpdateDataStatus: loadStatus.None,
    loadDeleteDataStatus: loadStatus.None,
    loadCheckRecordStatus: loadStatus.None,
    loadRecordDataStatus: loadStatus.None,
    loadChartRecordDataStatus: loadStatus.None,
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
    resetCheckRecordStatus: (state, action) => {
      state.loadCheckRecordStatus = loadStatus.None;
    },
    resetRecordDataStatus: (state, action) => {
      state.loadRecordDataStatus = loadStatus.None;
    },
    resetChartRecordDataStatus: (state, action) => {
      state.loadChartRecordDataStatus = loadStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecord.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getRecord.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getRecord.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(getRecordByUser.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getRecordByUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getRecordByUser.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(getRecordByDoctorId.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getRecordByDoctorId.fulfilled, (state, action) => {
        state.data = action.payload;
        console.log(action.payload);
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getRecordByDoctorId.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(createRecord.pending, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Loading;
      })
      .addCase(createRecord.fulfilled, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Success;
      })
      .addCase(createRecord.rejected, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Failed;
      })
      .addCase(updateRecord.pending, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Loading;
      })
      .addCase(updateRecord.fulfilled, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Success;
      })
      .addCase(updateRecord.rejected, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Failed;
      })
      .addCase(deleteRecord.pending, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Loading;
      })
      .addCase(deleteRecord.fulfilled, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Success;
      })
      .addCase(deleteRecord.rejected, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Failed;
      })
      .addCase(checkRecordFile.pending, (state, action) => {
        state.loadCheckRecordStatus = loadStatus.Loading;
      })
      .addCase(checkRecordFile.fulfilled, (state, action) => {
        state.loadCheckRecordStatus = loadStatus.Success;
      })
      .addCase(checkRecordFile.rejected, (state, action) => {
        state.loadCheckRecordStatus = loadStatus.Failed;
      })
      .addCase(getRecordById.pending, (state, action) => {
        state.loadRecordDataStatus = loadStatus.Loading;
      })
      .addCase(getRecordById.fulfilled, (state, action) => {
        state.loadRecordDataStatus = loadStatus.Success;
        state.recordData = action.payload;
      })
      .addCase(getRecordById.rejected, (state, action) => {
        state.loadRecordDataStatus = loadStatus.Failed;
        state.recordData = {};
      })
      .addCase(getDataRecordById.pending, (state, action) => {
        state.loadChartRecordDataStatus = loadStatus.Loading;
      })
      .addCase(getDataRecordById.fulfilled, (state, action) => {
        state.loadChartRecordDataStatus = loadStatus.Success;
        state.recordChartData = action.payload;
      })
      .addCase(getDataRecordById.rejected, (state, action) => {
        state.loadChartRecordDataStatus = loadStatus.Failed;
        state.recordChartData = {};
      })
  },
});

const { reducer: recordReducer } = recordSlice;
export const {
  resetLoadDataStatus,
  resetCreateDataStatus,
  resetUpdateDataStatus,
  resetDeleteDataStatus,
  resetCheckRecordStatus,
  resetRecordDataStatus,
  resetChartRecordDataStatus
} = recordSlice.actions;
export default recordReducer;
