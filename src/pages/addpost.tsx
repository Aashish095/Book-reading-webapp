import { useState,useRef } from "react";
import { NextPage } from "next";
import Header from "../client/components/Header";
import Link from "next/link";
import { useRouter } from 'next/router';

const AddPostPage: NextPage = () => {
  const [bookImage, setBookImage] = useState<File | null>(null);
  const [bookPDF, setBookPDF] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/portfolio'); // Replace '/' with the actual path of your home screen
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBookImage(file);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };


  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBookPDF(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append("bookName", e.currentTarget.bookName.value);
    formData.append("authorName", e.currentTarget.authorName.value);
    formData.append("readTime", e.currentTarget.readTime.value);
    formData.append("bookDetails", e.currentTarget.bookDetails.value);
    if(bookImage){
        formData.append("bookImage", bookImage);
    }
    if(bookPDF){
        formData.append("bookPDF", bookPDF);
    }

    // Perform your API request with the form data  
    // Example: axios.post("/api/addpost", formData);
  };

  return (
    <>
      <Header />
      <div className="buttoncss">
        <div className="buttoncss2">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={handleGoToHome}
            >
            Button to Home
            </button>
        </div>
        
        <form onSubmit={handleSubmit}>
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
                    <div  className="mt-4">
                        <label htmlFor="bookName" className="block mb-2">
                            Name of the Book<span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            id="bookName"
                            name="bookName"
                            className="custom-width px-3 py-2 border rounded"
                            placeholder="Enter book name"
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <label htmlFor="authorName" className="block mb-2">
                            Author of the Book<span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            id="authorName"
                            name="authorName"
                            className="custom-width px-3 py-2 border rounded"
                            placeholder="Enter author name"
                        />
            
                        <label htmlFor="readTime" className="block mb-2">
                            Book read time<span className="required-symbol">*</span>
                        </label>
                        <input
                            type="text"
                            id="readTime"
                            name="readTime"
                            className="custom-width-read px-3 py-1 border rounded"
                            placeholder="Enter read time"   
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="bookDetails" className="block mb-2">
                            Book Details<span className="required-symbol">*</span>
                        </label>
                        <textarea
                            id="bookDetails"
                            name="bookDetails"
                            className="custom-width px-3 py-2 border rounded"
                            placeholder="Enter book details"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="uploadPDF" className="block mb-2">
                            Upload PDF<span className="required-symbol">*</span>
                        </label>
                        <input
                            type="file"
                            id="uploadPDF"
                            name="bookPDF"
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
    </>
  );
};

export default AddPostPage;

