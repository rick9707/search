/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';
import { config } from 'dotenv';
import { resolve } from 'path';
import moment from 'moment';
import multer from "multer";
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import { S3Folder, S3Operation } from './const';

import * as network from '@utils/network';
import { UserRequestDTO } from "@dto/user.dto";

const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const s3 = new AWS.S3({
	accessKeyId: process.env.S3_ACECSS_KEY_ID,
	secretAccessKey: process.env.S3_SEECRET_KEY,
	signatureVersion: 'v4',
	region: 'ap-northeast-2',
});

/**
 * s3 설정 값
 *
 * @param Bucket - S3 버킷 이름
 * @param Key - S3 에 저장될 오브젝트 키 값
 * @param Expires - pre-signed url 유효 기간
 */
const s3Config = {
	Bucket: process.env.AWS_BUCKET,
	Key: '',
	Expires: 60 * 2,
};

/**
 * S3 파일 업로드 파일의 키를 생성하는 메소드
 *
 * @param userIdx - 생성할 유저 인덱스
 * @param folder - 업로드할 S3 폴더
 */

export const s3KeyGenerator = (userIdx: number, folder: S3Folder): string => {
	const date = moment().format('YYYYMMDD');
	return `${folder}/${userIdx}${date}-${uuidv4()}.png`;
};

/**
 * S3 pre-signed URL 생성하는 메소드
 *
 * @param operation - S3 액션, get or put object
 * @param key - S3 Object 키 값
 */
export const generateSignedUrl = (
	operation: S3Operation,
	key: string
): string => {
	s3Config.Key = key;
	const url = s3.getSignedUrl(operation, s3Config);
	s3Config.Key = '';
	return url;
};

/**
 * 요청 받은 파일을 S3에 업로드하는 미들웨어
 *
 * @param folder s3 폴더
 * @return s3 multer
 * */
export const upload = (folder: S3Folder) => {
	return multer({
		storage: multerS3({
			s3: s3,
			bucket: process.env.AWS_BUCKET as string,
			key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
				const { user } = req as UserRequestDTO;
				const idx: number = user.idx;
				callback(null, s3KeyGenerator(idx, folder));
			},
		})
	});
}

export const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100,
});

export function setProcessEnv(): void {
	if (process.env.NODE_ENV == 'local') {
		config({
			path: resolve(process.env.NODE_PATH || '.', 'env/local.env'),
		});
	} else if (process.env.NODE_ENV == 'dev') {
		config({ path: resolve(process.env.NODE_PATH || '.', 'env/dev.env') });
	} else if (process.env.NODE_ENV == 'production') {
		config({
			path: resolve(process.env.NODE_PATH || '.', 'env/production.env'),
		});
	} else {
		config({
			path: resolve(process.env.NODE_PATH || '.', 'env/staging.env'),
		});
	}
}

/**
 * router 에서 발생하는 에러를 핸들링하는 메소드
 *
 * @param err - 전달받는 에러
 * @param next - 에러를 핸들링하기 위한 expree next function 객체
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function handleRouteError(
	res: Response,
	err: network.ResErrorJSON,
	next: NextFunction
) {
	if (err.status) {
		network.FAILED_RES(res, err.status, err.message);
	} else {
		return next(createError(400, err.message));
	}
}

export const momentNow = (): string => {
	return moment().format(timeFormat);
};

export const momentNowDate = (): Date => {
	return new Date(momentNow());
};

export const momentAddOneMonth = (): string => {
	return moment().add(1, 'M').format(timeFormat);
};

export const momentAddDays = (from: Date, date: number): string => {
	return moment(from).add(date, 'd').format(timeFormat);
};

export const momentAddDaysDate = (from: Date, date: number): Date => {
	return new Date(momentAddDays(from, date));
};

export const momentAddSecondsToDate = (from: Date, second: number): Date => {
	console.log('from : ', from, '+ sec : ', second);
	const to = new Date(from);
	to.setSeconds(to.getSeconds() + second);
	console.log('to : ', to);
	return to;
};

export const momentYear = (): number => {
	return moment().year();
};

export const momentWeekOfYear = (): number => {
	return moment().week();
};

export const momentFormat = (date: Date): string => {
	return moment(date).format('YYYY-MM-DD');
};

export const momentReportFormat = (date: Date): string => {
	return moment(date).format('YYYY.MM.DD');
};

export const getDateOfISOWeek = (w: number, y: number): [string, string] => {
	const simple = new Date(y, 0, 1 + (w - 1) * 7);
	const dow = simple.getDay();
	const ISOweekStart = simple;

	if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
	else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
	const ISOweekEnd = momentAddDays(ISOweekStart, 6);
	console.log(`DATE : ${ISOweekStart}`);
	return [
		moment(ISOweekStart).format('YYYY.mm.DD'),
		moment(ISOweekEnd).format('YYYY.mm.DD'),
	];
};

export const getAge = (bt: string): string => {
	const btArray = bt.split('-');
	const today = new Date();
	const birthDate = new Date(Number(btArray[0]), Number(btArray[1]), 1); // 2000년 8월 10일

	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	return age + '세';
};

export function getDateOfWeek(w: number, y: number): Date {
	const date = new Date(y, 0, 1 + (w - 1) * 7); // Elle's method
	date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
	return date;
}
