import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import DataTable from "../../components/Table/dataTable";
import { ModalControlData } from "../../components/Modal/ModalControlData";
import {
    getAllRevenue,
    updateRevenueById,
    deleteRevenueById,
    resetLoadDeleteDataStatus,
    resetLoadUpdateDataStatus,
} from "../../redux/reducer/revenueSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { convertTimeToDateTime, checkDateTypeKey } from "../../utils/dateUtils";
import { findElementById } from "../../utils/arrayUtils";
import dayjs, { Dayjs } from "dayjs";
import { Context } from "../../utils/context";
import { userRole } from "../../constants";
import { showNotiError, showNotiSuccess } from "../../components/notification";
import { Button, DatePicker, Input, Space } from "antd";
import { getRevenueStatistic } from "../../redux/reducer/revenueSlice";
import { useEffect } from "react";

const { RangePicker, MonthPicker } = DatePicker;


type EditRevenueType = {
    open: (data: any[], columns: any[], layout: any) => void;
};

export const Revenue: React.FC = () => {
    const dispatch = useAppDispatch();
    const dataState = useAppSelector((state) => state.revenue);
    const [dataTable, setDataTable] = React.useState<any[]>([]);
    const [selectedData, setSelectedData] = React.useState<any[]>([]);
    const modalUpdateRef = React.useRef<EditRevenueType>(null);
    const [totalRevenue, setTotalRevenue] = React.useState<number | null>(null);
    const [statisticYear, setStatisticYear] = React.useState<number>(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const [selectedMonth, setSelectedMonth] = React.useState<Dayjs | null>(null);
    const [selectedRange, setSelectedRange] = React.useState<Dayjs[] | null>(null);
    const [filterData, setFilterData] = React.useState<{
        date: Dayjs | null;
        month: Dayjs | null;
        range: Dayjs[] | null;
        year: number;
    }>({ date: null, month: null, range: null, year: new Date().getFullYear() });



    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "ID lịch khám",
            dataIndex: "scheduleId",
            key: "scheduleId",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "Loại lịch khám",
            dataIndex: "scheduleType",
            key: "scheduleType",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "ID bệnh nhân",
            dataIndex: "patientId",
            key: "patientId",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "ID bác sĩ",
            dataIndex: "doctorId",
            key: "doctorId",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "Loại dịch vụ",
            dataIndex: "serviceType",
            key: "serviceType",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "Phí",
            dataIndex: "fee",
            key: "fee",
            type: "text",
            isEdit: true,
            searchable: true,
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            type: "text",
            isEdit: false,
        },
        {
            title: "Ngày sửa",
            dataIndex: "updatedAt",
            key: "updatedAt",
            type: "text",
            isEdit: false,
        }
    ];

    const handleData = (data: any, type: string) => {
        let revenueData = {} as any;

        if (type === "edit-form") {
            revenueData = {
                ...data,
            };
            Object.keys(data).forEach((key) => {
                if (checkDateTypeKey(key)) {
                    revenueData[key] = dayjs(data[key], "HH:mm DD/MM/YYYY");
                }
            });
        }

        if (type === "render") {
            revenueData = {
                ...data,
            };
            Object.keys(data).forEach((key) => {
                if (checkDateTypeKey(key)) {
                    revenueData[key] = convertTimeToDateTime(data[key]);
                }
            });
        }

        return revenueData;
    };

    React.useEffect(() => {
          dispatch(getAllRevenue());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRevenueStatistic(statisticYear))
    }, [statisticYear, dispatch])


    // Get data
    React.useEffect(() => {
         if (dataState.loadDataStatus === ApiLoadingStatus.Success) {
            const rawData = dataState.data.map((device) =>
                handleData(device, "render")
            );
            setDataTable(rawData);
        }
         if (dataState.statisticData?.total_revenue) {
            setTotalRevenue(dataState.statisticData?.total_revenue)
        }
        if (
            dataState.loadDataStatus === ApiLoadingStatus.Failed &&
            dataState.errorMessage
        ) {
            showNotiError(dataState.errorMessage);
        }
    }, [dataState.loadDataStatus, dataState.statisticData]);


    React.useEffect(() => {
        if (dataState.loadUpdateDataStatus === ApiLoadingStatus.Success) {
            dispatch(resetLoadUpdateDataStatus());
           dispatch(getAllRevenue());
            showNotiSuccess("Bạn đã sửa doanh thu thành công");
        }
        if (
            dataState.loadUpdateDataStatus === ApiLoadingStatus.Failed &&
            dataState.errorMessage
        ) {
            showNotiError(dataState.errorMessage);
            dispatch(resetLoadUpdateDataStatus());
        }
    }, [dataState.loadUpdateDataStatus, dispatch]);

    React.useEffect(() => {
        if (dataState.loadDeleteDataStatus === ApiLoadingStatus.Success) {
            dispatch(resetLoadDeleteDataStatus());
            dispatch(getAllRevenue());
            showNotiSuccess("Bạn đã xoá doanh thu thành công");
        }
        if (
            dataState.loadDeleteDataStatus === ApiLoadingStatus.Failed &&
            dataState.errorMessage
        ) {
            showNotiError(dataState.errorMessage);
            dispatch(resetLoadDeleteDataStatus());
        }
    }, [dataState.loadDeleteDataStatus, dispatch]);

    const handleEditFunction = () => {
        const revenueData = findElementById(dataTable, selectedData[0]);
        const dataEdit = handleData(revenueData, "edit-form");
        modalUpdateRef.current?.open(dataEdit, columns, "horizontal");
    };

    const handleSubmitEditRevenue = (data: any) => {
        const { ...payload } = data;
        dispatch(updateRevenueById(payload));
    };

    const handleDeleteFunction = (id: string) => {
        dispatch(deleteRevenueById(id));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatisticYear(Number(e.target.value));
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setSelectedDate(date);
    };

    const handleMonthChange = (month: dayjs.Dayjs | null) => {
        setSelectedMonth(month);
    };

    const handleRangeChange = (dates: (dayjs.Dayjs | null)[] | null) => {
        setSelectedRange(dates);
    };

    const handleSaveFilter = () => {
          setFilterData({
               date: selectedDate,
               month: selectedMonth,
               range: selectedRange,
                year: statisticYear,
           });
       
       console.log({
                date: selectedDate,
                month: selectedMonth,
                range: selectedRange,
                year: statisticYear
            })
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <h2>Tổng doanh thu: {totalRevenue}</h2>
                    <Space>
                        <DatePicker onChange={handleDateChange} value={selectedDate} />
                        <MonthPicker onChange={handleMonthChange} value={selectedMonth} />
                       <RangePicker onChange={handleRangeChange} value={selectedRange} />
                     </Space>
                </div>
                <div>
                    <Input
                        type="number"
                        style={{ width: 150, marginRight: 20 }}
                        placeholder="Năm"
                        onChange={handleYearChange}
                        value={statisticYear}
                    />
                    <Button type="primary" onClick={handleSaveFilter}>Lưu</Button>
                </div>
            </div>
            <DataTable
                role={Context.role === userRole.doctor ? userRole.doctor : undefined}
                editButton={Context.role === userRole.doctor}
                deleteButton={Context.role === userRole.doctor}
                column={columns}
                name="Thông tin doanh thu"
                data={dataTable}
                loading={dataState.loadDataStatus === ApiLoadingStatus.Loading}
                updateSelectedData={setSelectedData}
                editFunction={handleEditFunction}
                deleteFunction={handleDeleteFunction}
            />
            <ModalControlData
                ref={modalUpdateRef}
                title="Sửa thông tin doanh thu"
                submitFunction={(data: any) => handleSubmitEditRevenue(data)}
            />
        </>
    );
};