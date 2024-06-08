import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import { dummyArray, dummyIncreaseArray } from '../../utils/arrayUtils';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Button } from "antd";
import { useEffect, useRef, useState } from 'react';
import { colorChart } from '../../constants';

const LineChart = ({ rawData }) => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, zoomPlugin, Tooltip);
    const chartRef = useRef(null);
    const [yScale, setYScale] = useState({});
    const [datasets, setDataSets] = useState([]);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    const pointColor = (data, baseColor) => {
        return data.map(item => item.warning ===  1 ? 'red' : baseColor);
    }

    const handleDataValue = (data) => {
        return data.map(item => item.value);
    }

    useEffect(() => {
        if (rawData) {
            const label = Object.keys(rawData).map((key, index) => {
                const pointColorChart = pointColor(rawData?.[key], colorChart[index]);
                return {
                    label: key,
                    data: handleDataValue(rawData?.[key]),
                    borderColor: colorChart[index],
                    pointBorderColor: pointColorChart,
                    backgroundColor: pointColorChart,
                    yAxisID: key,  
                    stepped: false
                }
            });
            setDataSets(label);
        
            let scale = {};
            Object.keys(rawData).forEach((key) => 
                scale[key] = {
                    title: {
                        display: true,
                        text: key
                    },
                    position: 'left',
                    stack: 'demo',
                    stackWeight: 1,
                }
            );
            setYScale(scale);
        }
        else {
            setDataSets([]);
            setYScale({});
        }
    }, [rawData]);

    const dataChart = {
        labels: dummyIncreaseArray(74),
        datasets: datasets
    }

    const optionChart = {
        plugins: {
            title: {
                display: true,
                text: 'Đồ thị chỉ số sức khỏe',
                font: {
                    size: 14
                }
            },
            tooltip: {
                enabled: true
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                },
                pan: {
                    enabled: true,
                    mode: 'x'
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Thời gian"
                },
                max: 150
            },
            ...yScale
        }
    }

    return(
        <>
            <Line
                ref={chartRef}
                data={dataChart}
                options={optionChart}
            />
            <Button size='small' onClick={handleResetZoom}>Reset zoom</Button>
        </>
    )
}

export default LineChart;