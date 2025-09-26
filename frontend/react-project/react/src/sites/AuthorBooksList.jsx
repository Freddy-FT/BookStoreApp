import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
export function AuthorBooksList() {
    const { id } = useParams();
    const token = localStorage.getItem("accessToken");
    const [books, setBooks] = useState([]);
    useEffect(() => {
        async function fetchBooks() {
            try { 
                const response = await fetch(`http://127.0.0.1:8000/api/library_v1/author/${id}/books`, {
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
                console.log('Server Response: ', books)
            }
            catch (error) {
                console.error('Failed to fetch', error)
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
                        <p>Release Date: {book.release_date}</p>
                    </div>)}
            </div>
        </article>
    )
}