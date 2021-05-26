import { Request, Response, NextFunction } from 'express';
import status from 'http-status-codes';
import * as network from '@utils/network';
import { handleRouteError } from '@utils/common';

import { DTO } from '@dto/product.dto';

import { ProductService } from '@services/product.service';

const userService = new ProductService();

export const getUsersMe = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		const { product } = req as DTO;

		const productInfo = await productService.getMyProfile(product.idx);

		return network.SUCCESS_RES(res, status.OK, productInfo);
	} catch (err) {
		return handleRouteError(res, err, next);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response | void> => {
	try {
		const { product } = req as DTO;
		await productService.delete(product.idx);

		return network.SUCCESS_RES(res, status.OK, undefined);
	} catch (err) {
		return handleRouteError(res, err, next);
		kkk
	}
};
