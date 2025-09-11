// CreateBook.jsx
import { useState } from 'react'

export default function CreateBookForm() {
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title };
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch('http://localhost:8000/api/library_v1/book/create/', {
                method: 'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log('Server Response: ', result)
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    return (
        <article>
            <form onSubmit={handleSubmit}>
                <input type="text"
                placeholder='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}/>
                <button type='submit'>Create</button>
            </form>
        </article>
    )
}