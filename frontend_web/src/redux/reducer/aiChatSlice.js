import { message } from "antd";
import { httpGetData, httpPostData } from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const sendMessage = createAsyncThunk(
  "/send-message",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData('/chat', {message: params});
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const TrainingData = createAsyncThunk(
  "/conversation",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData('/chat/conversation', {user_id: params});
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
const statisticSlice = createSlice({
  name: "ai-chat",
  initialState: {
    data: "",
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
      .addCase(sendMessage.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.data = action.payload.metadata;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.data = {};
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(TrainingData.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(TrainingData.fulfilled, (state, action) => {
        state.data = action.payload.metadata;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(TrainingData.rejected, (state, action) => {
        state.data = {};
        state.loadDataStatus = loadStatus.Failed;
      });
  },
});

const { reducer: aiChatReducer } = statisticSlice;

export const { resetLoadDataStatus } = statisticSlice.actions;

export default aiChatReducer;
