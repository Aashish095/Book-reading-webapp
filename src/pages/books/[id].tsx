import { NextPage } from "next";
import { useState,useRef } from "react";
import { useRouter } from 'next/router';
import Header from "../../client/components/Header";
import Image from "next/image";
import book from "../images/book2.jpg";


const BookInfo:NextPage = () => {
    const router = useRouter();
    const [showPDF, setShowPDF] = useState(false);
    const [numPages,setNumPages] = useState(0);

    const handleReadBook = ()=>{
        setShowPDF(true);
    }

    const onDocumentLoadSuccess = ({numPages}:{numPages:number})=>{
        setNumPages(numPages);
    } 

    const handleGoToHome = () => {
        router.push('/portfolio'); // Replace '/' with the actual path of your home screen
      };

    return(
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
 
                <div className="grid custom-grid-cols-2 gap-2">
                    <div className="col-span-1">
                        <div className="cardcss2 rounded-lg">
                            <Image   src={book} alt="Literature book" width={325} height={415}/>  
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="bookname">
                            The Martian
                        </div>
                        <div className="subtext">
                            Andy Weir
                        </div>
                        <div className="subtext">
                            Book Read Time: 6 hours 8 Mins
                        </div>
                        <br/>
                        <div className="custom-width-p">
                            <p>
                                When astronauts blast off from the planet Mars, they leave behind Mark Watney (Matt Damon), presumed dead after a fierce storm. With only a meager amount of supplies, the stranded visitor must utilize his wits and spirit to find a way to survive on the hostile planet. Meanwhile, back on Earth, members of NASA and a team of international scientists work tirelessly to bring him home, while his crew mates hatch their own plan for a daring rescue mission.
                            </p>
                        </div>
                        <div  style={{marginTop:"40px"}}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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

}

export default BookInfo;