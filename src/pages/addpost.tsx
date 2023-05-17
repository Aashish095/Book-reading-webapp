import { useState, useRef } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router';
import { object, string, TypeOf } from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import { trpc } from "../client/utils/trpc";
import { IUser } from "../client/lib/types";
import useStore from "../client/store";

const CLOUDINARY_UPLOAD_PRESET = 'book-api';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dcysxj92z/image/upload';

const postSchema = object({
    title: string().min(1, "Title is required"),
    author: string().min(1, "Author is required"),
    readTime: string().min(1, "ReadTime is required"),
    description: string().min(1, "Description is required"),
})

export type PostInput = TypeOf<typeof postSchema>;

const AddPostPage: NextPage = () => {
  const [bookImage, setBookImage] = useState<string | null>(null);
  const [bookPDF, setBookPDF] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const store = useStore();

  const user = store.authUser
  const query = trpc.getMe.useQuery(undefined, {
    retry: 1,
    onSuccess: (data) => {
      store.setAuthUser(data.data.user as unknown as IUser);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
  });

  const handleGoToHome = () => {
    router.push('/portfolio'); // Replace '/' with the actual path of your home screen
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        if (response.status === 200 && response.data?.secure_url) {
          setBookImage(response.data.secure_url);
        } else {
          toast('Image upload failed', {
            type: 'error',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('Image upload error:', error);
        toast('Image upload failed', {
          type: 'error',
          position: 'top-right',
        });
      }
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePDFChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        if (response.status === 200 && response.data?.secure_url) {
          setBookPDF(response.data.secure_url);
        } else {
          toast('PDF upload failed', {
            type: 'error',
            position: 'top-right',
          });
        }
      } catch (error) {
        console.error('PDF upload error:', error);
        toast('PDF upload failed', {
          type: 'error',
          position: 'top-right',
        });
      }
    }
  };


    const { isLoading, mutate: CreatePost } = trpc.createPost.useMutation({
        onSuccess(data) {
        toast("Post Created", {
            type: "success",
            position: "top-right",
        });
        query.refetch();
        router.push("/portfolio");
        },
        onError(error) {
        toast(error.message, {
            type: "error",
            position: "top-right",
        });
        },
    });


  const handleFormSubmit: SubmitHandler<PostInput> = async (data) => {
    const formData = {
      title: data.title,
      author: data.author,
      thumbnail: bookImage || '',
      readTime: data.readTime,
      description: data.description,
      pdf: bookPDF || '',
    };

    // Perform form submission or API call with formData
    // ...
    CreatePost(formData);

    // Redirect to the desired page after successful submission
    // router.push('/portfolio'); // Replace '/success' with the actual path of the success page
  };

  return (
    <div>
      <div className="buttoncss">
        <div className="buttoncss2">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleGoToHome}
          >
            Button to Home
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid custom-grid-cols-2 gap-2">
            <div className="col-span-1">
              <div className="empty-box2">
                <div className="plussign" onClick={handleImageUploadClick}>
                  <Link href="/addpost" className="">
                    +
                  </Link>
                  <input
                    type="file"
                    id="uploadImage"
                    name="bookImage"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                </div>
                <div className="adjustingtext2">Add a Book Cover</div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mt-4">
                <label htmlFor="title" className="block mb-2">
                  Name of the Book<span className="required-symbol">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title')}
                  className="custom-width px-3 py-2 border rounded"
                  placeholder="Enter book name"
                />
                {errors.title && <span>{errors.title.message}</span>}
              </div>
              <div className="mt-4 flex gap-4">
                <label htmlFor="author" className="block mb-2">
                  Author of the Book<span className="required-symbol">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  {...register('author')}
                  className="custom-width px-3 py-2 border rounded"
                  placeholder="Enter author name"
                />
                {errors.author && <span>{errors.author.message}</span>}

                <label htmlFor="readTime" className="block mb-2">
                  Book read time<span className="required-symbol">*</span>
                </label>
                <input
                  type="text"
                  id="readTime"
                  {...register('readTime')}
                  className="custom-width-read px-3 py-1 border rounded"
                  placeholder="Enter read time"
                />
                {errors.readTime && <span>{errors.readTime.message}</span>}
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="block mb-2">
                  Book Details<span className="required-symbol">*</span>
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  className="custom-width px-3 py-2 border rounded"
                  placeholder="Enter book details"
                />
                {errors.description && (
                  <span>{errors.description.message}</span>
                )}
              </div>
              <div className="mt-4">
                <label htmlFor="pdf" className="block mb-2">
                  Upload PDF<span className="required-symbol">*</span>
                </label>
                <input
                  type="file"
                  id="pdf"
                  name="pdf"
                  accept="application/pdf"
                  className="w-full"
                  onChange={handlePDFChange}
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostPage;
