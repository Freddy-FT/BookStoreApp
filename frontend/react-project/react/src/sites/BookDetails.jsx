import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function BookDetails() {
    const { id } = useParams();
    const [bookdetails,setBookdetails] = useState([]);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        async function fetchBookDetails() {
            try {const response = await fetch(`http://127.0.0.1:8000/api/library_v1/book/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok){
                    throw new console.error(`HTTP error! status: ${response.status}`)
                }

                const bookdetails= await response.json();
                setBookdetails(bookdetails);
                console.log('Server Response: ', bookdetails);
            }
            catch (error) {
                console.error('Failed to fetch', error)
            }
        }
        fetchBookDetails();
    },[token]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/library_v1/book/${id}/delete/`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();
            console.log('Server Response: ', result)
        } catch (error) {
            console.error('Error: ', error)
        }
    }
    return (
        <article>
            <header>
                <h1>{bookdetails.title}</h1>
                <p><strong>Author: </strong><a href={`/author/${bookdetails.name}`}>{bookdetails.public_name}</a> | <small>{bookdetails.name}</small></p>
                <p><strong>Released: </strong>{bookdetails.release_date}</p>
            </header>
            <section>
                <h2>Description</h2>
                <p>{bookdetails.description}</p>
            </section>
            {bookdetails.is_author && (<>
            <Link className='updateLink' to={`/book/${bookdetails.id}/update`}>Update</Link>
            <form className='deleteForm' onSubmit={handleSubmit}>
                <button type="submit">Delete</button>
            </form></>)}
        </article>
    )
}

