const userRoutes = require('./user/allUserRoutes.js');
const projectRoutes = require('./project/allProjectRoutes.js');
const activityRoutes = require('./activity/allActivityRoutes.js');

const GlobalRoutes = (app) => {
    app.use('/user', userRoutes);
    app.use('/project', projectRoutes);
    app.use('/activity', activityRoutes);
};

module.exports = { GlobalRoutes };