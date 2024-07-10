import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/add', productController.createProduct);
router.get('/get', productController.getProduct);

export const productRoute = router;
