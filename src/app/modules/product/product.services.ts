import { TProduct } from './product.interfaces';
import Product from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductIntoDB = async () => {
  const result = await Product.find();
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductIntoDB,
};
