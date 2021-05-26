import { check } from 'express-validator';

export const artworkRule = {
    forRegister: [
        check('title').notEmpty().withMessage('title is required'),
        check('desc').notEmpty().withMessage('desc is required'),
        check('albumIdx').notEmpty().withMessage('albumIdx is required'),
        check('artistIdx').notEmpty().withMessage('artistIdx is required'),
        check('repImagePath').optional(),
    ],
    forUpdate: [
        check('title').notEmpty().withMessage('title is required'),
        check('desc').notEmpty().withMessage('desc is required'),
        check('albumIdx').notEmpty().withMessage('albumIdx is required'),
        check('artistIdx').notEmpty().withMessage('artistIdx is required'),
    ],
    forSearchByTitle: [
        check('keyword').optional(),
        check('page').optional().default(1),
    ]
};
