import Category from './category.model';

const getAllCategoryIntoDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryServices = {
  getAllCategoryIntoDB,
};
