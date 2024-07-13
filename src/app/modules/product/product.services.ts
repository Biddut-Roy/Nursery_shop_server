import httpStatus from 'http-status';
import { productSearchableField } from './product.constant';
import { TProduct } from './product.interfaces';
import Product from './product.model';
import AppError from '../../errors/appError';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductIntoDB = async (query: Record<string, unknown>) => {
  try {
    const { search, filter, sort, page, limit, fields } = query;

    let quer = {};
    if (filter) {
      quer.category = filter;
    }

    let mongooseQuery = Product.find();

    // Search
    if (search) {
      mongooseQuery = mongooseQuery.find({ $text: { $search: search } });
    }

    // Filter
    if (filter) {
      mongooseQuery = mongooseQuery.find(quer);
    }

    // Sort
    if (sort) {
      mongooseQuery = mongooseQuery.sort(sort);
    }

    // Paginate
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const skip = (pageNum - 1) * limitNum;

    mongooseQuery = mongooseQuery.skip(skip).limit(limitNum);

    // Select specific fields
    if (fields) {
      mongooseQuery = mongooseQuery.select(fields.split(',').join(' '));
    }

    const result = await mongooseQuery.exec();

    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new AppError(httpStatus.FORBIDDEN, 'Failed to fetch products');
  }
};

const deleteProductIntoDB = async (id: string) => {
  const result = await Product.findOneAndDelete(id);
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  deleteProductIntoDB,
};
