import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
export function BookUpdate() {
    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [bookdetails,setBookdetails] = useState([]);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        async function fetchBookDetails() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/library_v1/book/${id}`,{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok){
                    throw new console.error(`HTTP error! status: ${response.status}`)
                }
                const bookdetails=await response.json();
                setTitle(bookdetails.title);
                setDescription(bookdetails.description);
                console.log('Server Response: ', bookdetails);
            }
            catch (error) {
                console.error('Failed to fetch', error)
            }
        }
        fetchBookDetails();
    },[token])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        const data = { title, description};

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/library_v1/book/${id}/update/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            } );
            const result = await response.json();
            console.log('Server Response: ', result)
        } catch (error) {
            console.error('Error: ', error)
        }
    }
    return (
        <article>
            <div className='mt-10 text-black dark:text-white space-y-2'>
            <form className='ml-3 w-full max-w-sm border border-gray-800 rounded-lg shadow-xl sm:p-6 md:p-8 bg-gray-200 dark:bg-gray-800 dark:border-gray-700' onSubmit={handleSubmit}>
                <input className='text-black dark:text-black bg-gray-50 border border-gray-300  text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black ' type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
                <input className='text-black dark:text-black bg-gray-50 border border-gray-300  text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black ' type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
                <div className="space-y-2 mt-2" role="toolbar">
                <button className='cursor-pointer w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Update</button>
            </div></form>
            </div>
        </article>
    )
}
