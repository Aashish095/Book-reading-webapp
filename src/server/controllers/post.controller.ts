import { TRPCError } from '@trpc/server';
import { Context } from '../createContext';
import {
  CreatePostInput,
  FilterQueryInput,
  ParamsInput,
  UpdatePostInput,
} from '../schema/post.schema';
import {
  createPost,
  deletePost,
  findAllPosts,
  findUniquePost,
  updatePost,
} from '../services/post.service';

// [...] Create Post Handler
export const createPostHandler = async ({
  input,
  ctx,
}: {
  input: CreatePostInput;
  ctx: Context;
}) => {
  try {
    const {user} = await ctx;
    console.log(user)
    const post = await createPost({
      title: input.title,
      author: input.author,
      thumbnail: input.thumbnail,
      readTime:input.readTime,
      description:input.description,
      pdf: input.pdf,
      user: {connect: {id: user?.id}},
    });

    return {
      status: 'success',
      data: {
        post,
      },
    };
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Post with that title already exists',
      });
    }
    throw err;
  }
};

// [...] Get Single Post Handler
export const getPostHandler = async({
    paramsInput,
}:{
    paramsInput:ParamsInput;
})=>{
    try{
        const post = await findUniquePost({id : paramsInput.postId})
        if(!post){
            throw new TRPCError({
                code:'NOT_FOUND',
                message:'Post with that ID not found',
            });
        }

        return{
            status: 'success',
            data:{
                post,
            },
        };
    }catch (error:any){
        throw error;
    }
};

// [...] Get All Posts Handler
export const getPostsHandler = async({
    filterQuery,
}:{
    filterQuery:FilterQueryInput
})=>{
    try{
        const posts = await findAllPosts(filterQuery.page,filterQuery.limit)

        return {
            status: 'success',
            results:posts.length,
            data:{
                posts,
            },

        }
    }catch(err:any){
        throw new TRPCError({
            code:'INTERNAL_SERVER_ERROR',
            message:err.message
        })
    }
}


// [...] Update Post Handler
export const updatePostHandler = async({
    paramsInput,
    input,
}:{
    paramsInput:ParamsInput,
    input: UpdatePostInput
})=>{
    try{
        const post = await updatePost({id: paramsInput.postId},input);

        if(!post){
            throw new TRPCError({
                code:'NOT_FOUND',
                message:'Post with that ID not found'
            })
        }
        return {
            status:'success',
            data:{
                post,
            },
        };

    } catch(error:any){
        throw error;
    }
}

// [...] Delete Post Handler
export const deletePostHandler = async({
    paramsInput
}:{
    paramsInput:ParamsInput
})=>{
    try{
        const post = await deletePost({ id: paramsInput.postId })
        if(!post){
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Post with that ID not found',
            });
        }
        
        return {
            status: 'success',
            data: null
        };

    }catch(err:any){
        throw err;
    }
}