import { Router } from 'express';
import { productController } from './product.controller';
import validationRequest from '../../middleware/validationRequest';
import { ValidationZod } from './product.validation';

const router = Router();

router.post(
  '/add',
  validationRequest(ValidationZod.productZodSchema),
  productController.createProduct,
);
router.get('/get', productController.getProduct);
router.get('/all', productController.allProduct);
router.delete('/delete', productController.deleteProduct);
router.patch(
  '/update',
  validationRequest(ValidationZod.productZodSchema),
  productController.updateProduct,
);
router.get('/single/:id', productController.singleProduct);
router.patch('/payment-update', productController.paymentProductUpdate);

export const productRoute = router;
