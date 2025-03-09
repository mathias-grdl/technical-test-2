const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/userController.js');

const router = express.Router();

router.get("/signin_token", passport.authenticate("user", { session: false }), userController.signinToken);
router.get("/available", passport.authenticate("user", { session: false }), userController.getAvailableUsers);
router.get("/:id", passport.authenticate("user", { session: false }), userController.getUserById);
router.get("/", passport.authenticate("user", { session: false }), userController.getAllUsers);

module.exports = router;
