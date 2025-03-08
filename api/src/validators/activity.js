const { body } = require("express-validator");

const validateActivity = [
    body("projectId").notEmpty().withMessage("Project ID is required"),
    body("userId").notEmpty().withMessage("User ID is required"),
    body("date").isISO8601().withMessage("Invalid date format"),
    body("total").isNumeric().withMessage("Total must be a number"),
    body("cost").isNumeric().withMessage("Cost must be a number"),
    body("value").isNumeric().withMessage("Value must be a number")
];

module.exports = {
    validateActivity
};
