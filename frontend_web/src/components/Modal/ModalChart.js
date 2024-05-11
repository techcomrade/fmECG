import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { httpGetData } from '../../api/common.api';
import LineChart from '../LineChart/LineChart';

const ModalChart = ({isOpen, setIsOpen, selectedDevice}) => {
    const [data, setData] = useState();

    useEffect(()=>{
        async function fetchData (){
            const data = await httpGetData(`/record/data/100`);
            setData(data.metadata);
        }
        if(selectedDevice.length > 0) {
            fetchData();
        }
    },[selectedDevice])

    const handleCancel = () => {
        setIsOpen(false);
    }

    return (
        <>
            <Modal
                title="Đồ thị records"
                open = {isOpen}
                cancelText="Quay lại"
                onCancel={handleCancel}
                width={800}
                centered
            >
                <LineChart data={data}/>
            </Modal>
        </>
    );
};
export default ModalChart;