import { inferAsyncReturnType } from "@trpc/server";
import { NextApiRequest,NextApiResponse } from "next";

export function createContext({
    req,
    res,
    user,
}:{
    req:NextApiRequest,
    res:NextApiResponse,
    user:string
}){
    return {req,res,user};
}

export type Context = inferAsyncReturnType<typeof createContext>;   