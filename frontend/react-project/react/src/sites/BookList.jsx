import { useEffect, useState } from 'react';
import { data, Link } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';

export default function BookList() {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/library_v1/books/", {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
        
                if (!response.ok){
                    throw new console.error(`HTTP error! status: ${response.status} `);
                }
                const books = await response.json();
                setBooks(books);
                console.log('Server Response: ', books);
            } 
            catch (error) {
                console.error('Failed to fetch', error);
            }
        }
        fetchBooks(); 
    },[token]);
    return (
        <article>
            <div className='text-black dark:text-white space-y-2'>
                <h1 className='text-xl font-medium text-gray-900 dark:text-white ml-3'>Books</h1>
                {books.map((book) => 
                    <div className='ml-3 w-full max-w-sm border border-gray-800 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700' key={book.id}>
                        <h2 className='text-m font-medium text-gray-900 dark:text-white mb-3'>{book.title}</h2>
                        <Link to={`/book/${book.id}`} className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>Details</Link>
                    </div>
                )}
            </div>
        </article>
    )
}