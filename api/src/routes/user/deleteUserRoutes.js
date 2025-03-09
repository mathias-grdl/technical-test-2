const express = require('express');
const passport = require('passport');
const userController = require('../../controllers/userController.js');

const router = express.Router();

router.delete("/:id", passport.authenticate("user", { session: false }), userController.deleteUserById);

module.exports = router;
