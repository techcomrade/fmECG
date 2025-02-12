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
    getRevenueStatistic,
    getStaticByYear,
    getStaticByMonth,
    getStaticByDay,
} from "../../redux/reducer/revenueSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { convertTimeToDateTime, checkDateTypeKey } from "../../utils/dateUtils";
import { findElementById } from "../../utils/arrayUtils";
import dayjs, { Dayjs } from "dayjs";
import { Context } from "../../utils/context";
import { userRole } from "../../constants";
import { showNotiError, showNotiSuccess } from "../../components/notification";
import { Button, DatePicker, Input, Space } from "antd";
import { useEffect } from "react";
import styles from "./revenue.module.scss";
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
    const [totalRevenueByYear, setTotalRevenueByYear] = React.useState<number>(0);
    const [totalRevenueByMonth, setTotalRevenueByMonth] = React.useState<number | null>(null);
    const [totalRevenueByDate, setTotalRevenueByDate] = React.useState<number | null>(null);
    const [statisticYear, setStatisticYear] = React.useState<number>(new Date().getFullYear())
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
    const [selectedMonth, setSelectedMonth] = React.useState<Dayjs | null>(null);
    const [filterData, setFilterData] = React.useState<{
        date: Dayjs | null;
        month: Dayjs | null;
        year: number;
    }>({ date: null, month: null, year: new Date().getFullYear() });


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
            dataIndex: "schedule_id",
            key: "scheduleId",
            type: "text",
            isEdit: false,
            searchable: true,
        },

        {
            title: "ID bệnh nhân",
            dataIndex: "patient_id",
            key: "patientId",
            type: "text",
            isEdit: false,
            searchable: true,
        },
        {
            title: "ID bác sĩ",
            dataIndex: "doctor_id",
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
    useEffect(()=>{
        if(dataState.loadStaticByYear === ApiLoadingStatus.Success){
            setTotalRevenueByYear(dataState.staticByYear);
        }
    },[dataState.loadStaticByYear])
     useEffect(()=>{
        if(dataState.loadStaticByMonth === ApiLoadingStatus.Success){
            setTotalRevenueByMonth(dataState.staticByMonth);
        }
    },[dataState.loadStaticByMonth])
      useEffect(()=>{
        if(dataState.loadStaticByDay === ApiLoadingStatus.Success){
            setTotalRevenueByDate(dataState.staticByDay);
        }
    },[dataState.loadStaticByDay])
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
        if(filterData.year){
             dispatch(getStaticByYear(filterData.year))
         }
         if(filterData.month) {
            dispatch(getStaticByMonth({ month: filterData.month.month() + 1, year: filterData.month.year()}))
         }
        if(filterData.date) {
             dispatch(getStaticByDay({ day: filterData.date.date(), month: filterData.date.month() + 1, year: filterData.date.year() }))
         }
    }, [filterData, dispatch])
    
    
    // Get data
    React.useEffect(() => {
         if (dataState.loadDataStatus === ApiLoadingStatus.Success) {
            const rawData = dataState.data.map((device) =>
                handleData(device, "render")
            );
            console.log(rawData);
            setDataTable(rawData);
        }
        if (
            dataState.loadDataStatus === ApiLoadingStatus.Failed &&
            dataState.errorMessage
        ) {
            showNotiError(dataState.errorMessage);
        }
    }, [dataState.loadDataStatus]);


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



   const handleSaveYearFilter = () => {
        setFilterData((prev) => ({...prev, year: statisticYear, month: null, date: null}))
    }

    const handleSaveDateFilter = () => {
         setFilterData((prev) => ({ ...prev, date: selectedDate, month: null, year: new Date().getFullYear()  }))
    }
    const handleSaveMonthFilter = () => {
         setFilterData((prev) => ({ ...prev, month: selectedMonth, date: null, year: new Date().getFullYear()  }))
    }
    return (
        <div className={styles.revenueContainer}>
            <div className={styles.filterSection}>
                <div className={styles.revenueTypeContainer}>
                    <h3>Tổng doanh thu theo năm: {totalRevenueByYear}</h3>
                    <Space className={styles.inputGroup}>
                        <Input
                            type="number"
                            style={{ width: 150, marginRight: 20 }}
                            placeholder="Năm"
                            onChange={handleYearChange}
                            value={statisticYear}
                        />
                        <Button type="primary" onClick={handleSaveYearFilter}>Hiển thị</Button>
                    </Space>
                </div>
                <div className={styles.revenueTypeContainer}>
                    <h3>Tổng doanh thu theo tháng: {totalRevenueByMonth}</h3>
                    <Space className={styles.inputGroup}>
                        <MonthPicker onChange={handleMonthChange} value={selectedMonth} />
                        <Button type="primary" onClick={handleSaveMonthFilter}>Hiển thị</Button>
                    </Space>
                </div>
                <div className={styles.revenueTypeContainer}>
                    <h3>Tổng doanh thu theo ngày: {totalRevenueByDate}</h3>
                    <Space className={styles.inputGroup}>
                        <DatePicker onChange={handleDateChange} value={selectedDate} />
                        <Button type="primary" onClick={handleSaveDateFilter}>Hiển thị</Button>
                    </Space>
                </div>
            </div>
            <div className={styles.dataTableContainer}>
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
            </div>
            <ModalControlData
                ref={modalUpdateRef}
                title="Sửa thông tin doanh thu"
                submitFunction={(data: any) => handleSubmitEditRevenue(data)}
            />
        </div>
    );
};