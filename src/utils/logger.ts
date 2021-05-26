import { getLogger, Logger } from 'log4js';

export const getLoggerConfig = function (className: string): Logger {
	getLogger(className);
	getLogger(className).level =
		process.env.NODE_ENV === 'production' ? 'error' : 'debug';
	return getLogger(className);
};

import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

import moment from 'moment';
import 'moment-timezone';
moment.tz.setDefault('Asia/Seoul');

export const logger = winston.createLogger({
	level: 'debug', // 최소 레벨
	// 파일저장
	transports: [
		new winstonDaily({
			filename: 'log/system.log', // log 폴더에 system.log 이름으로 저장
			zippedArchive: true, // 압축여부
			format: winston.format.printf(
				(info) =>
					`${moment.now()} [${info.level.toUpperCase()}] - ${
						info.message
					}`
			),
			maxFiles: 20,
			maxSize: 1000000,
		}),
		// 콘솔 출력
		new winston.transports.Console({
			format: winston.format.printf(
				(info) =>
					`${moment.now()} [${info.level.toUpperCase()}] - ${
						info.message
					}`
			),
		}),
	],
	exceptionHandlers: [
		new winstonDaily({
			filename: 'log/error.log',
			zippedArchive: true,
			level: 'error',
			format: winston.format.printf(
				(info) =>
					`${moment.now()} [${info.level.toUpperCase()}] - ${
						info.message
					}`
			),
			datePattern: '_YYYY-MM-DD.log',
			maxFiles: 20,
			maxSize: 1000000,
		}),
		new winston.transports.Console({
			format: winston.format.printf(
				(info) =>
					`${moment.now()} [${info.level.toUpperCase()}] - ${
						info.message
					}`
			),
		}),
	],
});
