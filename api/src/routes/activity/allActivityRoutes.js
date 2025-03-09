const express = require('express');
const createRoutes = require('./createActivityRoutes.js');
const readRoutes = require('./readActivityRoutes.js');
const deleteRoutes = require('./deleteActivityRoutes.js');

const router = express.Router();

router.use(createRoutes);
router.use(readRoutes);
router.use(deleteRoutes);

module.exports = router;
