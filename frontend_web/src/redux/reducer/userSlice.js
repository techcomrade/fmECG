import { httpDeleteData, httpGetData, httpPostData, httpUpdateData } from "../../api/common.api";
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

export const updateData = createAsyncThunk(
  "/update-user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpUpdateData(`/user/${params.id}`, params);
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
      console.log(params)
      const response = await httpDeleteData(`/user/${params}`);
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
      loadUpdateUserStatus: loadStatus.None,
      loadDeleteUserStatus: loadStatus.None,
    },
    reducers: {
      resetLoadDataStatus: (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.None;
      },
      resetUpdateUserStatus: (state, action) => {
        state.loadUpdateUserStatus = loadStatus.None;
      },
      resetDeleteUserStatus: (state, action) => {
        state.loadDeleteUserStatus = loadStatus.None;
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
        .addCase(updateData.pending, (state, action) => {
          state.loadUpdateUserStatus = loadStatus.Loading;
        })
        .addCase(updateData.fulfilled, (state, action) => {
          state.loadUpdateUserStatus = loadStatus.Success;
        })
        .addCase(updateData.rejected, (state, action) => {
          state.loadUpdateUserStatus = loadStatus.Failed;
        })
        .addCase(deleteData.pending, (state, action) => {
          state.loadDeleteUserStatus = loadStatus.Loading;
        })
        .addCase(deleteData.fulfilled, (state, action) => {
          state.loadDeleteUserStatus = loadStatus.Success;
        })
        .addCase(deleteData.rejected, (state, action) => {
          state.loadDeleteUserStatus = loadStatus.Failed;
        })
    }
  });
  

const { reducer: userReducer } = userSlice;
export default userReducer;