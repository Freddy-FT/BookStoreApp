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
            <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                <form className='space-y-8' onSubmit={handleSubmit}>
                    <h1 className='text-xl font-medium text-gray-900 dark:text-white'>Login</h1>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white' 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-800 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-white dark:text-white"'
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                </form>
            </div>
        </article>
    )
}

