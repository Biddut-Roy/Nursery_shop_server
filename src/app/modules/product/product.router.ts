import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/add', productController.createProduct);
router.get('/get', productController.getProduct);
router.delete('/delete', productController.deleteProduct);
router.patch('/update', productController.updateProduct);

export const productRoute = router;
