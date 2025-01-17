import { createSlice } from "@reduxjs/toolkit";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { createAsyncThunkWrap } from "../handler";
import {
    RevenueRequest,
    RevenueResponse,
    Service,
} from "../../api";

interface IRevenueState {
    data: RevenueResponse[];
    statisticData: any | null;
    loadDataStatus: ApiLoadingStatus;
    loadCreateDataStatus: ApiLoadingStatus;
    loadUpdateDataStatus: ApiLoadingStatus;
    loadDeleteDataStatus: ApiLoadingStatus;
    loadStatisticDataStatus: ApiLoadingStatus;
    staticByYear: number;
    loadStaticByYear: ApiLoadingStatus;
    staticByMonth: number;
    loadStaticByMonth: ApiLoadingStatus;
    staticByDay: number;
    loadStaticByDay: ApiLoadingStatus;
    errorMessage: string | undefined;
}

const initialState: IRevenueState = {
    data: [],
    statisticData: null,
    loadDataStatus: ApiLoadingStatus.None,
    loadCreateDataStatus: ApiLoadingStatus.None,
    loadUpdateDataStatus: ApiLoadingStatus.None,
    loadDeleteDataStatus: ApiLoadingStatus.None,
    loadStatisticDataStatus: ApiLoadingStatus.None,
    loadStaticByYear: ApiLoadingStatus.None,
    staticByYear: 0,
    staticByMonth: 0,
    loadStaticByMonth: ApiLoadingStatus.None,
    staticByDay: 0,
    loadStaticByDay: ApiLoadingStatus.None,
    errorMessage: undefined,
};

export const getStaticByYear = createAsyncThunkWrap(
    "/revenue/staticByYear",
    async (year: number) => {
        return await Service.revenueService.getRevenueStatistic(year);
    }
);

export const getStaticByMonth = createAsyncThunkWrap(
    "/revenue/staticByMonth",
    async ({ month, year }: { month: number, year: number }) => {
        return await Service.revenueService.getRevenueStatisticByMonth(month, year);
    }
);

export const getStaticByDay = createAsyncThunkWrap(
    "/revenue/staticByDay",
    async ({ day, month, year }: { day: number, month: number, year: number }) => {
        return await Service.revenueService.getRevenueStatisticByDay(day, month, year);
    }
);

export const getAllRevenue = createAsyncThunkWrap(
    "/revenue/getAllRevenue",
    async () => {
        return await Service.revenueService.getAllRevenue();
    }
);

export const addRevenue = createAsyncThunkWrap(
    "/revenue/addRevenue",
    async (revenue: RevenueRequest) => {
        return await Service.revenueService.addRevenue(revenue);
    }
);

export const getTotalRevenue = createAsyncThunkWrap(
    "/revenue/getTotalRevenue",
    async () => {
        return await Service.revenueService.getTotalRevenue();
    }
);

export const getRevenueStatistic = createAsyncThunkWrap(
    "/revenue/getRevenueStatistic",
    async (year: number) => {
        return await Service.revenueService.getRevenueStatistic(year);
    }
)

export const updateRevenueById = createAsyncThunkWrap(
    "/revenue/updateRevenueById",
    async (revenue: any) => {
        return await Service.revenueService.updateIRevenueById(revenue.id, revenue)
    }
)

export const deleteRevenueById = createAsyncThunkWrap(
    "/revenue/deleteRevenueById",
    async (id: string) => {
        return await Service.revenueService.deleteRevenueById(id);
    }
)

