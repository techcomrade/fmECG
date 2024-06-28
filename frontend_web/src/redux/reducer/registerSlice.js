import { httpGetData } from "../../api/common.api";
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

const registerSlice = createSlice({
  name: "register",
  initialState: {
    data: [],
    loadDataStatus: loadStatus.None,
  },
  reducers: {
    resetLoadDataStatus: (state, action) => {
      state.data = [];
      state.loadDataStatus = loadStatus.None;
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
      });
    // .addCase(createUser.pending, (state, action) => {
    //   state.loadCreateDataStatus = loadStatus.Loading;
    // })
    // .addCase(createUser.fulfilled, (state, action) => {
    //   state.loadCreateDataStatus = loadStatus.Success;
    // })
    // .addCase(createUser.rejected, (state, action) => {
    //   state.loadCreateDataStatus = loadStatus.Failed;
    // })
  },
});

const { reducer: registerReducer } = registerSlice;
export const { resetLoadDataStatus } = registerSlice.actions;
export default registerReducer;
