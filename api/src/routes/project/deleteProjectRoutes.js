const express = require('express');
const passport = require('passport');
const projectController = require('../../controllers/projectController.js');

const router = express.Router();

router.delete("/:id",
    passport.authenticate("user", { session: false }),
    projectController.deleteProject
);

module.exports = router;
