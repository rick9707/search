import { Request, Response, NextFunction } from 'express';
import { handleRouteError } from '@utils/common';
import * as network from '@utils/network';
import { StatusCodes } from 'http-status-codes';

// ELB 헬스체크 컨트롤
export const getHealthCheck = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		return network.SUCCESS_RES(res, StatusCodes.OK, null);
	} catch (err) {
		return handleRouteError(res, err, next);
	}
};
