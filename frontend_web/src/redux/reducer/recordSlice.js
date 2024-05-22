import {
  httpDeleteData,
  httpGetData,
  httpPostData,
} from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
      const response = await httpGetData("/record");
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getTotal = createAsyncThunk(
  "/total",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/statistic/record");
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

const recordSlice = createSlice({
  name: "record",
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
      .addCase(getTotal.pending, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Loading;
      })
      .addCase(getTotal.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDeleteDataStatus = loadStatus.Success;
      })
      .addCase(getTotal.rejected, (state, action) => {
        state.data = [];
        state.loadDeleteDataStatus = loadStatus.Failed;
      });
  },
});

const { reducer: recordReducer } = recordSlice;
export const {
  resetLoadDataStatus,
  resetCreateDataStatus,
  resetUpdateDataStatus,
  resetDeleteDataStatus,
} = recordSlice.actions;
export default recordReducer;
