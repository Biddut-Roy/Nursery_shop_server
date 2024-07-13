import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendrespons';
import { productServices } from './product.services';

const createProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.createProductIntoDB(req.body);

  //function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is created successfully',
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

const deleteProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.deleteProductIntoDB(req.body.id);

  //function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is Deleted successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
  deleteProduct,
};
