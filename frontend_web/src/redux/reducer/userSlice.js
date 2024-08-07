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

export const getUser = createAsyncThunk(
  "/user",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/user");
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getUsersByRole = createAsyncThunk(
  "/role",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData(`/user/role/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getPatient = createAsyncThunk(
  "/patient",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData(`/pda/patient/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const getDoctor = createAsyncThunk(
  "/doctor",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData(`/pda/doctor/${params}`);
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
      const response = await httpPostData("/user", params);
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

export const getUserById = createAsyncThunk(
  "/user/id",
  async (params, { rejectWithValue }) => {
    try {
      const user_id = params;
      const response = await httpGetData(`/user/id/${user_id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    userData: {},
    usersDataByRole: [],
    loadDataStatus: loadStatus.None,
    loadCreateDataStatus: loadStatus.None,
    loadUpdateDataStatus: loadStatus.None,
    loadDeleteDataStatus: loadStatus.None,
    loadUserDataStatus: loadStatus.None,
    loadGetUsersByRole: loadStatus.None,
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
    resetUserDataStatus: (state, action) => {
      state.loadUserDataStatus = loadStatus.None;
    },
    resetUserDataByRoleStatus: (state, action) => {
      state.loadGetUsersByRole = loadStatus.None;
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
      .addCase(getPatient.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getPatient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getPatient.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(getDoctor.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getDoctor.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getDoctor.rejected, (state, action) => {
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
      .addCase(getUserById.pending, (state, action) => {
        state.loadUserDataStatus = loadStatus.Loading;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loadUserDataStatus = loadStatus.Success;
        state.userData = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loadUserDataStatus = loadStatus.Failed;
        state.userData = {};
      })
      .addCase(getUsersByRole.pending, (state, action) => {
        state.loadGetUsersByRole = loadStatus.Loading;
      })
      .addCase(getUsersByRole.fulfilled, (state, action) => {
        state.loadGetUsersByRole = loadStatus.Success;
        state.usersDataByRole = action.payload;
      })
      .addCase(getUsersByRole.rejected, (state, action) => {
        state.loadGetUsersByRole = loadStatus.Failed;
        state.usersDataByRole = [];
      });
  },
});

const { reducer: userReducer } = userSlice;
export const {
  resetLoadDataStatus,
  resetCreateDataStatus,
  resetUpdateDataStatus,
  resetDeleteDataStatus,
  resetUserDataStatus,
  loadGetUsersByRole,
} = userSlice.actions;
export default userReducer;
