const express = require('express');
const createRoutes = require('./createUserRoutes.js');
const readRoutes = require('./readUserRoutes.js');
const updateRoutes = require('./updateUserRoutes.js');
const deleteRoutes = require('./deleteUserRoutes.js');

const router = express.Router();

router.use([
    createRoutes,
    readRoutes,
    updateRoutes,
    deleteRoutes
]);

module.exports = router;
