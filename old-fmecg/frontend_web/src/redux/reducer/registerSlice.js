import { httpGetData, httpPostData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getCheckRegister = createAsyncThunk(
  "/check-register",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/register");
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const acceptedRegister = createAsyncThunk(
  "/accept",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData("/register/accepted", params);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const rejectedRegister = createAsyncThunk(
  "/reject",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData("/register/rejected", params);
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    data: [],
    loadDataStatus: loadStatus.None,
    loadAcceptStatus: loadStatus.None,
    loadRejectStatus: loadStatus.None,
  },
  reducers: {
    resetLoadDataStatus: (state, action) => {
      state.data = [];
      state.loadDataStatus = loadStatus.None;
    },
    resetAcceptStatus: (state, action) => {
      state.loadAcceptStatus = loadStatus.None;
    },
    resetRejectStatus: (state, action) => {
      state.loadRejectStatus = loadStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckRegister.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getCheckRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getCheckRegister.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(acceptedRegister.pending, (state, action) => {
        state.loadAcceptStatus = loadStatus.Loading;
      })
      .addCase(acceptedRegister.fulfilled, (state, action) => {
        state.loadAcceptStatus = loadStatus.Success;
      })
      .addCase(acceptedRegister.rejected, (state, action) => {
        state.loadAcceptStatus = loadStatus.Failed;
      })
      .addCase(rejectedRegister.pending, (state, action) => {
        state.loadRejectStatus = loadStatus.Loading;
      })
      .addCase(rejectedRegister.fulfilled, (state, action) => {
        state.loadRejectStatus = loadStatus.Success;
      })
      .addCase(rejectedRegister.rejected, (state, action) => {
        state.loadRejectStatus = loadStatus.Failed;
      })
  },
});

const { reducer: registerReducer } = registerSlice;
export const { resetLoadDataStatus, resetAcceptStatus, resetRejectStatus } = registerSlice.actions;
export default registerReducer;
