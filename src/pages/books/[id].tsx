import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Header from "../../client/components/Header";
import Image from "next/image";
import book from "../images/book2.jpg";
import { trpc } from "../../client/utils/trpc";
import { IPost } from "../../client/lib/types";

interface PostData {
  post: IPost;
}

const BookInfo: NextPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const router = useRouter();
  const [showPDF, setShowPDF] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const { id } = router.query as { id: string }; // Extract the post ID from the URL query parameter

  const { data: postdata, isLoading } = trpc.getPost.useQuery({ postId: id });

  useEffect(() => {
    if (postdata) {
      console.log(postdata.data);
      setPost(postdata.data.post);
    }
  }, [postdata]);

  const handleReadBook = () => {
    setShowPDF(true);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleGoToHome = () => {
    router.push('/portfolio'); // Replace '/' with the actual path of your home screen
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading state while the data is being fetched
  }

  if (!post) {
    return <div>Post not found</div>; // Handle the case when the post is not available
  }

  return (
    <>
      <Header />
      <div className="buttoncss">
        <div className="buttoncss2">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleGoToHome}
          >
            Button to Home
          </button>
        </div>

        <div className="grid custom-grid-cols-2 gap-2">
          <div className="col-span-1">
            <div className="cardcss2 rounded-lg">
                {post.thumbnail ? (
                        <Image
                        src={post.thumbnail}
                        alt="Literature book"
                        width={325} height={415}
                        />
                    ) : (
                        <Image
                        src={book}
                        alt="Default book"
                        width={325} height={415}
                        />
                    )}
            </div>
          </div>
          <div className="col-span-1">
            <div className="bookname">{post?.title}</div>
            <div className="subtext">{post?.author}</div>
            <div className="subtext">Book Read Time: {post?.readTime}</div>
            <br />
            <div className="custom-width-p">
              <p>{post?.description}</p>
            </div>
            <div style={{ marginTop: "40px" }}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                onClick={handleReadBook}
              >
                Read This Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookInfo;
