import React, { useEffect, useState } from 'react';
import api from "../../services/api";
import Loader from "../../components/loader";
import BudgetSummarySection from './sections/BudgetSummarySection';
import ProjectDetailViewSection from './sections/ProjectDetailViewSection';
import StatsOverviewSection from './sections/StatsOverviewSection';
import ProjectSelectorSection from './sections/ProjectSelectorSection';

const Analytics = () => {
    const [usersList, setUsersList] = useState(null);
    const [projectsList, setProjectsList] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [consumedBudget, setConsumedBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {

            const [usersResponse, projectsResponse] = await Promise.all([
                api.get("/user"),
                api.get("/project")
            ]);

            setUsersList(usersResponse.data);
            setProjectsList(projectsResponse.data);

            await calculateBudgetMetrics(projectsResponse.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    const calculateBudgetMetrics = async (projects) => {
        const projectActivities = await Promise.all(
            projects.map(project =>
                api.get(`/activity?projectId=${encodeURIComponent(project._id)}`)
                    .then(response => ({
                        project,
                        activities: response.data
                    }))
            )
        );

        let totalConsumedBudget = 0;
        let totalMaxBudget = 0;

        projectActivities.forEach(({ project, activities }) => {
            const projectExpenses = activities.reduce((sum, activity) => sum + activity.value, 0);
            totalConsumedBudget += projectExpenses;
            totalMaxBudget += project.budget_max_monthly || 0;
        });

        setConsumedBudget(totalConsumedBudget);
        setMaxBudget(totalMaxBudget);
    };

    const handleProjectSelection = async (projectId) => {
        if (!projectId) {
            setActiveProject(null);
            return;
        }

        const selectedProject = projectsList.find(p => p._id === projectId);
        const { data: projectActivities } = await api.get(`/activity?projectId=${encodeURIComponent(selectedProject._id)}`);
        setActiveProject({ ...selectedProject, activities: projectActivities });
    };

    if (isLoading) return <Loader />;

    return (
        <>
            <StatsOverviewSection
                usersCount={usersList.length}
                projectsCount={projectsList.length}
            />

            <BudgetSummarySection
                totalBudgetConsumed={consumedBudget}
                totalBudgetMax={maxBudget}
            />

            <ProjectSelectorSection
                projects={projectsList}
                onSelectProject={handleProjectSelection}
            />

            {activeProject && (
                <ProjectDetailViewSection project={activeProject} />
            )}
        </>
    );
};

export default Analytics;
