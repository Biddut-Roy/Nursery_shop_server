import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendrespons';
import { productServices } from './product.services';

const createProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.createProductIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });

  //function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.getAllProductIntoDB(req.query);

  // function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
};
