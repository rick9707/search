import { Request, Response, NextFunction } from 'express';

import { getRedisClient } from '@instances/redis';
import * as network from '@utils/network';
import jwt from 'jsonwebtoken';
import status from 'http-status-codes';
import { env } from 'process';
import requestIp = require('request-ip');
import passport from 'passport';

import { UserTokenDTO } from '@dto/user.dto';
import { AuthRequest } from '@utils/network';

const secret = String(process.env.JWT_SECRET);
const expireTime = 3600000 * 24 * 30; // 한 달간 유효
const jwtOptions = {
	expiresIn: expireTime,
	issuer: 'deukki.com',
	subject: 'userInfo',
};

export const verifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
): void | Response => {
	const token: string = req.headers.authorization
		? req.headers.authorization.split(' ')[1]
		: '';
	if (!token) {
		return network.FAILED_RES(res, status.UNAUTHORIZED, undefined);
	}
	try {
		if (env.NODE_ENV == 'prod') {
			// 레디스 서버 체크
			getRedisClient().get(token, (err, value) => {
				if (value) {
					console.log('exist logout token ', value);
					return network.FAILED_RES(
						res,
						status.UNAUTHORIZED,
						'Logout token'
					);
				} else {
					// JWT 인증
					jwt.verify(token, secret, (err, user) => {
						if (!err) {
							console.log(
								requestIp.getClientIp(req) +
									JSON.stringify(user)
							);
							req.user = user;
							return next();
						} else {
							console.log(`Failed Token authorize  : ${token}`);
							return network.FAILED_RES(
								res,
								status.INTERNAL_SERVER_ERROR,
								err
							);
						}
					});
				}
			});
		} else {
			// JWT 인증
			jwt.verify(token, secret, (err, user) => {
				if (!err) {
					console.log(
						requestIp.getClientIp(req) + JSON.stringify(user)
					);
					req.user = user;
					return next();
				} else {
					console.log(`Failed Token authorize  : ${token}`);
					return network.FAILED_RES(
						res,
						status.INTERNAL_SERVER_ERROR,
						err
					);
				}
			});
		}
	} catch (err) {
		if (err.name == 'TokenExpiredError') {
			return network.FAILED_RES(res, 419, 'token expired');
		}
		console.log('token error > ' + err);
		return network.FAILED_RES(res, status.UNAUTHORIZED, err);
	}
};

export const issueToken = (payload: UserTokenDTO): Promise<string> => {
	return new Promise((resolve, rejects) => {
		jwt.sign(payload, secret, jwtOptions, (err, token) => {
			if (err) rejects(err);
			if (token) resolve(token);
			else rejects();
		});
	});
};
