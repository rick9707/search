import { check } from 'express-validator';

export const authRules = {
	forLogin: [
		check('socialMethod')
			.notEmpty()
			.withMessage('socialMethod is required')
			.isIn(['GOGL', 'KAKO', 'FACE', 'INST']),
		check('socialId').notEmpty().withMessage('socialId is required'),
		check('fbUid').notEmpty().withMessage('fbUid is required'),
	],
};
