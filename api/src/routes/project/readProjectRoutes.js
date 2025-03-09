const express = require('express');
const passport = require('passport');
const projectController = require('../../controllers/projectController.js');

const router = express.Router();

router.get("/list",
    passport.authenticate("user", { session: false }),
    projectController.getProjects
);

router.get("/:id",
    passport.authenticate("user", { session: false }),
    projectController.getProjectById
);

router.get("/",
    passport.authenticate("user", { session: false }),
    projectController.getProjects
);

module.exports = router;
