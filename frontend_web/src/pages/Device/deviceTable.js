import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useState } from "react";
import { getDevice, loadStatus } from "../../redux/reducer/deviceSlice";
import { exportColumnTable, exportFunction, exportTableName } from "../../models/manage.table";
import { convertTimeToDate } from "../../utils/dateUtils";

const DeviceTable = () => {
    const table = 'device'
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.device);
    const func = exportFunction(table);
    const column = exportColumnTable(table);
    const [dataTable, setData] = useState([]);

    useEffect(() => {
        dispatch(getDevice());
    }, []);

    // Get data
    useEffect(() => {
        if (dataState.loadDataStatus === loadStatus.Success) {
            const rawData = dataState.data.metadata;
            const data = rawData.map((element, index) => ({
                ...element,
                start_date: convertTimeToDate(element.start_date),
                end_date: convertTimeToDate(element.end_date)
            }));
            setData(data);
        }
    }, [dataState.loadDataStatus]);
    
    return (
        <>
            <DataTable
                table = {table}
                column = {column}
                state = {dataState}
                func = {func}
                name = {exportTableName(table)}
                data = {dataTable}
            />
        </>
    )
}

export default DeviceTable;