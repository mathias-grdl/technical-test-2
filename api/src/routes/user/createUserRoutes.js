const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/userController.js');

const router = express.Router();

router.post("/signin", userController.signin);
router.post("/logout", userController.logout);
router.post("/signup", userController.signup);
router.post("/", passport.authenticate("user", { session: false }), userController.createUser);

module.exports = router;
