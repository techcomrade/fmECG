import {
  httpDeleteData,
  httpGetData,
  httpPostData,
} from "../../api/common.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserId } from "../../utils/storageUtils";

export const loadStatus = {
  None: 0,
  Loading: 1,
  Success: 2,
  Failed: 3,
};

export const createPda = createAsyncThunk(
  "/create-pda",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData("/pda/create", params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getAssignment = createAsyncThunk(
  "/pda",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpGetData("/pda");
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getPatientByDoctorId = createAsyncThunk(
  "/pda/patient/id",
  async (params, { rejectWithValue }) => {
    try {
      const patient_id = getUserId();
      const response = await httpGetData(`/pda/patient/${patient_id}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const deleteAssignment = createAsyncThunk(
  "/delete-assignment",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpDeleteData(`/pda/delete/${params}`);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
export const updateAssignment = createAsyncThunk(
  "/update-assignment",
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpPostData(`/pda/update`, params);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);
const pdaSlice = createSlice({
  name: "pda",
  initialState: {
    data: [],
    patientData: [],
    loadDataStatus: loadStatus.None,
    loadCreateDataStatus: loadStatus.None,
    loadPatientDataStatus: loadStatus.None,
    loadUpdateDataStatus: loadStatus.None,
    loadDeleteDataStatus: loadStatus.None,
  },
  reducers: {
    resetCreateDataStatus: (state, action) => {
      state.loadCreateDataStatus = loadStatus.None;
    },
    resetLoadDataStatus: (state, action) => {
      state.data = [];
      state.loadDataStatus = loadStatus.None;
    },
    resetLoadPatientStatus: (state, action) => {
      state.patientData = [];
      state.loadPatientDataStatus = loadStatus.None;
    },
    resetLoadUpdateStatus: (state,action) => {
      state.loadUpdateDataStatus = loadStatus.None;
    },
    resetLoadDeleteStatus: (state,action) => {
      state.loadDeleteDataStatus = loadStatus.None;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPda.pending, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Loading;
      })
      .addCase(createPda.fulfilled, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Success;
      })
      .addCase(createPda.rejected, (state, action) => {
        state.loadCreateDataStatus = loadStatus.Failed;
      })
      .addCase(getAssignment.pending, (state, action) => {
        state.loadDataStatus = loadStatus.Loading;
      })
      .addCase(getAssignment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadDataStatus = loadStatus.Success;
      })
      .addCase(getAssignment.rejected, (state, action) => {
        state.data = [];
        state.loadDataStatus = loadStatus.Failed;
      })
      .addCase(getPatientByDoctorId.pending, (state, action) => {
        state.loadPatientDataStatus = loadStatus.Loading;
      })
      .addCase(getPatientByDoctorId.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loadPatientDataStatus = loadStatus.Success;
      })
      .addCase(getPatientByDoctorId.rejected, (state, action) => {
        state.patientData = [];
        state.loadPatientDataStatus = loadStatus.Failed;
      })
      .addCase(updateAssignment.pending, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Loading;
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Success;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.loadUpdateDataStatus = loadStatus.Failed;
      })
      .addCase(deleteAssignment.pending, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Loading;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Success;
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.loadDeleteDataStatus = loadStatus.Failed;
      });
  },
});

const { reducer: pdaReducer } = pdaSlice;
export const {
  resetCreateDataStatus,
  resetLoadDataStatus,
  resetLoadPatientStatus,
  resetLoadUpdateStatus,
  resetLoadDeleteStatus
} = pdaSlice.actions;
export default pdaReducer;
