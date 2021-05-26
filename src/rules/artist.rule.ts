import { check } from 'express-validator';

export const artistRule = {
    forRegister: [
        check('name').notEmpty().withMessage('name is required'),
        check('gender').notEmpty().withMessage('gender is required').isIn(['N', 'M', 'F']),
        check('birthDate').notEmpty().withMessage('birthDate is required'),
    ],
    forUpdate: [
        check('name').notEmpty().withMessage('name is required'),
        check('gender').notEmpty().withMessage('gender is required').isIn(['N', 'M', 'F']),
        check('birthDate').notEmpty().withMessage('birthDate is required'),
    ],
}