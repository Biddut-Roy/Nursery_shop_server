import { z } from 'zod';

const productZodSchema = z.object({
  body: z.object({
    category: z.string(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    rating: z.number().min(0).max(5),
    image: z.string(),
    quantity: z.number().optional(),
  }),
});

const pUpdateZodSchema = z.object({
  body: z.object({
    category: z.string().optional(),
    title: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    image: z.string().optional(),
    quantity: z.number().optional(),
  }),
});

export const ValidationZod = {
  productZodSchema,
  pUpdateZodSchema,
};
