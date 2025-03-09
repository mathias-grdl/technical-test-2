const express = require('express');
const passport = require('passport');
const { validateProject } = require('../../validators/project.js');
const validationMiddleware = require('../../middleware/validationMiddleware.js');
const projectController = require('../../controllers/projectController.js');

const router = express.Router();

router.put("/:id",
    passport.authenticate("user", { session: false }),
    validateProject,
    validationMiddleware,
    projectController.updateProject
);

module.exports = router;
