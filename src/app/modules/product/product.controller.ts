import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendrespons';
import { productServices } from './product.services';
import { ParsedQs } from 'qs';
import AppError from '../../errors/appError';

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
  const id: string | string[] | ParsedQs | ParsedQs[] | undefined =
    req.query.id;

  if (typeof id === 'string') {
    const result = await productServices.deleteProductIntoDB(id);
    return sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is Deleted successfully',
      data: result,
    });
  }
  if (Array.isArray(id)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Multiple IDs are not supported',
    );
  } else if (id && typeof id === 'object') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid ID format');
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'ID is required');
  }
});

const updateProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.updateProductIntoDB(req?.body);

  // function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is Update successfully',
    data: result,
  });
});
const allProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.allProductIntoDB();

  // function generate response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is Update successfully',
    data: result,
  });
});

const singleProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (typeof id === 'string') {
    const result = await productServices.singleProductIntoDB(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Product is retrieved successfully',
      data: result,
    });
  }
});

const paymentProductUpdate = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await productServices.paymentProductUpdateIntoDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CheckOut successfully',
    data: result,
  });
});

export const productController = {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  allProduct,
  singleProduct,
  paymentProductUpdate,
};
