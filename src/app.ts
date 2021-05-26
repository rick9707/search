import express from 'express';
import { Request, Response, NextFunction, Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import lusca from 'lusca';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import status from 'http-status-codes';
import requestIp = require('request-ip');
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import * as cors from 'cors';
import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const expressip = require('express-ip');

import { sequelize } from '@instances/sequelize';
import { initRedisClient } from '@instances/redis';
import { logger } from '@utils/logger';
import { setRouter } from '@routes/index.route';

void sequelize.sync();
if (process.env.NODE_ENV != 'local') {
	initRedisClient();
}

const app: Application = express();

logger.debug(
	`====================== API Start - ${process.env.NODE_ENV} !!======================`
);
logger.debug(
	`====================== MYSQL_HOST Start - ${process.env.MYSQL_HOST} !!======================`
);

app.set('port', process.env.PORT || 8080);
app.set('trust proxy', true);
app.use(helmet());
app.use(compression());
app.use(expressip().getIpInfoMiddleware);
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors.default());
app.use(requestIp.mw());
app.disable('x-powered-by');

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// 라우터 설정
setRouter(app);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
	console.log(`app not founded ${JSON.stringify(req.params)}`);
	next(createError(status.NOT_FOUND));
});

// error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use(function (err: any, req: Request, res: Response) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	if (err.status == status.INTERNAL_SERVER_ERROR) {
		logger.error('Error Handler', err.message);
		logger.error('Error Handler', err);
	}

	// render the error page
	res.status(err.status || status.INTERNAL_SERVER_ERROR);
	res.send({
		responseCode: err.status || status.INTERNAL_SERVER_ERROR,
		resultMessage: err.message,
		result: err.result,
	});
});

export default app;
