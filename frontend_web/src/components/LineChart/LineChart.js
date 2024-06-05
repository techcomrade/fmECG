import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import { dummyArray, dummyIncreaseArray } from '../../utils/arrayUtils';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Button } from "antd";
import { useRef } from 'react';

const LineChart = () => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, zoomPlugin, Tooltip);
    const chartRef = useRef(null);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    const pointColor = (data, baseColor) => {
        return data.map(item => item.warning ===  1 ? 'red' : baseColor);
    }

    const handleDataValue = (data) => {
        return data.map(item => item.value)
    }

    const dummyData = {
        y: dummyArray(1001),
        y2: dummyArray(1001),
        y3: dummyArray(1001),
        y4: dummyArray(1001)
    }

    const colorData = {
        y: pointColor(dummyData.y, 'rgb(54, 162, 235)'),
        y2: pointColor(dummyData.y2, 'rgb(255, 99, 132)'),
        y3: pointColor(dummyData.y3, 'rgb(75, 192, 192)'),
        y4: pointColor(dummyData.y4, 'rgb(255, 205, 86)')
    }

    const dataChart = {
        labels: dummyIncreaseArray(1001),
        datasets: [
            {
                label: "Trục Y",
                data: handleDataValue(dummyData.y),
                borderColor: 'rgb(54, 162, 235)',
                pointBorderColor: colorData.y,
                backgroundColor: colorData.y
            },
            {
                label: "Trục Y2",
                data: handleDataValue(dummyData.y2),
                borderColor: 'rgb(255, 99, 132)',
                pointBorderColor: colorData.y2,
                backgroundColor: colorData.y2,
                yAxisID: 'y2',  
                stepped: false
            },
            {
                label: "Trục Y3",
                data: handleDataValue(dummyData.y3),
                borderColor: 'rgb(75, 192, 192)',
                pointBorderColor: colorData.y3,
                backgroundColor: colorData.y3,
                yAxisID: 'y3',  
                stepped: false
            },
            {
                label: "Trục Y4",
                data: handleDataValue(dummyData.y4),
                borderColor: 'rgb(255, 205, 86)',
                pointBorderColor: colorData.y4,
                backgroundColor: colorData.y4,
                yAxisID: 'y4',  
                stepped: false
            } 
        ]
    }

    const optionChart = {
        plugins: {
            title: {
                display: true,
                text: 'ChartJS',
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
                    text: "Trục X"
                },
                max: 150
            },
            y: {
                title: {
                    display: true,
                    text: "Trục Y"
                },
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            },
            y2: {
                title: {
                    display: true,
                    text: "Trục Y2"
                },
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            },
            y3: {
                title: {
                    display: true,
                    text: "Trục Y3"
                },
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            },
            y4: {
                title: {
                    display: true,
                    text: "Trục Y4"
                },
                position: 'left',
                stack: 'demo',
                stackWeight: 1,
            }
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