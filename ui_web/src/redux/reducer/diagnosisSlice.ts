import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import { DiagnosisRequest, Service } from "../../api";

interface IScheduleState {
  loadCreateDiagnosisStatus: ApiLoadingStatus;
}

const initialState: IScheduleState = {
  loadCreateDiagnosisStatus: ApiLoadingStatus.None,
};

export const createDiagnosis = createAsyncThunkWrap(
  "/create",
  async (diagnosis: DiagnosisRequest) => {
    return await Service.diagnosisService.createDiagnosis(diagnosis);
  }
);

export const diagnosisSlice = createSlice({
  name: "diagnosis",
  initialState,
  reducers: {
    resetLoadCreateDiagnosisStatus: (state) => {
      state.loadCreateDiagnosisStatus = ApiLoadingStatus.None;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDiagnosis.pending, (state, action) => {
        state.loadCreateDiagnosisStatus = ApiLoadingStatus.Loading;
      })
      .addCase(createDiagnosis.fulfilled, (state, action) => {
        state.loadCreateDiagnosisStatus = ApiLoadingStatus.Success;
      })
      .addCase(createDiagnosis.rejected, (state, action) => {
        state.loadCreateDiagnosisStatus = ApiLoadingStatus.Failed;
      });
  },
});

export const { resetLoadCreateDiagnosisStatus } =
diagnosisSlice.actions;
export default diagnosisSlice.reducer;
