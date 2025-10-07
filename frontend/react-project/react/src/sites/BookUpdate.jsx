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
            <form className='form-inline justify-content-between' onSubmit={handleSubmit}>
                <input className='form-control mr-sm-2' type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
                <input className='form-control mr-sm-2' type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
                <button className='btn btn-primary' type="submit">Update</button>
            </form>
        </article>
    )
}
