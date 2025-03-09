const express = require('express');
const passport = require('passport');
const activityController = require('../../controllers/activityController.js');

const router = express.Router();

router.delete("/:id",
    passport.authenticate("user", { session: false }),
    activityController.deleteActivity
);

module.exports = router;
