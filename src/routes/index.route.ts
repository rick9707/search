import { Router, Application } from 'express';

import * as indexCtrl from '@controllers/index.ctrl';
import { noticeRouter } from './notice.route';
import { productRouter } from './product.route'

const indexRouter = Router();

indexRouter.get('/health', indexCtrl.getHealthCheck);

// setRouter - 각 라우터를 Application 에 연결
export const setRouter = (app: Application): void => {
	app.use('/products', productRouter);
	app.use('/', indexRouter);
};
