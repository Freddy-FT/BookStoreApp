// App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginForm from './sites/Login';
import CreateBookForm from './sites/CreateBook';
import BookList from './sites/BookList';
import Home from './sites/Home';
import { BookSite} from './sites/BookSite';
import { BookUpdate } from './sites/BookUpdate';
import { AuthorDetails } from './sites/AuthorDetails';
//import BookDetail from './BookDetail';
import { AuthorBooksList } from './sites/AuthorBooksList'
import TestComponents from './sites/TestComponents'; // for default export



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


function NavItem({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 text-sm gap-x-2 transition-colors duration-200 ${
            isActive ? "text-black font-semibold dark:text-white" : "text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-slate-600"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
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
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className='bg-gray-200 dark:bg-gray-800'>
        <BrowserRouter>

            <nav className='block w-full  px-4 py-2 mx-auto bg-white shadow-md rounded-t-lg lg:px-8 lg:py-3 dark:bg-black'>
                <div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800 dark:text-slate-200">                
                        {/* Logo */}
                        
                            <a href="/" className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold dark:text-slate-200">
                                <img src="" className="h-8" alt="BookStore Logo" />
                                <span className="">BookStore</span>
                            </a>
                    <div class="hidden lg:block">
                        <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 hover:test-">
                            {/* Navigation Links */}
                            
                                <NavItem to="/">Home</NavItem>

                            
                                <NavItem to="/about">About</NavItem>

                            
                                <NavItem to="/login">Login</NavItem>

                            
                                <NavItem to="/books">Explore Books</NavItem>

                            
                                <NavItem to="/book/create">Create Book</NavItem>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/book/create" element={<CreateBook />} />
                <Route path="/testcomponents" element={<TestComponents />} />

                <Route path="/books/" element={<BookList />} />
                <Route path="/book/:id" element={<BookSite />} />
                <Route path="/book/:id/update" element={<BookUpdate />} />

                <Route path="/author/:id/" element={<AuthorDetails />} />
                <Route path="/author/:id/books/" element={<AuthorBooksList />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}                       

/*
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        
          <a href="#" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
*/