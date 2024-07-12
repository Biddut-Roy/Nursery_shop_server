import { model, Schema } from 'mongoose';

// Define the schema
const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category = model('Category', CategorySchema);

export default Category;
