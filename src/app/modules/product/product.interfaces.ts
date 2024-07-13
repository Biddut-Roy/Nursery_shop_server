export interface TProduct {
  _id?: string;
  category: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  quantity: number;
}

// Define the Query interface
export interface TIQuery {
  search?: string;
  filter?: string;
  sort?: string;
  page?: string;
  limit?: string;
  fields?: string;
}
export type QueryFilter = {
  category?: string;
};
