import { httpDeleteData, httpGetData, httpPostData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getUser = createAsyncThunk(
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

export const createUser = createAsyncThunk(
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

export const updateUser = createAsyncThunk(
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

export const deleteUser = createAsyncThunk(
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
        .addCase(getUser.pending, (state, action) => {
          state.loadDataStatus = loadStatus.Loading;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loadDataStatus = loadStatus.Success;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.data = [];
          state.loadDataStatus = loadStatus.Failed;
        })
        .addCase(createUser.pending, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Loading;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Success;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loadCreateDataStatus = loadStatus.Failed;
        })
        .addCase(updateUser.pending, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Loading;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Success;
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loadUpdateDataStatus = loadStatus.Failed;
        })
        .addCase(deleteUser.pending, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Loading;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Success;
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.loadDeleteDataStatus = loadStatus.Failed;
        })
    }
});

const { reducer: userReducer } = userSlice;
export const {resetLoadDataStatus, resetCreateDataStatus, resetUpdateDataStatus, resetDeleteDataStatus} = userSlice.actions;
export default userReducer;