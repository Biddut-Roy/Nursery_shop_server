import { catchAsync } from '../../utils/catchAsync';
import { CategoryServices } from './category.services';

const getCategory = catchAsync(async (req, res, next) => {
  const result = await CategoryServices.getAllCategoryIntoDB();

  res.status(200).json({
    success: true,
    message: 'Product is retrieved successfully',
    data: result,
  });

  //function generate response
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Product is retrieved successfully',
  //     data: result,
  //   });
});

export const categoryController = {
  getCategory,
};
