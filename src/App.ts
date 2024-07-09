import express, { Application, NextFunction, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import httpStatus from 'http-status';
import router from './app/route';

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('server Is a Starting');
});

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    error: '',
  });
});

export default app;
