// login.jsx
import { useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = { email, password};

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/v1/dj-rest-auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.access) {
                localStorage.setItem("accessToken", result.access);
                console.log("Token saved");
            } else {
                console.error("Token not saved")
            }
            console.log('Server Response: ', result);    
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    return (
        <article>
            <form onSubmit={handleSubmit}>
                <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </article>
    )
}