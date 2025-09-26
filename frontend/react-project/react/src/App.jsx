// App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import React, { useEffect } from 'react';
import LoginForm from './sites/login';
import CreateBookForm from './sites/CreateBook';
import BookList from './sites/BookList';
import { BookSite} from './sites/BookSite';
import { BookUpdate } from './sites/BookUpdate';
import { AuthorDetails } from './sites/AuthorDetails';
//import BookDetail from './BookDetail';
import { AuthorBooksList } from './sites/AuthorBooksList'

function Home() {
    return (
    <>
        <h1>Home Page</h1>
        <h2>Just some random Bookstore build with Django-Restframework and React.</h2>
    </>

    ) ;
}

function About() {
    return <h1>About Page</h1>;
}

function Login() {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

function CreateBook() {
    return (
        <div>
            <CreateBookForm />
        </div>
    )
}

function NavItem({to,children}) {
    return (
        <NavLink to={to} className={({isActive}) =>
            `nav-link ${isActive ? "active":""}`}>
            {children}
        </NavLink>
    )
}

export default function App() {
    useEffect(() => {
        const originalFetch = window.fetch;
        window.fetch = async ( ... args ) => {
            const response = await originalFetch( ... args );
            if (response.status === 403 ) {
                window.location.href = '/login'
                return new Response(null, { status: 403});
            }
            if (response.status === 401 ) {
                window.location.href = '/login'
                return new Response(null, { status: 401});
            }
            return response;
        };
    },[]);
    return (
        <BrowserRouter>
            <nav>
                <NavItem to="/">Home</NavItem> |{" "}
                <NavItem to="/about">About</NavItem> |{" "}
                <NavItem to="/login">Login</NavItem> |{" "}
                <NavItem to="/books">Explore Books</NavItem> |{" "}
                <NavItem to="/book/create">Create Book</NavItem> |{" "}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book/create" element={<CreateBook />} />

                <Route path="/books/" element={<BookList />} />
                <Route path="/book/:id" element={<BookSite />} />
                <Route path="/book/:id/update" element={<BookUpdate />} />

                <Route path="/author/:id/" element={<AuthorDetails />} />
                <Route path="/author/:id/books/" element={<AuthorBooksList />} />
            </Routes>
        </BrowserRouter>
    );
}        