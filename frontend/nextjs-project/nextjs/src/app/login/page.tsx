// login.tsx
"use client";
import { useState } from 'react'

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { email, password };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/v1/dj-rest-auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });

            const result: { access?: string; [key: string]: any } = await response.json();

            if (result.access) {
            localStorage.setItem('accessToken', result.access);
            console.log('Token saved');
            } else {
            console.error('Token not saved');
            }

            console.log('Server Response: ', result);
        } catch (error) {
            console.error('Error: ', error);
        }
        };
        return (
        <article>
            <div
            style={{ animation: "slideInFromLeft 1s ease-out" }}
            className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
            >
            <h2
                style={{ animation: "appear 2s ease-out" }}
                className="text-center text-4xl font-extrabold text-white"
            >
                Welcome
            </h2>
            <p
                style={{ animation: "appear 3s ease-out" }}
                className="text-center text-gray-200"
            >
                Sign in to your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                <input
                    placeholder="john@example.com"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                    required
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                >
                    Email address
                </label>
                </div>
                <div className="relative">
                <input
                    placeholder="Password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                >
                    Password
                </label>
                </div>
                <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-200">
                    <input
                    className="form-checkbox h-4 w-4 text-purple-600 bg-gray-800 border-gray-300 rounded"
                    type="checkbox"
                    />
                    <span className="ml-2">Remember me</span>
                </label>
                <a className="text-sm text-purple-200 hover:underline" href="#">
                    Forgot your password?
                </a>
                </div>
                <button
                className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                type="submit"
                >
                Sign In
                </button>
            </form>
            <div className="text-center text-gray-300">
                Don't have an account?{" "}
                <a className="text-purple-300 hover:underline" href="#">
                Sign up
                </a>
            </div>
            </div>
        </article>
        );
}

