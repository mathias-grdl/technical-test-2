const express = require('express');
const passport = require('passport');
const activityController = require('../../controllers/activityController.js');

const router = express.Router();

router.get("/",
    passport.authenticate("user", { session: false }),
    activityController.getActivities
);

module.exports = router;
