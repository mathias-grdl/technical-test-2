import React from 'react';
import ChartBarSingleValue from '../../../components/chartBarSingleValue';

const StatsOverviewSection = ({ usersCount, projectsCount }) => {
    return (
        <section className='pt-6 px-2 md:mx-8'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ChartBarSingleValue
                    title="User Statistics"
                    label="Active Users"
                    count={usersCount}
                    color="rgba(75, 192, 192, 0.6)"
                />
                <ChartBarSingleValue
                    title="Project Statistics"
                    label="Active Projects"
                    count={projectsCount}
                    color="rgba(153, 102, 255, 0.6)"
                />
            </div>
        </section>
    );
};

export default StatsOverviewSection;
