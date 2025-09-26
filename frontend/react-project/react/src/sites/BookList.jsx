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
            <div>
                <h1>Books</h1>
                {books.map((book) => 
                    <div key={book.id}>
                        <h3>{book.title}</h3>
                        <Link to={`/book/${book.id}`}>Details</Link>
                    </div>
                )}
            </div>
        </article>
    )
}