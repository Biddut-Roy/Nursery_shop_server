import { Router } from 'express';
import { categoryController } from './category.controller';

const router = Router();

router.get('/get', categoryController.getCategory);

export const categoryRoute = router;
