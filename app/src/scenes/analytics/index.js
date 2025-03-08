import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import api from "../../services/api";
import Loader from "../../components/loader";

const Analytics = () => {
    const [users, setUsers] = useState(null);
    const [projects, setProjects] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [totalBudgetConsumed, setTotalBudgetConsumed] = useState(0);
    const [totalBudgetMax, setTotalBudgetMax] = useState(0);

    useEffect(() => {
        (async () => {
            const { data: usersData } = await api.get("/user");
            setUsers(usersData);
            const { data: projectsData } = await api.get("/project");
            setProjects(projectsData);
            await calculateTotalBudgetConsumed(projectsData);
        })();
    }, []);

    const calculateTotalBudgetConsumed = async (projects) => {
        let totalConsumed = 0;
        let totalMax = 0;
        for (const project of projects) {
            const { data: activities } = await api.get(`/activity?projectId=${encodeURIComponent(project._id)}`);
            const projectBudget = activities.reduce((sum, activity) => sum + activity.value, 0);
            totalConsumed += projectBudget;
            totalMax += project.budget_max_monthly || 0;
        }
        setTotalBudgetConsumed(totalConsumed);
        setTotalBudgetMax(totalMax);
    };

    if (!users || !projects) return <Loader />;

    const userChartData = {
        labels: ['Users'],
        datasets: [
            {
                label: 'Number of Users',
                data: [users.length],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const projectChartData = {
        labels: ['Projects'],
        datasets: [
            {
                label: 'Number of Projects',
                data: [projects.length],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const selectedProjectChartData = selectedProject ? {
        labels: ['Budget Consumed', 'Budget Max per Month'],
        datasets: [
            {
                label: `Budget for ${selectedProject.name}`,
                data: [
                    (selectedProject.activities || []).reduce((sum, activity) => sum + activity.value, 0),
                    selectedProject.budget_max_monthly || 0
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
        ],
    } : null;

    return (
        <div className="pt-6 px-2 md:mx-8">
            <h1>Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p>Number of users: {users.length}</p>
                    <Bar data={userChartData} />
                </div>
                <div>
                    <p>Number of projects: {projects.length}</p>
                    <Bar data={projectChartData} />
                </div>
            </div>
            <div className="mt-4">
                <h2>Total Budget Consumed: {totalBudgetConsumed.toFixed(2)}€</h2>
                <h2>Total Budget Max per Month: {totalBudgetMax.toFixed(2)}€</h2>
            </div>
            <div className="mt-4">
                <label htmlFor="projectSelect">Select Project:</label>
                <select
                    id="projectSelect"
                    onChange={async (e) => {
                        const projectId = e.target.value;
                        if (!projectId) {
                            setSelectedProject(null);
                            return;
                        }
                        const project = projects.find(p => p._id === projectId);
                        const { data: activities } = await api.get(`/activity?projectId=${encodeURIComponent(project._id)}`);
                        project.activities = activities;
                        setSelectedProject(project);
                    }}
                >
                    <option value="">--Select a Project--</option>
                    {projects.map(project => (
                        <option key={project._id} value={project._id}>{project.name}</option>
                    ))}
                </select>
            </div>
            {selectedProject && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2>Budget Consumed for {selectedProject.name}</h2>
                        <p>{(selectedProject.activities || []).reduce((sum, activity) => sum + activity.value, 0).toFixed(2)}€</p>
                        <p>Budget Max per Month: {(selectedProject.budget_max_monthly || 0).toFixed(2)}€</p>
                    </div>
                    <div>
                        <Bar data={selectedProjectChartData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;


