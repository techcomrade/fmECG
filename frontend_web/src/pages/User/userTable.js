import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useState } from "react";
import { getUser, loadStatus } from "../../redux/reducer/userSlice";
import { exportColumnTable, exportFunction, exportTableName } from "../../models/manage.table";
import { convertTimeToDate } from "../../utils/dateUtils";

const UserTable = () => {
    const table = 'user'
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.user);
    const func = exportFunction(table);
    const column = exportColumnTable(table);
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    // Get data
    useEffect(() => {
        if (dataState.loadDataStatus === loadStatus.Success) {
            const rawData = dataState.data.metadata;
            setDataTable(rawData);
            // data = rawData.map((element, index) => ({
            //     ...element,
            //     birth: convertTimeToDate(element.birth)
            // }))
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

export default UserTable;