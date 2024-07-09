import { Router } from 'express';
import { productRoute } from '../modules/product/product.router';

const router = Router();

const modelRouter = [
  {
    path: 'product',
    route: productRoute,
  },
];

modelRouter.forEach((route) => router.use(route.path, route.route));

export default router;
