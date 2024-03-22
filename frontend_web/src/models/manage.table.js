import userTable from "./table/user.table";

const classesFactory = {
    userTable,
};

const classesFactoryMapping = {
    user: "userTable",
};

const tableNameMapping = {
    user: "người dùng",
};

export const exportColumnTable = (table, callBack) => {
    let nameConverted = classesFactoryMapping[table];
    if (!!nameConverted) {
        let tableSelected = new classesFactory[nameConverted]();
        if(!!tableSelected) return tableSelected.getColumnShow(callBack);
    }
    return [];
}

export const exportDataTable = (table) => {
    let nameConverted = classesFactoryMapping[table];
    if (!!nameConverted) {
        let tableSelected = new classesFactory[nameConverted]();
        if(!!tableSelected) return tableSelected.getDataShow();
    }
    return [];
}

export const exportTableName = (table) => {
    let nameConverted = tableNameMapping[table];
    if(!!nameConverted) return nameConverted 
    else
        return '';
}