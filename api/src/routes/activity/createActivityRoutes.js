const express = require('express');
const passport = require('passport');
const { validateActivity } = require('../../validators/activity.js');
const validationMiddleware = require('../../middleware/validationMiddleware.js');
const activityController = require('../../controllers/activityController.js');

const router = express.Router();

router.post("/",
    passport.authenticate("user", { session: false }),
    validateActivity,
    validationMiddleware,
    activityController.createActivity
);

module.exports = router;
