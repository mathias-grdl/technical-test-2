const express = require('express');
const createRoutes = require('./createProjectRoutes.js');
const readRoutes = require('./readProjectRoutes.js');
const updateRoutes = require('./updateProjectRoutes.js');
const deleteRoutes = require('./deleteProjectRoutes.js');

const router = express.Router();

router.use(createRoutes);
router.use(readRoutes);
router.use(updateRoutes);
router.use(deleteRoutes);

module.exports = router;
