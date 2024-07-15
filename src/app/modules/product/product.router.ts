import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.post('/add', productController.createProduct);
router.get('/get', productController.getProduct);
router.get('/all', productController.allProduct);
router.delete('/delete', productController.deleteProduct);
router.patch('/update', productController.updateProduct);
router.get('/single/:id', productController.singleProduct);

export const productRoute = router;
