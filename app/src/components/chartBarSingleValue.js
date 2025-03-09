import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartBarSingleValue = ({ title, label, count, color }) => {
    const chartData = {
        labels: [label],
        datasets: [
            {
                label: `Number of ${label}`,
                data: [count],
                backgroundColor: color || 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="mb-4">Total {label}: {count}</p>
            <Bar data={chartData} />
        </div>
    );
};

export default ChartBarSingleValue;
