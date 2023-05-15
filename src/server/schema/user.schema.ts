import {object, string ,TypeOf } from 'zod';

export const createUserSchema = object({
    name: string({required_error: 'Name is Required'}),
    email: string({required_error: 'Email is Required'}).email('Invalid Email'),
    photo: string({required_error:'Photo is Required'}),
    password: string({required_error: 'Password is Required'})
    .min(8,'Password must be more than 8 characters')
    .max(32,'Password must be more than 32 characters'),
    passwordConfirm: string({required_error:'Please confirm your password'})

}).refine((data)=> data.password === data.passwordConfirm,{
    path: ['passwordConfirm'],
    message: 'Password do not match'
});

export const loginUserSchema = object({
    email:string({required_error:'Email is Required'}).email(
        'Invalid email or password'
    ),
    password:string({required_error:'Password is Requied'}).min(
        8,
        'Invalid email or password'
    )
})


export type createUserInput = TypeOf<typeof createUserSchema>;
export type loginUser = TypeOf<typeof loginUserSchema>;