export const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {
        resetLoadDataStatus: (state) => {
            state.loadDataStatus = ApiLoadingStatus.None;
        },
        resetLoadCreateDataStatus: (state) => {
            state.loadCreateDataStatus = ApiLoadingStatus.None;
        },
        resetLoadUpdateDataStatus: (state) => {
            state.loadUpdateDataStatus = ApiLoadingStatus.None;
        },
        resetLoadDeleteDataStatus: (state) => {
            state.loadDeleteDataStatus = ApiLoadingStatus.None;
        },
        resetLoadStatisticDataStatus: (state) => {
            state.loadStatisticDataStatus = ApiLoadingStatus.None;
        },
        resetLoadStaticByYearStatus: (state) => {
            state.loadStaticByYear = ApiLoadingStatus.None
        },
        resetLoadStaticByMonthStatus: (state) => {
            state.loadStaticByMonth = ApiLoadingStatus.None
        },
         resetLoadStaticByDayStatus: (state) => {
            state.loadStaticByDay = ApiLoadingStatus.None
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStaticByYear.pending, state => {
                state.loadStaticByYear = ApiLoadingStatus.Loading;
            })
            .addCase(getStaticByYear.fulfilled, (state, action) => {
                state.loadStaticByYear = ApiLoadingStatus.Success;
                state.staticByYear = action.payload;
                state.statisticData = {...state.statisticData, total_revenue: action.payload}
            })
            .addCase(getStaticByYear.rejected, (state, action) => {
                state.loadStaticByYear = ApiLoadingStatus.Failed;
                state.staticByYear = 0;
                state.errorMessage = (action.payload as any)?.message;
            })
              .addCase(getStaticByMonth.pending, state => {
                state.loadStaticByMonth = ApiLoadingStatus.Loading;
            })
            .addCase(getStaticByMonth.fulfilled, (state, action) => {
                state.loadStaticByMonth = ApiLoadingStatus.Success;
                state.staticByMonth = action.payload;
                  state.statisticData = {...state.statisticData, total_revenue: action.payload}
            })
            .addCase(getStaticByMonth.rejected, (state, action) => {
                state.loadStaticByMonth = ApiLoadingStatus.Failed;
                state.staticByMonth = 0;
                state.errorMessage = (action.payload as any)?.message;
            })
             .addCase(getStaticByDay.pending, state => {
                state.loadStaticByDay = ApiLoadingStatus.Loading;
            })
            .addCase(getStaticByDay.fulfilled, (state, action) => {
                state.loadStaticByDay = ApiLoadingStatus.Success;
                state.staticByDay = action.payload;
                   state.statisticData = {...state.statisticData, total_revenue: action.payload}
            })
            .addCase(getStaticByDay.rejected, (state, action) => {
                state.loadStaticByDay = ApiLoadingStatus.Failed;
                state.staticByDay = 0;
                 state.errorMessage = (action.payload as any)?.message;
            })
            .addCase(getAllRevenue.pending, (state) => {
                state.loadDataStatus = ApiLoadingStatus.Loading;
            })
            .addCase(getAllRevenue.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loadDataStatus = ApiLoadingStatus.Success;
            })
            .addCase(getAllRevenue.rejected, (state, action) => {
                state.data = [];
                state.errorMessage = (<any>action.payload)?.message;
                state.loadDataStatus = ApiLoadingStatus.Failed;
            })
            .addCase(addRevenue.pending, (state) => {
                state.loadCreateDataStatus = ApiLoadingStatus.Loading;
            })
            .addCase(addRevenue.fulfilled, (state) => {
                state.loadCreateDataStatus = ApiLoadingStatus.Success;
            })
            .addCase(addRevenue.rejected, (state, action) => {
                state.errorMessage = (<any>action.payload)?.message;
                state.loadCreateDataStatus = ApiLoadingStatus.Failed;
            })
             .addCase(getTotalRevenue.pending, (state) => {
                state.loadDataStatus = ApiLoadingStatus.Loading;
            })
            .addCase(getTotalRevenue.fulfilled, (state) => {
                state.loadDataStatus = ApiLoadingStatus.Success;
            })
            .addCase(getTotalRevenue.rejected, (state, action) => {
                state.errorMessage = (<any>action.payload)?.message;
                state.loadDataStatus = ApiLoadingStatus.Failed;
            })
            .addCase(getRevenueStatistic.pending, (state) => {
                state.loadStatisticDataStatus = ApiLoadingStatus.Loading;
            })
            .addCase(getRevenueStatistic.fulfilled, (state, action) => {
                state.statisticData = action.payload;
                state.loadStatisticDataStatus = ApiLoadingStatus.Success;
            })
            .addCase(getRevenueStatistic.rejected, (state, action) => {
                state.statisticData = null;
                state.errorMessage = (<any>action.payload)?.message;
                state.loadStatisticDataStatus = ApiLoadingStatus.Failed;
            })
           .addCase(updateRevenueById.pending, (state) => {
            state.loadUpdateDataStatus = ApiLoadingStatus.Loading;
           })
          .addCase(updateRevenueById.fulfilled, (state) => {
           state.loadUpdateDataStatus = ApiLoadingStatus.Success;
          })
         .addCase(updateRevenueById.rejected, (state, action) => {
            state.errorMessage = (<any>action.payload)?.message;
           state.loadUpdateDataStatus = ApiLoadingStatus.Failed;
           })
          .addCase(deleteRevenueById.pending, (state) => {
          state.loadDeleteDataStatus = ApiLoadingStatus.Loading;
          })
          .addCase(deleteRevenueById.fulfilled, (state) => {
           state.loadDeleteDataStatus = ApiLoadingStatus.Success;
          })
          .addCase(deleteRevenueById.rejected, (state, action) => {
          state.errorMessage = (<any>action.payload)?.message;
            state.loadDeleteDataStatus = ApiLoadingStatus.Failed;
         })
    },
});

export const {
    resetLoadDataStatus,
    resetLoadCreateDataStatus,
    resetLoadUpdateDataStatus,
    resetLoadDeleteDataStatus,
    resetLoadStatisticDataStatus,
     resetLoadStaticByYearStatus,
      resetLoadStaticByMonthStatus,
       resetLoadStaticByDayStatus
} = revenueSlice.actions;

export default revenueSlice.reducer;