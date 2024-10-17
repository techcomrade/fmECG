import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "../api/api-generated";
import { ApiLoadingStatus } from "../utils/loadingStatus";
import { createAsyncThunkWrap } from "./handler";
import { Service } from "../api";

interface IUserState {
  data: UserResponse[];
  dataLoadingStatus: ApiLoadingStatus;
}

const initialState: IUserState = {
  data: [],
  dataLoadingStatus: ApiLoadingStatus.None,
};

export const getAllUsers = createAsyncThunkWrap("/users", async () => {
  return await Service.userService.getAllUsers();
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetDataLoadingStatus: (state) => {
      state.dataLoadingStatus = ApiLoadingStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.dataLoadingStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.dataLoadingStatus = ApiLoadingStatus.Success;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.data = [];
        state.dataLoadingStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const { resetDataLoadingStatus } = userSlice.actions;
export default userSlice.reducer;
