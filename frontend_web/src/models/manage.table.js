import userTable from "./table/user.table";

const classesFactory = {
    userTable,
};

const classesFactoryMapping = {
    users: "userTable",
};

const tableNameMapping = {
    users: "người dùng",
};

export const exportColumnTable = (table, callBack) => {
    let nameConverted = classesFactoryMapping[table];
    if (!!nameConverted) {
        let tableSelected = new classesFactory[nameConverted]();
        if(!!tableSelected) return tableSelected.getColumnShow(callBack);
    }
    return [];
}

export const exportDataTable = (table, fatherId) => {
    let nameConverted = classesFactoryMapping[table];
    if (!!nameConverted) {
        let tableSelected = new classesFactory[nameConverted]();
        if(!!tableSelected) return tableSelected.getDataShow(fatherId);
    }
    return [];
}

export const exportTableName = (table) => {
    let nameConverted = tableNameMapping[table];
    if(!!nameConverted) return nameConverted 
    else
        return '';
}