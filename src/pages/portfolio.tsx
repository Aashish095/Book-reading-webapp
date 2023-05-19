import { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import book from "./images/images.png";
import Header from "../client/components/Header";
import Link from "next/link";
import { trpc } from "../client/utils/trpc";
import { IUser } from "../client/lib/types";
import useStore from "../client/store";
import { IPost } from "../client/lib/types";
import { getPostsHandler } from '../server/controllers/post.controller'
import { filterQuery, FilterQueryInput } from '../server/schema/post.schema'
import { toast } from "react-toastify";
import { useRouter } from 'next/router';

interface Post {
  id:string,
  title: string,
  author: string,
  readTime: string,
  description: string,
  thumbnail:string
  pdf:string
}

const PortfolioPage: NextPage = () => {
  const store = useStore();
  const [posts, setPosts] = useState<Post[]>([]); // Array state variable
  const router = useRouter();
  const user = store.authUser;
  const query = trpc.getMe.useQuery(undefined, {
    retry: 1,
    onSuccess: (data) => {
      store.setAuthUser(data.data.user as unknown as IUser);
    },
  });

  const filterQuery: FilterQueryInput = {
    limit: 10,
    page: 1,
  };
  const { data: postsData, isLoading } = trpc.getPosts.useQuery(filterQuery);

  useEffect(() => {
    if (postsData) {
      console.log(postsData.data.posts)
      setPosts(postsData.data.posts);
    }
  }, [postsData]);

  return (
    <>
      <Header />
      <div className="des">
        📘 My Book
      </div>
    
      <div className="grid grid-cols-6 gap-20 des1">
        {posts.map((post) => (
          <div key={post.id} className="p-1">
            <div className="cardcss rounded-lg">
              <Link href={`/books/${post.id}`}>
                {post.thumbnail ? (
                    <Image
                      src={post.thumbnail}
                      alt="Literature book"
                      width={190}
                      height={272}
                    />
                  ) : (
                    <Image
                      src={book}
                      alt="Default book"
                      width={190}
                      height={272}
                    />
                  )}
              </Link>
            </div>
            <h3 className="text-xl font-bold ">{post.title}</h3>
            <p className="text-gray-500">{post.author}</p>
          </div>
        ))}
        <div className="empty-box">
          <div className="plussign">
            <Link href="/addpost" className="">
              +   
            </Link>
          </div>
          <div className="adjustingtext">
            Add a Book
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
