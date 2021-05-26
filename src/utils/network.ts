import { Request, Response } from 'express';
import status from 'http-status-codes';

export interface AuthRequest extends Request {
	user: {
		idx: number;
		email: string;
		name: string;
	};
}

export interface ResErrorJSON {
	status: number;
	message: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	result: any;
}

export const OK_JSON_RES = <T>(
	object: T
): { status: number; message: string; result: T } => {
	return {
		status: status.OK,
		message: 'Success',
		result: object,
	};
};

export const OK_RES = {
	status: status.OK,
	OK_JSON_RES,
};

export const SUCCESS_JSON = <T>(
	status: number,
	object: T
): { status: number; message: string; result?: T } => {

	if (object === null) {
		return {
			status: status,
			message: statusMessage(status),
		}
	}

	return {
		status: status,
		message: statusMessage(status),
		result: object,
	};
};

export const CREATED_JSON = <T>(
	status: number
): { status: number; message: string; } => {
	return {
		status: status,
		message: statusMessage(status),
	};
};

export const SUCCESS_RES = <T>(
	res: Response,
	status: number,
	object: T
): Response => {
	return res.status(status).json(SUCCESS_JSON(status, object));
};

export const CREATED_RES = <T>(
	res: Response,
	uri: string
): Response => {
	res.setHeader('Location', uri)
	return res.status(status.CREATED).json(CREATED_JSON(status.CREATED))
}

export const FAILED_JSON = <T>(
	status: number,
	object: T
): { status: number; message: string; result: T } => {
	return {
		status: status,
		message: statusMessage(status),
		result: object,
	};
};

export const FAILED_RES = <T>(
	res: Response,
	status: number,
	object: T
): Response => {
	return res.status(status).json(FAILED_JSON(status, object));
};

export const RejectPromise = (
	status: number,
	reason?: string
): Promise<never> => {
	const failReason = { result: reason };
	return Promise.reject(FAILED_JSON(status, failReason));
};

export const callbackForAuthFailed = (res: Response): Response | void => {
	FAILED_RES(res, status.UNAUTHORIZED, undefined);
};

function statusMessage(httpStatus: number): string {
	switch (httpStatus) {
		// 200:OK
		case status.OK:
			return 'Success';
		// 201:CREATED
		case status.CREATED:
			return 'CREATED';
		// 400:BAD_REQUEST - 잘못된 요청
		case status.BAD_REQUEST:
			return 'Bad Request';
		// 401:UNAUTHORIZED - 인증되지 않음. 로그인 하지 않음
		case status.UNAUTHORIZED:
			return 'Unauthorized';
		// 403:FORBIDDEN - 요청을 인지했지만, 거절함. 권한 없음
		case status.FORBIDDEN:
			return 'Forbidden';
		// 404:NOT_FOUND - 요청한 리소스를 찾을 수 없음
		case status.NOT_FOUND:
			return 'Not found';
		// 409:CONFLICT - 기존 리소스와 충돌하는 요청
		case status.CONFLICT:
			return 'Conflict';
		// 419: AUTHENTICATION TIMEOUT - 이전에 유효한 인증이 만료되었습니다.
		case 419:
			return 'Token expired';
		// 422:UNPROCESSABLE_ENTITY - 필요한 엔티티를 전달받지 못함
		case status.UNPROCESSABLE_ENTITY:
			return 'Unprocessable entity';
		// 429:TOO_MANY_REQUEST - 너무 많은 요청
		case status.TOO_MANY_REQUESTS:
			return 'Too many request';
		// 500:INTERNAL_SEVER_ERROR - 서버 내부 에러 발생, 예외 처리 되지 않은 에러 발생
		case status.INTERNAL_SERVER_ERROR:
			return 'Internal Error';
		default:
			return 'Server Error';
	}
}

export const UNPROCESSABLE_ENTITY_RES = <T>(
	// resultMessage: string,
	object: T
): { status: number; message: string; result: T } => {
	return {
		status: status.UNPROCESSABLE_ENTITY,
		message: 'Unprocessable entity',
		result: object,
	};
};
