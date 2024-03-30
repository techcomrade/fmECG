import { httpDeleteData, httpGetData, httpPostData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getData = createAsyncThunk(
  "/user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData('/user');
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const createData = createAsyncThunk(
  "/create-user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData('/user', params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const updateData = createAsyncThunk(
  "/update-user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData(`/user/update`, params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const deleteData = createAsyncThunk(
  "/delete",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpDeleteData(`/user`, params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const userSlice = createSlice({
    name: 'user',
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
        .addCase(getData.pending, (state, action) => {
          state.loadDataStatus = loadStatus.Loading;
        })
        .addCase(getData.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loadDataStatus = loadStatus.Success;
        })
        .addCase(getData.rejected, (state, action) => {
          state.data = [];
          state.loadDataStatus = loadStatus.Failed;
        })
        .addCase(createData.pending, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Loading;
        })
        .addCase(createData.fulfilled, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Success;
        })
        .addCase(createData.rejected, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Failed;
        })
        .addCase(updateData.pending, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Loading;
        })
        .addCase(updateData.fulfilled, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Success;
        })
        .addCase(updateData.rejected, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Failed;
        })
        .addCase(deleteData.pending, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Loading;
        })
        .addCase(deleteData.fulfilled, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Success;
        })
        .addCase(deleteData.rejected, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Failed;
        })
    }
});

const { reducer: userReducer } = userSlice;
export default userReducer;