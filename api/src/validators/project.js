const { check } = require('express-validator');

exports.validateProject = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('type').optional().isIn(['startup-project', 'enterprise-project']).withMessage('Invalid project type'),
    check('paymentCycle').optional().isIn(['MONTHLY', 'QUARTERLY', 'YEARLY']).withMessage('Invalid payment cycle'),
    check('budget_max_monthly').optional().isNumeric().withMessage('Budget must be a number'),
];
