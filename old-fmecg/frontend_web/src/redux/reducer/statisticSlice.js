import { httpGetData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const getStatistic = createAsyncThunk(
  "/statistic",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/statistic");
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const statisticSlice = createSlice({
  name: "statistic",
  initialState: {
    data: {},
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
      .addCase(getStatistic.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.data = action.payload.metadata;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getStatistic.rejected, (state, action) => {
        state.data = {};
        state.loadDataStatus = loadStatus.Failed;
      });
  },
});

const { reducer: statisticReducer } = statisticSlice;

export const { resetLoadDataStatus } = statisticSlice.actions;

export default statisticReducer;
