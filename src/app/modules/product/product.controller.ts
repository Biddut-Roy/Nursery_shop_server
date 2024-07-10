import { catchAsync } from '../../utils/catchAsync';
import { productServices } from './product.services';

const createProduct = catchAsync(async (req, res, next) => {
  const result = await productServices.createProductIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });

  //function generate response
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Student is created successfully',
  //     data: result,
  //   });
});

export const productController = {
  createProduct,
};
