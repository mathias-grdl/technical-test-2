import React from 'react';

const BudgetSummarySection = ({ totalBudgetConsumed, totalBudgetMax }) => {
    const budgetUtilizationPercentage = totalBudgetMax > 0
        ? (totalBudgetConsumed / totalBudgetMax) * 100
        : 0;

    return (
        <section className='pt-6 px-2 md:mx-8'>
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">Total Budget Consumed:</p>
                        <p className="text-2xl font-bold">{totalBudgetConsumed.toFixed(2)}€</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Total Budget Max per Month:</p>
                        <p className="text-2xl font-bold">{totalBudgetMax.toFixed(2)}€</p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="mb-1">Budget Usage: {budgetUtilizationPercentage.toFixed(1)}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(100, budgetUtilizationPercentage)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetSummarySection;