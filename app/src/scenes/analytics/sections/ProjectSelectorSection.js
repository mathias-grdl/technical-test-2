import React from 'react';

const ProjectSelectorSection = ({ projects, onSelectProject }) => {
    return (
        <section className='pt-6 px-2 md:mx-8'>
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
                <label htmlFor="projectSelect" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Project for Detailed Analysis:
                </label>
                <select
                    id="projectSelect"
                    className="projectsInput"
                    onChange={(e) => onSelectProject(e.target.value)}
                >
                    <option value="">--Select a Project--</option>
                    {projects.map(project => (
                        <option key={project._id} value={project._id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
};

export default ProjectSelectorSection;
