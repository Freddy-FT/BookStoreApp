// signin.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [public_name, setPublic_name] = useState('');
    const [name, setName] = useState('');
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { email, public_name, name, password1, password2};

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/v1/dj-rest-auth/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error: ', error);
        }
        
    };
    return (
        <article className='relative flex items-center justify-center content-center'>
            <div className='mt-10 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
                <form className='space-y-8' onSubmit={handleSubmit}>
                    <h1 className='text-xl font-medium text-gray-900 dark:text-white'>Signup</h1>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white' 
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Public Name</label>
                        <input type=""
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white' 
                        placeholder='Public Name'
                        value={public_name}
                        onChange={(e) => setPublic_name(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type=""
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white' 
                        placeholder='Username'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white'
                        placeholder="••••••••"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)} />
                    </div>
                                        <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat your password</label>
                        <input type="password"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg hover:bg-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-black dark:text-white'
                        placeholder="••••••••"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>
                    <Link className='content-center text-white underline-offset-2' to={`/login`}>Login</Link>
                </form>
            </div>
        </article>
    )
}