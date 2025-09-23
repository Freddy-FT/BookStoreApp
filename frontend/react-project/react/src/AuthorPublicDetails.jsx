import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TrueOrFalse from "./components/checkbox"
export function AuthorPublicDetails() {
    const { id } = useParams();
    //const [authorpublicdetails, setAuthorpublicdetails] = useState(["N/A"])
    const [authorpublicdetails, setAuthorpublicdetails] = useState({});

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
                setAuthorpublicdetails(authordetails)
                }
                catch (error) {
                    console.error('Failed to fetch', error)
                }
            }
            fetchAuthorDetails();
    }, [token]);
    return(
        <article>
        <p>{authorpublicdetails.public_name ?? "N/A"}</p>
        <p>{authorpublicdetails.name ?? "N/A"}</p>
        <p>{authorpublicdetails.email ?? "N/A"}</p>
        <p>{authorpublicdetails.registration_date ?? "N/A"}</p>
        <TrueOrFalse label="Staff" value={authorpublicdetails.is_staff} />
        <TrueOrFalse label="Superuser" value={authorpublicdetails.is_superuser} />
        </article>

        )
}