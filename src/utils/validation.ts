import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { FAILED_RES } from '@utils/network';
export const validate = (validations: ValidationChain[]) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void | Response> => {
		await Promise.all(validations.map((validation) => validation.run(req)));

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		FAILED_RES(res, 422, { errors: errors.array() });
	};
};
