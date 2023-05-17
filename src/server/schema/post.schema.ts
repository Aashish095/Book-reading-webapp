import { boolean, number, object, string, TypeOf } from 'zod';

export const createPostSchema = object({
  title: string({
    required_error: 'Title is required',
  }),
  author: string({
    required_error: 'author is required',
  }),
  thumbnail: string({
    required_error: 'thumbnail is required',
  }),
  pdf: string({
    required_error: 'pdf is required',
  }),
  readTime:string({
    required_error: 'readtime is required',
  }),
  description:string({
    required_error: 'description is required',
  })
});

export const params = object({
  postId: string(),
});

export const updatePostSchema = object({
  params,
  body: object({
    title: string(),
    author: string(),
    thumbnail: string(),
    pdf: string(),
  }).partial(),
});

export const filterQuery = object({
  limit: number().default(1),
  page: number().default(10),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>;
export type ParamsInput = TypeOf<typeof params>;
export type UpdatePostInput = TypeOf<typeof updatePostSchema>['body'];
export type FilterQueryInput = TypeOf<typeof filterQuery>;
