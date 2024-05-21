import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement, Title, Tooltip } from "chart.js";
import { dummyArray, dummyIncreaseArray } from '../../utils/arrayUtils';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Button } from "antd";
import { useRef } from 'react';

const LineChart = ({data}) => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, zoomPlugin, Tooltip);
    const chartRef = useRef(null);

    const handleResetZoom = () => {
        if (chartRef && chartRef.current) {
            chartRef.current.resetZoom();
        }
    };

    const dataChart = {
        labels: dummyIncreaseArray(1001),
        datasets: [
            {
                label: "Trục Y",
                data: dummyArray(1001),
                borderColor: 'rgb(54, 162, 235)'
            },
            {
                label: "Trục Y2",
                data: dummyArray(1001),
                borderColor: 'rgb(255, 99, 132)',
                yAxisID: 'y2',  
                stepped: false
            },
            {
                label: "Trục Y3",
                data: dummyArray(1001),
                borderColor: 'rgb(75, 192, 192)',
                yAxisID: 'y3',  
                stepped: false
            },
            {
                label: "Trục Y4",
                data: dummyArray(1001),
                borderColor: 'rgb(255, 205, 86)',
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