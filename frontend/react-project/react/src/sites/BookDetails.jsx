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
            <div className='mt-10 text-black dark:text-white space-y-2 '>
                <div className='ml-3 w-full max-w-sm border border-gray-800 rounded-lg shadow-xl sm:p-6 md:p-8 bg-gray-200 dark:bg-gray-800 dark:border-gray-700'>


                <header>
                    <h1 className='text-2xl font-medium text-gray-900 dark:text-white ml-3'>{bookdetails.title}</h1>
                    <p><strong>Author: </strong><a href={`/author/${bookdetails.name}`}>{bookdetails.public_name}</a> | <small><a href={`/author/${bookdetails.name}`}>{bookdetails.name}</a></small></p>
                    <p><strong>Released: </strong>{bookdetails.release_date}</p>
                </header>
                <section className='mt-4'>
                    <h2>Description</h2>
                    <p>{bookdetails.description}</p>
                </section>
                {bookdetails.is_author && (<>
                <div className="space-y-2 mt-2" role="toolbar" aria-label="Toolbar with button groups">
                <button onClick={() => window.location.href = `/book/${bookdetails.id}/update`} className=' cursor-pointer w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Update</button>
                <form className='deleteForm' onSubmit={handleSubmit}>
                    <button type="submit" className=' cursor-pointer w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 '>Delete</button>
                </form></div></>)}
            </div></div>
        </article>
    )
}

