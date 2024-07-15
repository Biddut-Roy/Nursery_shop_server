import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import httpStatus from 'http-status';
import router from './app/route';
import globalErrorHandler from './app/middlsware/globalErrorHandler';
import config from './app/config';
import Stripe from 'stripe';
const stripe = new Stripe(config.stripe_secret_key as string);

// parser
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('server Is a Starting');
});

// Global Error Handler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    error: '',
  });
});

export default app;
