import { Router } from 'express';
import { productRoute } from '../modules/product/product.router';
import { categoryRoute } from '../modules/category/category.router';

const router = Router();

const modelRouter = [
  {
    path: 'product',
    route: productRoute,
  },
  {
    path: 'category',
    route: categoryRoute,
  },
];

modelRouter.forEach((route) => router.use(route.path, route.route));

export default router;
