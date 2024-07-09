import { Router } from 'express';

const router = Router();

const modelRouter = [{
    path: 'users'
    route: "users",
}];

modelRouter.forEach((route) => router.use(route.path , route.route))

export default router;
