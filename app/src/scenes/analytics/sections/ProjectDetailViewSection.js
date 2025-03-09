import React from 'react';
import ChartBarMultipleValues from '../../../components/chartBarMultipleValues';

const ProjectDetailViewSection = ({ project }) => {
    const budgetConsumed = (project.activities || []).reduce((sum, activity) => sum + activity.value, 0);
    const budgetMax = project.budget_max_monthly || 0;

    return (
        <section className='pt-6 px-2 md:mx-8'>
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                    Project Details: {project.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold mb-2">Budget Information</h3>
                        <p className="mb-1">
                            <span className="text-gray-600">Budget Consumed:</span>
                            <span className="font-bold">{budgetConsumed.toFixed(2)}€</span>
                        </p>
                        <p className="mb-4">
                            <span className="text-gray-600">Budget Max per Month:</span>
                            <span className="font-bold">{budgetMax.toFixed(2)}€</span>
                        </p>

                        {budgetMax > 0 && (
                            <div>
                                <p className="mb-1">
                                    Budget Usage: {((budgetConsumed / budgetMax) * 100).toFixed(1)}%
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div
                                        className={`${(budgetConsumed / budgetMax) >= 1 ? 'bg-red-600' : 'bg-blue-600'} h-2.5 rounded-full`}
                                        style={{
                                            width: `${Math.min(100, (budgetConsumed / budgetMax) * 100)}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {project.description && (
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Description</h3>
                                <p className="text-gray-700">{project.description}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <ChartBarMultipleValues
                            title={`Budget for ${project.name}`}
                            labels={['Budget']}
                            data={[budgetConsumed, budgetMax]}
                            colors={['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']}
                            datasetLabel={['Budget Consumed', 'Budget Max per Month']}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetailViewSection;