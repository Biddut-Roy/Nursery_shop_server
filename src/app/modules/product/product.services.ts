import httpStatus from 'http-status';
import { QueryFilter, TIQuery, TProduct } from './product.interfaces';
import Product from './product.model';
import AppError from '../../errors/appError';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductIntoDB = async (query: TIQuery) => {
  try {
    const { search, filter, sort, page, limit, fields } = query;

    let quer: QueryFilter = {};
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
    // const result = await Product.find();

    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new AppError(httpStatus.FORBIDDEN, 'Failed to fetch products');
  }
};

const deleteProductIntoDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

const updateProductIntoDB = async (payload: TProduct) => {
  const id = payload._id;
  const data = {
    category: payload.category,
    title: payload.title,
    price: payload.price,
    description: payload.description,
    rating: payload.rating,
    image: payload.image,
    quantity: payload.quantity,
  };
  const result = await Product.findByIdAndUpdate(id, { data });
  return result;
};

const allProductIntoDB = async () => {
  const result = await Product.find();
  return result;
};
const singleProductIntoDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
  allProductIntoDB,
  singleProductIntoDB,
};
