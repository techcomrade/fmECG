import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect } from "react";
import { getData } from "../../redux/reducer/userSlice";
import { exportColumnTable, exportFunction, exportTableName } from "../../models/manage.table";

const DeviceTable = () => {
    const table = 'device'
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.device);
    const func = exportFunction(table);
    const column = exportColumnTable(table);

    useEffect(() => {
        dispatch(getData());
    }, []);

    return (
        <>
            <DataTable
                table = {table}
                column = {column}
                state = {dataState}
                func = {func}
                name = {exportTableName(table)}
            />
        </>
    )
}

export default DeviceTable;