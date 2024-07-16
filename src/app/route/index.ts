import { Router } from 'express';
import { productRoute } from '../modules/product/product.router';
import { categoryRoute } from '../modules/category/category.router';
import { paymentRoute } from '../modules/payment/payment.route';

const router = Router();

const modelRouter = [
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

modelRouter.forEach((route) => router.use(route.path, route.route));

export default router;
