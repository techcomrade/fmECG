import { createSlice } from "@reduxjs/toolkit";
import { UserRequest, UserResponse } from "../../api/api-generated";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { Service } from "../../api";

interface IUserState {
  data: UserResponse[];
  userData: UserResponse;
  loadDataStatus: ApiLoadingStatus;
  loadRolesDataStatus: ApiLoadingStatus;
  loadGetUserByIdStatus: ApiLoadingStatus;
  loadUpdateDataStatus: ApiLoadingStatus;
  loadDeleteDataStatus: ApiLoadingStatus;
}

const initialState: IUserState = {
  data: [],
  userData: {} as UserResponse,
  loadDataStatus: ApiLoadingStatus.None,
  loadRolesDataStatus: ApiLoadingStatus.None,
  loadGetUserByIdStatus: ApiLoadingStatus.None,
  loadUpdateDataStatus: ApiLoadingStatus.None,
  loadDeleteDataStatus: ApiLoadingStatus.None,
};

export const getAllUsers = createAsyncThunkWrap("/user", async () => {
  return await Service.userService.getAllUsers();
});

export const getUserById = createAsyncThunkWrap(
  "/users/id",
  async (id: string) => {
    return await Service.userService.getUserById(id);
  }
);

export const updateUserById = createAsyncThunkWrap(
  "/update",
  async (user: UserRequest) => {
    return await Service.userService.updateUserById(user);
  }
);
export const deleteUserById = createAsyncThunkWrap(
  "/delete",
  async (id: string) => {
    return await Service.userService.deleteUserById(id);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetLoadDataStatus: (state) => {
      state.loadDataStatus = ApiLoadingStatus.None;
    },
    resetLoadGetUserByIdStatus: (state) => {
      state.loadGetUserByIdStatus = ApiLoadingStatus.None;
    },
    resetLoadUpdateDataStatus: (state) => {
      state.loadDeleteDataStatus = ApiLoadingStatus.None;
    },
    resetLoadDeleteDataStatus: (state) => {
      state.loadDeleteDataStatus = ApiLoadingStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
        state.loadDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(getUserById.pending, (state, action) => {
        state.loadGetUserByIdStatus = ApiLoadingStatus.Loading;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loadGetUserByIdStatus = ApiLoadingStatus.Success;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userData = {} as UserResponse;
        state.loadGetUserByIdStatus = ApiLoadingStatus.Failed;
      })
      .addCase(updateUserById.pending, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loadUpdateDataStatus = ApiLoadingStatus.Failed;
      })
      .addCase(deleteUserById.pending, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Loading;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Success;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loadDeleteDataStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const {
  resetLoadDataStatus,
  resetLoadGetUserByIdStatus,
  resetLoadUpdateDataStatus,
  resetLoadDeleteDataStatus,
} = userSlice.actions;
export default userSlice.reducer;
