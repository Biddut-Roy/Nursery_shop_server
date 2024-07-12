/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handelZodError from '../errors/handelZodError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handelDuplicateError';
import handleCastError from '../errors/handelCastError';
import AppError from '../errors/appError';

interface ErrorSource {
  path: string;
  message: string;
}

type TErrorSources = ErrorSource[];

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: '',
    },
  ];

  if (err instanceof ZodError) {
    const simpleFieldError = handelZodError(err);
    statusCode = simpleFieldError?.statusCode;
    message = simpleFieldError?.message;
    errorSources = simpleFieldError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_DEV === 'Development' ? err.stack : null,
  });
};

export default globalErrorHandler;
