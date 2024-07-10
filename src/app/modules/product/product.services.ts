import { TProduct } from './product.interfaces';
import Product from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductIntoDB = async (payload: TProduct) => {};

export const productServices = {
  createProductIntoDB,
  getAllProductIntoDB,
};
