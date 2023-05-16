import { z } from 'zod';


export const ratingSchema = z.object({
  id: z.number(),
  rating: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  book: z.object({
    id: z.number(),
    title: z.string(),
    author: z.string(),
    thumbnail: z.string(),
    pdf: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  bookId: z.number(),
});
