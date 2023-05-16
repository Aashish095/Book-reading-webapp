import { NextPage } from "next";
import Image from "next/image";
import book from "./images/book2.jpg";
import Header from "../client/components/Header"
import Link from "next/link";

interface Book {
  id:number;
  title:string;
  author:string;
}

const PortfolioPage: NextPage = () => {
  // Dummy data for cards
  const cards:Book[] = [
    { id: 1, title: "The Martian", author: "Andy Weir" },
    { id: 2, title: "Card 2", author: "Description 2" },
    { id: 3, title: "Card 3", author: "Description 3" },
    { id: 4, title: "Card 3", author: "Description 3" },
    { id: 5, title: "Card 3", author: "Description 3" },
    { id: 6, title: "Card 3", author: "Description 3" },
    { id: 7, title: "Card 3", author: "Description 3" },

    // Add more cards here if needed
  ];

  return (
    <>
    <Header />
    <div className="des">
        📘 My Book
    </div>
    
    <div className="grid grid-cols-6 gap-20 des1">
      {cards.map((card) => (
        <div key={card.id} className="p-1">
          <div className="cardcss rounded-lg">
            <Link href={`/books/${card.id}`}>
              <Image  src={book} alt="Literature book" width={190} height={272}/>  
            </Link>
            
          </div>
          <h3 className="text-xl font-bold ">{card.title}</h3>
          <p className="text-gray-500">{card.author}</p>
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
