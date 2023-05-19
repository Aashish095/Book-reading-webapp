# # Book Reading Application
This is a full-stack book reading application built using TypeScript, tRPC, and a SQL-like database (PostgreSQL) for persistence. The application allows users to view a gallery of books, read book details including a PDF file, and add new books with thumbnails and PDF files.

## Features
View all added books in a gallery view
Read book details and PDF files
Add new books with thumbnails and PDF files
Optional star rating system for books
Technologies Used
Frontend: Next.js, React, tRPC, Tailwind CSS
Backend: Node.js, Express.js, tRPC, Prisma ORM, docker
Database: PostgreSQL,redis
## Getting Started
To get started with the application, follow these steps:

Clone the repository: git clone https://github.com/Aashish095/book-reading-app.git
Navigate to the project directory: cd book-reading-app
Install dependencies: npm install or yarn install
## Set up the database:
I have added docker-compose.yml 
use command :- sudo docker compose up -d //it start the postgresql, redis
Configure the database connection in the prisma/.env file.
Run database migrations: npx prisma migrate dev or yarn prisma migrate dev
Start the development server: npm run dev or yarn dev
Open the application in your browser: http://localhost:3000
## Folder Structure
client/: Contains the frontend application built with Next.js and React.
server/: Contains the backend server built with Node.js and Express.js.
prisma/: Contains Prisma configuration and database migrations.
## Configuration
Database Connection: Update the prisma/.env file with your PostgreSQL database connection details.
Port: The application runs on port 3000 by default. You can change it in the .env file in the root directory.
Contributing
Contributions to the project are welcome. Feel free to open issues and submit pull requests to help improve the application.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
