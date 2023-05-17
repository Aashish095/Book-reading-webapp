export type IUser = {
    _id: string;
    id: string;
    email: string;
    name: string;
    role: string;
    photo: string;
    updatedAt: string;
    createdAt: string;
  };

export type IPost = {
  id        :string;
  title     :string;  
  author    :string;  
  thumbnail :string;
  readTime  :string;   // Add the readTime field here
  description  :string; 
  pdf       :string;
}
  
  