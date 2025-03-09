import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartBarMultipleValues = ({ title, labels, data, colors, datasetLabel }) => {
    const chartData = {
        labels: labels,
        datasets: Array.isArray(datasetLabel) ?
            datasetLabel.map((label, index) => ({
                label: label,
                data: [data[index]],
                backgroundColor: colors[index] || 'rgba(75, 192, 192, 0.6)',
            })) : [
                {
                    label: datasetLabel,
                    data: data,
                    backgroundColor: colors || data.map(() => 'rgba(75, 192, 192, 0.6)'),
                },
            ],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default ChartBarMultipleValues;
