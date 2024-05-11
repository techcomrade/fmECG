import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from "chart.js";

const LineChart = ({data}) => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement);
    return(
        <>
            <Line
                data={{
                    labels: data.y,
                    datasets: [{
                        label: "Abc",
                        data: data.x,
                        borderColor: '#064FF0'
                    }]
                }}
            />
        </>
    )
}

export default LineChart;