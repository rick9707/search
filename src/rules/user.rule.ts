import { check } from 'express-validator';

export const userRules = {
	forCheckSignup: [
		check('signUpMethod')
			.notEmpty()
			.withMessage('signUpMethod is required')
			.isIn(['GOGL', 'KAKO', 'FACE', 'INST']),
		check('socialId').notEmpty().withMessage('socialId is required'),
		check('fbUid').notEmpty().withMessage('fbUid is required'),
	],
	forSignUp: [
		check('socialMethod').notEmpty().withMessage('method is required'),
		check('socialId').notEmpty().withMessage('socialId is required'),
		check('fbUid').notEmpty().withMessage('fbUid is required'),
		check('email').notEmpty().withMessage('email is required'),
		check('name').notEmpty().withMessage('name is required'),
		check('birthDate').optional(),
		check('gender').optional().isIn(['M', 'F', 'N']),
		check('phone').optional(),
	],
};
