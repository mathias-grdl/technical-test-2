const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/userController.js');

const router = express.Router();

router.put("/:id", passport.authenticate("user", { session: false }), userController.updateUserById);
router.put("/", passport.authenticate("user", { session: false }), userController.updateCurrentUser);

module.exports = router;
