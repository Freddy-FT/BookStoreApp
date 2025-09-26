import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrueOrFalse from "../components/checkbox"
export function AuthorDetails() {
    const { id } = useParams();
    //const [authordetails, setauthordetails] = useState(["N/A"])
    const [authordetails, setauthordetails] = useState({});

    const token = localStorage.getItem("accessToken");
    useEffect(() => {
            async function fetchAuthorDetails() {
                try {const response = await fetch (`http://127.0.0.1:8000/api/auth/v1/author/${id}/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok){
                    throw new console.error(`HTTP error! status: ${response.status}`)
                }

                const authordetails = await response.json();
                setauthordetails(authordetails)
                }
                catch (error) {
                    console.error('Failed to fetch', error)
                }
            }
            fetchAuthorDetails();
    }, [token]);
    return(
        <article>
        <p>{authordetails.public_name}</p>
        <p>{authordetails.name}</p>
        <p>{authordetails.email}</p>
        <p>{authordetails.registration_date}</p>
        <TrueOrFalse label="Staff" value={authordetails.is_staff} />
        <TrueOrFalse label="Superuser" value={authordetails.is_superuser} />
        <Link className='authorBooksListLink' to={`/author/${id}/books`}>Books</Link>
        </article>

        )
}