import httpStatus from 'http-status';
import {
  QueryFilter,
  TIQuery,
  TProduct,
  TProductUpdateInfo,
} from './product.interfaces';
import Product from './product.model';
import AppError from '../../errors/appError';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductIntoDB = async (query: TIQuery) => {
  try {
    const { search, filter, page } = query;

    let Filter: QueryFilter = {};

    if (filter) {
      Filter.category = filter;
    }

    let mongooseQuery = Product.find();

    if (search) {
      const keyword = search.toLowerCase();
      mongooseQuery = mongooseQuery.find({
        $or: [
          { category: { $regex: keyword, $options: 'i' } },
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
    }

    // Filter
    if (filter) {
      mongooseQuery = mongooseQuery.find(Filter);
    }

    // Paginate
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = 10;
    const skip = (pageNum - 1) * limitNum;

    mongooseQuery = mongooseQuery.skip(skip).limit(limitNum);

    const result = await mongooseQuery.exec();

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
const paymentProductUpdateIntoDB = async (data: TProductUpdateInfo[]) => {
  const updatedProducts: any[] = [];

  try {
    const ids = data.map((update) => update._id);
    const products = await Product.find({ _id: { $in: ids } });
    const updatesMap = new Map(data.map((update) => [update._id, update.QAT]));

    for (const product of products) {
      const QAT = updatesMap.get(product._id.toString());

      if (QAT !== undefined && typeof product.quantity === 'number') {
        product.quantity -= QAT;

        const result = await product.save();
        updatedProducts.push(result);
      } else {
        console.warn(
          `Product with _id ${product._id} has an invalid quantity: ${product.quantity}`,
        );
      }
    }
    return updatedProducts;
  } catch (error) {
    throw error;
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductIntoDB,
  deleteProductIntoDB,
  updateProductIntoDB,
  allProductIntoDB,
  singleProductIntoDB,
  paymentProductUpdateIntoDB,
};
