import { Router } from 'express';

import * as productController from '@controllers/product.ctrl';
import { userRules } from '@rules/user.rule';


export const productRouter = Router();


productRouter.get('/me', productController.getUsersMe);

productRouter.delete('/me', productController.deleteUser);

